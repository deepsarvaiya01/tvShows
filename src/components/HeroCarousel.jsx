import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

const HeroCarousel = () => {
  const [swiper, setSwiper] = useState(null);
  const slides = [
    { 
      image: '/src/assets/tiger.jpg', 
      title: 'Tiger King: The Untamed Story', 
      description: 'Dive into the wild world of big cats and even bigger personalities'
    },
    { 
      image: '/src/assets/cricket.jpeg', 
      title: 'Highlight', 
      description: 'Day 4: India won by 101 Runs'
    },
    { 
      image: '/src/assets/mh.jpg', 
      title: 'Money Heist', 
      description: 'Follow the extraordinary journey of Daring people'
    },
  ];

  return (
    <section id="home" className="h-screen relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onSwiper={setSwiper}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-screen bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end items-start text-left p-8 md:p-16 lg:p-24">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 drop-shadow-lg">
                    {slide.description}
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-lg">
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button 
        onClick={() => swiper?.slidePrev()} 
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition duration-300"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button 
        onClick={() => swiper?.slideNext()} 
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition duration-300"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>
    </section>
  );
};

export default HeroCarousel;