import React from 'react';


// Navigacia  
const Navbar: React.FC = () => {
  return (
<nav style={{ backgroundColor: '#4a653e', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', width: '100%' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>PetShop</div>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }}>
        <li>
          <a href="#" style={{ color: '#f7941d', textDecoration: 'underline' }}>Home</a>
        </li>
        <li>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Wishlist</a>
        </li>
        <li>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Cart</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
