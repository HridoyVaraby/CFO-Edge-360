import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, Facebook } from 'lucide-react';

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
                className="hover:text-amber-400 transition-colors duration-200"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" color="#0077b5" />
              </a>
              <a
                href="https://www.facebook.com/cfoedge360/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors duration-200"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" color="#1877f2" />
              </a>
              <a
                href="https://wa.me/8801973301465"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors duration-200"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.361.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
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
                <Link to="/posts" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  Tools and Tips
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
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-amber-400 flex-shrink-0" />
                <a href="mailto:reaz@cfoedge360.com" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  reaz@cfoedge360.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-amber-400 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+15055232471" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                    +1 505 523 2471
                  </a>
                  <a href="tel:+8801713301465" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                    +880 1713-301465
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.361.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a href="https://wa.me/8801973301465" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base">
                  +88 01973 301465
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-gray-500 text-center md:text-left mb-3 md:mb-0">
            © {currentYear} CFO EDGE360. All rights reserved.
          </p>
          <img src="/payments.webp" alt="Payment methods" className="h-auto w-auto" />
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/8801973301465"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300 z-50 animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.361.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
