import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Droplet, 
  Microscope, 
  HeartPulse, 
  Brain, 
  TestTube2,
  Shield,
  Activity,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Memoized static data
const medicalCategories = [
  {
    name: "Clinical Chemistry",
    icon: TestTube2,
    image: "photo-1.jpg",
    color: "from-indigo-500 to-blue-500",
    products: 42
  },
  {
    name: "Hematology",
    icon: Droplet,
    image: "photo-2.jpg",
    color: "from-red-500 to-pink-500",
    products: 28
  },
  {
    name: "Immunoassay",
    icon: Microscope,
    image: "photo-3.jpg",
    color: "from-green-500 to-teal-500",
    products: 35
  },
  {
    name: "Cardiology",
    icon: HeartPulse,
    image: "photo-4.jpg",
    color: "from-[#01A4D5] to-blue-400",
    products: 16
  },
  {
    name: "Neurology",
    icon: Brain,
    image: "photo-2.jpg",
    color: "from-amber-500 to-orange-500",
    products: 12
  },
];

const features = [
  {
    title: "Cutting-Edge Technology",
    description: "Our devices incorporate the latest medical innovations",
    icon: Zap
  },
  {
    title: "Certified Quality",
    description: "All products meet international medical standards",
    icon: Shield
  },
  {
    title: "Precision Results",
    description: "Accurate diagnostics for better patient outcomes",
    icon: Activity
  }
];

// Memoized animation variants
const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const slideVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

// Memoized components
const CategoryButton = ({ category, index, activeIndex, onClick, onMouseEnter, onMouseLeave }) => {
  const isActive = activeIndex === index;
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium transition-all duration-300 ${
        isActive 
          ? `text-white bg-gradient-to-r rounded-xl ${category.color}`
          : 'text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-100'
      }`}
    >
      {isActive && (
        <motion.span 
          layoutId="activeCategory"
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.color}`}
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center">
        <category.icon className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
        {category.name}
      </span>
    </button>
  );
};

const FeatureCard = ({ feature, index, activeColor }) => (
  <motion.div
    initial={fadeInVariants.initial}
    animate={fadeInVariants.animate}
    transition={{ delay: 0.1 * index }}
    className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
  >
    <div className="flex items-start">
      <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-r ${activeColor} mr-3 md:mr-4`}>
        <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </div>
      <div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
        <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
      </div>
    </div>
  </motion.div>
);

const CategoryCard = ({ category, index }) => (
  <motion.div
    key={category.name}
    whileHover={{ y: -5 }}
    className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
    <img
      src={`${category.image}?w=600&auto=format&fit=crop`}
      alt={category.name}
      className="w-full h-36 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
    />
    <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20 w-full">
      <h3 className="text-base md:text-lg font-bold text-white mb-1">{category.name}</h3>
      <p className="text-gray-200 text-xs md:text-sm mb-2 md:mb-3">{category.products} products available</p>
      <Link
        to={`/allproduct?category=${category.name}`}
        className="inline-flex items-center text-xs md:text-sm font-medium text-white hover:underline"
      >
        View all
        <ArrowRight className="ml-1 w-3 h-3 md:w-4 md:h-4" />
      </Link>
    </div>
  </motion.div>
);

export default function MedicalShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Memoized handlers
  const handleCategoryClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleMouseEnter = useCallback((index) => {
    setHoveredCategory(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  // Memoized active category
  const activeCategory = useMemo(() => medicalCategories[activeIndex], [activeIndex]);

  // Optimized interval effect
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % medicalCategories.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Memoized image URL
  const featuredImageUrl = useMemo(() => 
    `${activeCategory.image}?w=1200&auto=format&fit=crop`, 
    [activeCategory.image]
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 w-64 h-64 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-[#01A4D5]/20 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with animated text */}
        <motion.div 
          initial={fadeInVariants.initial}
          animate={fadeInVariants.animate}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01A4D5] to-blue-500">Healthcare</span> Through Innovation
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our advanced medical equipment designed for precision diagnostics
          </p>
        </motion.div>

        {/* Interactive category selector */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm border border-gray-200">
            {medicalCategories.map((category, index) => (
              <CategoryButton
                key={category.name}
                category={category}
                index={index}
                activeIndex={activeIndex}
                onClick={() => handleCategoryClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>

        {/* Main showcase area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Featured category card */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={slideVariants.initial}
                animate={slideVariants.animate}
                exit={slideVariants.exit}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <div className="relative h-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
                  <img
                    src={featuredImageUrl}
                    alt={activeCategory.name}
                    className="w-full h-64 sm:h-80 md:h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold mb-2 md:mb-3"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {activeCategory.name} Equipment
                    </motion.h3>
                    <motion.p 
                      className="text-base md:text-lg mb-4 md:mb-6 max-w-lg"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {activeCategory.products}+ advanced devices for precise diagnostics
                    </motion.p>
                    <motion.div
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        to={`/allproduct?category=${activeCategory.name}`}
                        className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Explore Collection
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Features list */}
          <div className="space-y-4 md:space-y-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
                activeColor={activeCategory.color}
              />
            ))}

            {/* Quick stats */}
            <motion.div
              initial={fadeInVariants.initial}
              animate={fadeInVariants.animate}
              transition={{ delay: 0.4 }}
              className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm border border-gray-100"
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Why Choose Us</h3>
              <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-[#01A4D5]">200+</div>
                  <div className="text-xs md:text-sm text-gray-500">Products</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-red-500">50+</div>
                  <div className="text-xs md:text-sm text-gray-500">Countries</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-[#01A4D5]">24/7</div>
                  <div className="text-xs md:text-sm text-gray-500">Support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Category grid */}
        <div className="">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Browse All Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {medicalCategories.map((category, index) => (
              <CategoryCard key={category.name} category={category} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}