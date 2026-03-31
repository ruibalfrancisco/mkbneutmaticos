import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Fuse from 'fuse.js';
import {
  Search, SlidersHorizontal, ArrowUpDown,
  Tag, RotateCcw, CircleSlash, Loader2
} from 'lucide-react';

import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import styles from './ProductsPage.module.css';

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Async data states
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Todas']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [types, setTypes] = useState(['Todos']);
  const [selectedType, setSelectedType] = useState(() => searchParams.get('type') || 'Todos');
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('cat') || 'Todas');
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('default');

  // Load products from Database / API
  useEffect(() => {
    async function fetchFromDB() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulates the DB fetch call
        const data = await getProducts();
        
        setProducts(data);
        
        // Extract unique types dynamically
        const uniqueTypes = ['Todos', ...new Set(data.map(p => p.type))];
        setTypes(uniqueTypes);

        // Extract unique categories dynamically based on the DB content
        const uniqueCategories = ['Todas', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);

      } catch (err) {
        setError(err.message || 'Error inesperado al obtener los productos');
      } finally {
        setIsLoading(false);
      }
    }
    fetchFromDB();
  }, []); // Only fetch when component mounts

  // Update filters when URL params change or when data arrives
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const type = searchParams.get('type');
      const cat = searchParams.get('cat');
      const q   = searchParams.get('q');
      
      if (type && types.includes(type)) setSelectedType(type);
      else if (!type) setSelectedType('Todos');

      if (cat && categories.includes(cat)) setSelectedCategory(cat);
      else if (!cat) setSelectedCategory('Todas');

      if (q) setSearch(q);
      else setSearch('');
    }
  }, [searchParams, isLoading, types, categories, products.length]);

  // Initialize Fuse search instance
  const fuse = useMemo(() => new Fuse(products, {
    keys: ['name', 'brand', 'size', 'subcategory'],
    threshold: 0.4,
    distance: 100,
    includeScore: true,
  }), [products]);

  const filteredProducts = useMemo(() => {
    let result;

    if (search.trim()) {
      const fuseResults = fuse.search(search.trim());
      result = fuseResults.map(r => r.item);
    } else {
      result = [...products];
    }

    if (selectedType !== 'Todos') {
      result = result.filter(p => p.type === selectedType);
    }

    if (selectedCategory !== 'Todas') {
      result = result.filter(p => p.category === selectedCategory);
    }

    switch (sortBy) {
      case 'price-asc':  result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating':     result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'reviews':    result = [...result].sort((a, b) => b.reviews - a.reviews); break;
    }

    return result;
  }, [selectedType, selectedCategory, search, sortBy, products, fuse]);

  const countByType = (t) =>
    t === 'Todos' ? products.length : products.filter(p => p.type === t).length;

  const availableCategories = useMemo(() => {
    const base = selectedType === 'Todos' ? products : products.filter(p => p.type === selectedType);
    return ['Todas', ...new Set(base.map(p => p.category))];
  }, [selectedType, products]);

  const countByCategory = (cat) => {
    const base = selectedType === 'Todos' ? products : products.filter(p => p.type === selectedType);
    return cat === 'Todas' ? base.length : base.filter(p => p.category === cat).length;
  };

  const handleReset = () => {
    setSearchParams({});
    setSortBy('default');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Catálogo de {selectedType === 'Todos' ? 'Productos' : selectedType}
          </h1>
          <p className={styles.pageSubtitle}>
            Encontrá {selectedType === 'Baterías' ? 'la batería perfecta' : selectedType === 'Accesorios' ? 'el accesorio perfecto' : 'el neumático perfecto'} para tu vehículo
          </p>
        </div>

        <div className={styles.layout}>

          {/* ── Sidebar ──────────────────────────── */}
          <aside className={styles.sidebar}>

            {/* Fuzzy search */}
            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>
                <Search size={13} strokeWidth={2.5} /> Buscar
              </label>
              <div className={styles.searchWrapper}>
                <Search size={15} className={styles.searchIcon} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Marca, nombre, medida..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Buscar productos"
                  disabled={isLoading}
                />
              </div>
              {search && (
                <p className={styles.fuzzyHint}>Búsqueda inteligente activa</p>
              )}
            </div>

            {/* Tipo de Producto */}
            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>
                <SlidersHorizontal size={13} strokeWidth={2.5} /> Tipo de Producto
              </label>
              <div className={styles.categoryFilters}>
                {types.map(t => (
                  <button
                    key={t}
                    disabled={isLoading}
                    className={`${styles.filterBtn} ${selectedType === t ? styles.active : ''}`}
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams);
                      if (t === 'Todos') newParams.delete('type');
                      else newParams.set('type', t);
                      newParams.delete('cat');
                      setSearchParams(newParams);
                    }}
                  >
                    {t}
                    <span className={styles.filterCount}>{countByType(t)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>
                <Tag size={13} strokeWidth={2.5} /> Categoría
              </label>
              <div className={styles.categoryFilters}>
                {availableCategories.map(cat => (
                  <button
                    key={cat}
                    disabled={isLoading}
                    className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams);
                      if (cat === 'Todas') newParams.delete('cat');
                      else newParams.set('cat', cat);
                      setSearchParams(newParams);
                    }}
                  >
                    {cat}
                    <span className={styles.filterCount}>{countByCategory(cat)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className={styles.filterSection}>
              <label className={styles.filterLabel}>
                <ArrowUpDown size={13} strokeWidth={2.5} /> Ordenar por
              </label>
              <select
                className={styles.sortSelect}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                aria-label="Ordenar por"
                disabled={isLoading}
              >
                <option value="default">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor calificados</option>
                <option value="reviews">Más reseñas</option>
              </select>
            </div>

            <button className={styles.resetBtn} onClick={handleReset} disabled={isLoading}>
              <RotateCcw size={13} /> Limpiar filtros
            </button>
          </aside>

          {/* ── Product Grid ─────────────────────── */}
          <main className={styles.content}>
            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '1rem', color: 'var(--color-gray-500)' }}>
                <Loader2 size={48} strokeWidth={2} style={{ animation: 'spin 1.5s linear infinite', color: 'var(--color-brand)' }} />
                <p>Cargando catálogo desde la Base de Datos...</p>
                <style>
                  {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                </style>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-badge-offer)' }}>
                <h3>Hubo un problema de conexión</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} style={{ padding: '0.75rem 1.5rem', background: 'var(--color-brand)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', marginTop: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>Reintentar</button>
              </div>
            ) : (
              <>
                <div className={styles.resultsBar}>
                  <p className={styles.resultsCount}>
                    <strong>{filteredProducts.length}</strong> productos encontrados
                    {search && <span className={styles.searchTerm}> para &ldquo;{search}&rdquo;</span>}
                  </p>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className={styles.grid}>
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noResults}>
                    <CircleSlash size={44} strokeWidth={1} className={styles.noResultsIcon} />
                    <p>No encontramos neumáticos con esos filtros.</p>
                    <p>Intentá con otra búsqueda o limpiá los filtros.</p>
                  </div>
                )}
              </>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
