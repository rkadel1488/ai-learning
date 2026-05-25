import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`)
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
  }

  // Create public.users row if it doesn't exist yet (first Google login)
  const { data: existing } = await supabase
    .from('users')
    .select('id, role')
    .eq('id', data.user.id)
    .single()

  if (!existing) {
    const meta = data.user.user_metadata
    await supabase.from('users').insert({
      id: data.user.id,
      email: data.user.email!,
      role: (meta?.role as 'parent' | 'teacher') ?? 'parent',
      name: meta?.full_name ?? meta?.name ?? null,
    })
    return NextResponse.redirect(`${origin}/onboarding`)
  }

  const dest = existing.role === 'teacher' ? '/teacher/dashboard' : next
  return NextResponse.redirect(`${origin}${dest}`)
}
