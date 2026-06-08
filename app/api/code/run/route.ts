const PISTON_URL = 'https://emkc.org/api/v2/piston/execute'

const ALLOWED_LANGUAGES = new Set(['java', 'c', 'c++', 'csharp', 'sqlite3', 'php'])

export async function POST(request: Request) {
  let body: { language: string; version: string; code: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { language, version, code } = body
  if (!language || !version || typeof code !== 'string') {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (!ALLOWED_LANGUAGES.has(language)) {
    return Response.json({ error: 'Unsupported language' }, { status: 400 })
  }
  if (code.length > 20000) {
    return Response.json({ error: 'Code is too long' }, { status: 400 })
  }

  try {
    const res = await fetch(PISTON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        version,
        files: [{ content: code }],
      }),
    })

    if (!res.ok) {
      return Response.json({ error: 'Code execution service is unavailable right now.' }, { status: 502 })
    }

    const data = await res.json()
    return Response.json(data)
  } catch {
    return Response.json({ error: 'Code execution service is unavailable right now.' }, { status: 502 })
  }
}
