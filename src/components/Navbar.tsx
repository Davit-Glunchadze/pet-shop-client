import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const linkStyle = (path: string) => ({
    color: location.pathname === path ? '#f7941d' : 'white',
    textDecoration: location.pathname === path ? 'underline' : 'none',
  });

  return (
    <nav style={{ backgroundColor: '#4a653e', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', width: '100%' }}>
      <a href="/" id="logo-link"><div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>PetShop</div></a>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }}>
        <li>
          <Link to="/" style={linkStyle('/')}>Home</Link>
        </li>
        <li>
          <Link to="/wishlist" style={linkStyle('/wishlist')}>Wishlist</Link>
        </li>
        <li>
          <Link to="/cart" style={linkStyle('/cart')}>Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
