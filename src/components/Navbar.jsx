import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

const Navbar = () => {
  return (
    <header className="fixed w-full bg-gray-800 shadow-lg z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">H&D Entertainment</h1>
        <ul className="flex space-x-6">
          {/* Use NavLink instead of <a> for Home */}
          <li>
            <NavLink
              to="/"
              className="flex flex-col items-center hover:text-red-500"
              activeClassName="text-red-500" // Highlight when active
            >
              <span className="text-sm">Home</span>
            </NavLink>
          </li>

          {/* Use NavLink for Schedule */}
          <li>
            <NavLink
              to="/schedule"
              className="flex flex-col items-center hover:text-red-500"
              activeClassName="text-red-500"
            >
              <span className="text-sm">Schedule</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
