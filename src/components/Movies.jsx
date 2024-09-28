import React, { useState, useEffect, lazy, Suspense } from 'react';

// Lazy load the Modal for better performance
const LazyModal = lazy(() => import('../components/Modal'));

const Movies = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from local storage
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });
  const [filter, setFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(5); // Movies displayed per page

  const movies = [
    {
        title: 'Inception',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Sci-Fi',
        language: 'English',
        category: 'Hollywood',
        description: 'A thief who steals corporate secrets through dream-sharing technology.',
        rating: 8.8,
        synopsis: 'Inception explores the world of dreams and the mind.',
    },
    {
        title: 'Dilwale Dulhania Le Jayenge',
        imageUrl: '/src/assets/ddlj.jpg',
        genre: 'Romance',
        language: 'Hindi',
        category: 'Bollywood',
        description: 'Two young NRI’s fall in love in Europe and must convince their families to accept their love.',
        rating: 8.2,
        synopsis: 'An iconic Bollywood film that blends romance and drama.',
    },
    {
        title: 'The Dark Knight',
        imageUrl: '/src/assets/dk.png',
        genre: 'Action',
        language: 'English',
        category: 'Hollywood',
        description: 'The Joker wreaks havoc and chaos on Gotham City.',
        rating: 9.0,
        synopsis: 'Batman faces off against the Joker in this epic saga.',
    },
    {
        title: '3 Idiots',
        imageUrl: '/src/assets/3.jpg',
        genre: 'Comedy',
        language: 'Hindi',
        category: 'Bollywood',
        description: 'Three friends navigate the pressures of college life.',
        rating: 8.4,
        synopsis: 'A comedy-drama that showcases the Indian education system.',
    },
    {
        title: 'Interstellar',
        imageUrl: '/src/assets/inc.jpg',
        genre: 'Sci-Fi',
        language: 'English',
        category: 'Hollywood',
        description: 'A team of explorers travel through a wormhole in space.',
        rating: 8.6,
        synopsis: 'Exploring space to save humanity from extinction.',
    },
    {
        title: 'Kabir Singh',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Romance',
        language: 'Hindi',
        category: 'Bollywood',
        description: 'A self-destructive surgeon falls in love with his college mate.',
        rating: 7.1,
        synopsis: 'A love story that traverses the highs and lows of relationships.',
    },
    {
        title: 'Avengers: Endgame',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Action',
        language: 'English',
        category: 'Hollywood',
        description: 'The Avengers assemble to reverse the damage done by Thanos.',
        rating: 8.4,
        synopsis: 'The epic conclusion to the Infinity Saga.',
    },
    {
        title: 'Zindagi Na Milegi Dobara',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Drama',
        language: 'Hindi',
        category: 'Bollywood',
        description: 'Three friends discover the importance of friendship and living life to the fullest.',
        rating: 8.2,
        synopsis: 'A road trip that changes their lives forever.',
    },
    {
        title: 'Parasite',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Thriller',
        language: 'Korean',
        category: 'International',
        description: 'A poor family schemes to become employed by a wealthy family.',
        rating: 8.6,
        synopsis: 'A darkly comic take on class conflict.',
    },
    {
        title: 'The Godfather',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Crime',
        language: 'English',
        category: 'Hollywood',
        description: 'An organized crime dynasty’s aging patriarch transfers control to his reluctant son.',
        rating: 9.2,
        synopsis: 'A classic tale of crime and family.',
    },
    {
        title: 'Sholay',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Action',
        language: 'Hindi',
        category: 'Bollywood',
        description: 'Two criminals are hired to capture a ruthless bandit.',
        rating: 8.2,
        synopsis: 'A landmark film in Indian cinema.',
    },
    {
        title: 'Titanic',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Romance',
        language: 'English',
        category: 'Hollywood',
        description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist.',
        rating: 7.8,
        synopsis: 'A love story set against the backdrop of a historical tragedy.',
    },
    {
        title: 'Bajrangi Bhaijaan',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Drama',
        language: 'Hindi',
        category: 'Bollywood',
        description: 'A man embarks on a journey to reunite a mute girl with her family in Pakistan.',
        rating: 8.0,
        synopsis: 'A heartwarming tale of humanity and kindness.',
    },
    {
        title: 'The Matrix',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Sci-Fi',
        language: 'English',
        category: 'Hollywood',
        description: 'A computer hacker learns about the true nature of his reality.',
        rating: 8.7,
        synopsis: 'A groundbreaking film that explores virtual reality.',
    },
    {
        title: 'Dangal',
        imageUrl: '/src/assets/mh.jpg',
        genre: 'Biography',
        language: 'Hindi',
        category: 'Bollywood',
        description: 'A former wrestler trains his daughters to become world-class wrestlers.',
        rating: 8.8,
        synopsis: 'A story of determination and breaking stereotypes.',
    },
];

  

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.includes(movie.title)
      ? favorites.filter(fav => fav !== movie.title)
      : [...favorites, movie.title];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save to local storage
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleLanguageFilterChange = (e) => {
    setLanguageFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy === 'Title') {
      movies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Rating') {
      movies.sort((a, b) => b.rating - a.rating);
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies
    .filter(movie => (filter === 'All' || movie.genre === filter))
    .filter(movie => (languageFilter === 'All' || movie.language === languageFilter))
    .filter(movie => (categoryFilter === 'All' || movie.category === categoryFilter))
    .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstMovie, indexOfLastMovie); // Limit displayed movies based on pagination

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Movies</h1>

      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 bg-gray-800 text-white rounded"
        />
        <select value={filter} onChange={handleFilterChange} className="p-2 bg-gray-800 text-white ml-2 rounded">
          <option value="All">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
        </select>
        <select value={languageFilter} onChange={handleLanguageFilterChange} className="p-2 bg-gray-800 text-white ml-2 rounded">
          <option value="All">All Languages</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>
        <select value={categoryFilter} onChange={handleCategoryFilterChange} className="p-2 bg-gray-800 text-white ml-2 rounded">
          <option value="All">All Categories</option>
          <option value="Bollywood">Bollywood</option>
          <option value="Hollywood">Hollywood</option>
        </select>
        <select onChange={handleSortChange} className="p-2 bg-gray-800 text-white ml-2 rounded">
          <option value="Title">Sort by Title</option>
          <option value="Rating">Sort by Rating</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMovies.map((movie) => (
          <div
            key={movie.title}
            className="bg-gray-900 rounded-lg p-4 flex flex-col"
            onClick={() => openModal(movie)}
          >
            <img src={movie.imageUrl} alt={movie.title} className="rounded-lg mb-2" />
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <p className="text-sm">Rating: {movie.rating}</p>
            {/* Star Ratings */}
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={`text-yellow-500 ${index < Math.round(movie.rating) ? 'text-yellow-500' : 'text-gray-400'}`}>★</span>
              ))}
            </div>
            <button
              className={`mt-2 p-2 rounded ${favorites.includes(movie.title) ? 'bg-red-600' : 'bg-green-600'}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent modal from opening
                toggleFavorite(movie);
              }}
            >
              {favorites.includes(movie.title) ? 'Unfavorite' : 'Favorite'}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-gray-600 rounded-l"
        >
          Previous
        </button>
        <span className="p-2 bg-gray-800 text-white">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-600 rounded-r"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyModal movie={selectedMovie} onClose={closeModal} />
        </Suspense>
      )}
    </div>
  );
};

export default Movies;
