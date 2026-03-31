import { ShieldCheck, Target, Lightbulb, ThumbsUp, MapPin, ArrowRight } from 'lucide-react';
import styles from './NosotrosPage.module.css';
import { publicAsset } from '../utils/publicAsset';

const VALUES = [
  { icon: ShieldCheck, title: 'Honestidad', desc: 'Atención personalizada basada siempre en la honestidad y profesionalismo.' },
  { icon: Target, title: 'Soluciones', desc: 'Nos capacitamos permanentemente para darte la mejor solución.' },
  { icon: Lightbulb, title: 'Innovación', desc: 'Somos una organización innovadora mejorando nuestra oferta, siempre.' },
  { icon: ThumbsUp, title: 'Calidad', desc: 'Servicios premium para tu vehículo usando maquinaria de última tecnología.' },
];

const BRANCHES = [
  { address: 'Av. Colón 3671', city: 'X5003 Córdoba, Argentina', url: 'https://maps.google.com/?q=Av.+Colón+3671+Córdoba' },
  { address: 'Av. Fuerza Aérea 2433', city: 'X5010 Córdoba, Argentina', url: 'https://maps.google.com/?q=Av.+Fuerza+Aérea+2433+Córdoba' },
  { address: 'Av. Fuerza Aérea 3951', city: 'X5000 Córdoba, Argentina', url: 'https://maps.google.com/?q=Av.+Fuerza+Aérea+3951+Córdoba' },
];

export default function NosotrosPage() {
  return (
    <main className={styles.page}>
      
      {/* ── Hero Section ──────────────────────────── */}
      <section 
        className={styles.hero} 
        style={{ backgroundImage: `url(${publicAsset('img/drag-and-drop-img-346.png')})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>MKB es una empresa familiar y vos sos parte de ella</h1>
          <p className={styles.heroSubtitle}>
            Distribuidor oficial Bridgestone & Firestone. Nos especializamos en la venta de neumáticos y servicios afines.
          </p>
        </div>
      </section>

      {/* ── About Us ──────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className={styles.sectionLabel}>Nuestra Historia</span>
              <h2>Quiénes somos</h2>
              <p>
                Somos <strong>MKB</strong>, distribuidor oficial de <strong>Bridgestone & Firestone</strong>. Nos especializamos en la venta de neumáticos, como también en su colocación y diversos servicios afines.
              </p>
              <p>
                En cada uno de nuestros puntos de venta minoristas, brindamos atención personalizada por nuestro personal capacitado para resolver cualquier duda o inconveniente, basada siempre en la honestidad y profesionalismo, para que tu experiencia con nosotros sea la más provechosa.
              </p>
              <p>
                Ofrecemos una amplia gama de productos y variedad de precios para adaptarnos a las diferentes necesidades de cada cliente, apoyándonos siempre en la mejor calidad.
              </p>
              <p>
                Brindamos además, servicios premium para tu vehículo, tales como: alineado 3D, balanceos, mecánica del tren delantero, centrados de llanta, frenos, amortiguación, recambio de baterías y más. Utilizamos siempre maquinaria de última tecnología, capaz de solucionar las distintas necesidades con precisión y seguridad.
              </p>
              <p><strong>Familia MKB Neumáticos.</strong></p>
            </div>
            <div className={styles.aboutImage}>
              {/* Using a placeholder from existing public assets */}
              <img src={publicAsset('img/drag-and-drop-img-456.png')} alt="Taller MKB Neumáticos" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Nuestra Filosofía</span>
            <h2 className={styles.sectionTitle}>Nuestros Valores</h2>
            <p className={styles.sectionDesc}>Por qué elegirnos y cómo trabajamos todos los días.</p>
          </div>
          
          <div className={styles.valuesGrid}>
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Branches ──────────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Ubicaciones</span>
            <h2 className={styles.sectionTitle}>Nuestras Sucursales</h2>
            <p className={styles.sectionDesc}>Situados en la ciudad de Córdoba, en tres de los puntos de acceso más concurridos de la ciudad.</p>
          </div>

          <div className={styles.branchGrid}>
            {BRANCHES.map(({ address, city, url }, i) => (
              <div key={i} className={styles.branchCard}>
                <div className={styles.branchIcon}>
                  <MapPin size={24} strokeWidth={1.8} />
                </div>
                <div className={styles.branchInfo}>
                  <h4>{address}</h4>
                  <p>{city}</p>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={styles.branchLink}>
                    Ver en Google Maps <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
