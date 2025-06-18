import React from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import PetList from './components/PetList';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Carousel />
      <PetList />
      <Footer />
    </>
  );
}

export default App;
