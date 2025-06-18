import React from 'react';

interface PetCardProps {
  image: string;
  name: string;
  type: string;
  price: number;
  outOfStock?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({ image, name, type, price, outOfStock }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: '1rem',
      position: 'relative',
      width: '220px',
      margin: '1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {outOfStock && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          zIndex: 10
        }}>
          Out of Stock
        </div>
      )}
      {image ? (
        <img src={image} alt={name} style={{ width: '100%', borderRadius: '8px' }} />
      ) : (
        <div style={{ width: '100%', height: '150px', backgroundColor: '#ccc', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#666' }}>
          No Image
        </div>
      )}
      <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#4a653e' }}>{name} - {type}</div>
      <div style={{ color: '#d18e00', marginBottom: '0.5rem' }}>${price.toFixed(2)}</div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button style={{
          backgroundColor: '#4a653e',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          flexGrow: 1
        }}>Details</button>
        <button style={{
          border: '1px solid #4a653e',
          borderRadius: '50%',
          backgroundColor: 'white',
          cursor: 'pointer',
          width: '36px',
          height: '36px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }} aria-label="Add to wishlist">
          ♥
        </button>
        <button style={{
          border: '1px solid #4a653e',
          borderRadius: '50%',
          backgroundColor: 'white',
          cursor: 'pointer',
          width: '36px',
          height: '36px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }} aria-label="Add to cart">
          🛒
        </button>
      </div>
    </div>
  );
};

export default PetCard;
