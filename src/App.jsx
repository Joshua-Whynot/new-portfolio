import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Tools from './components/tools';
import BaseConverter from './components/baseconverter';

function App() {
  return (
    <div className="min-h-screen bg-pagebg">
      <Navbar />
      <main className="container mx-auto px-4 py-8 text-lighttext">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/baseconverter" element={<BaseConverter />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;