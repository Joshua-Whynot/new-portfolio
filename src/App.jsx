import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Tools from './components/tools';
import BaseConverter from './components/baseconverter';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true' || 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('darkMode', 'true');
    } else {
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="bg-white dark:bg-gray-900 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/baseconverter" element={<BaseConverter />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;