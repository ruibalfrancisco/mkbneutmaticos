import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, ArrowRight,
  CircleDot, Wrench, Battery, Package,
  MapPin, Phone, MessageCircle, Search
} from 'lucide-react';
import styles from './HomePage.module.css';
import { publicAsset } from '../utils/publicAsset';

const SLIDES = [
  {
    title: 'GARANTÍA BRIDGESTONE',
    subtitle: 'Cuidá de tu auto sin importar su edad o cómo lo uses.',
    image: publicAsset('img/drag-and-drop-img-346.png'),
    ctaText: 'Ver detalles'
  },
  {
    title: '10% OFF EN SERVICIOS',
    subtitle: 'Pagá online y dale a tu auto lo que merece.',
    image: publicAsset('img/hero-services.png'),
    link: 'https://wa.me/+543516106116',
    ctaText: 'Reservar Turno'
  },
  {
    title: '5% OFF EN BATERÍAS',
    subtitle: 'Con la compra de tus neumáticos.',
    image: publicAsset('img/hero-battery.png'),
    ctaText: 'Ver catálogo'
  },
];

const CATEGORIES = [
  { icon: CircleDot, label: 'Neumáticos', desc: 'Amplia variedad de las mejores marcas', type: 'Neumáticos' },
  { icon: Wrench,    label: 'Servicios',  desc: 'Mantenimiento y reparación profesional', link: 'https://wa.me/+543516106116' },
  { icon: Battery,   label: 'Baterías',   desc: 'Baterías de calidad para tu vehículo', type: 'Baterías' },
  { icon: Package,   label: 'Accesorios', desc: 'Accesorios y repuestos para tu auto', type: 'Accesorios' },
];

const BRANCHES = [
  { address: 'Colón 3671', city: 'X5003 Córdoba, Argentina', url: 'https://maps.google.com/?q=Colón+3671+Córdoba' },
  { address: 'Av. Fuerza Aérea 2433', city: 'Córdoba, Argentina', url: 'https://maps.google.com/?q=Av.+Fuerza+Aérea+2433+Córdoba' },
  { address: 'Av. Fuerza Aérea 3951', city: 'Córdoba, Argentina', url: 'https://maps.google.com/?q=Av.+Fuerza+Aérea+3951+Córdoba' },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setCurrent(p => (p - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent(p => (p + 1) % SLIDES.length);

  return (
    <main>

      {/* ── Hero Slider ───────────────────────────── */}
      <section className={styles.hero} aria-label="Slider de ofertas">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden={i !== current}
          >
            <div className={styles.slideOverlay} />
            <div className={styles.slideContent}>
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              {slide.link ? (
                <a href={slide.link} target="_blank" rel="noopener noreferrer" className={styles.heroCta}>
                  {slide.ctaText || 'Ver catálogo'} <ArrowRight size={16} />
                </a>
              ) : (
                <Link to="/tienda" className={styles.heroCta}>
                  {slide.ctaText || 'Ver catálogo'} <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        ))}

        <button className={`${styles.sliderBtn} ${styles.prevBtn}`} onClick={prev} aria-label="Anterior">
          <ChevronLeft size={20} />
        </button>
        <button className={`${styles.sliderBtn} ${styles.nextBtn}`} onClick={next} aria-label="Siguiente">
          <ChevronRight size={20} />
        </button>

        <div className={styles.dots} role="tablist" aria-label="Slides">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── Quick Search ──────────────────────────── */}
      <section className={styles.searchSection}>
        <div className="container">
          <div className={styles.searchBox}>
            <h2>¿Qué producto estás buscando?</h2>
            <p>Buscá por nombre, medida, marca o tipo de vehículo.</p>
            <div className={styles.searchInputWrap}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Ej: Bridgestone 205/55 R16, neumático de moto..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                aria-label="Buscar productos"
              />
              <Link
                to={`/tienda${searchValue.trim() ? `?q=${encodeURIComponent(searchValue.trim())}` : ''}`}
                className={styles.searchBtn}
              >
                <Search size={14} /> Buscar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Lo que ofrecemos</span>
            <h2 className={styles.sectionTitle}>Categorías Principales</h2>
            <p className={styles.sectionDesc}>Todo lo que tu vehículo necesita en un solo lugar</p>
          </div>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map(({ icon: Icon, label, desc, type, link }) => (
              link ? (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.categoryCard}
                >
                  <div className={styles.categoryIcon}>
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                  <h4>{label}</h4>
                  <p>{desc}</p>
                </a>
              ) : (
                <Link
                  key={label}
                  to={type ? `/tienda?type=${encodeURIComponent(type)}` : '/tienda'}
                  className={styles.categoryCard}
                >
                  <div className={styles.categoryIcon}>
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                  <h4>{label}</h4>
                  <p>{desc}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ── Branches ──────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Dónde encontrarnos</span>
            <h2 className={styles.sectionTitle}>Nuestras Sucursales</h2>
            <p className={styles.sectionDesc}>Presentes en los puntos estratégicos de Córdoba</p>
          </div>
          <div className={styles.branchGrid}>
            {BRANCHES.map(({ address, city, url }) => (
              <div key={address} className={styles.branchCard}>
                <div className={styles.branchIcon}>
                  <MapPin size={20} strokeWidth={1.8} />
                </div>
                <div className={styles.branchInfo}>
                  <h4>{address}</h4>
                  <p>{city}</p>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={styles.branchLink}>
                    Ver en Google Maps <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────── */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <h2>¿Necesitás asesoramiento personalizado?</h2>
          <p>Contactanos y uno de nuestros especialistas te va a ayudar a elegir el neumático ideal.</p>
          <div className={styles.ctaButtons}>
            <a
              href="https://wa.me/+543516106116"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              <MessageCircle size={17} /> WhatsApp
            </a>
            <a
              href="tel:+543516106116"
              className={styles.ctaSecondary}
            >
              <Phone size={17} /> Llamanos
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
