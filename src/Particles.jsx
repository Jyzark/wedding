import { useMemo } from 'react'

const PETAL_COUNT = 22
const SPARKLE_COUNT = 18

export default function Particles() {
  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }, (_, i) => ({
        id: `p-${i}`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 20}s`,
        duration: `${14 + Math.random() * 18}s`,
        size: `${7 + Math.random() * 11}px`,
        opacity: 0.05 + Math.random() * 0.09,
        drift: `${-60 + Math.random() * 120}px`,
        /* occasional rose-tinted petals for depth */
        rose: i % 7 === 0,
      })),
    [],
  )

  const sparkles = useMemo(
    () =>
      Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
        id: `s-${i}`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 16}s`,
        duration: `${6 + Math.random() * 11}s`,
        size: `${1.2 + Math.random() * 3.5}px`,
        shimmer: 0.3 + Math.random() * 0.45,
      })),
    [],
  )

  return (
    <div className="particles" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`petal${p.rose ? ' petal--rose' : ''}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: `calc(${p.size} * 1.55)`,
            opacity: p.opacity,
            '--drift': p.drift,
          }}
        />
      ))}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle"
          style={{
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
            width: s.size,
            height: s.size,
            '--so': s.shimmer,
          }}
        />
      ))}
    </div>
  )
}
