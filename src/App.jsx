import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Tools from './components/tools'


function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Add your routes here */}
          <Route path="/" element={<Hero />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </main>
    </>
  );
}

export default App;