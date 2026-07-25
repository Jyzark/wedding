import { useCallback, useEffect, useRef, useState } from 'react'
import Wreath from './Wreath.jsx'
import './App.css'

const WEDDING_DATE = new Date('2026-10-17T11:00:00+07:00')
const MAPS_URL = 'https://share.google/N1498OtR3jMvBXDPH'

/* Prewedding photos, sliced from the studio contact sheet. Each file is
   small enough (17–53 KB) to serve the grid tile and the lightbox from the
   same source, so there is no separate thumbnail to keep in sync. */
const GALLERY = [
  {
    src: '/gallery/prewedding-1.jpg',
    alt: 'Azzohabi dan Putri berfoto bersama membawa buket bunga putih',
  },
  {
    src: '/gallery/prewedding-2.jpg',
    alt: 'Azzohabi menatap Putri sambil tersenyum',
  },
  {
    src: '/gallery/prewedding-3.jpg',
    alt: 'Azzohabi dan Putri tertawa bersama di belakang rangkaian bunga',
  },
  {
    src: '/gallery/prewedding-4.jpg',
    alt: 'Azzohabi dan Putri berdiri berdampingan',
  },
  {
    src: '/gallery/prewedding-5.jpg',
    alt: 'Azzohabi dan Putri bergandengan tangan',
  },
  {
    src: '/gallery/prewedding-6.jpg',
    alt: 'Azzohabi merangkul bahu Putri',
  },
]

const ACCOUNTS = [
  { bank: 'SeaBank', number: '901974084345', holder: 'Putri Ewing Vai' },
  { bank: 'BCA', number: '7651120491', holder: 'Muhammad Azzohabi' },
]

/* ---------- helpers ---------- */

function getRemaining(target) {
  const diff = target - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to the legacy path below */
  }
  try {
    const field = document.createElement('textarea')
    field.value = text
    field.setAttribute('readonly', '')
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.appendChild(field)
    field.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(field)
    return ok
  } catch {
    return false
  }
}

/* Reveals sections as they scroll in. Falls back to showing everything
   when IntersectionObserver is missing or motion is reduced, so content
   is never left invisible. */
function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/* ---------- pieces ---------- */

function Countdown() {
  const [remaining, setRemaining] = useState(() => getRemaining(WEDDING_DATE))

  useEffect(() => {
    if (!remaining) return undefined
    const id = setInterval(() => {
      const next = getRemaining(WEDDING_DATE)
      setRemaining(next)
      if (!next) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!remaining) return null

  const cells = [
    { label: 'Hari', value: remaining.days },
    { label: 'Jam', value: remaining.hours },
    { label: 'Menit', value: remaining.minutes },
    { label: 'Detik', value: remaining.seconds },
  ]

  return (
    <div className="countdown">
      {cells.map(({ label, value }) => (
        <div className="cd-cell" key={label}>
          <span className="cd-num">{String(value).padStart(2, '0')}</span>
          <span className="cd-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return undefined
    const id = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(id)
  }, [copied])

  return (
    <button
      type="button"
      className={copied ? 'copy is-copied' : 'copy'}
      onClick={async () => {
        if (await copyText(value)) setCopied(true)
      }}
    >
      {copied ? 'Tersalin' : 'Salin'}
      <span className="visually-hidden"> nomor rekening {label}</span>
    </button>
  )
}

function Lightbox({ index, onClose, onStep }) {
  const closeRef = useRef(null)
  const photo = GALLERY[index]

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowLeft') onStep(-1)
      else if (event.key === 'ArrowRight') onStep(1)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, onStep])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Galeri foto"
      onClick={onClose}
    >
      <img src={photo.src} alt={photo.alt} onClick={(e) => e.stopPropagation()} />

      <button
        type="button"
        ref={closeRef}
        className="lb-btn lb-close"
        onClick={onClose}
        aria-label="Tutup galeri"
      >
        &times;
      </button>

      <button
        type="button"
        className="lb-btn lb-prev"
        onClick={(e) => {
          e.stopPropagation()
          onStep(-1)
        }}
        aria-label="Foto sebelumnya"
      >
        &#8249;
      </button>

      <button
        type="button"
        className="lb-btn lb-next"
        onClick={(e) => {
          e.stopPropagation()
          onStep(1)
        }}
        aria-label="Foto berikutnya"
      >
        &#8250;
      </button>

      <p className="lb-count">
        {index + 1} / {GALLERY.length}
      </p>
    </div>
  )
}

function MusicToggle() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    // Browsers block unprompted audio; reflect whatever actually happened
    // rather than assuming it started.
    audioRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="none" />
      <button
        type="button"
        className="music"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Hentikan musik' : 'Putar musik'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          {playing ? (
            <>
              <rect x="7" y="5" width="3.2" height="14" rx="1" fill="currentColor" stroke="none" />
              <rect x="13.8" y="5" width="3.2" height="14" rx="1" fill="currentColor" stroke="none" />
            </>
          ) : (
            <path d="M8 5.5v13l10-6.5-10-6.5Z" fill="currentColor" stroke="none" />
          )}
        </svg>
      </button>
    </>
  )
}

/* ---------- page ---------- */

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const triggerRef = useRef(null)

  useScrollReveal()

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    triggerRef.current?.focus()
  }, [])

  const stepLightbox = useCallback((delta) => {
    setLightboxIndex((current) =>
      current === null ? current : (current + delta + GALLERY.length) % GALLERY.length
    )
  }, [])

  return (
    <>
      <a className="skip" href="#isi">
        Lompat ke isi undangan
      </a>

      <MusicToggle />

      {/* ---------- hero ---------- */}
      <header className="hero">
        <div className="hero-inner">
          <span className="eyebrow">Undangan Pernikahan</span>

          <div className="hero-crest">
            <Wreath />
            <h1 className="hero-names">
              Azzohabi
              <span className="hero-amp">&amp;</span>
              Putri
            </h1>
          </div>

          <p className="hero-meta">Sabtu, 17 Oktober 2026</p>
          <p className="hero-place">Depok, Jawa Barat</p>

          <a className="btn" href="#isi">
            Buka Undangan
          </a>
        </div>
        <span className="hero-cue" aria-hidden="true" />
      </header>

      <main id="isi" tabIndex={-1}>
        {/* ---------- quote ---------- */}
        <section className="section reveal">
          <div className="wrap narrow">
            <blockquote className="quote">
              &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
              untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan
              merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan
              sayang.&rdquo;
            </blockquote>
            <p className="quote-source">QS. Ar-Rum: 21</p>
          </div>
        </section>

        {/* ---------- couple ---------- */}
        <section className="section section--panel reveal" aria-labelledby="mempelai">
          <div className="wrap">
            <span className="eyebrow">Mempelai</span>
            <h2 className="h2" id="mempelai">
              Kedua Calon Pengantin
            </h2>
            <hr className="rule" aria-hidden="true" />

            {/* "Putra dari" / "Putri dari" already identify each side, so the
                Mempelai Pria / Wanita tags would only repeat the section label. */}
            <div className="couple">
              <div>
                <p className="person-name">Muhammad Azzohabi</p>
                <p className="person-of">Putra dari</p>
                <p className="person-parents">
                  Bpk. Abdi Rohman (alm)
                  <br />&amp; Ibu Soleha
                </p>
              </div>

              <span className="couple-amp" aria-hidden="true">
                &amp;
              </span>

              <div>
                <p className="person-name">Putri Ewing Vai</p>
                <p className="person-of">Putri dari</p>
                <p className="person-parents">
                  Bpk. Moh Hamim
                  <br />&amp; Ibu Wina (almh)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- event ---------- */}
        <section className="section section--paper reveal" aria-labelledby="acara">
          <div className="wrap">
            <span className="eyebrow">Rangkaian Acara</span>
            <h2 className="h2" id="acara">
              Resepsi Pernikahan
            </h2>
            <hr className="rule" aria-hidden="true" />

            <div className="event">
              <p className="event-day">Sabtu</p>
              <p className="event-date">17</p>
              <p className="event-month">Oktober 2026</p>

              <hr className="rule rule--tight" aria-hidden="true" />

              <p className="event-time">11:00 &ndash; 13:00 WIB</p>

              <hr className="rule rule--tight" aria-hidden="true" />

              <p className="event-venue">Cornelis Koffie</p>
              <p className="event-addr">
                Jl. Pemuda No.16, Depok, Kec. Pancoran Mas,
                <br />
                Kota Depok, Jawa Barat 16431
              </p>

              <a
                className="btn btn--ghost"
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
              >
                Lihat Lokasi
              </a>
            </div>
          </div>
        </section>

        {/* ---------- countdown ---------- */}
        {getRemaining(WEDDING_DATE) && (
          <section className="section reveal" aria-labelledby="hitung-mundur">
            <div className="wrap">
              <span className="eyebrow">Hitung Mundur</span>
              <h2 className="h2" id="hitung-mundur">
                Menuju Hari Bahagia
              </h2>
              <hr className="rule" aria-hidden="true" />

              <Countdown />

              <p className="cd-note">
                Setiap detik membawa kami lebih dekat pada janji suci kami.
              </p>
            </div>
          </section>
        )}

        {/* ---------- gallery ---------- */}
        <section className="section section--paper reveal" aria-labelledby="galeri">
          <div className="wrap">
            <span className="eyebrow">Galeri</span>
            <h2 className="h2" id="galeri">
              Momen Berharga
            </h2>
            <hr className="rule" aria-hidden="true" />

            <div className="gallery">
              {GALLERY.map((photo, i) => (
                <button
                  type="button"
                  className="gallery-item"
                  key={photo.src}
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget
                    setLightboxIndex(i)
                  }}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- gifts ---------- */}
        <section className="section reveal" aria-labelledby="tanda-kasih">
          <div className="wrap">
            <span className="eyebrow">Tanda Kasih</span>
            <h2 className="h2" id="tanda-kasih">
              Hadiah Pernikahan
            </h2>
            <hr className="rule" aria-hidden="true" />

            <p className="gifts-note">
              Doa restu dan kehadiran Anda adalah hadiah yang paling berarti. Namun jika
              ingin memberikan tanda kasih, berikut kami sampaikan:
            </p>

            <div className="accounts">
              {ACCOUNTS.map((account) => (
                <div className="account" key={account.number}>
                  <div>
                    <p className="account-bank">{account.bank}</p>
                    <p className="account-num">{account.number}</p>
                    <p className="account-name">a.n. {account.holder}</p>
                  </div>
                  <CopyButton value={account.number} label={account.bank} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className="footer">
        <p className="footer-names">Azzohabi &amp; Putri</p>
        <p className="footer-date">17 . 10 . 2026</p>
        <hr className="rule" aria-hidden="true" />
        <p className="footer-thanks">
          Merupakan suatu kehormatan dan kebahagiaan apabila Bapak/Ibu/Saudara/i
          berkenan hadir memberikan doa restu.
        </p>
        <p className="footer-salam">
          Terima kasih &mdash; Wassalamu&rsquo;alaikum Wr. Wb.
        </p>
      </footer>

      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={closeLightbox} onStep={stepLightbox} />
      )}
    </>
  )
}
