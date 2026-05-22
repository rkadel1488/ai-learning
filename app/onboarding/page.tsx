import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ParentOnboarding } from './_components/ParentOnboarding'
import { TeacherOnboarding } from './_components/TeacherOnboarding'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🤖</div>
          <h1 className="text-2xl font-bold text-white">Welcome to AI Learning</h1>
          <p className="text-slate-400 text-sm mt-1">Let&apos;s get you set up</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          {profile?.role === 'teacher'
            ? <TeacherOnboarding />
            : <ParentOnboarding />
          }
        </div>
      </div>
    </div>
  )
}
