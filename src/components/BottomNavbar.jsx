import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTv, FaFilm, FaFutbol, FaPlay, FaBroadcastTower } from 'react-icons/fa'; // Importing from react-icons

const BottomNavbar = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="container mx-auto flex justify-around items-center py-3">
        
        {/* TV Shows Link */}
        <NavLink to="/tv-shows" className="flex flex-col items-center hover:text-red-500" activeClassName="text-red-500">
          <FaTv className="w-6 h-6" />
          <span className="text-sm">TV Shows</span>
        </NavLink>

        {/* Movies Link */}
        <NavLink to="/movies" className="flex flex-col items-center hover:text-red-500" activeClassName="text-red-500">
          <FaFilm className="w-6 h-6" />
          <span className="text-sm">Movies</span>
        </NavLink>

        {/* Sports Link */}
        <NavLink to="/sports" className="flex flex-col items-center hover:text-red-500" activeClassName="text-red-500">
          <FaFutbol className="w-6 h-6" /> {/* Using Font Awesome Futbol (Football) icon */}
          <span className="text-sm">Sports</span>
        </NavLink>

        {/* Series Link */}
        <NavLink to="/series" className="flex flex-col items-center hover:text-red-500" activeClassName="text-red-500">
          <FaPlay className="w-6 h-6" />
          <span className="text-sm">Series</span>
        </NavLink>

  
      </div>
    </nav>
  );
};

export default BottomNavbar;
