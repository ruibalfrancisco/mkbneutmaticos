import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Tag } from 'lucide-react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import styles from './PromocionesPage.module.css';

const PRODUCT_TYPES = ['Neumáticos', 'Baterías', 'Accesorios'];

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

  // Only products with a discount
  const promoProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);

  // Group by type
  const grouped = PRODUCT_TYPES.map(type => ({
    type,
    items: promoProducts.filter(p => p.type === type),
  }));

  const hasAnyPromo = promoProducts.length > 0;

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Promociones</h1>
          <p className={styles.pageSubtitle}>
            Aprovechá los mejores descuentos en neumáticos, baterías y accesorios
          </p>
        </div>

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
    </div>
  );
}
