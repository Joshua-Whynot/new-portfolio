import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Navigation data structure
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' }
  ];
  
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <NavLink to="/" className="flex items-center py-5 px-2 text-white">
                <span className="font-bold text-xl">Portfolio</span>
              </NavLink>
            </div>
            
            {/* Desktop Navigation - Using map */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path}
                  to={item.path} 
                  className={({ isActive }) => 
                    isActive ? "py-5 px-3 text-white bg-gray-700" : "py-5 px-3 text-white hover:text-gray-300"
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-button p-2 rounded-md text-gray-400 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu - Using map */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        {navItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => 
              isActive ? "block py-2 px-4 text-sm text-white bg-gray-700" : "block py-2 px-4 text-sm text-white hover:bg-gray-700"
            }
            onClick={() => setIsOpen(false)} // Close mobile menu when item is clicked
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
