import { useState } from 'react';
import { ChevronDown, Droplet, HelpCircle, AlertTriangle, Target, Wind, Snowflake } from 'lucide-react';
import styles from './TipsPage.module.css';
import { publicAsset } from '../utils/publicAsset';

const TIPS = [
  {
    id: 1,
    title: 'Cómo ahorrar combustible con el uso y cuidado adecuado',
    icon: Droplet,
    content: (
      <>
        <p>Mantener la presión de inflado correcta de los neumáticos aumentará su vida útil y contribuirá al ahorro de combustible al disminuir la resistencia al rodamiento. Además, es vital realizar mantenimientos periódicos como chequeo de presiones, rotación, alineación o balanceo.</p>
        <p><strong>Consejos para el ahorro:</strong></p>
        <ul>
          <li>Planificar bien el viaje.</li>
          <li>Comprobar la presión de inflado de los neumáticos al menos una vez por semana con el auto en frío.</li>
          <li>Reducir las cargas innecesarias.</li>
          <li>Mantener una velocidad constante.</li>
          <li>No mantener el motor encendido si no es necesario.</li>
        </ul>
        <p>Además, durante épocas de mucho calor, hay que ser aún más cuidadosos. Las altas temperaturas pueden agrietar el caucho y hacer que pierda aire de manera inadvertida.</p>
      </>
    )
  },
  {
    id: 2,
    title: '¿Conocés estos mitos sobre neumáticos?',
    icon: HelpCircle,
    content: (
      <>
        <p><strong>Mito 1: Cambiar el tamaño del neumático no afecta el rendimiento.</strong><br/>
           <em>Falso.</em> La estructura del vehículo tiene una razón de ser. Usar medidas diferentes perjudica el desempeño.</p>
        <p><strong>Mito 2: Inflar los neumáticos al máximo es mejor.</strong><br/>
           <em>Falso.</em> Un neumático con más o menos aire del requerido puede ocasionar accidentes. Además, las variaciones de presión por clima cálido ya están contempladas en el diseño; solo inflalos cuando estén “fríos”.</p>
        <p><strong>Mito 3: Debés rotar los neumáticos periódicamente.</strong><br/>
           <em>Cierto.</em> El desgaste depende de la tracción y el eje. Para que el desgaste sea "parejo", pasá las cubiertas delanteras para atrás, procurando que giren hacia el mismo lado.</p>
      </>
    )
  },
  {
    id: 3,
    title: 'Cómo controlar el desgaste de los neumáticos',
    icon: AlertTriangle,
    content: (
      <>
        <p>La clave es observar el dibujo que tiene el caucho. Todos los surcos contienen pequeñas elevaciones “testigo”. Si estos testigos están casi a la altura del resto del material, el reemplazo es inminente.</p>
        <p><strong>Tipos de desgaste:</strong></p>
        <ul>
          <li><strong>Desgaste parejo:</strong> Erosión regular causada típicamente por el uso prolongado y el retraso en el cambio.</li>
          <li><strong>Desgaste en el centro:</strong> Suele indicar una presión de inflado superior a la recomendada.</li>
          <li><strong>Desgaste lateral:</strong> Fuerte indicador de que la dirección está desalineada.</li>
          <li><strong>Desgaste localizado:</strong> Zonas particularmente afectadas que pueden producirse por frenadas bruscas bloqueando las ruedas.</li>
        </ul>
      </>
    )
  },
  {
    id: 4,
    title: '¿Cada cuánto tenés que alinear y balancear?',
    icon: Target,
    content: (
      <>
        <p>Se recomienda realizar la <strong>alineación</strong> dos veces al año o guiándose por el manual del fabricante. Se deben alinear ambos ejes (delantero y trasero). Hacerlo mejora la seguridad, hace que tu vehículo no sea errático y promueve un desgaste más parejo.</p>
        <p>En cuanto al <strong>balanceo</strong>, es muy fácil sentirlo: al llegar a ciertas velocidades sentirás vibraciones en el volante (si no es un abultamiento o rotura real de la cubierta). Balancearlos a tiempo evita el desgaste irregular y economiza combustible al mejorar el agarre con el asfalto.</p>
      </>
    )
  },
  {
    id: 5,
    title: '¿Cuál es la presión adecuada de aire?',
    icon: Wind,
    content: (
      <>
        <p>Una presión incorrecta puede ocasionar desgaste irregular, mayor consumo de combustible y alteraciones por calor. Se debe calibrar de acuerdo a las <strong>especificaciones del fabricante</strong> del vehículo (cuyo indicador se encuentra usualmente en la puerta del conductor o tapa del tanque de combustible).</p>
        <p><strong>Tips de medición:</strong></p>
        <ul>
          <li>Medí al menos una vez por semana.</li>
          <li>Realizalo con los neumáticos "fríos" (al menos 2 horas después de haberse detenido).</li>
          <li>No te olvides de revisar periódicamente la presión de la rueda de auxilio.</li>
        </ul>
      </>
    )
  },
  {
    id: 6,
    title: 'Cubiertas con clavos en invierno',
    icon: Snowflake,
    content: (
      <>
        <p>Para conducir sobre la lluvia intensa o nieve invernal extrema se necesita gran agarre. Por ello existen neumáticos donde se insertan clavos (usualmente de extremos redondeados y no mayores a 2 mm).</p>
        <p>Generalmente se utilizan entre 80 y 100 clavos. Esta técnica es exclusiva para inviernos en caminos no asfálticos o helados, ya que usarlos en superficie seca destroza el asfalto. MKB ofrece productos especialmente diseñados para estas condiciones cuando llega la temporada fría.</p>
      </>
    )
  }
];

export default function TipsPage() {
  const [openId, setOpenId] = useState(null);

  const toggleTip = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <main className={styles.page}>
      
      {/* ── Hero ──────────────────────────────────── */}
      <section className={styles.hero} style={{ backgroundImage: `url(${publicAsset('img/drag-and-drop-img-310.png')})` }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>Consejos Expertos</span>
          <h1 className={styles.heroTitle}>Tu seguridad es una prioridad</h1>
          <p className={styles.heroSubtitle}>
            Te compartimos toda la información útil para la compra y mantenimiento de tus neumáticos, respaldada por nuestro proveedor <strong>Bridgestone</strong>.
          </p>
        </div>
      </section>

      {/* ── Tips Accordion ─────────────────────────── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Guía Práctica Bridgestone</h2>
            <p className={styles.sectionDesc}>Resolvé las dudas frecuentes y garantizá el mayor cuidado para tus neumáticos y vehículo.</p>
          </div>

          <div className={styles.accordionWrap}>
            {TIPS.map((tip) => {
              const isOpen = openId === tip.id;
              const Icon = tip.icon;

              return (
                <div key={tip.id} className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
                  <button 
                    className={styles.accordionHeader} 
                    onClick={() => toggleTip(tip.id)}
                    aria-expanded={isOpen}
                  >
                    <div className={styles.headerLeft}>
                      <span className={styles.itemIcon}>
                        <Icon size={22} strokeWidth={2} />
                      </span>
                      <h3>{tip.title}</h3>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} 
                    />
                  </button>
                  <div className={styles.accordionBody}>
                    <div className={styles.accordionContent}>
                      {tip.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
