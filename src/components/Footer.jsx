import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Facebook, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>

          {/* Sucursales */}
          <div className={styles.col}>
            <h6>Sucursales</h6>
            <ul>
              <li>
                <a href="https://maps.google.com/?q=Colón+3671+Córdoba" target="_blank" rel="noopener noreferrer">
                  Colón 3671
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=Av.+Fuerza+Aérea+2433+Córdoba" target="_blank" rel="noopener noreferrer">
                  Av. Fuerza Aérea 2433
                </a>
              </li>
              <li>
                <a href="https://maps.google.com/?q=Av.+Fuerza+Aérea+3951+Córdoba" target="_blank" rel="noopener noreferrer">
                  Av. Fuerza Aérea 3951
                </a>
              </li>
            </ul>
          </div>

          {/* Serv icios */}
          <div className={styles.col}>
            <h6>Servicios</h6>
            <ul>
              <li><Link to="/tienda?type=Neumáticos">Venta de neumáticos</Link></li>
              <li><Link to="/tienda?type=Baterías">Venta de baterías</Link></li>
              <li><Link to="/tienda?type=Accesorios">Venta de accesorios</Link></li>
              <li><a href="https://wa.me/+543516106116" target="_blank" rel="noopener noreferrer">Mecánica tren delantero</a></li>
            </ul>
          </div>

          {/* Asociados */}
          <div className={styles.col}>
            <h6>Asociados</h6>
            <ul>
              <li><a href="https://www.bridgestone.com.ar" target="_blank" rel="noopener noreferrer">Bridgestone</a></li>
              <li><a href="https://moura.com.ar" target="_blank" rel="noopener noreferrer">Moura</a></li>
              <li><a href="https://www.sermat.com.ar" target="_blank" rel="noopener noreferrer">Sermat</a></li>
            </ul>
          </div>

          {/* Brand */}
          <div className={styles.col}>
            <h6>MKB Neumáticos</h6>
            <p>Distribuidor oficial Bridgestone en Córdoba.</p>
            <p className={styles.tagline}>Especialistas en neumáticos y servicios para tu vehículo.</p>
            <div className={styles.social}>
              <a
                href="https://www.instagram.com/mkb.neumaticos/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <Instagram size={16} strokeWidth={1.8} />
              </a>
              <a
                href="https://wa.me/+543516106116"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} strokeWidth={1.8} />
              </a>
              <a
                href="https://www.facebook.com/mkb.neumaticos"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <Facebook size={16} strokeWidth={1.8} />
              </a>
            </div>
          </div>

        </div>

        <div className={styles.bottom}>
          <p className={styles.bottomText}>
            &copy; {new Date().getFullYear()} MKB Neumáticos SAS. Todos los derechos reservados.
          </p>
          <p className={styles.bottomText}>
            Contacto: <a href="mailto:info@mkbneumaticos.com">info@mkbneumaticos.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
