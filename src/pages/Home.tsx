import React, { useState } from 'react';
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
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import CTASection from '../components/CTASection';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(0); // First FAQ open by default

  const faqData = [
    {
      question: "What is a Virtual CFO and how does it differ from a traditional CFO?",
      answer: "A Virtual CFO provides the same strategic financial expertise as a traditional CFO but on a flexible, part-time basis. This allows growing businesses to access C-level financial guidance without the full-time executive cost, making it perfect for companies that need expert financial leadership but aren't ready for a full-time hire."
    },
    {
      question: "What size businesses do you typically work with?",
      answer: "We work with businesses ranging from startups to mid-market companies, typically with revenues between $1M to $50M. Our services are particularly valuable for companies in growth phases, those preparing for fundraising, or businesses expanding internationally that need strategic financial guidance."
    },
    {
      question: "How quickly can you start working with our business?",
      answer: "We can typically begin our engagement within 1-2 weeks of our initial consultation. This includes understanding your business needs, setting up necessary access to financial systems, and developing a customized service plan that aligns with your specific goals and timeline."
    },
    {
      question: "Do you work with businesses in specific industries?",
      answer: "We have experience across various industries including technology, healthcare, manufacturing, professional services, and e-commerce. Our expertise in financial strategy, compliance, and growth planning translates well across different sectors, allowing us to provide valuable insights regardless of your industry."
    },
    {
      question: "What financial systems and software do you work with?",
      answer: "We're proficient with all major accounting and financial systems including QuickBooks, Xero, NetSuite, Sage, and various ERP systems. We also work with financial planning tools, business intelligence platforms, and can help you select and implement the right systems for your business needs."
    },
    {
      question: "How do you ensure data security and confidentiality?",
      answer: "We maintain the highest standards of data security and confidentiality. All client information is protected through encrypted communications, secure cloud platforms, and strict confidentiality agreements. We're also experienced with compliance requirements across different industries and jurisdictions."
    }
  ];

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const services = [
    {
      icon: "/icons/analysis.png",
      title: "Financial Strategy & Forecasting",
      description: "Strategic financial planning and predictive modeling to drive business growth and informed decision-making.",
      link: "/services#strategy"
    },
    {
      icon: "/icons/circular-economy.png",
      title: "Cash Flow Optimization",
      description: "Working capital management and cash flow optimization to ensure sustainable business operations.",
      link: "/services#cashflow"
    },
    {
      icon: "/icons/report.png",
      title: "Investor & Board Reporting",
      description: "Professional financial reporting and presentations for investors, board members, and stakeholders.",
      link: "/services#reporting"
    },
    {
      icon: "/icons/global-connection.png",
      title: "Global Expansion & Compliance",
      description: "Navigate international markets with expert guidance on global financial compliance and regulations.",
      link: "/services#global"
    },
    {
      icon: "/icons/analytics.png",
      title: "KPI Dashboard & Analytics",
      description: "Real-time financial dashboards and key performance indicators to monitor business health.",
      link: "/services#analytics"
    },
    {
      icon: "/icons/customer-service.png",
      title: "M&A and Fundraising Support",
      description: "Expert support for mergers, acquisitions, and fundraising activities to accelerate growth.",
      link: "/services#ma"
    },
    {
      icon: "/icons/settings.png",
      title: "Financial Operations Setup",
      description: "Establish robust financial systems and processes to scale your business efficiently.",
      link: "/services#operations"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      {/* Hero Section */}
      <Hero />
      {/* Company Overview */}
      <CompanyOverview />

      {/* Services Snapshot */}
      <section className="px-4 py-12 sm:py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-3 sm:mb-4">
              Comprehensive CFO Services
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              From strategic planning to operational excellence, we provide the full spectrum
              of CFO services tailored to your business needs.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, index) => {
              return (
                <Link
                  key={index}
                  to={service.link}
                  className="group relative bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-amber-400 transform hover:-translate-y-1"
                >
                  <div className="mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white group-hover:scale-110 transition-transform duration-300 p-2">
                    <img 
                      src={service.icon} 
                      alt={service.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-white leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 sm:mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center text-amber-400 text-xs sm:text-sm font-medium group-hover:text-amber-300">
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="px-4 py-12 sm:py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Content - Takes 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Company Logo */}
              <div className="mb-2">
                <img
                  src="/logo.png"
                  alt="CFO EDGE360 - Virtual CFO Services"
                  className="h-32 w-32 object-contain"
                />
              </div>

              {/* Personal Message */}
              <div>
                <p className="text-base text-gray-700 leading-relaxed mb-4">
                  I am a seasoned financial professional with extensive experience in strategic planning,
                  financial analysis, and business growth optimization. With a passion for precision and
                  a deep understanding of modern financial systems, I founded CFO EDGE360 to provide
                  reliable, client-focused services tailored to meet the unique needs of each business.
                </p>
                <p className="text-base text-gray-600 leading-relaxed">
                  My mission is to help businesses achieve sustainable growth through strategic financial
                  guidance, operational excellence, and data-driven decision making. Every client partnership
                  is built on trust, transparency, and measurable results.
                </p>
              </div>

              {/* Signature Line */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-2xl font-bold text-gray-900 mb-1">Md. Reazul Haque (Reaz)</h4>
                <p className="text-amber-600 font-semibold mb-2">Founder & CEO</p>
                <p className="text-sm text-gray-600">
                  Chartered Accountants, MBA in Finance<br />
                  X CFO having 15+ years experience
                </p>
              </div>
            </div>

            {/* Professional Photo - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="relative max-w-lg mx-auto lg:max-w-none">
                {/* Main Photo Container */}
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  {/* Professional Photo */}
                  <img
                    src="/Reaz.webp"
                    alt="Md. Reazul Haque (Reaz) - Founder & CEO of CFO EDGE360"
                    className="w-full h-auto object-cover object-center"
                    style={{ aspectRatio: '4/5', maxHeight: '500px' }}
                  />

                  {/* Overlay Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-gray-800">Available for Consultation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12 sm:py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              Get answers to common questions about our virtual CFO services and how we can help your business grow.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full px-6 py-6 sm:px-8 sm:py-6 text-left flex items-center justify-between hover:bg-gray-750 transition-colors duration-200 min-h-[44px]"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 text-amber-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <p className="text-gray-300 mb-6">
              Have more questions? We'd love to discuss your specific needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[44px] text-sm sm:text-base"
            >
              Get Your Questions Answered
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Home;