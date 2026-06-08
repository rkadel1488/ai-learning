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

const REACT_CDN = `
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
`

const BABEL_CDN = `<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>`

export type WebCmLang = 'html' | 'css' | 'javascript' | 'jsx' | 'tsx' | 'typescript'

export function buildSrcDoc(cmLang: WebCmLang, code: string): string {
  if (cmLang === 'html') {
    return `<!DOCTYPE html><html><head>${CONSOLE_BRIDGE}</head><body>${code}</body></html>`
  }
  if (cmLang === 'css') {
    return `<!DOCTYPE html><html><head>${CONSOLE_BRIDGE}<style>${code}</style></head><body>${DEMO_BOX}</body></html>`
  }
  if (cmLang === 'jsx' || cmLang === 'tsx') {
    const presets = cmLang === 'tsx' ? 'react,typescript' : 'react'
    return `<!DOCTYPE html><html><head>${CONSOLE_BRIDGE}${REACT_CDN}<style>body { font-family: system-ui, sans-serif; padding: 16px; color: #1e293b; }</style></head><body><div id="root"></div><script type="text/babel" data-presets="${presets}" data-type="module">${code}</script></body></html>`
  }
  if (cmLang === 'typescript') {
    return `<!DOCTYPE html><html><head>${CONSOLE_BRIDGE}${BABEL_CDN}</head><body><div id="app"></div><script type="text/babel" data-presets="typescript">${code}</script></body></html>`
  }
  return `<!DOCTYPE html><html><head>${CONSOLE_BRIDGE}</head><body><div id="app"></div><script>${code}</script></body></html>`
}
