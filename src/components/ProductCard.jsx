import { ShoppingCart, Star, Gauge, Circle, Disc3 } from 'lucide-react';
import styles from './ProductCard.module.css';
import { useCart } from '../context/CartContext';

function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
}

function calcDiscount(price, originalPrice) {
  if (!originalPrice) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discount = calcDiscount(product.price, product.originalPrice);

  const badgeClass =
    product.badge === 'Oferta' ? styles.oferta :
      product.badge === 'Top Ventas' ? styles.topVentas :
        styles.premium;

  return (
    <article className={styles.card}>
      {product.badge && (
        <span className={`${styles.badge} ${badgeClass}`}>{product.badge}</span>
      )}

      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} loading="lazy" />
      </div>

      <div className={styles.content}>
        <span className={styles.brand}>{product.brand}</span>
        <h3 className={styles.name}>{product.name}</h3>

        {/* Technical specs */}
        {product.type === 'Neumáticos' ? (
          <div className={styles.specs}>
            <div className={styles.specItem} title="Ancho (mm)">
              <Gauge size={12} strokeWidth={2} className={styles.specIcon} />
              <span>{product.width}<small>mm</small></span>
            </div>
            <span className={styles.specSep}>/</span>
            <div className={styles.specItem} title="Perfil (%)">
              <Circle size={12} strokeWidth={2} className={styles.specIcon} />
              <span>{product.profile}<small>%</small></span>
            </div>
            <span className={styles.specSep}>R</span>
            <div className={styles.specItem} title="Rodado (pulgadas)">
              <Disc3 size={12} strokeWidth={2} className={styles.specIcon} />
              <span>{product.rim}<small>"</small></span>
            </div>
          </div>
        ) : (
          <div className={styles.specs}>
            <div className={styles.specItem} style={{ fontWeight: 600, color: 'var(--color-text)' }}>
              <span>{product.size || product.category}</span>
            </div>
          </div>
        )}

        {/* Rating */}
        <div className={styles.rating}>
          <Star size={13} fill="var(--color-star)" color="var(--color-star)" />
          <span className={styles.ratingNum}>{product.rating}</span>
          <span className={styles.reviewCount}>({product.reviews})</span>
        </div>

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
          )}
          {discount && <span className={styles.discount}>-{discount}%</span>}
        </div>

        {/* Add to cart */}
        <div className={styles.addToCart}>
          <button
            className={styles.addBtn}
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            disabled={product.stock === 0}
          >
            <ShoppingCart size={14} strokeWidth={2} />
            {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
