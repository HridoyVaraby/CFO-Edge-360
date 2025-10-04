import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Subtle gold accent curves */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-slate-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start min-h-[70vh] sm:min-h-[80vh]">

          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                <span className="block font-serif">Your 360°</span>
                <span className="block font-serif text-gray-100">Virtual CFO</span>
                <span className="block font-serif bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                  Advantage
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light">
                Smarter Financial Leadership, On-Demand.
                <span className="block mt-2 text-base sm:text-lg text-gray-400">
                  Global reach, fractional cost, strategic insight.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[44px] text-sm sm:text-base"
              >
                Book a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                to="/services"
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-gray-600 hover:border-amber-400 hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md min-h-[44px] text-sm sm:text-base"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="pt-6 sm:pt-8 border-t border-gray-700">
              <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 font-medium tracking-wide uppercase text-center sm:text-left">
                Trusted by Growing Companies Worldwide
              </p>
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Global Reach</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Expert Team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium">Proven Results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative lg:pl-8 animate-slide-up lg:pt-8 order-first lg:order-last">
            <div className="relative">
              {/* Banner Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-0 hover:-rotate-1 transition-transform duration-500">
                <img
                  src="/banner.webp"
                  alt="CFO EDGE360 Financial Services"
                  className="w-full h-auto object-cover rounded-2xl"
                />

                {/* Image Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent rounded-2xl"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-gray-800/90 backdrop-blur-sm border border-gray-600 rounded-xl shadow-lg p-2 sm:p-3 animate-float">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-200">Live Analytics</span>
                </div>
              </div>

              <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-gray-800/90 backdrop-blur-sm border border-gray-600 rounded-xl shadow-lg p-2 sm:p-3 animate-float-delayed">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                  <span className="text-xs font-medium text-gray-200">Global Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;