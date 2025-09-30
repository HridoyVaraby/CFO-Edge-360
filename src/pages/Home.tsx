import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CompanyOverview from '../components/CompanyOverview';
import {
  TrendingUp,
  DollarSign,
  FileText,
  Globe,
  BarChart3,
  Handshake,
  Settings,
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      {/* Company Overview */}
      <CompanyOverview />
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