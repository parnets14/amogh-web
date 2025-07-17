import React, { useState } from "react";

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
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Customers & Professionals</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community has to say about their experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-white p-8 rounded-xl shadow-lg transition-all duration-300 ${activeTestimonial === index ? 'ring-2 ring-indigo-500 scale-105' : 'opacity-90 hover:opacity-100'}`}
              onMouseEnter={() => setActiveTestimonial(index)}
            >
              <StarRating rating={testimonial.rating} />
              <blockquote className="mt-4 text-gray-600 italic">
                "{testimonial.feedback}"
              </blockquote>
              <div className="mt-6 flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
                />
                <div className="ml-4">
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-indigo-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${activeTestimonial === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}