import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Tagline Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center mb-3 sm:mb-4">
              <img src="/logo_white.png" alt="CFO Edge 360" className="h-10 sm:h-12" />
            </div>

            <p className="mb-4 sm:mb-6 text-gray-400 text-xs sm:text-sm leading-relaxed">
              Your 360° Virtual CFO Advantage — Smarter Financial Leadership. On-Demand. Global reach, fractional cost, strategic insight.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://linkedin.com/company/cfoedge360"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Policy */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Our Policy</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/cancellation-refund-policy" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Contact</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
                <a href="mailto:hello@cfoedge360.com" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  hello@cfoedge360.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-gray-400 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 mt-0.5 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">
                  Serving USA, Europe,<br />
                  Canada, and Australia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left mb-3 md:mb-0">
            © {currentYear} CFO EDGE360. All rights reserved.
          </p>
          <img src="/payments.webp" alt="Payment methods" className="h-6 sm:h-8 w-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;