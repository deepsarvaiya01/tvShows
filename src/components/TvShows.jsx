import React, { useState, lazy, Suspense } from 'react';

// Lazy load the Modal to improve performance
const LazyModal = lazy(() => import('../components/Modal'));

const TvShows = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [language, setLanguage] = useState('All');
  const [genre, setGenre] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Expanded list of TV shows with online images
  const shows = [
    {
      id: 1,
      name: 'Breaking Bad',
      genre: 'Drama',
      language: 'English',
      rating: 4.9,
      videoUrl: 'https://www.youtube.com/embed/1HJ4hP4W4H8',
      imageUrl: '/src/assets/mh.jpg', // Breaking Bad
    },
    {
      id: 2,
      name: 'Money Heist',
      genre: 'Action',
      language: 'Spanish',
      rating: 4.6,
      videoUrl: 'https://www.youtube.com/embed/1wS_Wg3jGqE',
      imageUrl: '/src/assets/bb.jpg', // Money Heist
    },
    {
      id: 3,
      name: 'Stranger Things',
      genre: 'Horror',
      language: 'English',
      rating: 4.7,
      videoUrl: 'https://www.youtube.com/embed/XW3nN0F4Y9k',
      imageUrl: '/src/assets/sh.jpg', // Stranger Things
    },
    {
      id: 4,
      name: 'Narcos',
      genre: 'Drama',
      language: 'English',
      rating: 4.8,
      videoUrl: 'https://www.youtube.com/embed/lOl1V1zQpLg',
      imageUrl: '/src/assets/tiger.jpg', // Narcos
    },
    {
      id: 5,
      name: 'The Crown',
      genre: 'Drama',
      language: 'English',
      rating: 4.6,
      videoUrl: 'https://www.youtube.com/embed/6Q1wU5qkJns',
      imageUrl: '/src/assets/sh.jpg', // The Crown
    },
    {
      id: 6,
      name: 'The Witcher',
      genre: 'Fantasy',
      language: 'English',
      rating: 4.5,
      videoUrl: 'https://www.youtube.com/embed/1jG9G8D6k5s',
      imageUrl: '/src/assets/bb.jpg', // The Witcher
    },
    {
      id: 7,
      name: 'Daredevil',
      genre: 'Action',
      language: 'English',
      rating: 4.7,
      videoUrl: 'https://www.youtube.com/embed/2Q4nS-JM6H4',
      imageUrl: '/src/assets/sh.jpg', // Daredevil
    },
    {
      id: 8,
      name: 'The Mandalorian',
      genre: 'Sci-Fi',
      language: 'English',
      rating: 4.8,
      videoUrl: 'https://www.youtube.com/embed/4wXl65P_tqM',
      imageUrl: '/src/assets/mh.jpg', // The Mandalorian
    },
    {
      id: 9,
      name: 'The Boys',
      genre: 'Action',
      language: 'English',
      rating: 4.7,
      videoUrl: 'https://www.youtube.com/embed/q1KXGQ-4tX8',
      imageUrl: '/src/assets/mh.jpg', // The Boys
    },
    {
      id: 10,
      name: 'Fargo',
      genre: 'Crime',
      language: 'English',
      rating: 4.6,
      videoUrl: 'https://www.youtube.com/embed/Us9m7K0Tu2I',
      imageUrl: '/src/assets/mh.jpg', // Fargo
    },
  ];
  

  const filteredShows = shows.filter(show => {
    const matchesLanguage = language === 'All' || show.language === language;
    const matchesGenre = genre === 'All' || show.genre === genre;
    const matchesSearch = show.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLanguage && matchesGenre && matchesSearch;
  });

  const openModal = (show) => {
    setSelectedShow(show);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedShow(null);
  };

  const toggleFavorite = (show) => {
    if (favorites.includes(show.id)) {
      setFavorites(favorites.filter(favId => favId !== show.id));
    } else {
      setFavorites([...favorites, show.id]);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">TV Shows</h1>

      {/* Filters */}
      <div className="mb-4 flex space-x-4">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-gray-800 p-2 rounded">
          <option value="All">All Languages</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
        </select>

        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="bg-gray-800 p-2 rounded">
          <option value="All">All Genres</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Action">Action</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Crime">Crime</option>
        </select>

        <input
          type="text"
          placeholder="Search Shows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 p-2 rounded text-white"
        />
      </div>

      {/* Featured Shows Section */}
      <h2 className="text-3xl font-bold mb-2">Featured Shows</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filteredShows.slice(0, 3).map((show) => (
          <div key={show.id} className="bg-gray-800 p-4 rounded-md shadow-md">
            <img src={show.imageUrl} alt={show.name} className="w-full h-48 object-cover rounded-md mb-2" />
            <h3 className="text-xl font-semibold">{show.name}</h3>
            <p className="text-sm">Genre: {show.genre}</p>
            <p className="text-sm">Language: {show.language}</p>
            <p className="text-sm">Rating: {show.rating} ★</p>
            <button onClick={() => openModal(show)} className="mt-2 bg-red-500 text-white rounded px-2 py-1">Watch Trailer</button>
          </div>
        ))}
      </div>

      {/* List of TV Shows */}
      <h2 className="text-3xl font-bold mb-2">All Shows</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredShows.map((show) => (
          <div key={show.id} className="bg-gray-700 p-4 rounded-md shadow-md cursor-pointer" onClick={() => openModal(show)}>
            <img src={show.imageUrl} alt={show.name} className="w-full h-48 object-cover rounded-md mb-2" />
            <h2 className="text-lg">{show.name}</h2>
            <p className="text-sm">Genre: {show.genre}</p>
            <p className="text-sm">Language: {show.language}</p>
            <p className="text-sm">Rating: {show.rating} ★</p>
            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(show); }} className={`mt-2 rounded px-2 py-1 ${favorites.includes(show.id) ? 'bg-yellow-400' : 'bg-gray-600'}`}>
              {favorites.includes(show.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Watching Trailer */}
      {isModalOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyModal show={isModalOpen} onClose={closeModal} videoUrl={selectedShow.videoUrl} title={selectedShow.name} />
        </Suspense>
      )}
    </div>
  );
};

export default TvShows;
