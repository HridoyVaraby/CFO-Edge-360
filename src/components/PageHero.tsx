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
    <section className={`bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 ${className}`}>
      <div className="px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-white font-serif leading-tight">
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