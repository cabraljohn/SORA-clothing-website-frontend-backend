import React from 'react';

function Navbar({ cartCount, isLoggedIn, onCartClick, onAuthClick, onProfileClick }) {
  return (
    <header>
      <nav>
        <div className="logo">SORA</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#collection">Collection</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          {!isLoggedIn && (
            <>
              <li><button className="auth-btn" onClick={onAuthClick}>Login</button></li>
              <li><button className="auth-btn" onClick={onAuthClick}>Register</button></li>
            </>
          )}
        </ul>
        <div>
          <div className="cart-icon" onClick={onCartClick}>
            <i className="fas fa-shopping-cart"></i>
            <span id="cart-count">{cartCount}</span>
          </div>
          <div className="profile-icon-nav" onClick={onProfileClick}>
            <i className="fas fa-user-circle"></i>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar; 