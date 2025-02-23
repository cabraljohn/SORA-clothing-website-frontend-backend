import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Auth from './components/Auth';
import Profile from './components/Profile';

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="App">
      <Navbar 
        cartCount={cart.length}
        isLoggedIn={isLoggedIn}
        onCartClick={() => setShowCart(true)}
        onAuthClick={() => setShowAuth(true)}
        onProfileClick={() => setShowProfile(true)}
      />
      <Hero />
      <Products onAddToCart={(product) => setCart([...cart, product])} />
      <About />
      <Contact />
      <Footer />
      
      <Cart 
        show={showCart}
        onClose={() => setShowCart(false)}
        items={cart}
        onRemoveItem={(index) => {
          const newCart = cart.filter((_, i) => i !== index);
          setCart(newCart);
        }}
      />

      <Auth 
        show={showAuth}
        onClose={() => setShowAuth(false)}
        onLogin={(userData) => {
          setUser(userData);
          setIsLoggedIn(true);
          setShowAuth(false);
          setShowProfile(true);
        }}
      />

      <Profile 
        show={showProfile}
        onClose={() => setShowProfile(false)}
        user={user}
        onLogout={() => {
          setUser(null);
          setIsLoggedIn(false);
          setShowProfile(false);
        }}
      />
    </div>
  );
}

export default App; 