import React from 'react';
import { Building2, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          {/* Logo */}
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          
          <h3 className="mb-2 text-xl font-bold font-serif">CFO EDGE360</h3>
          <p className="mb-6 text-gray-400">
            Serving clients in USA, Europe, Canada, Australia, and beyond.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://linkedin.com/company/cfoedge360"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:contact@cfoedge360.com"
              className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <p className="text-sm text-gray-500">
              © 2025 CFO EDGE360. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;