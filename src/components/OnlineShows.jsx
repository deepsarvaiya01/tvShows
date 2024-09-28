import React, { useState } from 'react';

const OnlineShows = ({ openModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Updated shows array with images
  const shows = [
    { title: 'Show 1', description: 'Description 1', category: 'Comedy', videoUrl: 'video1.mp4', imageUrl: '/src/assets/bb.jpg' },
    { title: 'Show 2', description: 'Description 2', category: 'Drama', videoUrl: 'video2.mp4', imageUrl: '/src/assets/sh.jpg' },
    { title: 'Show 3', description: 'Description 3', category: 'Action', videoUrl: 'video3.mp4', imageUrl: '/src/assets/mh.jpg' },
    { title: 'Show 4', description: 'Description 4', category: 'Comedy', videoUrl: 'video4.mp4', imageUrl: '/src/assets/tiger.jpg' },
  ];

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setFilterCategory(e.target.value);

  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!filterCategory || show.category === filterCategory)
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Online Shows</h2>

      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search shows..."
        className="w-full p-2 mb-4 border rounded-md bg-gray-800 text-gray-200"
      />

      {/* Filter by Category */}
      <select value={filterCategory} onChange={handleCategoryChange} className="mb-4 p-2 bg-gray-800 text-gray-200">
        <option value="">All Categories</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Action">Action</option>
      </select>

      {/* List of Shows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShows.length > 0 ? (
          filteredShows.map((show, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
              <img src={show.imageUrl} alt={show.title} className="w-64 h-48 object-cover rounded mb-2" /> {/* Adjusted size */}
              <h3 className="text-xl font-semibold mb-2">{show.title}</h3>
              <p className="text-center">{show.description}</p>
              <button
                onClick={() => openModal(show.videoUrl)}
                className="mt-2 px-4 py-2 bg-blue-600 rounded text-white"
              >
                Watch Now
              </button>
            </div>
          ))
        ) : (
          <p>No shows found</p>
        )}
      </div>
    </div>
  );
};

export default OnlineShows;
