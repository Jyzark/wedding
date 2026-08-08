/*
   Full circular botanical wreath. Three concentric vine rings
   carry a dense arrangement of leaves and flower buds, rotated
   so every element radiates outward.
*/

/* ---- vine rings ---- */
const VINES = [
  { r: 152, sw: 0.45, op: 0.3, dash: '' },
  { r: 146, sw: 0.3,  op: 0.2, dash: '2 5' },
  { r: 140, sw: 0.25, op: 0.18, dash: '1 7' },
]

/* ---- leaf shapes ---- */
const LEAF = 'M0,0 C3.5,-5 9,-8 15,-3 C12,1 7,3 2,2 C0.5,1.5 0,0.5 0,0'
const BUDS = 'M0,0 C2,-3 5.5,-5 9,-2 C7,1 4,2 1,1 C0.3,0.7 0,0.3 0,0'
const DOT  = 'M0,-2 C1.1,-2 2,-1.1 2,0 C2,1.1 1.1,2 0,2 C-1.1,2 -2,1.1 -2,0 C-2,-1.1 -1.1,-2 0,-2'

const C = 200

/* ---- generate all foliage ---- */
const FOLIAGE = (() => {
  const items = []
  for (let i = 0; i < 18; i++) {
    const deg = (i / 18) * 360
    const rad = (deg * Math.PI) / 180
    items.push({
      type: i % 3 === 0 ? 'leaf-green' : 'leaf',
      x: C + 152 * Math.cos(rad),
      y: C + 152 * Math.sin(rad),
      rot: deg + 90,
      delay: 0.28 + i * 0.07,
      scale: 0.85 + Math.random() * 0.3,
      opacity: 0.65 + Math.random() * 0.2,
    })
  }
  for (let i = 0; i < 18; i++) {
    const deg = (i / 18) * 360 + 10
    const rad = (deg * Math.PI) / 180
    items.push({
      type: i % 3 === 1 ? 'bud-green' : 'bud',
      x: C + 140 * Math.cos(rad),
      y: C + 140 * Math.sin(rad),
      rot: deg + 90,
      delay: 0.2 + i * 0.07,
      scale: 0.55 + Math.random() * 0.2,
      opacity: 0.45 + Math.random() * 0.2,
    })
  }
  for (let i = 0; i < 12; i++) {
    const deg = (i / 12) * 360 + 5
    const rad = (deg * Math.PI) / 180
    items.push({
      type: 'blossom',
      x: C + 148 * Math.cos(rad),
      y: C + 148 * Math.sin(rad),
      rot: deg + 90,
      delay: 0.15 + i * 0.1,
      scale: 1.1 + Math.random() * 0.4,
      opacity: 0.5 + Math.random() * 0.3,
    })
  }
  return items
})()

/* ---- component ---- */

export default function Wreath() {
  return (
    <svg className="hero-wreath" viewBox="0 0 400 400" aria-hidden="true">
      {VINES.map((v, i) => (
        <circle
          key={i}
          cx={C} cy={C} r={v.r}
          fill="none"
          className="wreath-line wreath-vine"
          strokeWidth={v.sw}
          opacity={v.op}
          strokeDasharray={v.dash || undefined}
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
      {FOLIAGE.map((f, i) => {
        const shape = f.type.includes('leaf') || f.type === 'leaf-green' ? LEAF : f.type.includes('bud') ? BUDS : DOT
        const cls = f.type === 'blossom' ? 'wreath-blossom'
          : f.type === 'leaf-green' || f.type === 'bud-green' ? 'wreath-leaf-green'
          : f.type.includes('bud') ? 'wreath-bud' : 'wreath-leaf-large'
        return (
          <g
            key={i}
            /* SVG transform handles position, rotation, final scale */
            transform={`translate(${f.x.toFixed(1)} ${f.y.toFixed(1)}) rotate(${f.rot}) scale(${f.scale})`}
          >
            {/* CSS animation on inner <g> — no SVG transform conflict */}
            <g
              className={`wreath-foliage ${cls}`}
              style={{ animationDelay: `${f.delay}s`, '--fo': f.opacity }}
            >
              <path d={shape} />
            </g>
          </g>
        )
      })}
    </svg>
  )
}
