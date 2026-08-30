import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter basename="/shoe-store">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog.html" element={<CatalogPage />} />
          <Route path="catalog/:id.html" element={<ProductPage />} />
          <Route path="cart.html" element={<CartPage />} />
          <Route path="about.html" element={<AboutPage />} />
          <Route path="contacts.html" element={<ContactsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;