import React, { useState, lazy, Suspense } from 'react';

// Sample data for Netflix series
const seriesList = [
    {
      id: 1,
      title: 'Stranger Things',
      description: 'A group of kids uncover supernatural mysteries in their small town.',
      imageUrl: '/src/assets/sh.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-url-1',
    },
    {
      id: 2,
      title: 'The Crown',
      description: 'The story of Queen Elizabeth II and the political rivalries of her reign.',
      imageUrl: '/src/assets/inc.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-url-2',
    },
    {
      id: 3,
      title: 'Money Heist',
      description: 'A criminal mastermind plans the biggest heist in recorded history.',
      imageUrl: '/src/assets/mh.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-url-3',
    },
    {
      id: 4,
      title: 'Bridgerton',
      description: 'A period drama that follows the Bridgerton family in Regency-era England.',
      imageUrl: '/src/assets/bb.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-url-4',
    },
    {
      id: 5,
      title: 'The Witcher',
      description: 'Geralt of Rivia, a monster hunter, struggles to find his place in a world where humans often prove more wicked than beasts.',
      imageUrl: '/src/assets/ddlj.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-url-5',
    },
    {
      id: 6,
      title: 'Ozark',
      description: 'A financial planner relocates his family to the Ozarks after a money-laundering scheme goes wrong.',
      imageUrl: '/src/assets/sh.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-url-6',
    },
    {
      id: 7,
      title: 'Narcos',
      description: 'The story of drug kingpins in Colombia and the law enforcement efforts to meet them.',
      imageUrl: '/src/assets/sh.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-url-7',
    },
    {
      id: 8,
      title: 'The Queen\'s Gambit',
      description: 'An orphaned chess prodigy rises to the top of the chess world while struggling with addiction.',
      imageUrl: '/src/assets/sh.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-url-8',
    },
    {
      id: 9,
      title: 'Sex Education',
      description: 'A teenage boy with a sex therapist mother teams up with a classmate to set up an underground sex therapy clinic at school.',
      imageUrl: '/src/assets/sh.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-url-9',
    },
    {
      id: 10,
      title: 'The Umbrella Academy',
      description: 'A dysfunctional family of adopted sibling superheroes reunite to solve the mystery of their father\'s death.',
      imageUrl: '/src/assets/sh.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-url-10',
    },
  ];

// Lazy load the Modal for better performance
const LazyModal = lazy(() => import('../components/Modal'));

const Series = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem('seriesFavorites')) || [];
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');

    const openModal = (series) => {
        setSelectedSeries(series);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedSeries(null);
    };

    const toggleFavorite = (series) => {
        if (favorites.includes(series.id)) {
            setFavorites(favorites.filter(id => id !== series.id));
        } else {
            setFavorites([...favorites, series.id]);
        }
        localStorage.setItem('seriesFavorites', JSON.stringify(favorites));
    };

    // Filter series based on search term and selected genre
    const filteredSeries = seriesList.filter(series => 
        (series.title.toLowerCase().includes(searchTerm.toLowerCase()) || series.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedGenre === 'All' || series.genre === selectedGenre)
    );

    return (
        <div className="p-20 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-white mb-4">Popular Series</h1>
            <input
                type="text"
                placeholder="Search series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded text-black"
            />
            <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="mb-4 p-2 border rounded text-black"
            >
                <option value="All">All</option>
                <option value="Hollywood">Hollywood</option>
                <option value="Bollywood">Bollywood</option>
            </select>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSeries.map((series) => (
                    <div key={series.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 p-4">
                        <img src={series.imageUrl} alt={series.title} className="w-full h-48 object-cover mb-4" />
                        <h2 className="text-xl font-semibold text-white">{series.title}</h2>
                        <p className="text-gray-400">{series.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => {
                                    toggleFavorite(series);
                                    openModal(series);
                                }}
                                className={`py-2 px-4 rounded ${favorites.includes(series.id) ? 'bg-red-600' : 'bg-blue-600'} hover:bg-blue-500 text-white font-bold`}
                            >
                                {favorites.includes(series.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                            </button>
                            <button
                                onClick={() => openModal(series)}
                                className="ml-2 py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded"
                            >
                                Watch Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        videoUrl={selectedSeries.videoUrl}
                        title={selectedSeries.title}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default Series;
