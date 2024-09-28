import React from 'react';

const FeaturedContent = ({ openModal }) => {
  const featuredShows = [
    {
      title: 'Nature Documentary',
      thumbnail: '/src/assets/mh.jpg', // Real thumbnail
      videoUrl: 'https://www.youtube.com/embed/5qap5aO4i9s', // Real video link
    },
    {
      title: 'Space Exploration',
      thumbnail: '/src/assets/bb.jpg', // Real thumbnail
      videoUrl: 'https://www.youtube.com/embed/1z6ld6Ue8gA', // Real video link
    },
    {
      title: 'Tech Talk',
      thumbnail: '/src/assets/tiger.jpg', // Real thumbnail
      videoUrl: 'https://www.youtube.com/embed/Jt9x8ACjBzI', // Real video link
    },
    {
      title: 'Historical Event',
      thumbnail: '/src/assets/sh.jpg', // Real thumbnail
      videoUrl: 'https://www.youtube.com/embed/4qkaV3Ehb8g', // Real video link
    },
  ];

  return (
    <section id="shows" className="py-16 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Featured Shows
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredShows.map((show, index) => (
            <div
              key={index}
              className="group relative bg-gray-800 rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 shadow-lg hover:shadow-glow"
            >
              <img
                src={show.thumbnail}
                alt={show.title}
                className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110 cursor-pointer"
                onClick={() => openModal(show.videoUrl)} // Open modal with video
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0 -translate-y-4">
                <p className="text-xl font-semibold text-white tracking-wide px-4 text-center">
                  {show.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
