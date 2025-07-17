// components/TrustedBrands.jsx
import React from "react";

const brands = [
  { name: "Cipla", logo: "/logos/cipla.png" },
  { name: "Apollo", logo: "/logos/apollo.png" },
  { name: "Himalaya", logo: "/logos/himalaya.png" },
  { name: "Dr. Reddy's", logo: "/logos/drreddy.png" },
];

export default function TrustedBrands() {
  return (
    <section className="py-10 bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">🤝 Trusted by Top Medical Brands</h2>
      <div className="flex justify-center items-center flex-wrap gap-6 max-w-4xl mx-auto">
        {brands.map((brand) => (
          <img
            key={brand.name}
            src={brand.logo}
            alt={brand.name}
            className="h-16 object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </section>
  );
}
