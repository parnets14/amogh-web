import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Form submitted!');
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
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#01A4D5] to-[#0083b0] text-white py-12 shadow-lg">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            We're here to help and answer any questions you might have.
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Contact Information */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-[#01A4D5] border-b-2 border-red-500 pb-2 mb-6 inline-block">
              Our Information
            </h2>
            
            <div className="space-y-6">
              <motion.div 
                variants={itemVariants}
                className="flex items-start hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
              >
                <div className="text-red-500 mr-4 mt-1">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Address</h3>
                  <p className="text-gray-600">
                    123 Business Street<br />
                    City, State 12345<br />
                    Country
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-start hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
              >
                <div className="text-red-500 mr-4 mt-1">
                  <FaPhoneAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Phone</h3>
                  <p className="text-gray-600">
                    +1 (123) 456-7890<br />
                    +1 (987) 654-3210
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-start hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
              >
                <div className="text-red-500 mr-4 mt-1">
                  <FaEnvelope className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Email</h3>
                  <p className="text-gray-600">
                    info@yourcompany.com<br />
                    support@yourcompany.com
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex items-start hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
              >
                <div className="text-red-500 mr-4 mt-1">
                  <FaClock className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9am - 5pm<br />
                    Saturday: 10am - 2pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <h3 className="font-bold text-lg text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-[#01A4D5] text-2xl transition-colors duration-300">
                  <FaFacebook />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#01A4D5] text-2xl transition-colors duration-300">
                  <FaTwitter />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#01A4D5] text-2xl transition-colors duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#01A4D5] text-2xl transition-colors duration-300">
                  <FaLinkedin />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/2 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-[#01A4D5] border-b-2 border-red-500 pb-2 mb-6 inline-block">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
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
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
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

              <motion.div variants={itemVariants}>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
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
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">
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
                </select>
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01A4D5] focus:border-transparent transition-all duration-200"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#01A4D5] to-[#0083b0] hover:from-[#0083b0] hover:to-[#01A4D5] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Send Message
                </button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </main>

      {/* Map Section */}
      <section className="container mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-[#01A4D5] border-b-2 border-red-500 pb-2 mb-6 inline-block">
            Our Location
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-md">
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

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
            <span>•</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;