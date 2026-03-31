# MKB Neumáticos - React Website

Una aplicación web moderna desarrollada con React que implementa el diseño y funcionalidad del sitio web original HTML de MKB Neumáticos, distribuidor oficial Bridgestone.

## 📋 Descripción

Este proyecto es una conversión completa del sitio web HTML estático de MKB Neumáticos a una aplicación React moderna. Incluye todas las páginas del sitio original con una arquitectura moderna, navegación tipo SPA (Single Page Application) y responsive design.

## 🎯 Características Principales

### Páginas Implementadas

1. **Home** (`/`) - Página de inicio
   - Slider de promociones automático
   - Sección de búsqueda de productos
   - Información de formas de pago
   - Categorías principales
   - Vista previa de sucursales
   - Enlaces a redes sociales

2. **Nosotros** (`/nosotros`) - Información sobre la empresa
   - Historia y valores de MKB
   - Tarjetas de valores corporativos
   - Acordeón interactivo con información de sucursales
   - Mapa integrado de cada sucursal
   - Servicios ofrecidos
   - CTA de contacto por WhatsApp

3. **Tips** (`/tips`) - Consejos y guías de Bridgestone
   - Acordeón interactivo con múltiples tips
   - Imágenes ilustrativas por cada tip
   - Sección de mejores prácticas
   - FAQ (Preguntas Frecuentes)
   - Enlaces de contacto

4. **Tienda Online** - Componente integrado de ecommerce

## 📦 Instalación y Uso

### Requisitos Previos
- Node.js 16.x o superior
- npm o yarn

### Instalación

```bash
# Navegar al proyecto
cd MyFirstReactProject

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El servidor estará disponible en http://localhost:5173
```

### Construcción

```bash
# Generar build de producción
npm run build

# Vista previa de producción
npm run preview
```

## 🎨 Características Técnicas

- ✅ React 19.x
- ✅ React Router para navegación tipo SPA
- ✅ CSS modular y organizado
- ✅ Diseño responsive (Mobile, Tablet, Desktop)
- ✅ Carrusel/Slider automático
- ✅ Acordeones interactivos
- ✅ Animaciones suaves
- ✅ Integración con WhatsApp
- ✅ Google Maps integrado
- ✅ Optimizado para SEO

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── Navigation.jsx
│   ├── Footer.jsx
│   ├── Home.jsx
│   ├── Nosotros.jsx
│   ├── Tips.jsx
│   └── TiendaOnline.jsx
├── styles/
│   ├── global.css
│   ├── index.css
│   ├── navigation.css
│   ├── home.css
│   ├── nosotros.css
│   ├── tips.css
│   └── footer.css
├── App.jsx
└── main.jsx

public/
└── img/  # Imágenes del sitio
```

## 🔗 Navegación

El sitio utiliza React Router para navegación tipo SPA:

- `/` - Home
- `/nosotros` - Página Nosotros
- `/tips` - Página Tips
- `/tienda` - Tienda Online

## 📱 Funcionalidades Interactivas

### Home
- **Slider automático**: Las promociones cambian cada 5 segundos
- **Botones de control**: Navegar manualmente entre diapositivas
- **Indicadores (dots)**: Mostrar posición actual

### Nosotros
- **Acordeón**: Mostrar/ocultar información de sucursales
- **Google Maps**: Integración de mapas por sucursal
- **Tarjetas interactivas**: Valores corporativos

### Tips
- **Acordeón expandible**: Múltiples tips
- **Imágenes**: Cada tip incluye imagen
- **FAQ**: Preguntas frecuentes
- **Grid responsivo**: Layout adaptativo

## 🎨 Paleta de Colores

- **Primario**: #333 (Oscuro)
- **Secundario**: #666 (Gris)
- **Accent**: #FF6B35 (Naranja)
- **Fondo claro**: #f8f9fa

## 🔗 Enlaces Externos

- **WhatsApp**: +543516106116
- **Instagram**: @mkb.neumaticos
- **Facebook**: mkb.neumaticos
- **Bridgestone**: bridgestone.com.ar

## 🚀 Despliegue

El proyecto está listo para ser desplegado en Vercel, Netlify o servidor tradicional.

```bash
npm run build
# Servir carpeta 'dist/' en tu servidor
```

## 📊 Rendimiento

- Build optimizado con Vite
- CSS modular
- Tamaño del bundle: ~250KB (gzipped: ~79KB)

## 📞 Contacto

- **Email**: info@mkbneumaticos.com
- **WhatsApp**: +543516106116
- **Instagram**: @mkb.neumaticos

---

**Última actualización**: Diciembre 26, 2025
**Versión**: 1.0.0
