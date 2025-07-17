// components/OfferCarousel.jsx
import React, { useState, useEffect } from "react";
import { FiClock, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const deals = [
  {
    id: 1,
    name: "Paracetamol 500mg (10 Tablets)",
    price: "₹45",
    originalPrice: "₹60",
    discount: "25% OFF",
    image: "/images/photo-1.jpg",
    expiry: "2025-12-31",
  },
  {
    id: 2,
    name: "Vitamin D Tablets (30 Capsules)",
    price: "₹120",
    originalPrice: "₹150",
    discount: "20% OFF",
    image: "/images/photo-2.jpg",
    expiry: "2025-12-31",
  },
  {
    id: 3,
    name: "Multivitamin Syrup 200ml",
    price: "₹199",
    originalPrice: "₹249",
    discount: "20% OFF",
    image: "/images/photo-3.jpg",
    expiry: "2025-12-31",
  },
  {
    id: 4,
    name: "Bandage 10pcs Pack",
    price: "₹85",
    originalPrice: "₹120",
    discount: "30% OFF",
    image: "/images/photo-4.jpg",
    expiry: "2025-12-31",
  },
];

export default function OfferCarousel() {
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 30, seconds: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Timer and auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { hours, minutes, seconds } = prev;
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { ...prev, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    const carouselTimer = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => {
      clearInterval(timer);
      clearInterval(carouselTimer);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % deals.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + deals.length) % deals.length);
  };

  return (
    <section className="w-screen bg-white relative overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#01A4D5]">🔥 Today’s Special Offers</h2>
          <p className="text-gray-600">Limited time, best prices!</p>
        </div>
        <div className="flex items-center bg-[#01A4D5] text-white px-6 py-3 rounded-full shadow">
          <FiClock className="text-xl mr-2" />
          <span className="font-semibold tracking-wider text-lg">
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full">
        <div className="flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="absolute left-4 z-10 bg-white shadow-md hover:bg-gray-100 border rounded-full p-2 text-[#01A4D5] transition"
          >
            <FiChevronLeft size={24} />
          </button>

          <div className="w-full overflow-hidden px-12">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${deals.length * 100}%`,
              }}
            >
              {deals.map((deal, index) => (
                <div key={deal.id} className="w-full md:w-1/3 px-6 flex-shrink-0">
                  <div className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                    <div className="relative h-48 bg-gray-50">
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="h-full w-full object-contain p-6"
                      />
                      <div className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                        {deal.discount}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/80 text-[#01A4D5] text-xs px-3 py-1 rounded-full shadow">
                        LIMITED OFFER
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">{deal.name}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#01A4D5] font-bold text-lg">{deal.price}</span>
                        <span className="line-through text-gray-400">{deal.originalPrice}</span>
                      </div>
                      <div className="mt-3 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#01A4D5] h-2 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 text-right mt-1">
                        {Math.floor(Math.random() * 20) + 5} left at this price
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-4 z-10 bg-white shadow-md hover:bg-gray-100 border rounded-full p-2 text-[#01A4D5] transition"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentIndex === index ? "bg-[#01A4D5] w-5" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
