import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { updateQuantity, removeFromCart } from '../store/cartSlice';
import { toast } from 'react-toastify';

interface Animal {
  id: string;
  name: string;
  priceUSD: number;
  category: string;
  stock: number;
  imageUrl: string;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/animals')
      .then(res => res.json())
      .then(data => {
        const flatAnimals = data.map((animal: any) => ({
          id: animal.id,
          ...animal.data[0],
        }));
        setAnimals(flatAnimals);
      })
      .catch(() => {
        toast.error('Failed to load animals data');
      });
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number, stock: number) => {
    if (newQuantity > 0 && newQuantity <= stock) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else if (newQuantity > stock) {
      toast.error(`Maximum stock is ${stock}`);
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    toast.info('Removed from cart');
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const animal = animals.find(a => a.id === item.id);
    if (!animal) return total;
    return total + animal.priceUSD * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <section style={{ padding: 16 }}>
      <h2 style={{ color: '#4a653e', fontWeight: 'bold', marginBottom: 16 }}>Your Cart</h2>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="currency" style={{ marginRight: 8 }}>Currency:</label>
        <select id="currency" name="currency" defaultValue="USD" style={{ padding: 4 }}>
          <option value="USD">USD ($)</option>
          <option value="GEL">GEL (₾)</option>
        </select>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cartItems.map(item => {
          const animal = animals.find(a => a.id === item.id);
          if (!animal) return null;
          return (
            <li key={item.id} style={{ marginBottom: 16, borderBottom: '1px solid #ccc', paddingBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <img src={animal.imageUrl} alt={animal.name} style={{ width: 100, borderRadius: 8 }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 'bold', color: '#4a653e', fontSize: 18 }}>{animal.name} - {animal.category}</div>
                  <div style={{ color: '#d18e00', fontWeight: 'bold', fontSize: 16 }}>${animal.priceUSD.toFixed(2)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1, animal.stock)}
                      disabled={item.quantity <= 1}
                      style={{
                        border: '1px solid #4a653e',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        cursor: item.quantity > 1 ? 'pointer' : 'not-allowed',
                        width: 32,
                        height: 32,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1, animal.stock)}
                      disabled={item.quantity >= animal.stock}
                      style={{
                        border: '1px solid #4a653e',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        cursor: item.quantity < animal.stock ? 'pointer' : 'not-allowed',
                        width: 32,
                        height: 32,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    backgroundColor: '#ff6b6b',
                    border: 'none',
                    borderRadius: 4,
                    color: 'white',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'right' }}>
        Total: ${totalPrice.toFixed(2)}
      </div>
    </section>
  );
};

export default Cart;
