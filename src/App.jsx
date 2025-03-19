import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Tools from './components/tools';
import BaseConverter from './components/tools/baseconverter';
import Background from './components/background'; 

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
    <div className="relative"> 
      <div className="fixed inset-0 z-0">
        <Background /> {/* background animation entry points */}
      </div>
      
      <div className={`${darkMode ? "dark" : ""} relative z-10 min-h-screen`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="container mx-auto px-4 py-8">
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