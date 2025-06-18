import React, { useState } from 'react';

interface Slide {
  image: string;
  title: string;
  description: string;
}

// Home page photo slider 

const slides: Slide[] = [
  {
    image: '',
    title: 'Charlie - Bird',
    description: 'Charlie is a stunning Macaw with vibrant colors.',
  },
  {
    image: '',
    title: 'Buddy - Dog',
    description: 'Buddy is a playful dog who loves to run.',
  },
  {
    image: '',
    title: 'Mittens - Cat',
    description: 'Mittens is a curious cat who loves to explore.',
  },
];

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div style={{ width: '100%', margin: '2rem 0', position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
      {slides[current].image ? (
        <img src={slides[current].image} alt={slides[current].title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
      ) : (
        <div style={{ width: '100%', height: '400px', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#666' }}>
          No Image
        </div>
      )}
      <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '1rem' }}>
        <h3 style={{ margin: 0 }}>{slides[current].title}</h3>
        <p style={{ margin: 0 }}>{slides[current].description}</p>
      </div>
      <button onClick={prevSlide} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', color: 'white', width: '30px', height: '30px', cursor: 'pointer' }}>{'<'}</button>
      <button onClick={nextSlide} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.3)', border: 'none', borderRadius: '50%', color: 'white', width: '30px', height: '30px', cursor: 'pointer' }}>{'>'}</button>
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '5px' }}>
        {slides.map((_, index) => (
          <div key={index} onClick={() => setCurrent(index)} style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: current === index ? '#d18e00' : '#ccc',
            cursor: 'pointer'
          }} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
