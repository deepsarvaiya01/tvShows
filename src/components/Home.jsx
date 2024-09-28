import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import FeaturedContent from '../components/FeaturedContent';
import OnlineShows from '../components/OnlineShows';

const Home = ({ openModal }) => {
  return (
    <div>
      <HeroCarousel />
      <FeaturedContent openModal={openModal} />
      <OnlineShows openModal={openModal} />
    </div>
  );
};

export default Home;
