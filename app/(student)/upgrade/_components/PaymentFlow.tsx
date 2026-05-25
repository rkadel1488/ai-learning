'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { PaymentStatus } from '@/lib/supabase/types'

type Props = {
  referenceCode: string
  status: PaymentStatus
  amount: number
}

type Step = 'reference' | 'qr' | 'upload' | 'done' | 'manual'

export function PaymentFlow({ referenceCode, status: initialStatus, amount }: Props) {
  const router = useRouter()
  const [step, setStep] = useState<Step>(
    initialStatus === 'approved' ? 'done' :
    initialStatus === 'uploaded' ? 'upload' :
    'reference'
  )
  const [qrLoaded, setQrLoaded] = useState(false)
  const [qrError, setQrError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleCopy() {
    navigator.clipboard.writeText(referenceCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = ev => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
    setError(null)
  }

  async function handleVerify() {
    if (!imageFile || !imagePreview) return
    setLoading(true)
    setError(null)

    try {
      // Strip the data URL prefix to get pure base64
      const base64 = imagePreview.split(',')[1]
      const mimeType = imageFile.type || 'image/jpeg'

      const res = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mimeType, referenceCode }),
      })
      const data = await res.json()

      if (data.verified || data.alreadyApproved) {
        setStep('done')
        setTimeout(() => router.refresh(), 1500)
      } else if (data.manualReview) {
        setStep('manual')
      } else {
        setError(data.message ?? 'Verification failed. Please check your payment screenshot.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'done') {
    return (
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-7xl">🎉</div>
        <h1 className="text-3xl font-bold text-white">Full Access Unlocked!</h1>
        <p className="text-slate-400">Your payment has been verified. You now have access to all topics and questions.</p>
        <button
          onClick={() => router.push('/topics')}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
        >
          Go to Topics →
        </button>
      </div>
    )
  }

  if (step === 'manual') {
    return (
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-7xl">⏳</div>
        <h1 className="text-2xl font-bold text-white">Under Review</h1>
        <p className="text-slate-400">Your payment proof has been received and will be reviewed manually within 24 hours. We'll activate your access once confirmed.</p>
        <button
          onClick={() => router.push('/topics')}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium py-3 rounded-xl transition-colors"
        >
          ← Back to Topics
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-5xl">🚀</div>
        <h1 className="text-2xl font-bold text-white">Unlock Full Access</h1>
        <p className="text-slate-400 text-sm">One-time payment of Rs {amount.toLocaleString()} — pay once, keep forever</p>
      </div>

      {/* Benefits */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest">What you get</p>
        <ul className="space-y-2 text-sm text-slate-300">
          {[
            'All 500+ quiz questions across 10 topics',
            'Complete interactive lessons with games',
            'Topic completion certificates',
            'AI Genius Certificate on 80%+ score',
            'Lifetime access — no subscription',
          ].map(item => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-emerald-400 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 justify-center">
        {(['reference', 'qr', 'upload'] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
              step === s ? 'bg-violet-600 border-violet-500 text-white' :
              (step === 'qr' && i === 0) || (step === 'upload' && i < 2)
                ? 'bg-violet-900/40 border-violet-700 text-violet-400'
                : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}>
              {i + 1}
            </div>
            {i < 2 && <div className="w-8 h-px bg-slate-700" />}
          </div>
        ))}
      </div>

      {/* Step: Reference Code */}
      {step === 'reference' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div>
            <p className="text-xs text-violet-400 uppercase tracking-widest font-semibold mb-1">Step 1 — Your Reference Code</p>
            <p className="text-slate-400 text-sm">Copy this code and paste it in the <strong className="text-white">payment remarks/description</strong> when you send money via eSewa. This is how we verify your payment.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-800 border border-violet-700/50 rounded-xl px-4 py-3">
              <span className="text-violet-300 font-mono text-lg font-bold tracking-widest">{referenceCode}</span>
            </div>
            <button
              onClick={handleCopy}
              className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${copied ? 'bg-emerald-600 text-white' : 'bg-violet-600 hover:bg-violet-500 text-white'}`}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-amber-200">
            <strong>Important:</strong> The reference code <span className="font-mono font-bold">{referenceCode}</span> must appear in the remarks field of your eSewa payment. Payments without it cannot be verified.
          </div>
          <button
            onClick={() => setStep('qr')}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            I've noted the code → Show QR
          </button>
        </div>
      )}

      {/* Step: QR Code */}
      {step === 'qr' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div>
            <p className="text-xs text-violet-400 uppercase tracking-widest font-semibold mb-1">Step 2 — Scan & Pay via eSewa</p>
            <p className="text-slate-400 text-sm">Scan the QR code with your eSewa app and send <strong className="text-white">Rs {amount.toLocaleString()}</strong>. Remember to add <span className="font-mono text-violet-300 font-bold">{referenceCode}</span> in the remarks.</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-3 rounded-2xl">
              {!qrError ? (
                <Image
                  src="/esewa-qr.png"
                  alt="eSewa QR Code"
                  width={220}
                  height={220}
                  className={`rounded-lg ${qrLoaded ? '' : 'opacity-0 h-0'}`}
                  onLoad={() => setQrLoaded(true)}
                  onError={() => setQrError(true)}
                />
              ) : null}
              {(qrError || !qrLoaded) && (
                <div className={`w-[220px] h-[220px] flex flex-col items-center justify-center bg-slate-100 rounded-lg text-slate-500 text-center p-4 ${!qrError ? 'hidden' : ''}`}>
                  <div className="text-3xl mb-2">📱</div>
                  <p className="text-xs font-medium text-slate-600">eSewa QR Code</p>
                  <p className="text-[10px] text-slate-400 mt-1">Upload esewa-qr.png to /public</p>
                </div>
              )}
            </div>
            <div className="text-center space-y-1">
              <p className="text-white font-bold text-lg">Rs {amount.toLocaleString()}</p>
              <p className="text-slate-400 text-xs">Scan with eSewa app</p>
            </div>
          </div>

          <div className="flex gap-3 bg-slate-800 rounded-xl px-4 py-3 items-center">
            <span className="text-violet-400 font-mono font-bold text-sm">{referenceCode}</span>
            <span className="text-slate-500 text-xs">← add to remarks</span>
          </div>

          <button
            onClick={() => setStep('upload')}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            I've paid → Upload Proof
          </button>
          <button
            onClick={() => setStep('reference')}
            className="w-full text-slate-500 text-sm hover:text-slate-300 transition-colors"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Step: Upload proof */}
      {step === 'upload' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div>
            <p className="text-xs text-violet-400 uppercase tracking-widest font-semibold mb-1">Step 3 — Upload Payment Screenshot</p>
            <p className="text-slate-400 text-sm">Take a screenshot of your completed eSewa payment and upload it below. Make sure the reference code <span className="font-mono text-violet-300 font-bold">{referenceCode}</span> is visible in the remarks.</p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              imagePreview ? 'border-violet-600/60' : 'border-slate-700 hover:border-slate-500'
            }`}
          >
            {imagePreview ? (
              <div className="space-y-2">
                <Image
                  src={imagePreview}
                  alt="Payment proof preview"
                  width={300}
                  height={200}
                  className="mx-auto rounded-lg object-contain max-h-48"
                  unoptimized
                />
                <p className="text-violet-400 text-xs">Tap to change</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-3xl">📷</div>
                <p className="text-slate-400 text-sm">Tap to select payment screenshot</p>
                <p className="text-slate-600 text-xs">JPG, PNG supported</p>
              </div>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {error && (
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            onClick={handleVerify}
            disabled={!imageFile || loading}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Verifying...' : 'Verify & Activate Access →'}
          </button>
          <button
            onClick={() => setStep('qr')}
            className="w-full text-slate-500 text-sm hover:text-slate-300 transition-colors"
          >
            ← Back
          </button>
        </div>
      )}

      <p className="text-center text-slate-600 text-xs">Questions? Contact us — we verify manually too.</p>
    </div>
  )
}
