// components/Testimonials.jsx
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Anjali Sharma",
    feedback: "Easy to order and got genuine medicine with prescription validation. Quick delivery too!",
    avatar: "/avatars/anjali.jpg",
  },
  {
    id: 2,
    name: "Dr. Raj Verma",
    feedback: "Reliable pharmacy platform for my patients. Great support and product availability.",
    avatar: "/avatars/raj.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-10 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">💬 What Our Customers Say</h2>
      <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-lg shadow">
            <p className="italic text-gray-700 mb-4">"{t.feedback}"</p>
            <div className="flex items-center gap-4">
              <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
              <span className="font-medium">{t.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
