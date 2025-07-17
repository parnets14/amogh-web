import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contactMethods = [
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Address",
      content: "123 Business Street, City, State 12345, Country",
      color: "text-red-500",
      link: "https://maps.google.com"
    },
    {
      icon: <FaPhoneAlt className="text-3xl" />,
      title: "Phone",
      content: "+1 (123) 456-7890\n+1 (987) 654-3210",
      color: "text-blue-500",
      link: "tel:+11234567890"
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email",
      content: "info@yourcompany.com\nsupport@yourcompany.com",
      color: "text-green-500",
      link: "mailto:info@yourcompany.com"
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Business Hours",
      content: "Mon-Fri: 9am - 5pm\nSat: 10am - 2pm\nSun: Closed",
      color: "text-amber-500"
    },
    {
      icon: <FaWhatsapp className="text-3xl" />,
      title: "WhatsApp",
      content: "+1 (123) 456-7890",
      color: "text-emerald-500",
      link: "https://wa.me/11234567890"
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook className="text-3xl" />, url: "#", color: "hover:text-blue-600" },
    { icon: <FaTwitter className="text-3xl" />, url: "#", color: "hover:text-sky-400" },
    { icon: <FaInstagram className="text-3xl" />, url: "#", color: "hover:text-pink-600" },
    { icon: <FaLinkedin className="text-3xl" />, url: "#", color: "hover:text-blue-700" }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-t from-white to-[#01A4D5] text-white py-24  overflow-hidden">
        {/* <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#0083b0] rounded-full transform translate-x-20 -translate-y-20 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#01A4D5] rounded-full transform -translate-x-28 translate-y-28 opacity-30"></div> */}
        
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-5 tracking-tight">Get in Touch</h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
            We're here to assist you with any questions or inquiries you may have.
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row gap-12"
        >
          {/* Contact Information */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-2/5 bg-white p-10 rounded-3xl shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border border-gray-100"
          >
            <h2 className="text-3xl font-bold text-[#01A4D5] mb-8 relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-red-500 after:rounded-full">
              Contact Information
            </h2>
            
            <div className="space-y-8">
              {contactMethods.map((method, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className={`flex items-start p-6 rounded-2xl transition-all duration-300 hover:bg-gray-50 ${method.link ? 'cursor-pointer' : ''}`}
                  onClick={method.link ? () => window.open(method.link, '_blank') : null}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`${method.color} mr-5 mt-1.5`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
                      {method.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={itemVariants}
              className="mt-10 pt-8 border-t border-gray-200"
            >
              <h3 className="font-bold text-xl text-gray-800 mb-6">Connect With Us</h3>
              <div className="flex space-x-6 justify-center">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-600 ${social.color} transition-all duration-300`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-3/5 bg-white p-10 rounded-3xl shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 border border-gray-100"
          >
            <h2 className="text-3xl font-bold text-[#01A4D5] mb-8 relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-red-500 after:rounded-full">
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} whileFocus={{ scale: 1.01 }}>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-300 bg-gray-50"
                    placeholder="Your full name"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} whileFocus={{ scale: 1.01 }}>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-300 bg-gray-50"
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} whileFocus={{ scale: 1.01 }}>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-300 bg-gray-50"
                    placeholder="+1 (123) 456-7890"
                  />
                </motion.div>

                <motion.div variants={itemVariants} whileFocus={{ scale: 1.01 }}>
                  <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-300 appearance-none bg-gray-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_1.25rem_center] bg-[length:1.25rem]"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} whileFocus={{ scale: 1.01 }}>
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-300 bg-gray-50"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#01A4D5] to-[#0083b0] hover:from-[#0083b0] hover:to-[#01A4D5] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform"
                >
                  Send Message
                </button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </main>

      {/* Map Section */}
      <section className="container mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100"
        >
          <h2 className="text-3xl font-bold text-[#01A4D5] mb-8 relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-1 after:bg-red-500 after:rounded-full">
            Our Location
          </h2>
          <div className="relative aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.98784492416406!3d40.74844047138999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2us!4v1687893123456!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
              title="Google Maps Location"
            ></iframe>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#01A4D5] to-[#0083b0] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Need More Help?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              Explore our FAQ or contact our support team for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.a
                href="/faq"
                className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-xl text-[#01A4D5] bg-white hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit FAQ
              </motion.a>
              <motion.a
                href="/support"
                className="inline-flex items-center justify-center px-10 py-4 border border-white text-lg font-semibold rounded-xl text-white bg-transparent hover:bg-white hover:bg-opacity-10 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#01A4D5]">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#01A4D5]">Products</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#01A4D5]">Resources</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Webinars</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#01A4D5]">Legal</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;