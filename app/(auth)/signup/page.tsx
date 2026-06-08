import { SignUpForm } from '@/components/auth/SignUpForm'

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reason?: string }>
}) {
  const { error, reason } = await searchParams
  return <SignUpForm oauthError={error} oauthReason={reason} />
}
