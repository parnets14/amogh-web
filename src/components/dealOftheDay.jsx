import axios from 'axios';
import React, { useState, useEffect } from 'react';

const OfferBanner = () => {

  const [offerBanners,setOfferBanners]=useState([])

const fetchAllOfferBanners = async () => {
  try {
    const res = await axios.get("http://localhost:5010/api/offer-banners");
    setOfferBanners(res.data);
   
  } catch (error) {
    console.error("Failed to fetch offer banners:", error);
  }
};



  const offers = [
    {
      title: offerBanners[0]?.title,
      description: offerBanners[0]?.description,
      cta: offerBanners[0]?.cta,
      link: '#',
      gradient: 'from-indigo-600 to-purple-600',
      image: `http://localhost:5010/uploads/offers/${offerBanners[0]?.image}`
    },
    {
      title: offerBanners[1]?.title,
      description: offerBanners[1]?.description,
      cta: offerBanners[1]?.cta,
      link: '#',
      gradient: 'from-teal-500 to-cyan-600',
      image: `http://localhost:5010/uploads/offers/${offerBanners[1]?.image}`
    },
    {
      title: offerBanners[2]?.title,
      description: offerBanners[2]?.description,
      cta: offerBanners[2]?.cta,
      link: '#',
      gradient: 'from-pink-500 to-rose-600',
      image: `http://localhost:5010/uploads/offers/${offerBanners[2]?.image}`
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(()=>{
    fetchAllOfferBanners();
  },[])

  return (
    <section className="relative h-120 bg-gray-100  px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`md:bg-gradient-to-r from-[#01A4D5]  bg-gradient-to-b from-[#01A4D5]  to-white text-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row`}>
                <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                    {offer.title}
                  </h2>
                  <p className="mt-4 text-base sm:text-lg md:text-xl text-white/90">
                    {offer.description}
                  </p>
                  <div className="mt-6">
                    <a
                      href={offer.link}
                      className="inline-block bg-white text-gray-900 font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
                    >
                      {offer.cta}
                    </a>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-900 p-2 rounded-full shadow-md hover:bg-white transition duration-300 z-10"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-900 p-2 rounded-full shadow-md hover:bg-white transition duration-300 z-10"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
              } transition duration-300`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;