import React from 'react';
import Section from './Section';
import Button from './Button';

const CallToAction: React.FC = () => {
  return (
    <Section id="register" background="white" className="text-center">
      <div className="max-w-3xl mx-auto bg-wisal-primary rounded-3xl p-10 md:p-16 text-white shadow-lg relative overflow-hidden">
        
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-wisal-rose opacity-10 rounded-full"></div>

        <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
          ابدأ تجربة تواصل أفضل اليوم
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 relative z-10">
          انضم إلى المدارس التي اختارت وِصال لتنظيم التواصل مع أولياء الأمور بطريقة أكثر احترافية.
        </p>
        
        <div className="relative z-10">
          <Button variant="secondary" className="px-10 py-4 text-lg font-bold">
            سجّل مدرستك الآن
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default CallToAction;