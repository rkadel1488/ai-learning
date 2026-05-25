'use client'

// ─── SVG Illustrations ──────────────────────────────────────────────────────

function LogicGatesVisual() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden>
      {/* Column headers */}
      <text x="30" y="20" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">A</text>
      <text x="65" y="20" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">B</text>
      <text x="115" y="20" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">A AND B</text>
      <text x="182" y="20" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">A OR B</text>
      <text x="247" y="20" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">NOT A</text>
      <line x1="8" y1="24" x2="272" y2="24" stroke="#334155" strokeWidth="1" />
      {/* Row 1 */}
      {[0,25,50,75].map((dy, i) => {
        const rows = [
          { a:'1',b:'1', and:'1',or:'1',notA:'0' },
          { a:'1',b:'0', and:'0',or:'1',notA:'0' },
          { a:'0',b:'1', and:'0',or:'1',notA:'1' },
          { a:'0',b:'0', and:'0',or:'0',notA:'1' },
        ]
        const r = rows[i]
        const y = 42 + dy
        const pos = '#4ade80', neg = '#f87171'
        return (
          <g key={i}>
            <text x="30" y={y} textAnchor="middle" fill={r.a==='1'?pos:neg} fontSize="13">{r.a}</text>
            <text x="65" y={y} textAnchor="middle" fill={r.b==='1'?pos:neg} fontSize="13">{r.b}</text>
            <rect x="97" y={y-13} width="36" height="17" rx="3" fill={r.and==='1'?'#10b981':'#ef4444'} opacity="0.15" />
            <text x="115" y={y} textAnchor="middle" fill={r.and==='1'?pos:neg} fontSize="13">{r.and}</text>
            <rect x="164" y={y-13} width="36" height="17" rx="3" fill={r.or==='1'?'#10b981':'#ef4444'} opacity="0.15" />
            <text x="182" y={y} textAnchor="middle" fill={r.or==='1'?pos:neg} fontSize="13">{r.or}</text>
            <rect x="229" y={y-13} width="36" height="17" rx="3" fill={r.notA==='1'?'#10b981':'#ef4444'} opacity="0.15" />
            <text x="247" y={y} textAnchor="middle" fill={r.notA==='1'?pos:neg} fontSize="13">{r.notA}</text>
          </g>
        )
      })}
    </svg>
  )
}

function AlgorithmVisual() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden>
      {/* START */}
      <ellipse cx="60" cy="20" rx="40" ry="14" fill="#7c3aed" opacity="0.3" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="60" y="25" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="bold">START</text>
      <line x1="60" y1="34" x2="60" y2="50" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arr)" />
      {/* Process box */}
      <rect x="20" y="50" width="80" height="26" rx="4" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
      <text x="60" y="67" textAnchor="middle" fill="#93c5fd" fontSize="9">Read Input N</text>
      <line x1="60" y1="76" x2="60" y2="92" stroke="#475569" strokeWidth="1.5" />
      {/* Decision diamond */}
      <polygon points="60,92 95,110 60,128 25,110" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="113" textAnchor="middle" fill="#fcd34d" fontSize="8">N &gt; 0?</text>
      {/* YES branch */}
      <line x1="95" y1="110" x2="160" y2="110" stroke="#475569" strokeWidth="1.5" />
      <text x="127" y="107" textAnchor="middle" fill="#4ade80" fontSize="8">YES</text>
      <rect x="160" y="97" width="70" height="26" rx="4" fill="#1e293b" stroke="#4ade80" strokeWidth="1.5" />
      <text x="195" y="114" textAnchor="middle" fill="#86efac" fontSize="9">N = N − 1</text>
      {/* loop back */}
      <line x1="195" y1="97" x2="195" y2="60" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
      <line x1="100" y1="60" x2="195" y2="60" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
      {/* NO branch */}
      <line x1="60" y1="128" x2="60" y2="148" stroke="#475569" strokeWidth="1.5" />
      <text x="40" y="142" fill="#f87171" fontSize="8">NO</text>
      <ellipse cx="60" cy="152" rx="35" ry="12" fill="#ef4444" opacity="0.2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="60" y="156" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">STOP</text>
      {/* Arrow marker */}
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>
    </svg>
  )
}

function DataStructuresVisual() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden>
      {/* Array */}
      <text x="10" y="18" fill="#60a5fa" fontSize="10" fontWeight="bold">Array</text>
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={10 + i*38} y="22" width="34" height="28" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
          <text x={27 + i*38} y="41" textAnchor="middle" fill="#93c5fd" fontSize="13">{[5,2,8,1,9][i]}</text>
          <text x={27 + i*38} y="61" textAnchor="middle" fill="#475569" fontSize="8">[{i}]</text>
        </g>
      ))}
      {/* Stack */}
      <text x="10" y="92" fill="#34d399" fontSize="10" fontWeight="bold">Stack (LIFO)</text>
      {['top→ C','B','A ←bottom'].map((label, i) => (
        <g key={i}>
          <rect x="10" y={97 + i*20} width="90" height="18" rx="3" fill="#1e293b" stroke={i===0?'#34d399':'#334155'} strokeWidth="1.5" />
          <text x="55" y={110 + i*20} textAnchor="middle" fill={i===0?'#6ee7b7':'#94a3b8'} fontSize="9">{label}</text>
        </g>
      ))}
      {/* Tree */}
      <text x="155" y="18" fill="#c084fc" fontSize="10" fontWeight="bold">Binary Tree</text>
      <circle cx="220" cy="40" r="14" fill="#1e293b" stroke="#9333ea" strokeWidth="1.5" />
      <text x="220" y="45" textAnchor="middle" fill="#d8b4fe" fontSize="12">A</text>
      <line x1="209" y1="50" x2="186" y2="75" stroke="#475569" strokeWidth="1.5" />
      <line x1="231" y1="50" x2="254" y2="75" stroke="#475569" strokeWidth="1.5" />
      <circle cx="185" cy="87" r="14" fill="#1e293b" stroke="#9333ea" strokeWidth="1.5" />
      <text x="185" y="92" textAnchor="middle" fill="#d8b4fe" fontSize="12">B</text>
      <circle cx="255" cy="87" r="14" fill="#1e293b" stroke="#9333ea" strokeWidth="1.5" />
      <text x="255" y="92" textAnchor="middle" fill="#d8b4fe" fontSize="12">C</text>
      <line x1="176" y1="97" x2="163" y2="118" stroke="#475569" strokeWidth="1.5" />
      <line x1="194" y1="97" x2="204" y2="118" stroke="#475569" strokeWidth="1.5" />
      <circle cx="162" cy="130" r="11" fill="#1e293b" stroke="#6d28d9" strokeWidth="1" />
      <text x="162" y="134" textAnchor="middle" fill="#a78bfa" fontSize="10">D</text>
      <circle cx="205" cy="130" r="11" fill="#1e293b" stroke="#6d28d9" strokeWidth="1" />
      <text x="205" y="134" textAnchor="middle" fill="#a78bfa" fontSize="10">E</text>
    </svg>
  )
}

function MLBasicsVisual() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden>
      {/* Pipeline */}
      {[
        { x:10, label:'Training\nData', icon:'🗂️', color:'#3b82f6' },
        { x:95, label:'Learning\nAlgorithm', icon:'⚙️', color:'#8b5cf6' },
        { x:180, label:'Trained\nModel', icon:'🧠', color:'#10b981' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="30" width="75" height="70" rx="10" fill="#1e293b" stroke={s.color} strokeWidth="2" />
          <text x={s.x+37} y="60" textAnchor="middle" fontSize="22">{s.icon}</text>
          {s.label.split('\n').map((line, j) => (
            <text key={j} x={s.x+37} y={85+j*13} textAnchor="middle" fill="#94a3b8" fontSize="9">{line}</text>
          ))}
          {i < 2 && (
            <>
              <line x1={s.x+75} y1="65" x2={s.x+93} y2="65" stroke="#475569" strokeWidth="2" markerEnd="url(#a2)" />
            </>
          )}
        </g>
      ))}
      {/* Prediction */}
      <line x1="255" y1="65" x2="268" y2="65" stroke="#475569" strokeWidth="2" markerEnd="url(#a2)" />
      <text x="275" y="46" textAnchor="middle" fill="#fcd34d" fontSize="18">✓</text>
      <text x="275" y="58" textAnchor="middle" fill="#94a3b8" fontSize="8">Predict</text>
      {/* Labels */}
      <text x="140" y="122" textAnchor="middle" fill="#64748b" fontSize="9">feed examples → learn patterns → make predictions</text>
      {/* Accuracy meter */}
      <rect x="60" y="138" width="160" height="10" rx="5" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="60" y="138" width="112" height="10" rx="5" fill="#10b981" opacity="0.6" />
      <text x="140" y="158" textAnchor="middle" fill="#6ee7b7" fontSize="9">Model accuracy improves with more data</text>
      <defs>
        <marker id="a2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>
    </svg>
  )
}

function NeuralNetVisual() {
  const layers = [
    { x: 40, nodes: [35, 65, 95, 125], color: '#3b82f6', label: 'Input' },
    { x: 140, nodes: [45, 75, 105], color: '#8b5cf6', label: 'Hidden' },
    { x: 240, nodes: [60, 100], color: '#10b981', label: 'Output' },
  ]
  const connections: React.ReactNode[] = []
  layers.slice(0,-1).forEach((fromLayer, li) => {
    fromLayer.nodes.forEach(fy => {
      layers[li+1].nodes.forEach(ty => {
        connections.push(
          <line key={`${li}-${fy}-${ty}`} x1={fromLayer.x+10} y1={fy} x2={layers[li+1].x-10} y2={ty}
            stroke="#1e293b" strokeWidth="1.5" />
        )
      })
    })
  })
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden>
      {connections}
      {layers.map(layer => (
        <g key={layer.x}>
          {layer.nodes.map(ny => (
            <circle key={ny} cx={layer.x} cy={ny} r="10" fill="#0f172a" stroke={layer.color} strokeWidth="2" />
          ))}
          <text x={layer.x} y={Math.max(...layer.nodes)+26} textAnchor="middle" fill="#64748b" fontSize="9">{layer.label}</text>
        </g>
      ))}
      {/* Weights label */}
      <text x="140" y="148" textAnchor="middle" fill="#94a3b8" fontSize="8">Each connection has a weight adjusted during training</text>
    </svg>
  )
}

function NLPVisual() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden>
      {/* Input sentence */}
      <rect x="10" y="10" width="260" height="28" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="140" y="29" textAnchor="middle" fill="#93c5fd" fontSize="11">&quot;The quick brown fox jumps&quot;</text>
      <line x1="140" y1="38" x2="140" y2="52" stroke="#475569" strokeWidth="1.5" markerEnd="url(#a3)" />
      <text x="140" y="49" textAnchor="middle" fill="#64748b" fontSize="8">tokenize</text>
      {/* Tokens */}
      {['The','quick','brown','fox','jumps'].map((word, i) => (
        <g key={word}>
          <rect x={5+i*54} y="54" width="50" height="22" rx="4" fill="#312e81" stroke="#6366f1" strokeWidth="1" />
          <text x={5+i*54+25} y="69" textAnchor="middle" fill="#a5b4fc" fontSize="9">{word}</text>
        </g>
      ))}
      <line x1="140" y1="76" x2="140" y2="92" stroke="#475569" strokeWidth="1.5" markerEnd="url(#a3)" />
      <text x="140" y="89" textAnchor="middle" fill="#64748b" fontSize="8">analyze</text>
      {/* Analysis result */}
      {[
        { x:15, label:'📝 Grammar', val:'Noun + Verb' },
        { x:100, label:'😊 Sentiment', val:'Neutral' },
        { x:185, label:'🔍 Entities', val:'"fox"' },
      ].map(item => (
        <g key={item.x}>
          <rect x={item.x} y="94" width="80" height="42" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
          <text x={item.x+40} y="110" textAnchor="middle" fill="#94a3b8" fontSize="8">{item.label}</text>
          <text x={item.x+40} y="127" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">{item.val}</text>
        </g>
      ))}
      <defs>
        <marker id="a3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>
    </svg>
  )
}

function ComputerVisionVisual() {
  const pixels = [
    ['#0f172a','#0f172a','#1e293b','#334155','#1e293b'],
    ['#0f172a','#1e293b','#475569','#94a3b8','#475569'],
    ['#1e293b','#475569','#e2e8f0','#94a3b8','#334155'],
    ['#0f172a','#334155','#94a3b8','#475569','#1e293b'],
    ['#0f172a','#1e293b','#334155','#1e293b','#0f172a'],
  ]
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden>
      <text x="10" y="16" fill="#94a3b8" fontSize="10">1. Raw pixels</text>
      {pixels.map((row, ri) =>
        row.map((color, ci) => (
          <rect key={`${ri}-${ci}`} x={10+ci*22} y={20+ri*22} width="20" height="20" fill={color} stroke="#0f172a" strokeWidth="0.5" />
        ))
      )}
      {/* Arrow */}
      <line x1="130" y1="72" x2="148" y2="72" stroke="#475569" strokeWidth="2" markerEnd="url(#a4)" />
      <text x="139" y="67" textAnchor="middle" fill="#64748b" fontSize="8">CNN</text>
      {/* Feature maps */}
      <text x="155" y="16" fill="#94a3b8" fontSize="10">2. Features detected</text>
      <rect x="155" y="20" width="110" height="110" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <rect x="163" y="28" width="40" height="30" rx="4" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <text x="183" y="48" textAnchor="middle" fill="#fcd34d" fontSize="8">edge</text>
      <rect x="210" y="28" width="48" height="30" rx="4" fill="none" stroke="#3b82f6" strokeWidth="2" />
      <text x="234" y="48" textAnchor="middle" fill="#93c5fd" fontSize="8">shape</text>
      <rect x="163" y="65" width="95" height="55" rx="4" fill="none" stroke="#10b981" strokeWidth="2" />
      <text x="210" y="90" textAnchor="middle" fill="#6ee7b7" fontSize="9">🦊 fox (94%)</text>
      <text x="210" y="106" textAnchor="middle" fill="#6ee7b7" fontSize="8">object detected!</text>
      <defs>
        <marker id="a4" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>
    </svg>
  )
}

function DataEthicsVisual() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden>
      {/* Scale beam */}
      <line x1="140" y1="30" x2="140" y2="55" stroke="#94a3b8" strokeWidth="2" />
      <line x1="60" y1="55" x2="220" y2="55" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="140" cy="28" r="5" fill="#94a3b8" />
      {/* Left pan - Data Use */}
      <line x1="70" y1="55" x2="70" y2="80" stroke="#94a3b8" strokeWidth="1.5" />
      <ellipse cx="70" cy="82" rx="40" ry="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="70" y="100" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">Data Use</text>
      <text x="70" y="114" textAnchor="middle" fill="#94a3b8" fontSize="9">📊 Collect</text>
      <text x="70" y="127" textAnchor="middle" fill="#94a3b8" fontSize="9">📈 Analyse</text>
      <text x="70" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">🤖 Automate</text>
      {/* Right pan - Privacy */}
      <line x1="210" y1="55" x2="210" y2="75" stroke="#94a3b8" strokeWidth="1.5" />
      <ellipse cx="210" cy="77" rx="40" ry="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
      <text x="210" y="96" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Privacy</text>
      <text x="210" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">🔒 Protect</text>
      <text x="210" y="123" textAnchor="middle" fill="#94a3b8" fontSize="9">✋ Consent</text>
      <text x="210" y="136" textAnchor="middle" fill="#94a3b8" fontSize="9">⚖️ Fairness</text>
      {/* Balance label */}
      <text x="140" y="155" textAnchor="middle" fill="#64748b" fontSize="9">AI must balance utility with ethical responsibility</text>
    </svg>
  )
}

function RoboticsVisual() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden>
      {/* Three phases */}
      {[
        { x:20, emoji:'👁️', label:'SENSE', sub:'cameras\nlidars\nsensors', color:'#3b82f6' },
        { x:110, emoji:'🧠', label:'PLAN', sub:'decide\npath\naction', color:'#8b5cf6' },
        { x:200, emoji:'⚙️', label:'ACT', sub:'motors\nservos\nwheels', color:'#10b981' },
      ].map(s => (
        <g key={s.x}>
          <rect x={s.x} y="20" width="70" height="90" rx="10" fill="#1e293b" stroke={s.color} strokeWidth="2" />
          <text x={s.x+35} y="50" textAnchor="middle" fontSize="22">{s.emoji}</text>
          <text x={s.x+35} y="68" textAnchor="middle" fill={s.color} fontSize="10" fontWeight="bold">{s.label}</text>
          {s.sub.split('\n').map((line, i) => (
            <text key={i} x={s.x+35} y={81+i*11} textAnchor="middle" fill="#64748b" fontSize="8">{line}</text>
          ))}
        </g>
      ))}
      {/* Arrows between */}
      <line x1="90" y1="65" x2="108" y2="65" stroke="#475569" strokeWidth="2" markerEnd="url(#a5)" />
      <line x1="180" y1="65" x2="198" y2="65" stroke="#475569" strokeWidth="2" markerEnd="url(#a5)" />
      {/* Feedback loop */}
      <path d="M 270 65 Q 275 130 235 140 Q 140 150 45 140 Q 10 130 20 65" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#a5)" />
      <text x="140" y="155" textAnchor="middle" fill="#64748b" fontSize="8">continuous feedback loop</text>
      <defs>
        <marker id="a5" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>
    </svg>
  )
}

function GenAIVisual() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden>
      {/* Prompt */}
      <rect x="5" y="25" width="75" height="110" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
      <text x="42" y="50" textAnchor="middle" fontSize="20">💬</text>
      <text x="42" y="68" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="bold">PROMPT</text>
      <text x="42" y="83" textAnchor="middle" fill="#64748b" fontSize="8">&quot;a sunset</text>
      <text x="42" y="95" textAnchor="middle" fill="#64748b" fontSize="8">over</text>
      <text x="42" y="107" textAnchor="middle" fill="#64748b" fontSize="8">mountains&quot;</text>
      {/* Arrow */}
      <line x1="80" y1="80" x2="98" y2="80" stroke="#475569" strokeWidth="2" markerEnd="url(#a6)" />
      {/* Foundation Model */}
      <rect x="100" y="20" width="80" height="120" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
      <text x="140" y="55" textAnchor="middle" fontSize="24">🧠</text>
      <text x="140" y="73" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="bold">FOUNDATION</text>
      <text x="140" y="84" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="bold">MODEL</text>
      <text x="140" y="100" textAnchor="middle" fill="#64748b" fontSize="8">billions of</text>
      <text x="140" y="112" textAnchor="middle" fill="#64748b" fontSize="8">parameters</text>
      <text x="140" y="124" textAnchor="middle" fill="#64748b" fontSize="8">trained on data</text>
      {/* Arrow */}
      <line x1="180" y1="80" x2="198" y2="80" stroke="#475569" strokeWidth="2" markerEnd="url(#a6)" />
      {/* Output */}
      <rect x="200" y="25" width="75" height="110" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="237" y="52" textAnchor="middle" fontSize="20">🎨</text>
      <text x="237" y="70" textAnchor="middle" fill="#fcd34d" fontSize="9" fontWeight="bold">OUTPUT</text>
      <text x="237" y="85" textAnchor="middle" fill="#64748b" fontSize="8">image</text>
      <text x="237" y="97" textAnchor="middle" fill="#64748b" fontSize="8">text</text>
      <text x="237" y="109" textAnchor="middle" fill="#64748b" fontSize="8">music</text>
      <text x="237" y="121" textAnchor="middle" fill="#64748b" fontSize="8">code</text>
      <defs>
        <marker id="a6" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>
    </svg>
  )
}

// ─── Content Map ─────────────────────────────────────────────────────────────

export type Concept = { term: string; desc: string; example: string }

export type TopicLesson = {
  tagline: string
  Visual: React.FC
  concepts: Concept[]
}

export const TOPIC_LESSONS: Record<string, TopicLesson> = {
  'Logic & Boolean Algebra': {
    tagline: 'The language computers use to make decisions',
    Visual: LogicGatesVisual,
    concepts: [
      { term: 'AND', desc: 'Both inputs must be true for the output to be true', example: '1 AND 1 = 1, but 1 AND 0 = 0' },
      { term: 'OR', desc: 'At least one input must be true for a true output', example: '0 OR 1 = 1, and 1 OR 1 = 1' },
      { term: 'NOT', desc: 'Flips the value — inverts true to false and vice versa', example: 'NOT 1 = 0, NOT 0 = 1' },
    ],
  },
  'Algorithmic Thinking': {
    tagline: 'Breaking problems into step-by-step instructions',
    Visual: AlgorithmVisual,
    concepts: [
      { term: 'Sequence', desc: 'Steps executed in a fixed order, one after another', example: 'Make tea: boil water → add tea bag → pour → drink' },
      { term: 'Selection', desc: 'Choose different paths based on a condition (if/else)', example: 'IF raining THEN take umbrella ELSE wear sunglasses' },
      { term: 'Iteration', desc: 'Repeat steps until a condition is met (loops)', example: 'Keep stirring WHILE batter is lumpy' },
    ],
  },
  'Data Structures': {
    tagline: 'How computers organise and store information',
    Visual: DataStructuresVisual,
    concepts: [
      { term: 'Array', desc: 'Ordered list of items accessed by position (index)', example: 'scores[0] = 95, scores[1] = 87, scores[2] = 100' },
      { term: 'Stack', desc: 'Last-in, first-out (LIFO) — like a pile of plates', example: 'Push A, push B, push C → pop gives C first' },
      { term: 'Tree', desc: 'Hierarchical structure with parent and child nodes', example: 'File system: root → folders → sub-folders → files' },
    ],
  },
  'Machine Learning Basics': {
    tagline: 'Teaching computers to learn from examples',
    Visual: MLBasicsVisual,
    concepts: [
      { term: 'Training', desc: 'Feeding labelled examples so the model learns patterns', example: '1000 photos labelled "cat" or "dog" to train a classifier' },
      { term: 'Model', desc: 'The pattern the algorithm learns from data', example: 'A function that maps pixel values → "cat" or "dog"' },
      { term: 'Overfitting', desc: 'Model memorises training data but fails on new data', example: 'Like a student who memorises answers but can\'t apply knowledge' },
    ],
  },
  'Neural Networks': {
    tagline: 'AI inspired by the structure of the human brain',
    Visual: NeuralNetVisual,
    concepts: [
      { term: 'Neuron', desc: 'A node that receives inputs, applies a weight, and passes output', example: 'Like a brain cell — fires when activation exceeds a threshold' },
      { term: 'Layers', desc: 'Input → Hidden → Output; each layer learns different features', example: 'Layer 1: edges; Layer 2: shapes; Layer 3: objects' },
      { term: 'Backpropagation', desc: 'Adjusting weights by tracing errors back through the network', example: 'Wrong prediction → nudge weights → try again' },
    ],
  },
  'Natural Language Processing': {
    tagline: 'Helping computers understand and generate human language',
    Visual: NLPVisual,
    concepts: [
      { term: 'Tokenisation', desc: 'Splitting text into individual words or sub-word pieces', example: '"unhappy" → ["un", "happy"] or ["unhappy"]' },
      { term: 'Embeddings', desc: 'Representing words as numbers that capture their meaning', example: '"king" − "man" + "woman" ≈ "queen" in vector space' },
      { term: 'Context', desc: 'Understanding a word\'s meaning from surrounding words', example: '"bank" means different things in "river bank" vs "bank account"' },
    ],
  },
  'Computer Vision': {
    tagline: 'Teaching machines to interpret and understand images',
    Visual: ComputerVisionVisual,
    concepts: [
      { term: 'Pixels', desc: 'Tiny coloured squares that make up a digital image', example: 'A 1080p image has 1920 × 1080 = 2,073,600 pixels' },
      { term: 'Features', desc: 'Edges, textures, shapes the CNN learns to detect', example: 'Early layers detect edges; later layers detect faces' },
      { term: 'Classification', desc: 'Assigning a label to an entire image', example: '"Is this photo a cat, dog, or car?" → "cat (94%)"' },
    ],
  },
  'Data Ethics & Privacy': {
    tagline: 'Using data responsibly and protecting people\'s rights',
    Visual: DataEthicsVisual,
    concepts: [
      { term: 'Consent', desc: 'Getting permission before collecting or using personal data', example: 'Cookie banners ask if you agree to be tracked' },
      { term: 'Bias', desc: 'Unfair patterns that cause a model to discriminate', example: 'Facial recognition trained only on one group performs worse on others' },
      { term: 'Transparency', desc: 'Being clear about how AI decisions are made', example: '"You were rejected for a loan because your credit score is low"' },
    ],
  },
  'Robotics & Automation': {
    tagline: 'Building machines that sense, think, and act in the world',
    Visual: RoboticsVisual,
    concepts: [
      { term: 'Sensors', desc: 'Devices that let robots perceive their environment', example: 'Camera (vision), LIDAR (distance), microphone (sound)' },
      { term: 'Actuators', desc: 'Motors and servos that physically move the robot', example: 'Wheels, robotic arm joints, gripper claws' },
      { term: 'Control Loop', desc: 'Continuous cycle of Sense → Plan → Act → repeat', example: 'Self-driving car: scan road → compute path → steer → scan again' },
    ],
  },
  'Generative AI': {
    tagline: 'AI that creates new content — text, images, music and code',
    Visual: GenAIVisual,
    concepts: [
      { term: 'Prompt', desc: 'The text instruction you give to a generative AI model', example: '"Write a poem about the ocean in the style of Shakespeare"' },
      { term: 'Foundation Model', desc: 'A large pre-trained model that can be adapted to many tasks', example: 'GPT-4, Gemini, Claude — trained on billions of examples' },
      { term: 'Hallucination', desc: 'When AI confidently states something incorrect or made up', example: 'AI inventing a fake book citation that sounds very plausible' },
    ],
  },
}
