import React from 'react';

// Sample data for sports shows focusing on cricket, football, and badminton
const sportsShows = [
  {
    id: 1,
    title: 'Cricket World Cup 2023',
    description: 'Watch the live coverage of the Cricket World Cup 2023.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-1',
  },
  {
    id: 2,
    title: 'Football Champions League',
    description: 'Catch the action in the UEFA Champions League.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-2',
  },
  {
    id: 3,
    title: 'Badminton World Championship',
    description: 'Join us for the Badminton World Championship live.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-3',
  },
  {
    id: 4,
    title: 'IPL 2023 Highlights',
    description: 'Watch the best moments from IPL 2023.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-4',
  },
  {
    id: 5,
    title: 'FIFA World Cup 2022',
    description: 'Revisit the thrilling moments of FIFA World Cup 2022.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-5',
  },
  {
    id: 6,
    title: 'All England Open Badminton',
    description: 'Catch the live action of the All England Open.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-6',
  },
  {
    id: 7,
    title: 'Cricket T20 Blast',
    description: 'Enjoy the excitement of the T20 Blast matches.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-7',
  },
  {
    id: 8,
    title: 'La Liga Highlights',
    description: 'Catch the latest highlights from La Liga.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-8',
  },
  {
    id: 9,
    title: 'BWF Super Series',
    description: 'Join us for the BWF Super Series matches.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-9',
  },
  {
    id: 10,
    title: 'International Friendly Matches',
    description: 'Watch international friendly matches live.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-10',
  },
  {
    id: 11,
    title: 'Commonwealth Games Badminton',
    description: 'Follow the action from Commonwealth Games Badminton.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-11',
  },
  {
    id: 12,
    title: 'Premier League Live',
    description: 'Catch all the Premier League action live.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-12',
  },
  {
    id: 13,
    title: 'Asia Cup Cricket',
    description: 'Experience the excitement of the Asia Cup Cricket.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-13',
  },
  {
    id: 14,
    title: 'World Badminton Championship',
    description: 'Watch the World Badminton Championship live.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-14',
  },
  {
    id: 15,
    title: 'Football World Cup 2026',
    description: 'Get ready for the Football World Cup 2026.',
    imageUrl: '/src/assets/cr.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=your-video-url-15',
  },
];


const Sports = ({ openModal }) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Sports Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sportsShows.map((show) => (
          <div key={show.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img src={show.imageUrl} alt={show.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{show.title}</h2>
              <p className="text-gray-400">{show.description}</p>
              <button
                onClick={() => openModal(show.videoUrl)}
                className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sports;
