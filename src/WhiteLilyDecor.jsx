const LAYOUTS = {
  quote: ['single', 'cascade'],
  couple: ['double', 'double'],
  event: ['cascade', 'single'],
  countdown: ['single', 'double', 'single'],
  gifts: ['cascade', 'double'],
  footer: ['double', 'cascade', 'single'],
}

function LilyPetal({ angle, layer, mirror, petalId }) {
  const isFront = layer === 'front'
  const path = isFront
    ? 'M0 4C-23-7-36-29-27-49C-21-63-8-70-5-80C-2-88-8-94-14-98C1-97 16-85 18-72C19-62 12-56 17-49C30-32 32-16 19-4C11 3 4 6 0 4Z'
    : 'M0 4C-19-3-34-20-31-39C-29-55-16-65-10-76C-6-83-10-90-17-95C-3-94 12-85 16-73C19-64 13-58 18-51C30-37 35-22 27-9C21 1 9 5 0 4Z'

  return (
    <g transform={`rotate(${angle}) scale(${mirror ? -1 : 1} 1)`}>
      <path className={`lily-petal lily-petal--${layer}`} d={path} fill={`url(#${petalId}-${layer})`} />
      <path className="lily-vein" d="M0-3C-4-27 4-49-2-72C-4-82-9-89-14-94" />
      <path className="lily-curl" d="M-15-94C-5-90 8-83 15-73C7-77-2-76-9-80" />
      <g className="lily-freckles">
        <circle cx="-3" cy="-15" r="1.1" />
        <circle cx="4" cy="-21" r="0.9" />
        <circle cx="-5" cy="-27" r="0.75" />
      </g>
    </g>
  )
}

function LilyBloom({ x, y, scale = 1, rotate = 0, delay = 0, petalId }) {
  const backPetals = [0, 120, 240]
  const frontPetals = [60, 180, 300]

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <g className="lily-bloom" style={{ '--bloom-delay': `${delay}s` }}>
        {backPetals.map((angle, index) => (
          <LilyPetal
            key={`back-${angle}`}
            angle={angle}
            layer="back"
            mirror={index === 1}
            petalId={petalId}
          />
        ))}
        {frontPetals.map((angle, index) => (
          <LilyPetal
            key={`front-${angle}`}
            angle={angle}
            layer="front"
            mirror={index === 1}
            petalId={petalId}
          />
        ))}
        <circle className="lily-throat" r="8" fill={`url(#${petalId}-throat)`} />
        <g className="lily-stamens">
          <path d="M0 0-3-34M0 0l17-28M0 0l-17-28M0 0l29-13M0 0l-29-13" />
          <ellipse cx="-3" cy="-37" rx="2.7" ry="5" transform="rotate(-8 -3 -37)" />
          <ellipse cx="19" cy="-31" rx="2.7" ry="5" transform="rotate(34 19 -31)" />
          <ellipse cx="-19" cy="-31" rx="2.7" ry="5" transform="rotate(-34 -19 -31)" />
          <ellipse cx="32" cy="-14" rx="2.7" ry="5" transform="rotate(68 32 -14)" />
          <ellipse cx="-32" cy="-14" rx="2.7" ry="5" transform="rotate(-68 -32 -14)" />
        </g>
      </g>
    </g>
  )
}

function LilySprig({ kind, index, variant }) {
  const isDouble = kind === 'double' || kind === 'cascade'
  const isCascade = kind === 'cascade'
  const petalId = `lily-${variant}-${index}`

  return (
    <svg className="white-lily-spray" viewBox="0 0 260 360" fill="none" aria-hidden="true"
      style={{ '--spray-delay': `${0.12 + index * 0.08}s` }}>
      <defs>
        <radialGradient id={`${petalId}-front`} cx="50%" cy="100%" r="108%" fx="50%" fy="100%">
          <stop offset="0" stopColor="#e3cfc3" />
          <stop offset="0.16" stopColor="#fff8f2" />
          <stop offset="0.55" stopColor="#fffefa" />
          <stop offset="0.82" stopColor="#f8f4ee" />
          <stop offset="1" stopColor="#d9d2c9" />
        </radialGradient>
        <radialGradient id={`${petalId}-back`} cx="48%" cy="100%" r="108%" fx="48%" fy="100%">
          <stop offset="0" stopColor="#d8c2b7" />
          <stop offset="0.2" stopColor="#f3e9e3" />
          <stop offset="0.62" stopColor="#fcfaf5" />
          <stop offset="1" stopColor="#cec8c0" />
        </radialGradient>
        <radialGradient id={`${petalId}-throat`}>
          <stop offset="0" stopColor="#d6a58d" />
          <stop offset="0.5" stopColor="#ead5ca" />
          <stop offset="1" stopColor="#f8eee8" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <path className="lily-stem" d="M25 365C48 315 52 264 82 220c26-39 64-62 76-112" />
      <path className="lily-stem lily-stem--branch" d="M74 232c37-8 66-30 86-64" />
      {isDouble && <path className="lily-stem lily-stem--branch" d="M132 145c30 2 51-8 70-34" />}
      {isCascade && <path className="lily-stem lily-stem--branch" d="M53 284c38 2 65-10 87-35" />}

      <g className="lily-leaves">
        <path d="M44 319C27 291 28 268 37 249c15 17 20 39 7 70Z" />
        <path d="M61 276c10-31 26-48 45-54-1 26-13 46-45 54Z" />
        <path d="M89 216c-15-27-13-49-3-66 13 19 16 39 3 66Z" />
        <path d="M111 184c8-28 23-45 42-51-1 24-13 43-42 51Z" />
        <path d="M137 139c-11-24-8-43 2-58 11 18 12 36-2 58Z" />
        {isCascade && <path d="M65 273c22-18 43-24 61-18-14 18-34 25-61 18Z" />}
      </g>

      <LilyBloom x={158} y={108} scale={0.82} rotate={18} delay={0.35 + index * 0.08} petalId={petalId} />
      <LilyBloom x={160} y={168} scale={0.48} rotate={-18} delay={0.43 + index * 0.08} petalId={petalId} />
      {isDouble && <LilyBloom x={202} y={111} scale={0.62} rotate={58} delay={0.52 + index * 0.08} petalId={petalId} />}
      {isCascade && <LilyBloom x={139} y={248} scale={0.54} rotate={-35} delay={0.63 + index * 0.08} petalId={petalId} />}
    </svg>
  )
}

export default function WhiteLilyDecor({ variant, active }) {
  return (
    <div className={`white-lilies white-lilies--${variant}${active ? ' is-active' : ''}`} aria-hidden="true">
      {LAYOUTS[variant].map((kind, index) => (
        <div className="white-lily-placement" key={`${kind}-${index}`}>
          <LilySprig kind={kind} index={index} variant={variant} />
        </div>
      ))}
    </div>
  )
}
