import React from 'react';
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
      <section className="relative px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl font-serif">
            Our Services
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 leading-relaxed">
            Comprehensive virtual CFO services designed to accelerate your business growth 
            and optimize financial performance across all operational areas.
          </p>
          <div className="mx-auto w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:grid-flow-col-dense'
                  }`}
                >
                  {/* Content */}
                  <div className={`space-y-6 ${isEven ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 font-serif">
                        {service.title}
                      </h2>
                    </div>
                    
                    <div className="space-y-4">
                      {service.description.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    <Link
                      to="/contact"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Let's Talk
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                  
                  {/* Visual Element */}
                  <div className={`${isEven ? '' : 'lg:col-start-1'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-amber-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="relative">
                        <Icon className="h-16 w-16 text-amber-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Key Benefits
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                            Strategic insight and planning
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                            Cost-effective expertise
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                            Scalable solutions
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                            Global compliance
                          </li>
                        </ul>
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
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-8 border border-amber-100">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 font-serif">
              Ready to Transform Your Financial Operations?
            </h2>
            <p className="mb-6 text-lg text-gray-700 leading-relaxed">
              Let's discuss how our virtual CFO services can accelerate your business growth 
              and optimize your financial performance.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;