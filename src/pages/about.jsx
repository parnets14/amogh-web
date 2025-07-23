// // import { Link } from "react-router-dom";
// // import { Heart, Award, Users, ArrowRight, Shield, Target, Activity } from "lucide-react";
// // import { motion } from "framer-motion";
// // import axios from "axios";
// // import { useEffect, useState } from "react";

// // export default function About() {
// // // const [stats,setStats] = useState([]);
// // // const [team,setTeam] = useState([]);
// // // const [values,setValues] = useState([]);
// // // const [mission,setMission] = useState([]);

// // // const fetchMission=async()=>{
// // //   try {
// // //     const res=await axios.get("http://localhost:5010/mission");
// // //     setMission(res.data);
// // //   } catch (error) {
// // //     console.log(error);
// // //   }
// // // }

// // // const fachAllStats=async()=>{
// // //   try {
// // //     const res=await axios.get("http://localhost:5010/about");
// // //     setStats(res.data);
// // //   } catch (error) {
// // //     console.log(error);
// // //   }
// // // }
// // // const fachAllTeam=async()=>{
// // //   try {
// // //     const res=await axios.get("http://localhost:5010/team");
// // //     setTeam(res.data);
// // //   } catch (error) {
// // //     console.log(error);
// // //   }
// // // }
// // // const fachAllValues=async()=>{
// // //   try {
// // //     const res=await axios.get("http://localhost:5010/values");
// // //     setValues(res.data);
// // //   } catch (error) {
// // //     console.log(error);
// // //   }
// // // }

// // // useEffect(()=>{
// // //   fachAllStats();
// // //   fachAllTeam();
// // //   fachAllValues();
// // //   fetchMission();
// // // },[])




// //   const values = [
// //     {
// //       icon: Heart,
// //       title: "Quality Care",
// //       description: "Delivering state-of-the-art medical equipment to enhance patient outcomes.",
// //       color: "text-rose-500",
// //       bg: "bg-rose-50"
// //     },
// //     {
// //       icon: Award,
// //       title: "Innovation",
// //       description: "Pioneering advanced technologies for precise diagnostics and treatment.",
// //       color: "text-indigo-500",
// //       bg: "bg-indigo-50"
// //     },
// //     {
// //       icon: Users,
// //       title: "Customer Focus",
// //       description: "Providing exceptional support and tailored solutions for healthcare professionals.",
// //       color: "text-emerald-500",
// //       bg: "bg-emerald-50"
// //     },
// //     {
// //       icon: Shield,
// //       title: "Safety First",
// //       description: "Ensuring all equipment meets the highest safety standards.",
// //       color: "text-amber-500",
// //       bg: "bg-amber-50"
// //     },
// //     {
// //       icon: Target,
// //       title: "Precision",
// //       description: "Delivering accurate results for critical medical decisions.",
// //       color: "text-blue-500",
// //       bg: "bg-blue-50"
// //     },
// //     {
// //       icon: Activity,
// //       title: "Reliability",
// //       description: "Trusted by medical professionals worldwide.",
// //       color: "text-purple-500",
// //       bg: "bg-purple-50"
// //     },
// //   ];

// //   const team = [
// //     { 
// //       name: "Dr. Jane Smith", 
// //       role: "Chief Medical Officer", 
// //       image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
// //       bio: "Board-certified physician with 15+ years of clinical experience."
// //     },
// //     { 
// //       name: "John Doe", 
// //       role: "Lead Engineer", 
// //       image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
// //       bio: "Biomedical engineer specializing in diagnostic equipment."
// //     },
// //     { 
// //       name: "Sarah Lee", 
// //       role: "Customer Success Manager", 
// //       image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
// //       bio: "Dedicated to ensuring seamless customer experiences."
// //     },
// //   ];

// //   const stats = [
// //     { value: "15+", label: "Years Experience" },
// //     { value: "5,000+", label: "Healthcare Partners" },
// //     { value: "98%", label: "Customer Satisfaction" },
// //     { value: "24/7", label: "Support Available" },
// //   ];

// //   return (
// //     <div className="w-full bg-gray-50">
// //       {/* Hero Section */}
// //       <section className="relative py-20 overflow-hidden bg-gradient-to-t from-white to-[#01A4D5] ">
// //         <div className="absolute inset-0 opacity-20">
// //           <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-10"></div>
// //         </div>
// //         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="text-center"
// //           >
// //             <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
// //               Advancing Healthcare Through Innovation
// //             </h1>
// //             <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
// //               We are committed to empowering medical professionals with cutting-edge technology that transforms patient care.
// //             </p>
// //             <div className="flex flex-col sm:flex-row justify-center gap-4">
// //               <Link
// //                 to="/allproduct"
// //                 className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
// //                 aria-label="Shop our medical products"
// //               >
// //                 Explore Products <ArrowRight className="w-5 h-5 ml-2" />
// //               </Link>
// //               <Link
// //                 to="/contact"
// //                 className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 shadow-lg hover:shadow-xl"
// //                 aria-label="Contact our team"
// //               >
// //                 Contact Us
// //               </Link>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Stats Section */}
// //       <section className="py-12 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
// //             {stats.map((stat, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: index * 0.1 }}
// //                 viewport={{ once: true }}
// //                 className="p-6 rounded-xl bg-gray-50 shadow-sm"
// //               >
// //                 <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
// //                 <p className="text-sm font-medium text-gray-600">{stat.label}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Mission Section */}
// //       <section className="py-16 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             viewport={{ once: true }}
// //             className="bg-white rounded-2xl shadow-xl overflow-hidden"
// //           >
// //             <div className="grid md:grid-cols-2">
// //               <div className="p-8 sm:p-12">
// //                 <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
// //                 <p className="text-lg text-gray-600 mb-8">
// //                   To revolutionize healthcare by providing reliable, high-performance medical equipment that enables accurate diagnostics and efficient workflows.
// //                 </p>
// //                 <div className="space-y-4">
// //                   <div className="flex items-start">
// //                     <div className="flex-shrink-0 mt-1">
// //                       <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
// //                         <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
// //                         </svg>
// //                       </div>
// //                     </div>
// //                     <p className="ml-3 text-base text-gray-600">
// //                       Supporting medical professionals with innovative solutions
// //                     </p>
// //                   </div>
// //                   <div className="flex items-start">
// //                     <div className="flex-shrink-0 mt-1">
// //                       <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
// //                         <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
// //                         </svg>
// //                       </div>
// //                     </div>
// //                     <p className="ml-3 text-base text-gray-600">
// //                       Enhancing patient outcomes through technology
// //                     </p>
// //                   </div>
// //                   <div className="flex items-start">
// //                     <div className="flex-shrink-0 mt-1">
// //                       <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
// //                         <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
// //                         </svg>
// //                       </div>
// //                     </div>
// //                     <p className="ml-3 text-base text-gray-600">
// //                       Advancing clinical research with precise instruments
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="bg-gradient-to-r from-white to-[#01A4D5] p-8 sm:p-12 flex items-center justify-center">
// //                 <img 
// //                   src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
// //                   alt="Medical professionals using our equipment"
// //                   className="w-full h-full object-cover rounded-lg shadow-2xl"
// //                   loading="lazy"
// //                 />
// //               </div>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Values Section */}
// //       <section className="py-16 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             viewport={{ once: true }}
// //             className="text-center mb-12"
// //           >
// //             <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
// //             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
// //               The principles that guide everything we do
// //             </p>
// //           </motion.div>
          
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {values.map((value, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: index * 0.1 }}
// //                 viewport={{ once: true }}
// //                 className={`${value.bg} rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300`}
// //               >
// //                 <div className={`${value.color} mb-6`}>
// //                   <value.icon className="w-10 h-10" />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
// //                 <p className="text-gray-600">{value.description}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Team Section */}
// //       <section className="py-16 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             viewport={{ once: true }}
// //             className="text-center mb-12"
// //           >
// //             <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
// //             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
// //               The passionate professionals driving our mission forward
// //             </p>
// //           </motion.div>
          
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {team.map((member, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: index * 0.1 }}
// //                 viewport={{ once: true }}
// //                 className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
// //               >
// //                 <img
// //                   src={member.image}
// //                   alt={member.name}
// //                   className="w-full h-64 object-cover"
// //                   loading="lazy"
// //                 />
// //                 <div className="p-6">
// //                   <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
// //                   <p className="text-blue-600 font-medium mb-3">{member.role}</p>
// //                   <p className="text-gray-600 mb-4">{member.bio}</p>
// //                   <div className="flex space-x-4">
// //                     <a href="#" className="text-gray-400 hover:text-blue-500">
// //                       <span className="sr-only">LinkedIn</span>
// //                       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
// //                         <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
// //                       </svg>
// //                     </a>
// //                     <a href="#" className="text-gray-400 hover:text-blue-500">
// //                       <span className="sr-only">Twitter</span>
// //                       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
// //                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
// //                       </svg>
// //                     </a>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             viewport={{ once: true }}
// //           >
// //             <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Practice?</h2>
// //             <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
// //               Discover how our medical solutions can enhance your diagnostic capabilities and improve patient care.
// //             </p>
// //             <div className="flex flex-col sm:flex-row justify-center gap-4">
// //               <Link
// //                 to="/contact"
// //                 className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
// //                 aria-label="Contact our team"
// //               >
// //                 Get in Touch
// //               </Link>
// //               <Link
// //                 to="/products"
// //                 className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10 transition-all duration-200 shadow-lg hover:shadow-xl"
// //                 aria-label="View our products"
// //               >
// //                 View Products <ArrowRight className="w-5 h-5 ml-2" />
// //               </Link>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }
// import { Link } from "react-router-dom";
// import { Heart, Award, Users, ArrowRight, Shield, Target, Activity } from "lucide-react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function About() {
//   const [stats, setStats] = useState([
//     { value: "15+", label: "Years Experience" },
//     { value: "5,000+", label: "Healthcare Partners" },
//     { value: "98%", label: "Customer Satisfaction" },
//     { value: "24/7", label: "Support Available" },
//   ]);
//   const [team, setTeam] = useState([]);
//   const [values, setValues] = useState([]);
//   const [mission, setMission] = useState({
//     title: "Our Mission",
//     description: "To revolutionize healthcare by providing reliable, high-performance medical equipment that enables accurate diagnostics and efficient workflows.",
//     points: [
//       "Supporting medical professionals with innovative solutions",
//       "Enhancing patient outcomes through technology",
//       "Advancing clinical research with precise instruments"
//     ],
//     image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
//   });

//   // Default values with icons mapping
//   const defaultValues = [
//     {
//       icon: Heart,
//       title: "Quality Care",
//       description: "Delivering state-of-the-art medical equipment to enhance patient outcomes.",
//       color: "text-rose-500",
//       bg: "bg-rose-50"
//     },
//     {
//       icon: Award,
//       title: "Innovation",
//       description: "Pioneering advanced technologies for precise diagnostics and treatment.",
//       color: "text-indigo-500",
//       bg: "bg-indigo-50"
//     },
//     {
//       icon: Users,
//       title: "Customer Focus",
//       description: "Providing exceptional support and tailored solutions for healthcare professionals.",
//       color: "text-emerald-500",
//       bg: "bg-emerald-50"
//     },
//     {
//       icon: Shield,
//       title: "Safety First",
//       description: "Ensuring all equipment meets the highest safety standards.",
//       color: "text-amber-500",
//       bg: "bg-amber-50"
//     },
//     {
//       icon: Target,
//       title: "Precision",
//       description: "Delivering accurate results for critical medical decisions.",
//       color: "text-blue-500",
//       bg: "bg-blue-50"
//     },
//     {
//       icon: Activity,
//       title: "Reliability",
//       description: "Trusted by medical professionals worldwide.",
//       color: "text-purple-500",
//       bg: "bg-purple-50"
//     },
//   ];

//   // Icon mapping for values
//   const iconMapping = {
//     "Quality Care": Heart,
//     "Innovation": Award,
//     "Customer Focus": Users,
//     "Safety First": Shield,
//     "Precision": Target,
//     "Reliability": Activity,
//   };

//   const colorMapping = {
//     "Quality Care": { color: "text-rose-500", bg: "bg-rose-50" },
//     "Innovation": { color: "text-indigo-500", bg: "bg-indigo-50" },
//     "Customer Focus": { color: "text-emerald-500", bg: "bg-emerald-50" },
//     "Safety First": { color: "text-amber-500", bg: "bg-amber-50" },
//     "Precision": { color: "text-blue-500", bg: "bg-blue-50" },
//     "Reliability": { color: "text-purple-500", bg: "bg-purple-50" },
//   };

//   const fetchMission = async () => {
//     try {
//       const res = await axios.get("http://localhost:5010/api/missions");
//       if (res.data && res.data.length > 0) {
//         setMission(res.data[0]); // Assuming you want the first mission
//       }
//     } catch (error) {
//       console.log("Error fetching mission:", error);
//     }
//   };

//   const fetchAllStats = async () => {
//     try {
//       const res = await axios.get("http://localhost:5010/api/about");
//       if (res.data && res.data.length > 0) {
//         const aboutData = res.data[0];
//         setStats([
//           { value: `${aboutData.yearsExperience}+`, label: "Years Experience" },
//           { value: `${aboutData.healthcarePartners.toLocaleString()}+`, label: "Healthcare Partners" },
//           { value: `${aboutData.customerSatisfaction}%`, label: "Customer Satisfaction" },
//           { value: aboutData.supportAvailable === 24 ? "24/7" : `${aboutData.supportAvailable}h`, label: "Support Available" },
//         ]);
//       }
//     } catch (error) {
//       console.log("Error fetching stats:", error);
//     }
//   };

//   const fetchAllTeam = async () => {
//     try {
//       const res = await axios.get("http://localhost:5010/api/leaders");
//       if (res.data && res.data.length > 0) {
//         setTeam(res.data);
//       }
//     } catch (error) {
//       console.log("Error fetching team:", error);
//     }
//   };

//   const fetchAllValues = async () => {
//     try {
//       const res = await axios.get("http://localhost:5010/api/core-values");
//       if (res.data && res.data.length > 0) {
//         const mappedValues = res.data.map((value, index) => ({
//           ...value,
//           icon: iconMapping[value.title] || defaultValues[index % defaultValues.length].icon,
//           color: colorMapping[value.title]?.color || defaultValues[index % defaultValues.length].color,
//           bg: colorMapping[value.title]?.bg || defaultValues[index % defaultValues.length].bg,
//         }));
//         setValues(mappedValues);
//       } else {
//         setValues(defaultValues);
//       }
//     } catch (error) {
//       console.log("Error fetching values:", error);
//       setValues(defaultValues); // Fallback to default values
//     }
//   };

//   useEffect(() => {
//     fetchAllStats();
//     fetchAllTeam();
//     fetchAllValues();
//     fetchMission();
//   }, []);

//   return (
//     <div className="w-full bg-gray-50">
//       {/* Hero Section */}
//       <section className="relative py-20 overflow-hidden bg-gradient-to-t from-white to-[#01A4D5] ">
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-10"></div>
//         </div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Advancing Healthcare Through Innovation
//             </h1>
//             <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
//               We are committed to empowering medical professionals with cutting-edge technology that transforms patient care.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Link
//                 to="/allproduct"
//                 className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
//                 aria-label="Shop our medical products"
//               >
//                 Explore Products <ArrowRight className="w-5 h-5 ml-2" />
//               </Link>
//               <Link
//                 to="/contact"
//                 className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 shadow-lg hover:shadow-xl"
//                 aria-label="Contact our team"
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="p-6 rounded-xl bg-gray-50 shadow-sm"
//               >
//                 <p className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</p>
//                 <p className="text-sm font-medium text-gray-600">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-2xl shadow-xl overflow-hidden"
//           >
//             <div className="grid md:grid-cols-2">
//               <div className="p-8 sm:p-12">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6">{mission.title}</h2>
//                 <p className="text-lg text-gray-600 mb-8">
//                   {mission.description}
//                 </p>
//                 <div className="space-y-4">
//                   {mission.points && mission.points.map((point, index) => (
//                     <div key={index} className="flex items-start">
//                       <div className="flex-shrink-0 mt-1">
//                         <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
//                           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                           </svg>
//                         </div>
//                       </div>
//                       <p className="ml-3 text-base text-gray-600">
//                         {point}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="bg-gradient-to-r from-white to-[#01A4D5] p-8 sm:p-12 flex items-center justify-center">
//                 <img 
//                   src={mission.image || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"} 
//                   alt="Medical professionals using our equipment"
//                   className="w-full h-full object-cover rounded-lg shadow-2xl"
//                   loading="lazy"
//                 />
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               The principles that guide everything we do
//             </p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {values.map((value, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className={`${value.bg} rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300`}
//               >
//                 <div className={`${value.color} mb-6`}>
//                   <value.icon className="w-10 h-10" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
//                 <p className="text-gray-600">{value.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               The passionate professionals driving our mission forward
//             </p>
//           </motion.div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {team.map((member, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//                 className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 <img
//                   src={member.image || `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
//                   alt={member.name}
//                   className="w-full h-64 object-cover"
//                   loading="lazy"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
//                   <p className="text-blue-600 font-medium mb-3">{member.role}</p>
//                   <p className="text-gray-600 mb-4">{member.bio}</p>
//                   <div className="flex space-x-4">
//                     <a href="#" className="text-gray-400 hover:text-blue-500">
//                       <span className="sr-only">LinkedIn</span>
//                       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//                       </svg>
//                     </a>
//                     <a href="#" className="text-gray-400 hover:text-blue-500">
//                       <span className="sr-only">Twitter</span>
//                       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Practice?</h2>
//             <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
//               Discover how our medical solutions can enhance your diagnostic capabilities and improve patient care.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Link
//                 to="/contact"
//                 className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
//                 aria-label="Contact our team"
//               >
//                 Get in Touch
//               </Link>
//               <Link
//                 to="/products"
//                 className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10 transition-all duration-200 shadow-lg hover:shadow-xl"
//                 aria-label="View our products"
//               >
//                 View Products <ArrowRight className="w-5 h-5 ml-2" />
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Heart, Award, Users, ArrowRight, Shield, Target, Activity, Camera, User, Building } from "lucide-react";

const ImageWithFallback = ({ src, alt, className, fallbackIcon: FallbackIcon = Camera, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError || !imgSrc) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-200 text-gray-400`} {...props}>
        <FallbackIcon className="w-8 h-8" />
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

const AboutPageFixed = () => {
  const [stats, setStats] = useState([
    { value: "15+", label: "Years Experience" },
    { value: "5,000+", label: "Healthcare Partners" },
    { value: "98%", label: "Customer Satisfaction" },
    { value: "24/7", label: "Support Available" },
  ]);
  
  const [team, setTeam] = useState([]);
  const [values, setValues] = useState([]);
  const [mission, setMission] = useState({
    title: "Our Mission",
    description: "To revolutionize healthcare by providing reliable, high-performance medical equipment that enables accurate diagnostics and efficient workflows.",
    points: [
      "Supporting medical professionals with innovative solutions",
      "Enhancing patient outcomes through technology",
      "Advancing clinical research with precise instruments"
    ],
    image: null
  });

  const [loading, setLoading] = useState({
    stats: false,
    team: false,
    values: false,
    mission: false
  });

  const [errors, setErrors] = useState({
    stats: null,
    team: null,
    values: null,
    mission: null
  });

  // Default values with icons mapping
  const defaultValues = [
    {
      icon: Heart,
      title: "Quality Care",
      description: "Delivering state-of-the-art medical equipment to enhance patient outcomes.",
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    {
      icon: Award,
      title: "Innovation",
      description: "Pioneering advanced technologies for precise diagnostics and treatment.",
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Providing exceptional support and tailored solutions for healthcare professionals.",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Ensuring all equipment meets the highest safety standards.",
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      icon: Target,
      title: "Precision",
      description: "Delivering accurate results for critical medical decisions.",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: Activity,
      title: "Reliability",
      description: "Trusted by medical professionals worldwide.",
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
  ];

  // Icon and color mappings
  const iconMapping = {
    "Quality Care": Heart,
    "Innovation": Award,
    "Customer Focus": Users,
    "Safety First": Shield,
    "Precision": Target,
    "Reliability": Activity,
  };

  const colorMapping = {
    "Quality Care": { color: "text-rose-500", bg: "bg-rose-50" },
    "Innovation": { color: "text-indigo-500", bg: "bg-indigo-50" },
    "Customer Focus": { color: "text-emerald-500", bg: "bg-emerald-50" },
    "Safety First": { color: "text-amber-500", bg: "bg-amber-50" },
    "Precision": { color: "text-blue-500", bg: "bg-blue-50" },
    "Reliability": { color: "text-purple-500", bg: "bg-purple-50" },
  };

  // Fixed image URL helper
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it starts with a slash, it's relative to the server
    if (imagePath.startsWith('/')) {
      return `http://localhost:5010${imagePath}`;
    }
    
    // Otherwise, assume it needs the full path
    return `http://localhost:5010/${imagePath}`;
  };

  // API functions with better error handling
  const fetchWithErrorHandling = async (url, setter, key) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: null }));
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      setErrors(prev => ({ ...prev, [key]: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const fetchMission = async () => {
    await fetchWithErrorHandling(
      "http://localhost:5010/api/missions",
      (data) => {
        if (data && data.length > 0) {
          const missionData = data[0];
          setMission({
            ...missionData,
            image: getImageUrl(missionData.image)
          });
        }
      },
      'mission'
    );
  };

  const fetchAllStats = async () => {
    await fetchWithErrorHandling(
      "http://localhost:5010/api/about",
      (data) => {
        if (data && data.length > 0) {
          const aboutData = data[0];
          setStats([
            { value: `${aboutData.yearsExperience}+`, label: "Years Experience" },
            { value: `${aboutData.healthcarePartners?.toLocaleString() || '5,000'}+`, label: "Healthcare Partners" },
            { value: `${aboutData.customerSatisfaction}%`, label: "Customer Satisfaction" },
            { value: aboutData.supportAvailable === 24 ? "24/7" : `${aboutData.supportAvailable}h`, label: "Support Available" },
          ]);
        }
      },
      'stats'
    );
  };

  const fetchAllTeam = async () => {
    await fetchWithErrorHandling(
      "http://localhost:5010/api/leaders",
      (data) => {
        if (data && data.length > 0) {
          const teamWithFixedImages = data.map(member => ({
            ...member,
            image: getImageUrl(member.image)
          }));
          setTeam(teamWithFixedImages);
        }
      },
      'team'
    );
  };

  const fetchAllValues = async () => {
    await fetchWithErrorHandling(
      "http://localhost:5010/api/core-values",
      (data) => {
        if (data && data.length > 0) {
          const mappedValues = data.map((value, index) => ({
            ...value,
            icon: iconMapping[value.title] || defaultValues[index % defaultValues.length].icon,
            color: colorMapping[value.title]?.color || defaultValues[index % defaultValues.length].color,
            bg: colorMapping[value.title]?.bg || defaultValues[index % defaultValues.length].bg,
          }));
          setValues(mappedValues);
        } else {
          setValues(defaultValues);
        }
      },
      'values'
    );
  };

  useEffect(() => {
    fetchAllStats();
    fetchAllTeam();
    fetchAllValues();
    fetchMission();
  }, []);

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-t from-white to-[#01A4D5]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Advancing Healthcare Through Innovation
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              We are committed to empowering medical professionals with cutting-edge technology that transforms patient care.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                Explore Products <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 shadow-lg hover:shadow-xl">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <p className="text-4xl font-bold text-blue-600 mb-3">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
          {errors.stats && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Failed to load stats: {errors.stats}</p>
            </div>
          )}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 lg:p-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{mission.title}</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {mission.description}
                </p>
                <div className="space-y-4">
                  {mission.points && mission.points.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-4 text-base text-gray-600 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 lg:p-16 flex items-center justify-center">
                <ImageWithFallback
                  src={mission.image || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"}
                  alt="Medical professionals using our equipment"
                  className="w-full h-80 object-cover rounded-2xl shadow-xl"
                  fallbackIcon={Building}
                />
              </div>
            </div>
          </div>
          {errors.mission && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Failed to load mission: {errors.mission}</p>
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`${value.bg} rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`${value.color} mb-6`}>
                  <value.icon className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
          {errors.values && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Failed to load values: {errors.values}</p>
            </div>
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate professionals driving our mission forward
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <ImageWithFallback
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover"
                  fallbackIcon={User}
                />
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                  <div className="flex space-x-4">
                    <button className="text-gray-400 hover:text-blue-500 transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-blue-500 transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {errors.team && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">Failed to load team: {errors.team}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Practice?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover how our medical solutions can enhance your diagnostic capabilities and improve patient care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-blue-700 bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get in Touch
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-white border-opacity-30">
              View Products <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPageFixed;