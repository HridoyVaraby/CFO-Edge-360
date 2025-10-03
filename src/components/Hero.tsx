import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BarChart3, Users, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Subtle gold accent curves */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-slate-600/20 rounded-full blur-3xl"></div>
        
        {/* Geometric accent */}
        <div className="absolute top-1/3 right-1/4 w-2 h-32 bg-gradient-to-b from-amber-400/80 to-transparent rounded-full transform rotate-12"></div>
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
              {/* Main dashboard mockup */}
              <div className="bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 transform rotate-0 hover:-rotate-2 transition-transform duration-500 border border-gray-700">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-600">
                    <h3 className="font-semibold text-white">Financial Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-3 sm:p-4 rounded-xl border border-blue-700/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs sm:text-sm text-blue-300 font-medium">Revenue</p>
                          <p className="text-xl sm:text-2xl font-bold text-blue-100">$2.4M</p>
                        </div>
                        <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="w-full bg-blue-800/50 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 p-3 sm:p-4 rounded-xl border border-amber-700/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs sm:text-sm text-amber-300 font-medium">Growth</p>
                          <p className="text-xl sm:text-2xl font-bold text-amber-100">+24%</p>
                        </div>
                        <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400" />
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="w-full bg-amber-800/50 rounded-full h-2">
                          <div className="bg-amber-400 h-2 rounded-full w-4/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="bg-gray-900/50 rounded-xl p-3 sm:p-4 h-24 sm:h-32 flex items-end justify-between border border-gray-600/30">
                    {[40, 65, 45, 80, 60, 90, 75].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-gray-400 to-gray-300 rounded-t w-4 sm:w-6 transition-all duration-1000 hover:from-amber-500 hover:to-amber-400"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-gray-800 border border-gray-600 rounded-xl shadow-lg p-2 sm:p-3 animate-float">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-200">Live Analytics</span>
                </div>
              </div>
              
              <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-gray-800 border border-gray-600 rounded-xl shadow-lg p-2 sm:p-3 animate-float-delayed">
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