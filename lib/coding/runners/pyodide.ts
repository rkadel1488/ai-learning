const PYODIDE_VERSION = 'v0.26.4'
const PYODIDE_CDN_BASE = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`

type PyodideStreamHandler = { batched: (text: string) => void }

type PyodideInterface = {
  setStdout: (handler: PyodideStreamHandler) => void
  setStderr: (handler: PyodideStreamHandler) => void
  runPythonAsync: (code: string) => Promise<unknown>
}

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>
  }
}

let pyodidePromise: Promise<PyodideInterface> | null = null

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Python runtime. Check your connection and try again.'))
    document.head.appendChild(script)
  })
}

async function getPyodide(): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = loadScript(`${PYODIDE_CDN_BASE}pyodide.js`).then(() => {
      if (!window.loadPyodide) throw new Error('Python runtime failed to initialise.')
      return window.loadPyodide({ indexURL: PYODIDE_CDN_BASE })
    })
  }
  return pyodidePromise
}

export async function runPython(code: string): Promise<{ output: string; error?: string }> {
  try {
    const pyodide = await getPyodide()
    const lines: string[] = []
    pyodide.setStdout({ batched: (text: string) => lines.push(text) })
    pyodide.setStderr({ batched: (text: string) => lines.push(text) })
    try {
      await pyodide.runPythonAsync(code)
    } catch (err) {
      return { output: lines.join('\n'), error: err instanceof Error ? err.message : String(err) }
    }
    return { output: lines.join('\n') }
  } catch (err) {
    return { output: '', error: err instanceof Error ? err.message : 'Failed to run Python code.' }
  }
}
