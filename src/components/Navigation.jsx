import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, ChevronDown, User, Menu, X } from 'lucide-react';
import styles from './Navigation.module.css';
import { useCart } from '../context/CartContext';
import { publicAsset } from '../utils/publicAsset';

export default function Navigation({ onCartOpen }) {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [tiendaOpen, setTiendaOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const tiendaRef = useRef(null);
  const loginRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setTiendaOpen(false);
    setLoginOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onDocClick(e) {
      if (tiendaOpen && tiendaRef.current && !tiendaRef.current.contains(e.target)) setTiendaOpen(false);
      if (loginOpen && loginRef.current && !loginRef.current.contains(e.target)) setLoginOpen(false);
    }
    function onKey(e) {
      if (e.key === 'Escape') { setTiendaOpen(false); setLoginOpen(false); setMobileOpen(false); }
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDocClick); document.removeEventListener('keydown', onKey); };
  }, [tiendaOpen, loginOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = document.getElementById('nav-usuario')?.value || '';
    const pass = document.getElementById('nav-contrasena')?.value || '';
    alert(`Usuario: ${user}\nContraseña: ****`);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.inner}>

          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img
              className={styles.logoImg}
              src={publicAsset('img/drag-and-drop-logo-53.png')}
              alt="MKB Neumáticos"
            />
          </Link>

          {/* Desktop links */}
          <div className={styles.links}>
            <NavLink
              to="/"
              end
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              Inicio
            </NavLink>

            {/* Tienda dropdown */}
            <div className={styles.dropdownWrap} ref={tiendaRef}>
              <button
                className={styles.dropdownToggle}
                onClick={() => setTiendaOpen(v => !v)}
                aria-expanded={tiendaOpen}
              >
                Tienda Online
                <ChevronDown size={14} className={tiendaOpen ? styles.chevronOpen : styles.chevron} />
              </button>
              {tiendaOpen && (
                <div className={styles.dropdown}>
                  <Link className={styles.dropdownItem} to="/tienda" onClick={() => setTiendaOpen(false)}>Todos los productos</Link>
                  <Link className={styles.dropdownItem} to="/tienda?type=Neumáticos" onClick={() => setTiendaOpen(false)}>Neumáticos</Link>
                  <Link className={styles.dropdownItem} to="/tienda?type=Baterías" onClick={() => setTiendaOpen(false)}>Baterías</Link>
                  <Link className={styles.dropdownItem} to="/tienda?type=Accesorios" onClick={() => setTiendaOpen(false)}>Accesorios</Link>
                </div>
              )}
            </div>

            <NavLink
              to="/promociones"
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              Promociones
            </NavLink>

            <NavLink
              to="/tips"
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              Tips
            </NavLink>

            <NavLink
              to="/nosotros"
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              Nosotros
            </NavLink>
          </div>

          {/* Right actions */}
          <div className={styles.actions}>
            {/* Login dropdown */}
            <div className={styles.loginWrap} ref={loginRef}>
              <button
                className={styles.loginBtn}
                onClick={() => setLoginOpen(v => !v)}
                aria-expanded={loginOpen}
              >
                <User size={15} strokeWidth={2} />
                Ingresar
                <ChevronDown size={13} className={loginOpen ? styles.chevronOpen : styles.chevron} />
              </button>
              {loginOpen && (
                <form className={styles.loginPanel} onSubmit={handleLogin}>
                  <img
                    className={styles.loginLogo}
                    src={publicAsset('img/drag-and-drop-logo-53.png')}
                    alt="MKB Neumáticos"
                  />
                  <input
                    id="nav-usuario"
                    type="text"
                    className={styles.loginInput}
                    placeholder="Usuario"
                    autoComplete="username"
                  />
                  <input
                    id="nav-contrasena"
                    type="password"
                    className={styles.loginInput}
                    placeholder="Contraseña"
                    autoComplete="current-password"
                  />
                  <button type="submit" className={styles.loginSubmit}>Ingresar</button>
                </form>
              )}
            </div>

            {/* Cart */}
            <button className={styles.cartBtn} onClick={onCartOpen} aria-label="Abrir carrito">
              <ShoppingCart size={16} strokeWidth={2} />
              Carrito
              {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
            </button>
          </div>

          {/* Hamburger */}
          <button className={styles.hamburger} onClick={() => setMobileOpen(v => !v)} aria-label="Menú">
            {mobileOpen
              ? <X size={22} strokeWidth={2} />
              : <>
                  <span /><span /><span />
                </>
            }
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={styles.mobileMenu}>
            <Link to="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Inicio</Link>
            <Link to="/tienda" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Tienda Online</Link>
            <Link to="/promociones" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Promociones</Link>
            <Link to="/tips" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Tips</Link>
            <Link to="/nosotros" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Nosotros</Link>
            <button className={styles.mobileLink} onClick={() => { setMobileOpen(false); onCartOpen(); }}>
              Carrito {totalItems > 0 && `(${totalItems})`}
            </button>
          </div>
        )}
      </nav>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/+543516106116"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </>
  );
}
