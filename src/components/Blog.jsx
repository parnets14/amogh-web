// components/HealthTips.jsx
import React from "react";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    title: "5 Tips for Managing Diabetes Naturally",
    excerpt: "Learn how lifestyle changes and diet can help control diabetes effectively...",
    image: "/images/diabetes-tips.jpg",
  },
  {
    id: 2,
    title: "Importance of Regular Health Checkups",
    excerpt: "Preventive care can save lives. Know why routine tests are important...",
    image: "/images/health-checkup.jpg",
  },
];

export default function HealthTips() {
  return (
    <section className="py-10 bg-sky-50">
      <h2 className="text-2xl font-bold text-center mb-6">🧠 Health Tips & Articles</h2>
      <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
        {articles.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-600 text-sm my-2">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="text-blue-600 text-sm hover:underline">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
