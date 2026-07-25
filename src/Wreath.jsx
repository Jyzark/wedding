/* Botanical line-art wreath for the hero.

   Built from a single branch that is mirrored about the centre line, so
   both halves stay perfectly symmetric by construction. The stem carries
   pathLength="1", which lets the draw-on animation run off a normalised
   dash offset instead of a measured path length. */

const BRANCH = 'M210 50C285 62 352 125 352 200C352 275 285 338 210 350'
const LEAF = 'M0 0Q9 -6.5 21 0Q9 6.5 0 0'

const CENTRE = 200
// The branch curve wanders between r=146 and r=152. Seating the leaves just
// inside its minimum keeps every base overlapping the line — sitting on the
// mean instead leaves visible gaps where the curve dips inward.
const RADIUS = 146
const SWEEP = -14 // tilts each leaf back along the branch

const LEAVES = Array.from({ length: 9 }, (_, i) => {
  const angle = -68 + i * 17
  const radians = (angle * Math.PI) / 180
  return {
    angle,
    x: CENTRE + RADIUS * Math.cos(radians),
    y: CENTRE + RADIUS * Math.sin(radians),
    // Leaves open just behind the tip of the line as it sweeps past them.
    delay: 0.45 + i * 0.13,
  }
})

function Branch() {
  return (
    <>
      <path className="wreath-line wreath-stem" d={BRANCH} pathLength="1" />
      {LEAVES.map((leaf) => (
        <path
          key={leaf.angle}
          className="wreath-line wreath-leaf"
          d={LEAF}
          transform={`translate(${leaf.x.toFixed(1)} ${leaf.y.toFixed(1)}) rotate(${
            leaf.angle + SWEEP
          })`}
          style={{ animationDelay: `${leaf.delay}s` }}
        />
      ))}
    </>
  )
}

export default function Wreath() {
  return (
    <svg className="hero-wreath" viewBox="0 0 400 400" aria-hidden="true">
      <Branch />
      <g transform="translate(400 0) scale(-1 1)">
        <Branch />
      </g>
    </svg>
  )
}
