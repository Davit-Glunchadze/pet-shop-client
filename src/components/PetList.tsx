import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';

interface Animal {
  id: string;
  name: string;
  priceUSD: number;
  priceGEL: number;
  description: string;
  isPopular: boolean;
  stock: number;
  imageUrl: string;
  category: string;
}

const PetList: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/db.json')
      .then(res => res.json())
      .then(data => {
        
        const flatAnimals = data.animals.map((animal: any) => ({
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

  if (loading) {
    return <p>Loading animals...</p>;
  }

  return (
    <section style={{ width: '100%', margin: '2rem 0', boxSizing: 'border-box' }}>
      <h2 style={{ color: '#4a653e', fontWeight: 'bold', borderLeft: '4px solid #d18e00', paddingLeft: '0.5rem' }}>Our Pets</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {animals.map(animal => (
          <PetCard
            key={animal.id}
            image={animal.imageUrl}
            name={animal.name}
            type={animal.category}
            price={animal.priceUSD}
            outOfStock={animal.stock === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default PetList;
