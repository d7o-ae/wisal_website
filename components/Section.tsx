import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  background?: 'default' | 'white' | 'azure';
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  className = '', 
  background = 'default', 
  children 
}) => {
  const bgColors = {
    default: 'bg-wisal-bg',
    white: 'bg-white',
    azure: 'bg-wisal-azure/30' // Very light azure
  };

  return (
    <section id={id} className={`py-16 md:py-24 ${bgColors[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;