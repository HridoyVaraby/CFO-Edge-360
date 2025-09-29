import React from 'react';
import { Link } from 'react-router-dom';
import CompanyOverview from '../components/CompanyOverview';
import {
  TrendingUp,
  DollarSign,
  FileText,
  Globe,
  BarChart3,
  Handshake,
  Settings,
  Building2,
  ArrowRight
} from 'lucide-react';
import CTASection from '../components/CTASection';

const Home = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Financial Strategy & Forecasting",
      description: "Strategic financial planning and predictive modeling to drive business growth and informed decision-making.",
      link: "/services#strategy"
    },
    {
      icon: DollarSign,
      title: "Cash Flow Optimization",
      description: "Working capital management and cash flow optimization to ensure sustainable business operations.",
      link: "/services#cashflow"
    },
    {
      icon: FileText,
      title: "Investor & Board Reporting",
      description: "Professional financial reporting and presentations for investors, board members, and stakeholders.",
      link: "/services#reporting"
    },
    {
      icon: Globe,
      title: "Global Expansion & Compliance",
      description: "Navigate international markets with expert guidance on global financial compliance and regulations.",
      link: "/services#global"
    },
    {
      icon: BarChart3,
      title: "KPI Dashboard & Analytics",
      description: "Real-time financial dashboards and key performance indicators to monitor business health.",
      link: "/services#analytics"
    },
    {
      icon: Handshake,
      title: "M&A and Fundraising Support",
      description: "Expert support for mergers, acquisitions, and fundraising activities to accelerate growth.",
      link: "/services#ma"
    },
    {
      icon: Settings,
      title: "Financial Operations Setup",
      description: "Establish robust financial systems and processes to scale your business efficiently.",
      link: "/services#operations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo placeholder with building icon */}
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl font-serif">
            Your 360° Virtual CFO Advantage
          </h1>
          
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 leading-relaxed">
            Smarter Financial Leadership, On-Demand. Global reach, fractional cost, strategic insight.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-amber-400 transition-all duration-200"
            >
              Explore Our Services
            </Link>
          </div>
          
          {/* Decorative element */}
          <div className="mx-auto w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
        </div>
      </section>
      {/* Company Overview */}
      <CompanyOverview />
      {/* About CFO EDGE360 */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 font-serif">
            About CFO EDGE360
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-700 leading-relaxed">
            CFO EDGE360 provides virtual and fractional CFO services to businesses across the{' '}
            <span className="font-semibold text-amber-600">USA, Europe, Canada, and Australia</span>. 
            We deliver strategic forecasting, cash flow optimization, investor reporting, KPI dashboards, 
            global compliance, and fundraising support — all at a fraction of the cost of a full-time CFO.
          </p>
        </div>
      </section>

      {/* Global Excellence Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 font-serif">
              Global Virtual CFO Excellence
            </h2>
            <div className="mx-auto w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mb-8"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                CFO EDGE360 provides virtual and fractional CFO services to businesses across four continents, 
                delivering strategic financial leadership that scales with your growth.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-amber-600 mb-2">360°</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Complete Coverage</div>
                  <div className="text-xs text-gray-600">Full-spectrum CFO services</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-amber-600 mb-2">4</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Continents</div>
                  <div className="text-xs text-gray-600">Global reach & expertise</div>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                We deliver strategic forecasting, cash flow optimization, investor reporting, 
                KPI dashboards, global compliance, and fundraising support — all at a fraction 
                of the cost of a full-time CFO.
              </p>
            </div>
            
            {/* Right Content - Global Regions */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  Serving Businesses Worldwide
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">USA</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">Europe</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-red-50 to-red-100 border border-red-200">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">Canada</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">Australia</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <span className="text-sm text-gray-500 italic">& beyond</span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">
              Comprehensive CFO Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From strategic planning to operational excellence, we provide the full spectrum 
              of CFO services tailored to your business needs.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={index}
                  to={service.link}
                  className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200 transform hover:-translate-y-1"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-amber-600 text-sm font-medium group-hover:text-amber-700">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Home;