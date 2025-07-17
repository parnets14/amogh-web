import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMapPin, FiMail, FiPhone, FiSend, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: FiFacebook },
    { name: 'Twitter', href: '#', icon: FiTwitter },
    { name: 'Instagram', href: '#', icon: FiInstagram },
    { name: 'LinkedIn', href: '#', icon: FiLinkedin }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    setEmail('');
  };

  return (
    <footer className="bg-gray-950 text-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center group">
              <img 
                src="Amg logo.jpeg" 
                alt="AMG Logo" 
                className="h-14 w-auto mr-4 transition-transform bg-transparant duration-300 group-hover:scale-105" 
              />
              <span className="text-3xl font-bold text-white tracking-tight">AMG</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Unleash your drive with premium automotive solutions and high-performance parts.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-7 h-7" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-indigo-400 text-base font-medium transition-all duration-200 relative group"
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6 tracking-wide">Contact Us</h3>
            <address className="not-italic space-y-5 text-gray-300 text-base">
              <div className="flex items-start">
                <FiMapPin className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                <p>123 Performance Avenue<br/>Motorsport City, MC 10001</p>
              </div>
              <div className="flex items-center">
                <FiMail className="w-6 h-6 text-indigo-400 mr-4 flex-shrink-0" />
                <a 
                  href="mailto:info@amg.com" 
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  info@amg.com
                </a>
              </div>
              <div className="flex items-center">
                <FiPhone className="w-6 h-6 text-indigo-400 mr-4 flex-shrink-0" />
                <a 
                  href="tel:+1234567890" 
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  (123) 456-7890
                </a>
              </div>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-6 tracking-wide">Stay Updated</h3>
            <p className="mb-5 text-gray-300 text-sm leading-relaxed max-w-xs">
              Get exclusive offers and the latest performance updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="w-full px-5 py-3 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 text-gray-200 placeholder-gray-500"
                aria-label="Email for newsletter"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-full transition-all duration-300 flex items-center justify-center transform hover:scale-105 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-950"
              >
                <FiSend className="w-5 h-5 mr-2" /> Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <img 
              src="Amg logo.jpeg " 
              alt="AMG Logo" 
              className="h-8 w-auto"
            />
            <p className="text-gray-400 text-sm">
              © {currentYear} AMG Performance. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/cookies" 
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </footer>
  );
}