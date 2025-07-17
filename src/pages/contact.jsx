import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contactMethods = [
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Address",
      content: "123 Business Street, City, State 12345, Country",
      color: "text-red-500",
      link: "https://maps.google.com"
    },
    {
      icon: <FaPhoneAlt className="text-2xl" />,
      title: "Phone",
      content: "+1 (123) 456-7890\n+1 (987) 654-3210",
      color: "text-blue-500",
      link: "tel:+11234567890"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      content: "info@yourcompany.com\nsupport@yourcompany.com",
      color: "text-green-500",
      link: "mailto:info@yourcompany.com"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Business Hours",
      content: "Mon-Fri: 9am - 5pm\nSat: 10am - 2pm\nSun: Closed",
      color: "text-amber-500"
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: "WhatsApp",
      content: "+1 (123) 456-7890",
      color: "text-emerald-500",
      link: "https://wa.me/11234567890"
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: "#", color: "hover:text-blue-600" },
    { icon: <FaTwitter />, url: "#", color: "hover:text-sky-400" },
    { icon: <FaInstagram />, url: "#", color: "hover:text-pink-600" },
    { icon: <FaLinkedin />, url: "#", color: "hover:text-blue-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-r from-[#01A4D5] to-[#0083b0] text-white py-20 shadow-lg overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat"></div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0083b0] rounded-full transform translate-x-16 -translate-y-16 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#01A4D5] rounded-full transform -translate-x-24 translate-y-24 opacity-20"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            We're here to help and answer any questions you might have.
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Contact Information */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-2/5 bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-[#01A4D5] mb-6 relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-red-500 after:rounded-full">
              Our Information
            </h2>
            
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className={`flex items-start p-4 rounded-xl transition-all duration-200 ${method.link ? 'hover:bg-gray-50 cursor-pointer' : ''}`}
                  onClick={method.link ? () => window.open(method.link, '_blank') : null}
                >
                  <div className={`${method.color} mr-4 mt-1`}>
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{method.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {method.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <h3 className="font-bold text-lg text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4 justify-center">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-600 ${social.color} text-2xl transition-colors duration-300 hover:scale-110`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-3/5 bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-[#01A4D5] mb-6 relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-red-500 after:rounded-full">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-200"
                    placeholder="Your name"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div variants={itemVariants}>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-200"
                    placeholder="+1 (123) 456-7890"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-200 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.5rem]"
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

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-200"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#01A4D5] to-[#0083b0] hover:from-[#0083b0] hover:to-[#01A4D5] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.01]"
                >
                  Send Message
                </button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </main>

      {/* Map Section */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-[#01A4D5] mb-6 relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-red-500 after:rounded-full">
            Our Location
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.98784492416406!3d40.74844047138999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1687893123456!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title="Google Maps Location"
            ></iframe>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#01A4D5] to-[#0083b0] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Check out our FAQ section or reach out to our support team for immediate assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/faq"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-[#01A4D5] bg-white hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Visit FAQ
              </a>
              <a
                href="/support"
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-lg text-white bg-transparent hover:bg-white hover:bg-opacity-10 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#01A4D5]">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#01A4D5]">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#01A4D5]">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Webinars</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#01A4D5]">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;