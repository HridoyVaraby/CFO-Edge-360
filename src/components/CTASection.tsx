import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

const CTASection = ({
  title = "Ready to Transform Your Financial Strategy?",
  subtitle = "Let's discuss how our expert CFO services can help you achieve your business goals and drive sustainable growth.",
  primaryButtonText = "Schedule a Consultation",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Back to Home",
  secondaryButtonLink = "/",
  className = ""
}: CTASectionProps) => {
  return (
    <section className={`px-4 py-12 sm:py-16 lg:py-20 sm:px-6 lg:px-8 bg-white ${className}`}>
      <div className="mx-auto max-w-4xl text-center">
        <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100 p-6 sm:p-8 lg:p-12 border border-amber-200">
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 font-serif">
            {title}
          </h2>
          <p className="mx-auto mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg text-gray-700 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              to={primaryButtonLink}
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[44px] text-sm sm:text-base"
            >
              {primaryButtonText}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-200 min-h-[44px] text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;