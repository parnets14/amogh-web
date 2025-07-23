
// import { useState, useEffect, useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   TestTube2,
//   Droplet,
//   Microscope,
//   HeartPulse,
//   Brain,
//   Shield,
//   Activity,
//   Zap,
//   ArrowRight
// } from 'lucide-react';
// import axios from 'axios';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// // Custom Arrow Components
// const SampleNextArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} !flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 before:hidden`}
//       style={{ ...style, right: '-15px', zIndex: 1 }}
//       onClick={onClick}
//     >
//       <ArrowRight className="w-5 h-5 text-gray-700" />
//     </div>
//   );
// };

// const SamplePrevArrow = (props) => {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} !flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 before:hidden`}
//       style={{ ...style, left: '-15px', zIndex: 1 }}
//       onClick={onClick}
//     >
//       <ArrowRight className="w-5 h-5 text-gray-700 transform rotate-180" />
//     </div>
//   );
// };

// const DEFAULT_ICONS = {
//   TestTube2,
//   Droplet,
//   Microscope,
//   HeartPulse,
//   Brain,
//   Shield,
//   Activity,
//   Zap
// };

// const CATEGORY_COLORS = [
//   "from-indigo-500 to-blue-500",
//   "from-red-500 to-pink-500",
//   "from-green-500 to-teal-500",
//   "from-[#01A4D5] to-blue-400",
//   "from-amber-500 to-orange-500",
//   "from-purple-500 to-pink-500",
//   "from-cyan-500 to-blue-500",
//   "from-lime-500 to-green-500"
// ];

// export default function MedicalShowcase() {
//   const navigate = useNavigate();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hoveredCategory, setHoveredCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [features, setFeatures] = useState([]);

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const [categoriesRes, featuresRes] = await Promise.all([
//         axios.get('http://localhost:5010/api/categories'),
//         axios.get('http://localhost:5010/api/features')
//       ]);

//       setCategories(categoriesRes.data);
//       setFeatures(featuresRes.data);
//     } catch (err) {
//       console.error('Failed to fetch data:', err);
//       setError('Failed to load data. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const medicalCategories = useMemo(() => {
//     if (categories.length === 0) {
//       return [
//         {
//           name: "Pathology",
//           icon: TestTube2,
//           image: "/placeholder-pathology.jpg",
//           color: CATEGORY_COLORS[0],
//           description: "Advanced pathology testing equipment",
//           products: 122,
//           slug: "pathology"
//         },
//         {
//           name: "Hematology",
//           icon: Droplet,
//           image: "/placeholder-hematology.jpg",
//           color: CATEGORY_COLORS[1],
//           description: "Complete blood analysis systems",
//           products: 89,
//           slug: "hematology"
//         },
//         {
//           name: "Microbiology",
//           icon: Microscope,
//           image: "/placeholder-microbiology.jpg",
//           color: CATEGORY_COLORS[2],
//           description: "Microorganism detection and analysis",
//           products: 76,
//           slug: "microbiology"
//         },
//         {
//           name: "Cardiology",
//           icon: HeartPulse,
//           image: "/placeholder-cardiology.jpg",
//           color: CATEGORY_COLORS[3],
//           description: "Heart health monitoring devices",
//           products: 104,
//           slug: "cardiology"
//         },
//         {
//           name: "Neurology",
//           icon: Brain,
//           image: "/placeholder-neurology.jpg",
//           color: CATEGORY_COLORS[4],
//           description: "Brain and nervous system diagnostics",
//           products: 67,
//           slug: "neurology"
//         }
//       ];
//     }
    
//     return categories.map((category, index) => {
//       const IconComponent = DEFAULT_ICONS[category.icon] || TestTube2;
//       const colorIndex = index % CATEGORY_COLORS.length;

//       return {
//         name: category.name || `Category ${index + 1}`,
//         icon: IconComponent,
//         image: category.image ? `http://localhost:5010${category.image}` : `/placeholder-${category.name?.toLowerCase() || 'default'}.jpg`,
//         color: CATEGORY_COLORS[colorIndex],
//         description: category.description || `Premium ${category.name} equipment`,
//         products: category.products || Math.floor(Math.random() * 100) + 10,
//         slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-')
//       };
//     });
//   }, [categories]);

//   const memoizedFeatures = useMemo(() => {
//     if (features.length === 0) {
//       return [
//         {
//           title: "Fast Results",
//           description: "Get accurate test results in record time",
//           icon: Zap
//         },
//         {
//           title: "Quality Assurance",
//           description: "Certified and reliable medical equipment",
//           icon: Shield
//         },
//         {
//           title: "Advanced Analytics",
//           description: "Comprehensive data analysis tools",
//           icon: Activity
//         }
//       ];
//     }

//     return features.map((feature, index) => {
//       let IconComponent = DEFAULT_ICONS[feature.icon] || DEFAULT_ICONS['Zap'];

//       return {
//         title: feature.title || `Feature ${index + 1}`,
//         description: feature.description || `Premium feature description ${index + 1}`,
//         icon: IconComponent
//       };
//     });
//   }, [features]);

//   const activeCategory = useMemo(() => medicalCategories[activeIndex], [activeIndex, medicalCategories]);

//   useEffect(() => {
//     if (medicalCategories.length > 1) {
//       const interval = setInterval(() => {
//         setActiveIndex((prev) => (prev + 1) % medicalCategories.length);
//       }, 5000);

//       return () => clearInterval(interval);
//     }
//   }, [medicalCategories.length]);

//   const sliderSettings = {
//     dots: false,
//     infinite: false,
//     speed: 400,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           arrows: true
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           arrows: false
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           arrows: false
//         },
//       },
//     ],
//   };

//   const categorySliderSettings = {
//     ...sliderSettings,
//     slidesToShow: Math.min(medicalCategories.length, 5),
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: Math.min(medicalCategories.length, 4),
//           arrows: true
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: Math.min(medicalCategories.length, 3),
//           arrows: false
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: Math.min(medicalCategories.length, 2),
//           arrows: false
//         },
//       },
//     ],
//   };

//   const navigateToCategoryProducts = useCallback((slug) => {
//     navigate(`/allproducts?category=${slug}`);
//   }, [navigate]);

//   const navigateToAllProducts = useCallback(() => {
//     navigate('/allproducts');
//   }, [navigate]);

//   const handleCategoryClick = useCallback((index) => {
//     setActiveIndex(index);
//   }, []);

//   const handleMouseEnter = useCallback((index) => {
//     setHoveredCategory(index);
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     setHoveredCategory(null);
//   }, []);

//   const CategoryButton = ({ category, index, activeIndex, onClick, onMouseEnter, onMouseLeave }) => {
//     const isActive = activeIndex === index;

//     return (
//       <button
//         onClick={() => onClick(index)}
//         onMouseEnter={() => onMouseEnter(index)}
//         onMouseLeave={onMouseLeave}
//         className={`w-full px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
//           isActive
//             ? `text-white bg-gradient-to-r rounded-xl ${category.color}`
//             : 'text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-100'
//         }`}
//       >
//         <span className="relative z-10 flex items-center justify-center gap-1">
//           <category.icon className="w-3 h-3 md:w-4 md:h-4" />
//           {category.name}
//         </span>
//       </button>
//     );
//   };

//   const FeatureCard = ({ feature, activeColor }) => (
//     <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
//       <div className="flex items-start">
//         <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-r ${activeColor} mr-3 md:mr-4`}>
//           <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
//         </div>
//         <div>
//           <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
//           <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
//         </div>
//       </div>
//     </div>
//   );

//   const CategoryCard = ({ category }) => (
//     <div
//       className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 duration-300 cursor-pointer"
//       onClick={() => navigateToCategoryProducts(category.slug)}
//     >
//       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
//       <div className="aspect-[4/3] overflow-hidden">
//         <img
//           src={category.image}
//           alt={category.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           loading="lazy"
//         />
//       </div>
//       <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20 w-full">
//         <h3 className="text-base md:text-lg font-bold text-white mb-1">{category.name}</h3>
//         <p className="text-gray-200 text-xs md:text-sm mb-2 md:mb-3">{category.products} products available</p>
//         <button
//           className="inline-flex items-center text-xs md:text-sm font-medium text-white hover:underline"
//           onClick={(e) => {
//             e.stopPropagation();
//             navigateToCategoryProducts(category.slug);
//           }}
//         >
//           View all
//           <ArrowRight className="ml-1 w-3 h-3 md:w-4 md:h-4" />
//         </button>
//       </div>
//     </div>
//   );

//   if (loading && categories.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#01A4D5]"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen text-center p-4">
//         <div className="text-red-500 mb-4 text-2xl">⚠️</div>
//         <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
//         <p className="text-gray-600 mb-4">{error}</p>
//         <button
//           onClick={fetchData}
//           className="px-4 py-2 bg-[#01A4D5] text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -right-32 -top-32 w-64 h-64 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
//         <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-[#01A4D5]/20 rounded-full opacity-20 blur-3xl"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="text-center mb-12 md:mb-16">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01A4D5] to-blue-500 animate-pulse">Healthcare</span> Through Innovation
//           </h2>
//           <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//             Discover our advanced medical equipment designed for precision diagnostics
//           </p>
//         </div>

//         {/* SLIDER FOR CATEGORY BUTTONS */}
//         <div className="mb-8 md:mb-12">
//           <Slider {...categorySliderSettings}>
//             {medicalCategories.map((category, index) => (
//               <div key={`cat-btn-${index}`} className="px-1">
//                 <CategoryButton
//                   category={category}
//                   index={index}
//                   activeIndex={activeIndex}
//                   onClick={handleCategoryClick}
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
//           <div className="lg:col-span-2">
//             <div className="relative h-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
//               <div className="aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/10] xl:aspect-[3/2] relative overflow-hidden">
//                 <img
//                   src={activeCategory.image}
//                   alt={activeCategory.name}
//                   className="w-full h-full object-cover transition-all duration-500"
//                   loading="eager"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
//                 <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
//                   <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">
//                     {activeCategory.name} Equipment
//                   </h3>
//                   <p className="text-base md:text-lg mb-4 md:mb-6 max-w-lg">
//                     {activeCategory.products}+ {activeCategory.description}
//                   </p>
//                   <div>
//                     <button 
//                       className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
//                       onClick={() => navigateToCategoryProducts(activeCategory.slug)}
//                     >
//                       Explore Collection
//                       <ArrowRight className="ml-2 w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4 md:space-y-6">
//             {memoizedFeatures.map((feature, index) => (
//               <FeatureCard
//                 key={`${feature.title}-${index}`}
//                 feature={feature}
//                 index={index}
//                 activeColor={activeCategory.color}
//               />
//             ))}

//             <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
//               <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Why Choose Us</h3>
//               <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
//                 <div>
//                   <div className="text-xl md:text-2xl font-bold text-[#01A4D5]">200+</div>
//                   <div className="text-xs md:text-sm text-gray-500">Products</div>
//                 </div>
//                 <div>
//                   <div className="text-xl md:text-2xl font-bold text-red-500">50+</div>
//                   <div className="text-xs md:text-sm text-gray-500">Countries</div>
//                 </div>
//                 <div>
//                   <div className="text-xl md:text-2xl font-bold text-[#01A4D5]">24/7</div>
//                   <div className="text-xs md:text-sm text-gray-500">Support</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mb-12 md:mb-16">
//           <div className="flex justify-between items-center mb-6 md:mb-8">
//             <h3 className="text-xl md:text-2xl font-bold text-gray-900">Browse All Categories</h3>
//             <button 
//               onClick={navigateToAllProducts}
//               className="text-sm md:text-base font-medium text-[#01A4D5] hover:underline flex items-center"
//             >
//               View all categories
//               <ArrowRight className="ml-1 w-4 h-4" />
//             </button>
//           </div>
          
//           <Slider {...sliderSettings} className="category-slider">
//             {medicalCategories.map((category, index) => (
//               <div key={`slider-${category.name}-${index}`} className="px-2">
//                 <CategoryCard category={category} index={index} />
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TestTube2,
  Droplet,
  Microscope,
  HeartPulse,
  Brain,
  Shield,
  Activity,
  Zap,
  ArrowRight
} from 'lucide-react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom Arrow Components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 before:hidden`}
      style={{ ...style, right: '-15px', zIndex: 1 }}
      onClick={onClick}
    >
      <ArrowRight className="w-5 h-5 text-gray-700" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} !flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 before:hidden`}
      style={{ ...style, left: '-15px', zIndex: 1 }}
      onClick={onClick}
    >
      <ArrowRight className="w-5 h-5 text-gray-700 transform rotate-180" />
    </div>
  );
};

const DEFAULT_ICONS = {
  TestTube2,
  Droplet,
  Microscope,
  HeartPulse,
  Brain,
  Shield,
  Activity,
  Zap
};

const CATEGORY_COLORS = [
  "from-indigo-500 to-blue-500",
  "from-red-500 to-pink-500",
  "from-green-500 to-teal-500",
  "from-[#01A4D5] to-blue-400",
  "from-amber-500 to-orange-500",
  "from-purple-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-lime-500 to-green-500"
];

export default function MedicalShowcase() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesRes, featuresRes] = await Promise.all([
        axios.get('http://localhost:5010/api/categories'),
        axios.get('http://localhost:5010/api/features')
      ]);

      setCategories(categoriesRes.data);
      setFeatures(featuresRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const medicalCategories = useMemo(() => {
    if (categories.length === 0) {
      return [
        {
          name: "Pathology",
          icon: TestTube2,
          image: "/placeholder-pathology.jpg",
          color: CATEGORY_COLORS[0],
          description: "Advanced pathology testing equipment",
          products: 122,
          slug: "pathology",
          id: "pathology"
        },
        {
          name: "Hematology",
          icon: Droplet,
          image: "/placeholder-hematology.jpg",
          color: CATEGORY_COLORS[1],
          description: "Complete blood analysis systems",
          products: 89,
          slug: "hematology",
          id: "hematology"
        },
        {
          name: "Microbiology",
          icon: Microscope,
          image: "/placeholder-microbiology.jpg",
          color: CATEGORY_COLORS[2],
          description: "Microorganism detection and analysis",
          products: 76,
          slug: "microbiology",
          id: "microbiology"
        },
        {
          name: "Cardiology",
          icon: HeartPulse,
          image: "/placeholder-cardiology.jpg",
          color: CATEGORY_COLORS[3],
          description: "Heart health monitoring devices",
          products: 104,
          slug: "cardiology",
          id: "cardiology"
        },
        {
          name: "Neurology",
          icon: Brain,
          image: "/placeholder-neurology.jpg",
          color: CATEGORY_COLORS[4],
          description: "Brain and nervous system diagnostics",
          products: 67,
          slug: "neurology",
          id: "neurology"
        }
      ];
    }
    
    return categories.map((category, index) => {
      const IconComponent = DEFAULT_ICONS[category.icon] || TestTube2;
      const colorIndex = index % CATEGORY_COLORS.length;

      return {
        name: category.name || `Category ${index + 1}`,
        icon: IconComponent,
        image: category.image ? `http://localhost:5010${category.image}` : `/placeholder-${category.name?.toLowerCase() || 'default'}.jpg`,
        color: CATEGORY_COLORS[colorIndex],
        description: category.description || `Premium ${category.name} equipment`,
        products: category.products || Math.floor(Math.random() * 100) + 10,
        slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-'),
        id: category._id || category.id || category.slug
      };
    });
  }, [categories]);

  const memoizedFeatures = useMemo(() => {
    if (features.length === 0) {
      return [
        {
          title: "Fast Results",
          description: "Get accurate test results in record time",
          icon: Zap
        },
        {
          title: "Quality Assurance",
          description: "Certified and reliable medical equipment",
          icon: Shield
        },
        {
          title: "Advanced Analytics",
          description: "Comprehensive data analysis tools",
          icon: Activity
        }
      ];
    }

    return features.map((feature, index) => {
      let IconComponent = DEFAULT_ICONS[feature.icon] || DEFAULT_ICONS['Zap'];

      return {
        title: feature.title || `Feature ${index + 1}`,
        description: feature.description || `Premium feature description ${index + 1}`,
        icon: IconComponent
      };
    });
  }, [features]);

  const activeCategory = useMemo(() => medicalCategories[activeIndex], [activeIndex, medicalCategories]);

  useEffect(() => {
    if (medicalCategories.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % medicalCategories.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [medicalCategories.length]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: true
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false
        },
      },
    ],
  };

  const categorySliderSettings = {
    ...sliderSettings,
    slidesToShow: Math.min(medicalCategories.length, 5),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(medicalCategories.length, 4),
          arrows: true
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(medicalCategories.length, 3),
          arrows: false
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(medicalCategories.length, 2),
          arrows: false
        },
      },
    ],
  };

  const navigateToCategoryProducts = useCallback((categoryId) => {
    navigate(`/allproducts?category=${categoryId}`);
  }, [navigate]);

  const navigateToAllProducts = useCallback(() => {
    navigate('/allproducts');
  }, [navigate]);

  const handleCategoryClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleMouseEnter = useCallback((index) => {
    setHoveredCategory(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  const CategoryButton = ({ category, index, activeIndex, onClick, onMouseEnter, onMouseLeave }) => {
    const isActive = activeIndex === index;

    return (
      <button
        onClick={() => onClick(index)}
        onMouseEnter={() => onMouseEnter(index)}
        onMouseLeave={onMouseLeave}
        className={`w-full px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
          isActive
            ? `text-white bg-gradient-to-r rounded-xl ${category.color}`
            : 'text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-100'
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-1">
          <category.icon className="w-3 h-3 md:w-4 md:h-4" />
          {category.name}
        </span>
      </button>
    );
  };

  const FeatureCard = ({ feature, activeColor }) => (
    <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-start">
        <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-r ${activeColor} mr-3 md:mr-4`}>
          <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
          <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
        </div>
      </div>
    </div>
  );

  const CategoryCard = ({ category }) => (
    <div
      className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 duration-300 cursor-pointer"
      onClick={() => navigateToCategoryProducts(category.id)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20 w-full">
        <h3 className="text-base md:text-lg font-bold text-white mb-1">{category.name}</h3>
        <p className="text-gray-200 text-xs md:text-sm mb-2 md:mb-3">{category.products} products available</p>
        <button
          className="inline-flex items-center text-xs md:text-sm font-medium text-white hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            navigateToCategoryProducts(category.id);
          }}
        >
          View all
          <ArrowRight className="ml-1 w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );

  if (loading && categories.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#01A4D5]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <div className="text-red-500 mb-4 text-2xl">⚠️</div>
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-[#01A4D5] text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 w-64 h-64 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-[#01A4D5]/20 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01A4D5] to-blue-500 animate-pulse">Healthcare</span> Through Innovation
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our advanced medical equipment designed for precision diagnostics
          </p>
        </div>

        {/* SLIDER FOR CATEGORY BUTTONS */}
        <div className="mb-8 md:mb-12">
          <Slider {...categorySliderSettings}>
            {medicalCategories.map((category, index) => (
              <div key={`cat-btn-${index}`} className="px-1">
                <CategoryButton
                  category={category}
                  index={index}
                  activeIndex={activeIndex}
                  onClick={handleCategoryClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="lg:col-span-2">
            <div className="relative h-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
              <div className="aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/10] xl:aspect-[3/2] relative overflow-hidden">
                <img
                  src={activeCategory.image}
                  alt={activeCategory.name}
                  className="w-full h-full object-cover transition-all duration-500"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">
                    {activeCategory.name} Equipment
                  </h3>
                  <p className="text-base md:text-lg mb-4 md:mb-6 max-w-lg">
                    {activeCategory.products}+ {activeCategory.description}
                  </p>
                  <div>
                    <button 
                      className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => navigateToCategoryProducts(activeCategory.id)}
                    >
                      Explore Collection
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            {memoizedFeatures.map((feature, index) => (
              <FeatureCard
                key={`${feature.title}-${index}`}
                feature={feature}
                index={index}
                activeColor={activeCategory.color}
              />
            ))}

            <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm border border-gray-100">
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
            </div>
          </div>
        </div>

        <div className="mb-12 md:mb-16">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Browse All Categories</h3>
            <button 
              onClick={navigateToAllProducts}
              className="text-sm md:text-base font-medium text-[#01A4D5] hover:underline flex items-center"
            >
              View all categories
              <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </div>
          
          <Slider {...sliderSettings} className="category-slider">
            {medicalCategories.map((category, index) => (
              <div key={`slider-${category.name}-${index}`} className="px-2">
                <CategoryCard category={category} index={index} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}