export async function runPiston(language: string, version: string, code: string): Promise<{ output: string; error?: string }> {
  try {
    const res = await fetch('/api/code/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, version, code }),
    })
    const data = await res.json()
    if (!res.ok) {
      return { output: '', error: data?.error ?? 'Failed to run code.' }
    }
    const stdout = data?.run?.stdout ?? ''
    const stderr = data?.run?.stderr ?? ''
    const compileStderr = data?.compile?.stderr ?? ''
    const output = [stdout, compileStderr, stderr].filter(Boolean).join('\n')
    return { output }
  } catch {
    return { output: '', error: 'Could not reach the code execution service. Please try again.' }
  }
}
