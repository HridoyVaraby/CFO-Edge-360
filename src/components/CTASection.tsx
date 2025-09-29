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
    <section className={`px-4 py-20 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-4xl text-center">
        <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-12 border border-blue-100">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl font-serif">
            {title}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to={primaryButtonLink}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {primaryButtonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to={secondaryButtonLink}
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;