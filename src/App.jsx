import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import Cart from './components/Cart';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import NosotrosPage from './pages/NosotrosPage';
import TipsPage from './pages/TipsPage';
import PromocionesPage from './pages/PromocionesPage';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Navigation onCartOpen={() => setCartOpen(true)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tienda" element={<ProductsPage />} />
          <Route path="/nosotros" element={<NosotrosPage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/promociones" element={<PromocionesPage />} />
        </Routes>
        <Footer />
        {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
      </Router>
    </CartProvider>
  );
}

export default App;
