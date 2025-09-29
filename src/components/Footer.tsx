import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white text-gray-900 px-4 py-12 sm:px-6 lg:px-8 border-t">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Logo and Tagline Section */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 mr-3">
                <span className="text-white font-bold text-lg">360</span>
              </div>
              <h3 className="text-xl font-bold">CFO EDGE360</h3>
            </div>

            <p className="mb-6 text-gray-600 text-sm leading-relaxed">
              Your 360° Virtual CFO Advantage — Smarter Financial Leadership. On-Demand. Global reach, fractional cost, strategic insight.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/cfoedge360"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-500 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-500 transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-500 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-amber-500 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-amber-500 transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-amber-500 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Policy */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Policy</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-amber-500 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-600 hover:text-amber-500 transition-colors duration-200">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/cancellation-refund-policy" className="text-gray-600 hover:text-amber-500 transition-colors duration-200">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-600 hover:text-amber-500 transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-gray-600" />
                <a href="mailto:hello@cfoedge360.com" className="text-gray-600 hover:text-amber-500 transition-colors duration-200">
                  hello@cfoedge360.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-gray-600" />
                <a href="tel:+15551234567" className="text-gray-600 hover:text-amber-500 transition-colors duration-200">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-0.5 text-gray-600" />
                <span className="text-gray-600">
                  Serving USA, Europe,<br />
                  Canada, and Australia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-sm text-gray-500 text-center">
            © 2024 CFO EDGE360. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;