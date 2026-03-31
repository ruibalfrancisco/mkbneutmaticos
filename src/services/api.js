import { products as localProducts } from '../data/products';

// Cuando subas la página a tu servidor de producción (ej: Hostinger, cPanel), 
// debes cambiar esta URL por el enlace absoluto o relativo a tu archivo PHP.
// Ejemplo: "https://www.mkbneumaticos.com.ar/backend/get_products.php"
// O si está alojado en la misma carpeta: "/backend/get_products.php"
const PHP_ENDPOINT = "http://localhost/backend/get_products.php";

/**
 * Obtiene la lista completa de productos llamando directamente al archivo PHP en el servidor web.
 */
export async function getProducts() {
  try {
    // React hace una llamada asíncrona hacia el Script PHP.
    const response = await fetch(PHP_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`Error en el servidor PHP: ${response.statusText}`);
    }
    
    // PHP devuelve un JSON que parseamos.
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.warn('Error fetching products from PHP:', error.message);
    
    // === MODO DESARROLLO (SALVAVIDAS) ===
    // Como estás en desarrollo local y probablemente el archivo PHP no esté 
    // siendo servido todavía por Apache/XAMPP, React no podrá conectarse.
    // Capturamos ese fallo aquí para no "romper" tu tienda mientras programas,
    // inyectando tus productos estáticos tras 800 milisegundos de espera simulada.
    console.info("Utilizando catálogo local estático temporalmente ya que el archivo .php no responde.");
    return new Promise((resolve) => setTimeout(() => resolve([...localProducts]), 800)); 
  }
}
