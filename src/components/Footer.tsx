import React from 'react';


// Footer 
const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#4a653e', color: 'white', padding: '2rem', marginTop: '3rem', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ borderBottom: '2px solid #d18e00', paddingBottom: '0.5rem' }}>About PetShop</h4>
          <p style={{ marginTop: '1rem', lineHeight: '1.5' }}>
            We're dedicated to connecting loving homes with wonderful pets. Our mission is to ensure every pet finds a caring family.
          </p>
        </div>
        <div style={{ flex: '1 1 150px' }}>
          <h4 style={{ borderBottom: '2px solid #d18e00', paddingBottom: '0.5rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Wishlist</a></li>
            <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Cart</a></li>
          </ul>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <h4 style={{ borderBottom: '2px solid #d18e00', paddingBottom: '0.5rem' }}>Contact Us</h4>
          <p style={{ marginTop: '1rem', lineHeight: '1.5' }}>
            Email: info@petshop.com<br />
            Phone: (123) 456-7890<br />
            Address: 123 Pet Street, Animalville
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid #3a4a2e', paddingTop: '1rem', fontSize: '0.9rem' }}>
        © 2025 PetShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
