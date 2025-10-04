import React from 'react';

interface PageHeroProps {
  title: string;
  description: string;
  className?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ 
  title, 
  description, 
  className = "" 
}) => {
  return (
    <section className={`relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Subtle gold accent curves */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-slate-600/20 rounded-full blur-3xl"></div>
        
        {/* Geometric accent */}
        <div className="absolute top-1/3 right-1/4 w-2 h-32 bg-gradient-to-b from-amber-400/80 to-transparent rounded-full transform rotate-12"></div>
      </div>

      <div className="relative px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-serif leading-tight">
            {title}
          </h1>
          <p className="mx-auto mb-6 sm:mb-8 max-w-3xl text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed px-4 sm:px-0">
            {description}
          </p>
          <div className="mx-auto w-24 sm:w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;