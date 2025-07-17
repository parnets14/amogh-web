import { Link } from "react-router-dom";
import { Heart, Award, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Quality Care",
      description: "Delivering state-of-the-art medical equipment to enhance patient outcomes.",
    },
    {
      icon: Award,
      title: "Innovation",
      description: "Pioneering advanced technologies for precise diagnostics and treatment.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Providing exceptional support and tailored solutions for healthcare professionals.",
    },
  ];

  const team = [
    { name: "Dr. Jane Smith", role: "Chief Medical Officer", image: "https://via.placeholder.com/150?text=Jane" },
    { name: "John Doe", role: "Lead Engineer", image: "https://via.placeholder.com/150?text=John" },
    { name: "Sarah Lee", role: "Customer Success Manager", image: "https://via.placeholder.com/150?text=Sarah" },
  ];

  return (
    <div className="w-full py-10 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-4" aria-label="About Our Company">
          About Us
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          We are a leading provider of cutting-edge medical equipment, dedicated to empowering healthcare professionals with innovative tools to improve patient care.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded-md transition-all duration-200 hover:shadow-sm"
          aria-label="Shop our medical products"
        >
          Shop Now <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h2>
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
          <p className="text-xs text-gray-600">
            Our mission is to revolutionize healthcare by providing reliable, high-performance medical equipment that enables accurate diagnostics and efficient workflows. We strive to support medical professionals with innovative solutions that enhance patient outcomes and advance clinical research.
          </p>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-lg shadow-md border border-gray-100 p-4 hover:shadow-xl transition-all duration-200"
            >
              <value.icon className="w-6 h-6 text-indigo-500 mb-3" />
              <h3 className="text-base font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-xs text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              className="bg-white rounded-lg shadow-md border border-gray-100 p-4 text-center hover:shadow-xl transition-all duration-200"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                loading="lazy"
              />
              <h3 className="text-base font-semibold text-gray-900">{member.name}</h3>
              <p className="text-xs text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}