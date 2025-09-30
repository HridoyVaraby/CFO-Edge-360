import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, BarChart3, Users, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Subtle gold accent curves */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-100/40 to-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-blue-100/30 to-slate-100/40 rounded-full blur-3xl"></div>
        
        {/* Geometric accent */}
        <div className="absolute top-1/3 right-1/4 w-2 h-32 bg-gradient-to-b from-amber-400/60 to-transparent rounded-full transform rotate-12"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:items-start min-h-[80vh]">
          
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                <span className="block font-serif">Your 360°</span>
                <span className="block font-serif text-slate-800">Virtual CFO</span>
                <span className="block font-serif bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                  Advantage
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                Smarter Financial Leadership, On-Demand. 
                <span className="block mt-2 text-lg text-gray-500">
                  Global reach, fractional cost, strategic insight.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link
                to="/services"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4 font-medium tracking-wide uppercase">
                Trusted by Growing Companies Worldwide
              </p>
              <div className="flex items-center space-x-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span className="text-sm font-medium">Global Reach</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-medium">Expert Team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-medium">Proven Results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative lg:pl-8 animate-slide-up lg:pt-8">
            <div className="relative">
              {/* Main dashboard mockup */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-0 hover:-rotate-2 transition-transform duration-500">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Financial Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600 font-medium">Revenue</p>
                          <p className="text-2xl font-bold text-blue-900">$2.4M</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-amber-600 font-medium">Growth</p>
                          <p className="text-2xl font-bold text-amber-900">+24%</p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-amber-600" />
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="w-full bg-amber-200 rounded-full h-2">
                          <div className="bg-amber-600 h-2 rounded-full w-4/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="bg-gray-50 rounded-xl p-4 h-32 flex items-end justify-between">
                    {[40, 65, 45, 80, 60, 90, 75].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-slate-600 to-slate-400 rounded-t w-6 transition-all duration-1000 hover:from-amber-500 hover:to-amber-400"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-3 animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-700">Live Analytics</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-float-delayed">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">Global Team</span>
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