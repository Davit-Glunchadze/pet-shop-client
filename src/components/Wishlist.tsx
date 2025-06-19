import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { removeFromWishlist, clearWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-toastify';

interface Animal {
  id: string;
  name: string;
  priceUSD: number;
  stock: number;
  imageUrl: string;
  category: string;
}

const Wishlist: React.FC = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/animals')
      .then(res => res.json())
      .then(data => {
        const flatAnimals = data.map((animal: any) => ({
          id: animal.id,
          ...animal.data[0],
        }));
        setAnimals(flatAnimals);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch animals:', err);
        setLoading(false);
      });
  }, []);

  const wishlistDetails = animals.filter(animal => wishlistItems.some(w => w.id === animal.id));

  const handleMoveToCart = (animal: Animal) => {
    if (animal.stock > 0) {
      dispatch(addToCart({ id: animal.id, stock: animal.stock }));
      dispatch(removeFromWishlist(animal.id));
      toast.success(`${animal.name} moved to cart`);
    } else {
      toast.error('Item out of stock, cannot add to cart');
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
    toast.info('Item removed from wishlist');
  };

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  return (
    <section style={{ padding: '2rem' }}>
      <h2 style={{ color: '#4A653E', fontWeight: 'bold', borderLeft: '4px solid #D18E00', paddingLeft: '0.5rem' }}>
        Your Wishlist
      </h2>
      {wishlistDetails.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {wishlistDetails.map(animal => (
            <li key={animal.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <img src={animal.imageUrl} alt={animal.name} style={{ width: '100px', borderRadius: '8px', marginRight: '1rem' }} />
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: 'bold', color: '#4A653E' }}>{animal.name} - {animal.category}</div>
                <div style={{ color: '#D18E00' }}>${animal.priceUSD.toFixed(2)}</div>
                <div>Stock: {animal.stock}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={() => handleMoveToCart(animal)}
                  style={{
                    backgroundColor: '#4A653E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                  }}
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => handleRemove(animal.id)}
                  style={{
                    backgroundColor: '#D18E00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Wishlist;
