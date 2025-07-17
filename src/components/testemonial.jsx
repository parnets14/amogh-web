import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Anjali Sharma",
    role: "Regular Customer",
    feedback: "Easy to order and got genuine medicine with prescription validation. Quick delivery too!",
    avatar: "/avatars/anjali.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Dr. Raj Verma",
    role: "Medical Practitioner",
    feedback: "Reliable pharmacy platform for my patients. Great support and product availability.",
    avatar: "/avatars/raj.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Senior Citizen",
    feedback: "The home delivery service is a lifesaver for someone like me who can't visit pharmacies easily.",
    avatar: "/avatars/priya.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Rahul Mehta",
    role: "Caregiver",
    feedback: "Excellent customer service and fast prescription processing. Very convenient platform.",
    avatar: "/avatars/rahul.jpg",
    rating: 4,
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#01A4D5] mb-4">Trusted by Customers & Professionals</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community has to say about their experiences.
          </p>
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="bg-white p-6 rounded-xl shadow-md h-full">
                    <StarRating rating={testimonial.rating} />
                    <blockquote className="mt-3 text-gray-600 text-sm italic">
                      "{testimonial.feedback}"
                    </blockquote>
                    <div className="mt-4 flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#01A4D5]"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                        <p className="text-xs text-[#01A4D5]">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <ChevronLeft className="w-5 h-5 text-[#01A4D5]" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          >
            <ChevronRight className="w-5 h-5 text-[#01A4D5]" />
          </button>
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full ${activeIndex === index ? 'bg-[#01A4D5]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
            >
              <StarRating rating={testimonial.rating} />
              <blockquote className="mt-3 text-gray-600 text-sm italic flex-grow">
                "{testimonial.feedback}"
              </blockquote>
              <div className="mt-4 flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#01A4D5]"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-[#01A4D5]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}