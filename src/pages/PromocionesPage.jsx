import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Tag, Percent, MessageCircle, Phone } from 'lucide-react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import styles from './PromocionesPage.module.css';
import { publicAsset } from '../utils/publicAsset';

const PRODUCT_TYPES = ['Neumáticos', 'Baterías', 'Accesorios'];

const BRANDS = [
  { name: 'Bridgestone', url: 'https://www.bridgestone.com.ar/', logo: '/img/logo-bridgestone-clean.svg', className: 'bridgestoneLogo' },
  { name: 'Firestone', url: 'https://www.firestone.com.ar/', logo: '/img/logo-firestone.png', className: 'firestoneLogo' },
];

function PromoSlider({ title, items }) {
  const trackRef = useRef(null);

  const scroll = useCallback((dir) => {
    if (!trackRef.current) return;
    const amount = 300;
    trackRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  }, []);

  if (items.length === 0) return null;

  return (
    <section className={styles.typeSection}>
      <div className={styles.typeHeader}>
        <h2 className={styles.typeTitle}>
          {title}
          <span className={styles.typeBadge}>{items.length} en oferta</span>
        </h2>
        <div className={styles.sliderControls}>
          <button className={styles.sliderBtn} onClick={() => scroll('left')} aria-label="Anterior">
            <ChevronLeft size={18} />
          </button>
          <button className={styles.sliderBtn} onClick={() => scroll('right')} aria-label="Siguiente">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className={styles.sliderTrack} ref={trackRef}>
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function PromocionesPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const promoProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);

  const grouped = PRODUCT_TYPES.map(type => ({
    type,
    items: promoProducts.filter(p => p.type === type),
  }));

  const hasAnyPromo = promoProducts.length > 0;

  const maxDiscount = promoProducts.reduce((max, p) => {
    const disc = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    return disc > max ? disc : max;
  }, 0);

  return (
    <div className={styles.page}>

      {/* ── Hero Banner ──────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroIcon}>
            <Percent size={40} strokeWidth={2} />
          </div>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>Ofertas Especiales</h1>
            <p className={styles.heroSubtitle}>
              Hasta <strong>{maxDiscount || 15}% OFF</strong> en productos seleccionados.
              Aprovechá precios exclusivos en neumáticos, baterías y accesorios.
            </p>
          </div>
          {hasAnyPromo && (
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>{promoProducts.length}</span>
              <span className={styles.heroStatLabel}>productos en oferta</span>
            </div>
          )}
        </div>
      </section>

      {/* ── Product Sliders ──────────────────────── */}
      <div className="container">
        {isLoading ? (
          <div className={styles.loading}>
            <Loader2 size={48} strokeWidth={2} className={styles.spinner} />
            <p>Cargando promociones...</p>
          </div>
        ) : !hasAnyPromo ? (
          <div className={styles.emptyState}>
            <Tag size={48} strokeWidth={1} className={styles.emptyIcon} />
            <p>No hay promociones activas en este momento.</p>
          </div>
        ) : (
          grouped.map(({ type, items }) => (
            <PromoSlider key={type} title={type} items={items} />
          ))
        )}
      </div>

      {/* ── Brands Strip ─────────────────────────── */}
      <section className={styles.brands}>
        <div className="container">
          <p className={styles.brandsLabel}>Distribuidores oficiales</p>
          <div className={styles.brandsGrid}>
            {BRANDS.map(b => (
              <a
                key={b.name}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.brandItem}
              >
                <img src={b.logo} alt={b.name} className={`${styles.brandLogo} ${styles[b.className]}`} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────── */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h3 className={styles.ctaTitle}>¿No encontrás lo que buscás?</h3>
              <p className={styles.ctaText}>Consultanos y te conseguimos el mejor precio.</p>
            </div>
            <div className={styles.ctaButtons}>
              <a
                href="https://wa.me/+543516106116"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaPrimary}
              >
                <MessageCircle size={17} /> WhatsApp
              </a>
              <a href="tel:+543516106116" className={styles.ctaSecondary}>
                <Phone size={17} /> Llamanos
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
