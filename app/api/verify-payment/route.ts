import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Anthropic from '@anthropic-ai/sdk'
import type { Database } from '@/lib/supabase/types'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }

  let body: { imageBase64: string; mimeType: string; referenceCode: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { imageBase64, mimeType, referenceCode } = body
  if (!imageBase64 || !referenceCode) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Verify the reference code belongs to this user
  const { data: paymentRequest } = await supabase
    .from('payment_requests')
    .select('id, status')
    .eq('user_id', user.id)
    .eq('reference_code', referenceCode)
    .single()

  if (!paymentRequest) {
    return Response.json({ error: 'Payment request not found' }, { status: 404 })
  }
  if (paymentRequest.status === 'approved') {
    return Response.json({ verified: true, alreadyApproved: true })
  }

  // Mark as uploaded
  await supabase
    .from('payment_requests')
    .update({ status: 'uploaded' })
    .eq('id', paymentRequest.id)

  // Check if ANTHROPIC_API_KEY is real
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your-claude-api-key') {
    // No real key — flag for manual review
    await supabase
      .from('payment_requests')
      .update({ analysis_notes: 'Manual review required — AI verification not configured' })
      .eq('id', paymentRequest.id)
    return Response.json({
      verified: false,
      manualReview: true,
      message: 'Your payment proof has been received and will be reviewed manually within 24 hours.',
    })
  }

  // Use Claude Haiku vision to verify the reference code appears in the screenshot
  const anthropic = new Anthropic({ apiKey })
  let analysisNotes = ''
  let verified = false

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: (mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp') || 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: `This is a screenshot of an eSewa mobile payment. Look carefully at the payment remarks/description field.

Does the reference code "${referenceCode}" appear anywhere in the image, especially in the remarks or description section?

Reply with exactly: VERIFIED if the reference code is present, or NOT_VERIFIED if it is not visible. Then on the next line, briefly explain what you see in the remarks field.`,
            },
          ],
        },
      ],
    })

    const result = response.content[0]?.type === 'text' ? response.content[0].text : ''
    verified = result.trim().startsWith('VERIFIED')
    analysisNotes = result.trim()
  } catch (err) {
    analysisNotes = `AI analysis failed: ${err instanceof Error ? err.message : 'Unknown error'}`
  }

  if (verified) {
    // Approve and create purchase record
    await Promise.all([
      supabase
        .from('payment_requests')
        .update({ status: 'approved', analysis_notes: analysisNotes, reviewed_at: new Date().toISOString() })
        .eq('id', paymentRequest.id),
      supabase
        .from('purchases')
        .insert({ user_id: user.id, amount: 1000, currency: 'NPR', type: 'esewa' }),
    ])
    return Response.json({ verified: true })
  } else {
    await supabase
      .from('payment_requests')
      .update({ status: 'rejected', analysis_notes: analysisNotes, reviewed_at: new Date().toISOString() })
      .eq('id', paymentRequest.id)
    return Response.json({ verified: false, message: 'Reference code not found in payment screenshot. Please make sure you included the reference code in the payment remarks.' })
  }
}
