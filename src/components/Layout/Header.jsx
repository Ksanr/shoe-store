import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartCount = useSelector((state) => state.cart.reduce((sum, item) => sum + item.count, 0));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    if (searchOpen && searchQuery.trim()) {
      navigate(`/catalog.html?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    } else {
      setSearchOpen(!searchOpen);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/catalog.html?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">
              <img src="/img/header-logo.png" alt="Bosa Noga" />
            </Link>

            <div className="navbar-nav mr-auto" style={{ gap: '20px' }}>
              <Link className="nav-link" to="/">Главная</Link>
              <Link className="nav-link" to="/catalog.html">Каталог</Link>
              <Link className="nav-link" to="/about.html">О магазине</Link>
              <Link className="nav-link" to="/contacts.html">Контакты</Link>
            </div>

            <div className="header-controls-pics">
              <div className="header-controls-pic header-controls-search" onClick={handleSearchToggle}>
                {searchOpen && (
                  <div className="header-controls-search-form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Поиск..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                  </div>
                )}
              </div>
              {/* < div className="header-controls-pic header-controls-profile"></div > */}
              <Link to="/cart.html" className="header-controls-pic header-controls-cart">
                {cartCount > 0 && (
                  <span className="header-controls-cart-full">{cartCount}</span>
                )}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;