import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Navigation data structure
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
    { name: 'Tools', path: '/tools'}
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <nav className="bg-transparent shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo on the left */}
          <div>
            <NavLink to="/" className="flex items-center py-5 px-2 text-white">
              <span className="font-bold text-xl">Portfolio</span>
            </NavLink>
          </div>
          
          {/* Navigation items on the right */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path}
                  to={item.path} 
                  className={({ isActive }) => 
                    isActive 
                      ? "py-2 px-3 text-white font-medium border-b-2 border-white" 
                      : "py-2 px-3 text-gray-300 hover:text-white"
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-800 shadow-lg`}>
        {navItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => 
              isActive 
                ? "block py-2 px-4 text-sm text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700" 
                : "block py-2 px-4 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;