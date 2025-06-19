import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist } from '../store/wishlistSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PetCardProps {
  id: string;
  image: string;
  name: string;
  type: string;
  price: number;
  stock: number;
  outOfStock?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({ id, image, name, type, price, stock, outOfStock }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (stock > 0) {
      dispatch(addToCart({ id, stock }));
      toast.success(`${name} added to cart`);
    } else {
      toast.error('Out of stock');
    }
  };

  const addToWishlistHandler = () => {
    dispatch(addToWishlist(id));
    toast.success(`${name} added to wishlist`);
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      padding: 16,
      width: 220,
      margin: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      {image ? (
        <img src={image} alt={name} style={{ width: '100%', borderRadius: 8, marginBottom: 8 }} />
      ) : (
        <div style={{
          width: '100%',
          height: 150,
          backgroundColor: '#ccc',
          borderRadius: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#666',
          marginBottom: 8,
        }}>
          No Image
        </div>
      )}
      <div style={{ fontWeight: 'bold', color: '#4a653e', fontSize: 18, marginBottom: 4 }}>
        {name} - {type}
      </div>
      <div style={{ color: '#d18e00', fontWeight: 'bold', fontSize: 16, marginBottom: 16 }}>
        ${price.toFixed(2)}
      </div>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', width: '100%' }}>
        <button
          style={{
            backgroundColor: '#4a653e',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            padding: '8px 24px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 16,
          }}
          aria-label="Details"
        >
          Details
        </button>
        <button
          onClick={addToWishlistHandler}
          style={{
            border: '1px solid #4a653e',
            borderRadius: '50%',
            backgroundColor: 'white',
            cursor: 'pointer',
            width: 36,
            height: 36,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
          }}
          aria-label="Add to wishlist"
        >
          ♥
        </button>
        <button
          onClick={addToCartHandler}
          style={{
            border: '1px solid #4a653e',
            borderRadius: '50%',
            backgroundColor: 'white',
            cursor: stock > 0 ? 'pointer' : 'not-allowed',
            width: 36,
            height: 36,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#4a653e',
            fontWeight: 'bold',
            fontSize: 20,
          }}
          aria-label="Add to cart"
          disabled={stock === 0}
        >
          🛒
        </button>
      </div>
    </div>
  );
};

export default PetCard;
