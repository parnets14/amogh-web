import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "AMG Performance Models",
      description: "Experience the pinnacle of automotive engineering with our high-performance lineup",
      image: "photo-1.jpg",
      cta: "Explore Models",
      link: "/models",
    },
    {
      id: 2,
      title: "Limited Edition Collection",
      description: "Exclusive limited-run vehicles for the discerning enthusiast",
      image: "photo-2.jpg",
      cta: "View Collection",
      link: "/limited-edition",
    },
    {
      id: 3,
      title: "AMG Driving Academy",
      description: "Master your skills with professional AMG driving instructors",
      image: "photo-3.jpg",
      cta: "Book Now",
      link: "/driving-academy",
    },
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goToSlide = (i) => setCurrentSlide(i);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
          }`}
        >
          {/* Background Image with Smooth Opacity Gradient */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                opacity: 1
              }}
            />
            {/* Opacity gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.3) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
              }}
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-30 h-full flex items-center px-6 lg:px-16">
            <div className="text-white max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl mb-6 drop-shadow-sm">
                {slide.description}
              </p>
              <Link
                to={slide.link}
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition-all duration-300 shadow-md"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === i ? 'bg-white w-6' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}