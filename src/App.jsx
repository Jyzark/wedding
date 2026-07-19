import { useEffect, useRef, useState } from 'react'
import {
  Flower,
  Leaf,
  FloralDivider,
  SparkleParticles,
} from './Decor.jsx'
import './App.css'

const WEDDING_DATE = new Date('2026-10-17T11:00:00+07:00')

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?auto=format&fit=crop&w=800&q=85',
]

function Countdown() {
  const [t, setT] = useState({})
  useEffect(() => {
    const id = setInterval(() => {
      const d = WEDDING_DATE - new Date()
      if (d <= 0) {
        setT({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(id)
        return
      }
      setT({
        days: Math.floor(d / 86400000),
        hours: Math.floor((d / 3600000) % 24),
        minutes: Math.floor((d / 60000) % 60),
        seconds: Math.floor((d / 1000) % 60),
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="countdown">
      {[
        { label: 'Hari', key: 'days' },
        { label: 'Jam', key: 'hours' },
        { label: 'Menit', key: 'minutes' },
        { label: 'Detik', key: 'seconds' },
      ].map(({ label, key }) => (
        <div className="cd-item" key={key}>
          <span className="cd-val">{String(t[key] ?? 0).padStart(2, '0')}</span>
          <span className="cd-lbl">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [lightbox, setLightbox] = useState(null)
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [playing, setPlaying] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) { audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false)) }
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.rv').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="app">
      <SparkleParticles />

      <audio ref={audioRef} src="/music.mp3" loop />

      <button
        className={`music-toggle ${playing ? 'on' : ''}`}
        onClick={() => {
          const audio = audioRef.current
          if (!audio) return
          if (playing) { audio.pause(); setPlaying(false) }
          else { audio.play().then(() => setPlaying(true)).catch(() => {}) }
        }}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? '\u266B' : '\u266C'}
      </button>

      {/* ============ HERO ============ */}
      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-particles">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        <div className="hero-frame">
          <div className="hero-corner tl" />
          <div className="hero-corner tr" />
          <div className="hero-corner bl" />
          <div className="hero-corner br" />
          <div className="hero-inner">
            <div className="hero-ornament top">
              <Leaf size={32} color="var(--gold-light)" dir="right" />
              <Flower size={40} color="var(--gold)" />
              <Leaf size={32} color="var(--gold-light)" dir="left" />
            </div>
            <span className="hero-badge">Undangan Pernikahan</span>
            <div className="hero-names">
              <span className="hn-bride">Putri</span>
              <span className="hn-amp">&amp;</span>
              <span className="hn-groom">Azzohabi</span>
            </div>
            <div className="hero-subtitle">
              <span className="hs-line" />
              <span>Bersama keluarga besar kami</span>
              <span className="hs-line" />
            </div>
            <div className="hero-meta">
              <span>Sabtu, 17 Oktober 2026</span>
            </div>
            <p className="hero-location">Depok, Jawa Barat</p>
            <div className="hero-ornament bottom">
              <Leaf size={28} color="var(--gold-light)" dir="right" />
              <Flower size={32} color="var(--gold)" />
              <Leaf size={28} color="var(--gold-light)" dir="left" />
            </div>
            <a href="#quote" className="btn">Buka Undangan</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span className="scroll-text">Scroll</span>
          <span className="scroll-line" />
        </div>
      </header>

      {/* ============ QUOTE ============ */}
      <section id="quote" className="section quote-sec rv">
        <div className="sec-inner">
          <Flower size={36} color="var(--gold)" />
          <p className="quote-text">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa
            kasih dan sayang.&rdquo;
          </p>
          <p className="quote-source">— QS. Ar-Rum: 21</p>
        </div>
      </section>

      {/* ============ COUPLE ============ */}
<section className="section couple-sec rv">
        <div className="couple-bg" />
        <div className="couple-overlay" />
        <div className="couple-content">
          <span className="sec-label">Mempelai</span>
          <h2 className="sec-title light">Kedua Calon Mempelai</h2>
          <FloralDivider color="var(--gold-light)" />
          <div className="couple-names-row">
            <div className="cn-col">
              <span className="cc-tag">Mempelai Wanita</span>
              <h3 className="cc-name light">Putri Ewing Vai</h3>
              <p className="cc-text light">Putri dari</p>
              <p className="cc-parents light">Bpk. Moh Hamim<br />&amp; Ibu Wina (almh)</p>
            </div>
            <span className="cn-amp">&amp;</span>
            <div className="cn-col">
              <span className="cc-tag">Mempelai Pria</span>
              <h3 className="cc-name light">Muhammad Azzohabi</h3>
              <p className="cc-text light">Putra dari</p>
              <p className="cc-parents light">Bpk. Abdi Rohman (alm)<br />&amp; Ibu Soleha</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="section story-sec rv">
        <div className="sec-inner">
          <span className="sec-label">Kisah Cinta</span>
          <h2 className="sec-title">Perjalanan Cinta Kami</h2>
          <FloralDivider />
          <div className="story-card-single">
            <p>
              Berawal dari sebuah pertemuan tak terduga di tahun 2019, dua hati
              perlahan belajar untuk saling memahami. Tiga tahun persahabatan
              membawa kami pada satu kesadaran sederhana &mdash; bahwa rumah
              bukanlah sebuah tempat, melainkan seseorang.
            </p>
            <p>
              Dan di penghujung tahun 2025, di bawah langit senja yang
              keemasan, sebuah pertanyaan diucapkan dengan hati yang berdebar.
              Jawabannya adalah ya &mdash; untuk selamanya.
            </p>
            <p>
              Kini kami berdiri di ambang hari yang paling dinanti, siap
              menyatukan dua jiwa dalam ikatan suci, dan memulai perjalanan
              baru sebagai satu.
            </p>
          </div>
        </div>
      </section>

      {/* ============ EVENTS ============ */}
      <section className="section events-sec rv">
        <div className="sec-inner">
          <span className="sec-label">Rangkaian Acara</span>
          <h2 className="sec-title">Resepsi Pernikahan</h2>
          <FloralDivider color="var(--rose)" leafColor="var(--gold)" />
          <div className="event-card-single">
            <div className="ev-date-block">
              <span className="ev-day">Sabtu</span>
              <span className="ev-date">17</span>
              <span className="ev-month">Oktober 2026</span>
            </div>
            <div className="ev-time-block">
              <span className="ev-time-label">Pukul</span>
              <span className="ev-time">11:00 &ndash; 13:00 WIB</span>
            </div>
            <hr className="ecs-hr" />
            <div className="ev-place-block">
              <p className="ev-venue">Cornelis Koffie</p>
              <p className="ev-addr">Jl. Pemuda No.16, Depok, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16431</p>
            </div>
            <a
              className="ec-link-main"
              href="https://share.google/N1498OtR3jMvBXDPH"
              target="_blank"
              rel="noreferrer"
            >
              &#128205; Lihat Lokasi
            </a>
          </div>
        </div>
      </section>

      {/* ============ COUNTDOWN ============ */}
      {new Date() < WEDDING_DATE && (
        <section className="section cd-sec rv">
          <div className="sec-inner">
            <span className="sec-label">Hitung Mundur</span>
            <h2 className="sec-title">Menuju Hari Bahagia</h2>
            <FloralDivider color="var(--rose)" leafColor="var(--gold)" />
            <Countdown />
            <p className="cd-note">
              Setiap detik membawa kami lebih dekat pada janji suci kami.
            </p>
          </div>
        </section>
      )}

      {/* ============ GALLERY ============ */}
      <section className="section gallery-sec rv">
        <div className="sec-inner">
          <span className="sec-label">Galeri</span>
          <h2 className="sec-title">Momen Berharga</h2>
          <FloralDivider />
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className={`gi gi${n}`} key={n} onClick={() => setLightbox(n)}>
                <div className="gi-overlay">
                  <span>&#10084;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lb-close" onClick={() => setLightbox(null)}>&times;</button>
          <div
            className="lb-img"
            style={{
              backgroundImage: `url(${GALLERY_IMAGES[lightbox - 1]})`,
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* ============ Tanda Kasih ============ */}
      <section id="gifts" className="section gifts-sec rv">
        <div className="sec-inner">
          <span className="sec-label">Tanda Kasih</span>
          <h2 className="sec-title">Hadiah Pernikahan</h2>
          <p className="gifts-sub">
            Doa restu dan kehadiran Anda adalah hadiah yang paling berarti.
            Namun jika ingin memberikan tanda kasih, berikut kami sampaikan:
          </p>
          <FloralDivider />
          <div
            className={envelopeOpen ? 'envelope open' : 'envelope'}
            onClick={() => setEnvelopeOpen(!envelopeOpen)}
          >
            <div className="env-flap"></div>
            <span className="env-hint">Klik untuk membuka</span>
            <div className="env-body">
              <div className="gift-card-inner">
                <div className="gc-bank">SEABANK</div>
                <p className="gc-num">901974084345</p>
                <p className="gc-name">a.n. Putri Ewing Vai</p>
              </div>
              <div className="gift-card-inner">
                <div className="gc-bank">BCA</div>
                <p className="gc-num">7651120491</p>
                <p className="gc-name">a.n. Muhammad Azzohabi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <FloralDivider />
        <p className="footer-names">Putri &amp; Azzohabi</p>
        <p className="footer-date">17 &bull; 10 &bull; 2026</p>
        <div className="footer-flowers">
          <Leaf size={28} color="var(--green)" dir="right" />
          <Flower size={24} color="var(--gold)" />
          <Leaf size={28} color="var(--green)" dir="left" />
        </div>
        <p className="footer-thanks">
          Merupakan suatu kehormatan dan kebahagiaan apabila
          Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
        </p>
        <p className="footer-end">Terima kasih &mdash; Wassalamu&rsquo;alaikum Wr. Wb.</p>
      </footer>
    </div>
  )
}