const CONSOLE_BRIDGE = `
<script>
  (function () {
    var send = function (level, args) {
      try {
        var parts = args.map(function (a) {
          if (typeof a === 'object') {
            try { return JSON.stringify(a) } catch (e) { return String(a) }
          }
          return String(a)
        })
        window.parent.postMessage({ source: 'code-playground', level: level, text: parts.join(' ') }, '*')
      } catch (e) {}
    }
    ;['log', 'info', 'warn', 'error'].forEach(function (level) {
      var original = console[level]
      console[level] = function () {
        send(level, Array.prototype.slice.call(arguments))
        original.apply(console, arguments)
      }
    })
    window.addEventListener('error', function (e) {
      send('error', [e.message])
    })
  })()
</script>
`

const DEMO_BOX = `
<div style="font-family: system-ui, sans-serif; padding: 16px;">
  <h1 id="title">Demo heading</h1>
  <p>This is a paragraph of sample text used to preview your styles.</p>
  <button id="btn">Click me</button>
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
</div>
`

export function buildSrcDoc(cmLang: 'html' | 'css' | 'javascript', code: string): string {
  if (cmLang === 'html') {
    return `<!DOCTYPE html><html><head>${CONSOLE_BRIDGE}</head><body>${code}</body></html>`
  }
  if (cmLang === 'css') {
    return `<!DOCTYPE html><html><head>${CONSOLE_BRIDGE}<style>${code}</style></head><body>${DEMO_BOX}</body></html>`
  }
  return `<!DOCTYPE html><html><head>${CONSOLE_BRIDGE}</head><body><div id="app"></div><script>${code}</script></body></html>`
}
