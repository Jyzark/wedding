/* ---------- SVG Decorative Components ---------- */

export function Flower({ size = 32, color = '#c9a87c', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="fg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="50"
          cy="14"
          rx="9"
          ry="16"
          fill={color}
          opacity="0.85"
          transform={`rotate(${a} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="7" fill="url(#fg)" stroke={color} strokeWidth="1" />
    </svg>
  )
}

export function Leaf({ size = 24, color = '#6b8f6b', dir = 'right', className = '' }) {
  const flip = dir === 'left' ? 'scale(-1, 1)' : ''
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      className={className}
      style={flip ? { transform: flip } : undefined}
      aria-hidden="true"
    >
      <path
        d="M30 55 Q10 35 30 5 Q50 35 30 55Z"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M30 55 L30 15"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        opacity="0.5"
      />
    </svg>
  )
}

export function FloralDivider({ color = '#c9a87c', leafColor = '#6b8f6b' }) {
  return (
    <div className="floral-divider" aria-hidden="true">
      <svg viewBox="0 0 340 70" width="300" height="60">
        <defs>
          <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <line x1="0" y1="35" x2="340" y2="35" stroke="url(#fade)" strokeWidth="0.5" opacity="0.4" />
        {[-50, 50, -30, 30].map((off, i) => (
          <ellipse
            key={i}
            cx={170 + off}
            cy={35 + (i % 2 === 0 ? -12 : 12)}
            rx="7"
            ry="3"
            fill={leafColor}
            opacity="0.6"
            transform={`rotate(${i % 2 === 0 ? -20 : 20} ${170 + off} ${35 + (i % 2 === 0 ? -12 : 12)})`}
          />
        ))}
        <g fill={color} opacity="0.8">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="170"
              cy="22"
              rx="4.5"
              ry="9"
              transform={`rotate(${a} 170 35)`}
            />
          ))}
        </g>
        <circle cx="170" cy="35" r="4" fill="#fff" stroke={color} strokeWidth="0.5" />
      </svg>
    </div>
  )
}

export function CornerFlourish({ color = '#c9a87c', className = '' }) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 88 Q12 50 50 50 Q88 50 88 12"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M10 90 Q10 45 50 45 Q90 45 90 10"
        stroke={color}
        strokeWidth="0.5"
        fill="none"
        opacity="0.25"
      />
      <circle cx="50" cy="50" r="3" fill={color} opacity="0.5" />
      <ellipse cx="18" cy="75" rx="4" ry="6" fill={color} opacity="0.35" transform="rotate(-30 18 75)" />
      <ellipse cx="75" cy="18" rx="4" ry="6" fill={color} opacity="0.35" transform="rotate(30 75 18)" />
    </svg>
  )
}

export function DecorativeFrame({ children }) {
  return (
    <div className="decorative-frame">
      <CornerFlourish className="corner tl" />
      <CornerFlourish className="corner tr" />
      <CornerFlourish className="corner bl" />
      <CornerFlourish className="corner br" />
      {children}
    </div>
  )
}

const PETAL_CHARS = ['❀', '✿', '❁', '🌸', '🌺']

export function FloatingPetals() {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 16 + Math.random() * 14,
    size: 10 + Math.random() * 16,
    drift: (Math.random() - 0.5) * 180,
    char: PETAL_CHARS[i % PETAL_CHARS.length],
    opacity: 0.3 + Math.random() * 0.4,
  }))
  return (
    <div className="petals" aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift': `${p.drift}px`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  )
}

export function SparkleParticles() {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 8,
    duration: 3 + Math.random() * 4,
    size: 3 + Math.random() * 4,
  }))
  return (
    <div className="sparkles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="sparkle"
          style={{
            top: p.top,
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  )
}