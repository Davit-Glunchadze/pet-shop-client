import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../store/store';
import { clearCart, reduceStock } from '../store/cartSlice';
import { toast } from 'react-toastify';

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    // Simulate purchase: reduce stock and clear cart
    cartItems.forEach(item => {
      dispatch(reduceStock({ id: item.id, quantity: item.quantity }));
    });
    dispatch(clearCart());
    toast.success('Purchase successful! Cart cleared.');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.id} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleBuyNow}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4a653e',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default Checkout;
