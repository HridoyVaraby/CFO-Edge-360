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
      value: "Global",
      label: "Worldwide Reach",
      description: "Serving clients globally"
    }
  ],
  regions = [
    { name: "USA", color: "blue" },
    { name: "Europe", color: "green" },
    { name: "Canada", color: "red" },
    { name: "Australia", color: "purple" },
    { name: "All Over The World", color: "indigo" }
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
      className={`px-4 py-12 sm:py-16 lg:py-20 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-serif">
            {title}
          </h2>
          {showDecorator && (
            <div className={`mx-auto w-20 sm:w-24 h-1 bg-gradient-to-r ${decoratorColor} rounded-full mb-6 sm:mb-8`}></div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
              {mainDescription}
            </p>

            {stats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="text-xl sm:text-2xl font-bold text-amber-600 mb-1 sm:mb-2">{stat.value}</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-600">{stat.description}</div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              {secondaryDescription}
            </p>
          </div>

          {/* Right Content - Global Regions */}
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center">
                Serving Businesses Worldwide
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {/* First 4 regions in 2x2 grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {regions.slice(0, 4).map((region, index) => {
                    const colors = getColorClasses(region.color);
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gradient-to-r ${colors.bg} border ${colors.border}`}
                      >
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 ${colors.dot} rounded-full flex-shrink-0`}></div>
                        <span className="text-sm sm:text-base font-medium text-gray-900">{region.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Worldwide region as full-width box */}
                {regions.length > 4 && (
                  <div className="w-full">
                    {(() => {
                      const worldwideRegion = regions[4];
                      const colors = getColorClasses(worldwideRegion.color);
                      return (
                        <div className={`flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg bg-gradient-to-r ${colors.bg} border ${colors.border}`}>
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 ${colors.dot} rounded-full flex-shrink-0`}></div>
                          <span className="text-sm sm:text-base font-medium text-gray-900">{worldwideRegion.name}</span>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>

            {/* Decorative elements */}
            <div className={`absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r ${decoratorColor} rounded-full opacity-20`}></div>
            <div className={`absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r ${decoratorColor} rounded-full opacity-30`}></div>
          </div>
        </div>
      </div>
    </section>
  );
}