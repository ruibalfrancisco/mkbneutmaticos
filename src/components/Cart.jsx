import { X, ShoppingCart, Trash2, CircleDot } from 'lucide-react';
import styles from './Cart.module.css';
import { useCart } from '../context/CartContext';

function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
}

function Cart({ onClose }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, total } = useCart();

  const handleCheckout = () => {
    const text = `¡Hola! Me gustaría realizar un pedido desde la web:%0A%0A` +
      cartItems.map(item => `- ${item.quantity}x ${item.name} (${formatPrice(item.price)})`).join('%0A') +
      `%0A%0A*Total: ${formatPrice(total)}*%0A%0A¡Muchas gracias!`;
    window.open(`https://wa.me/5493516106116?text=${text}`, '_blank');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <ShoppingCart size={18} strokeWidth={2} />
            Tu carrito
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar carrito">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {cartItems.length === 0 ? (
            <div className={styles.empty}>
              <CircleDot size={52} strokeWidth={0.8} className={styles.emptyIcon} />
              <p className={styles.emptyText}>Tu carrito está vacío</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemSize}>{item.size}</p>
                  <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                  <div className={styles.itemControls}>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span className={styles.qty}>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                  title="Eliminar"
                  aria-label={`Eliminar ${item.name}`}
                >
                  <Trash2 size={15} strokeWidth={1.8} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalPrice}>{formatPrice(total)}</span>
            </div>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>Comprar por WhatsApp →</button>
            <button className={styles.clearBtn} onClick={clearCart}>Vaciar carrito</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;
