export interface CompanyOverviewProps {
  /** Main heading text for the company overview section */
  title?: string;
  /** Main description text highlighting the company's value proposition */
  mainDescription?: string;
  /** Secondary description providing additional details about services */
  secondaryDescription?: string;
  /** Array of statistics to display in the overview cards */
  stats?: Array<{
    /** The main number or text to display prominently */
    value: string;
    /** The label describing what the stat represents */
    label: string;
    /** Additional descriptive text below the label */
    description: string;
  }>;
  /** Array of regions/locations where the company operates */
  regions?: Array<{
    /** Display name of the region */
    name: string;
    /** Color theme for the region (blue, green, red, purple, etc.) */
    color: 'blue' | 'green' | 'red' | 'purple' | 'indigo' | 'pink' | 'yellow' | 'gray';
  }>;
  /** Background color for the entire section */
  backgroundColor?: string;
  /** Custom CSS classes to apply to the root container */
  className?: string;
  /** Whether to show the decorative line under the title */
  showDecorator?: boolean;
  /** Color of the decorator line */
  decoratorColor?: string;
}

/**
 * A reusable company overview component that displays company information,
 * statistics, and global reach in an attractive layout.
 */
export default function CompanyOverview({
  title = "Global Virtual CFO Excellence",
  mainDescription = "CFO EDGE360 provides virtual and fractional CFO services to businesses across four continents, delivering strategic financial leadership that scales with your growth.",
  secondaryDescription = "We deliver strategic forecasting, cash flow optimization, investor reporting, KPI dashboards, global compliance, and fundraising support — all at a fraction of the cost of a full-time CFO.",
  stats = [
    {
      value: "360°",
      label: "Complete Coverage",
      description: "Full-spectrum CFO services"
    },
    {
      value: "4",
      label: "Continents",
      description: "Global reach & expertise"
    }
  ],
  regions = [
    { name: "USA", color: "blue" },
    { name: "Europe", color: "green" },
    { name: "Canada", color: "red" },
    { name: "Australia", color: "purple" }
  ],
  backgroundColor = "#fffaeb",
  className = "",
  showDecorator = true,
  decoratorColor = "from-amber-400 to-amber-500"
}: CompanyOverviewProps) {
  
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "from-blue-50 to-blue-100",
        border: "border-blue-200",
        dot: "bg-blue-500"
      },
      green: {
        bg: "from-green-50 to-green-100",
        border: "border-green-200",
        dot: "bg-green-500"
      },
      red: {
        bg: "from-red-50 to-red-100",
        border: "border-red-200",
        dot: "bg-red-500"
      },
      purple: {
        bg: "from-purple-50 to-purple-100",
        border: "border-purple-200",
        dot: "bg-purple-500"
      },
      indigo: {
        bg: "from-indigo-50 to-indigo-100",
        border: "border-indigo-200",
        dot: "bg-indigo-500"
      },
      pink: {
        bg: "from-pink-50 to-pink-100",
        border: "border-pink-200",
        dot: "bg-pink-500"
      },
      yellow: {
        bg: "from-yellow-50 to-yellow-100",
        border: "border-yellow-200",
        dot: "bg-yellow-500"
      },
      gray: {
        bg: "from-gray-50 to-gray-100",
        border: "border-gray-200",
        dot: "bg-gray-500"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section 
      className={`px-4 py-20 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 font-serif">
            {title}
          </h2>
          {showDecorator && (
            <div className={`mx-auto w-24 h-1 bg-gradient-to-r ${decoratorColor} rounded-full mb-8`}></div>
          )}
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              {mainDescription}
            </p>
            
            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="text-2xl font-bold text-amber-600 mb-2">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-600">{stat.description}</div>
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {secondaryDescription}
            </p>
          </div>
          
          {/* Right Content - Global Regions */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Serving Businesses Worldwide
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {regions.map((region, index) => {
                  const colors = getColorClasses(region.color);
                  return (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r ${colors.bg} border ${colors.border}`}
                    >
                      <div className={`w-3 h-3 ${colors.dot} rounded-full`}></div>
                      <span className="font-medium text-gray-900">{region.name}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 text-center">
                <span className="text-sm text-gray-500 italic">& beyond</span>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r ${decoratorColor} rounded-full opacity-20`}></div>
            <div className={`absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r ${decoratorColor} rounded-full opacity-30`}></div>
          </div>
        </div>
      </div>
    </section>
  );
}