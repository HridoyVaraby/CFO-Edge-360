import { Link } from 'react-router-dom';
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

const Services = () => {
  const services = [
    {
      id: 'strategy',
      icon: TrendingUp,
      title: "Financial Strategy & Forecasting",
      description: [
        "Strategic financial planning forms the backbone of successful business growth. Our comprehensive approach includes developing multi-year financial models, scenario planning, and growth roadmaps that align with your business objectives.",
        "We create detailed forecasting models that help you understand potential outcomes under different market conditions, enabling informed decision-making and strategic pivots when necessary.",
        "Our strategic planning process includes competitive analysis, market opportunity assessment, and resource allocation optimization to maximize your return on investment and accelerate sustainable growth."
      ]
    },
    {
      id: 'cashflow',
      icon: DollarSign,
      title: "Cash Flow & Working Capital Optimization",
      description: [
        "Effective cash flow management is critical for business survival and growth. We provide comprehensive liquidity management services, including cash flow forecasting, burn rate analysis, and working capital optimization strategies.",
        "Our approach includes implementing robust cash management processes, optimizing payment terms with suppliers and customers, and establishing credit facilities to ensure adequate liquidity during growth phases or market downturns.",
        "We help you understand your cash conversion cycle, identify opportunities to accelerate receivables collection, optimize inventory levels, and strategically manage payables to improve overall working capital efficiency."
      ]
    },
    {
      id: 'reporting',
      icon: FileText,
      title: "Investor & Board Reporting",
      description: [
        "Professional-grade financial reporting is essential for maintaining investor confidence and board oversight. We create comprehensive monthly and quarterly reports that provide clear insights into business performance and key metrics.",
        "Our reporting packages include executive summaries, detailed financial statements, variance analysis, and forward-looking commentary that helps stakeholders understand both current performance and future opportunities.",
        "We specialize in creating compelling board presentations and investor updates that effectively communicate your business story, highlighting achievements, addressing challenges, and outlining strategic initiatives for continued growth."
      ]
    },
    {
      id: 'global',
      icon: Globe,
      title: "Global Expansion & Compliance",
      description: [
        "International expansion requires expert navigation of complex regulatory environments and accounting standards. We provide guidance on US GAAP, IFRS, and local accounting requirements across multiple jurisdictions.",
        "Our global compliance services include international tax planning, transfer pricing strategies, and regulatory compliance management to ensure your expansion efforts meet all legal and financial requirements.",
        "We help establish international financial operations, including subsidiary setup, intercompany agreements, and consolidated reporting processes that support efficient global business management."
      ]
    },
    {
      id: 'analytics',
      icon: BarChart3,
      title: "KPI Dashboard & Analytics",
      description: [
        "Real-time visibility into business performance is crucial for effective management. We design and implement comprehensive KPI dashboards that provide instant access to critical business metrics and performance indicators.",
        "Our analytics solutions include custom metric design, automated reporting systems, and performance tracking tools that help you monitor progress against strategic objectives and identify trends before they impact results.",
        "We create executive dashboards that consolidate key performance indicators from across your organization, providing a single source of truth for business performance and enabling data-driven decision making at all levels."
      ]
    },
    {
      id: 'ma',
      icon: Handshake,
      title: "M&A and Fundraising Support",
      description: [
        "Mergers, acquisitions, and fundraising activities require specialized financial expertise and meticulous preparation. We provide comprehensive due diligence support, including financial analysis, risk assessment, and valuation modeling.",
        "Our fundraising support includes preparing detailed financial projections, creating compelling investor presentations, and developing comprehensive data rooms that showcase your business opportunity to potential investors.",
        "We assist with deal structuring, negotiation support, and post-transaction integration planning to ensure successful outcomes and maximize value creation from strategic transactions."
      ]
    },
    {
      id: 'operations',
      icon: Settings,
      title: "Financial Operations Setup",
      description: [
        "Robust financial systems and processes are essential for scalable business growth. We help establish comprehensive accounting systems, implement automation tools, and design efficient financial processes that grow with your business.",
        "Our operational setup services include chart of accounts design, financial controls implementation, and process documentation that ensures accuracy, compliance, and efficiency in your financial operations.",
        "We provide ongoing support for system optimization, staff training, and process improvement initiatives that enhance the effectiveness of your financial operations and support long-term business success."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative px-4 py-12 sm:py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-serif">
            Our Services
          </h1>
          <p className="mx-auto mb-6 sm:mb-8 max-w-3xl text-lg sm:text-xl text-gray-600 leading-relaxed px-4 sm:px-0">
            Comprehensive virtual CFO services designed to accelerate your business growth 
            and optimize financial performance across all operational areas.
          </p>
          <div className="mx-auto w-24 sm:w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-0">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              const bgColor = isEven ? 'bg-white' : 'bg-gradient-to-br from-gray-50 to-white';
              
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`${bgColor} border-b border-gray-100 last:border-b-0`}
                >
                  <div className="px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
                    <div className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-6xl mx-auto ${
                      isEven ? '' : 'lg:grid-flow-col-dense'
                    }`}>
                      {/* Content */}
                      <div className={`space-y-6 sm:space-y-8 ${isEven ? '' : 'lg:col-start-2'}`}>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg flex-shrink-0">
                              <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                            </div>
                            <div className="flex-1">
                              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full mb-2">
                                Service #{index + 1}
                              </span>
                              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-serif leading-tight">
                                {service.title}
                              </h2>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 sm:space-y-5">
                          {service.description.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-base sm:text-lg text-gray-700 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        
                        <div className="pt-4">
                          <Link
                            to="/contact"
                            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-white font-semibold rounded-xl hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[44px] text-sm sm:text-base"
                          >
                            Get Started with {service.title.split(' ')[0]} {service.title.split(' ')[1]}
                            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                          </Link>
                        </div>
                      </div>
                      
                      {/* Enhanced Visual Element */}
                      <div className={`${isEven ? '' : 'lg:col-start-1'} mt-8 lg:mt-0`}>
                        <div className="relative">
                          {/* Main Card */}
                          <div className={`${isEven ? 'bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-white'} rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-200 relative overflow-hidden`}>
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full -translate-y-20 translate-x-20"></div>
                              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-300 to-amber-400 rounded-full translate-y-16 -translate-x-16"></div>
                            </div>
                            
                            <div className="relative">
                              {/* Large Icon */}
                              <div className="mb-6">
                                <div className="inline-flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg">
                                  <Icon className="h-10 w-10 sm:h-12 sm:w-12" />
                                </div>
                              </div>
                              
                              {/* Benefits Section */}
                              <div className="space-y-4">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                  Key Benefits
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                  {[
                                    'Strategic insight and planning',
                                    'Cost-effective expertise',
                                    'Scalable solutions',
                                    'Global compliance'
                                  ].map((benefit, bIndex) => (
                                    <div key={bIndex} className="flex items-center space-x-3">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                      </div>
                                      <span className="text-sm sm:text-base font-medium text-gray-700">{benefit}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Stats or Metrics */}
                              <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-amber-600">24/7</div>
                                    <div className="text-xs text-gray-600">Support</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-amber-600">Global</div>
                                    <div className="text-xs text-gray-600">Reach</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Floating Elements */}
                          <div className="absolute -top-4 -right-4 bg-amber-500 text-white p-3 rounded-xl shadow-lg">
                            <div className="text-xs font-semibold">#{index + 1}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-6 sm:p-8 border border-amber-100">
            <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-gray-900 font-serif">
              Ready to Transform Your Financial Operations?
            </h2>
            <p className="mb-5 sm:mb-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              Let's discuss how our virtual CFO services can accelerate your business growth 
              and optimize your financial performance.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-500 text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[44px] text-sm sm:text-base"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;