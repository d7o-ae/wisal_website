import React from 'react';
import Section from './Section';

const Screenshots: React.FC = () => {
  return (
    <Section background="default" className="overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-wisal-primary mb-4">
          واجهة بسيطة… تجربة احترافية
        </h2>
        <p className="text-wisal-secondary">
          صُممت لتكون مألوفة وسهلة الاستخدام منذ اللحظة الأولى.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 relative">
        
        {/* Web Dashboard Mockup */}
        <div className="w-full lg:w-2/3 relative z-10">
          <div className="bg-white rounded-xl shadow-lg border border-wisal-azure overflow-hidden">
            <div className="bg-wisal-secondary h-8 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            {/* Dashboard Screenshot */}
            <div className="bg-gray-50 aspect-video w-full flex items-center justify-center relative group">
               <img 
                 src="dashboard.png" 
                 alt="لوحة تحكم وِصال" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm">لوحة التحكم</span>
               </div>
            </div>
          </div>
        </div>

        {/* Mobile App Mockup */}
        <div className="w-2/3 sm:w-1/2 lg:w-1/4 relative z-20 lg:-mr-12 lg:mt-20">
          <div className="bg-wisal-primary rounded-[2.5rem] p-3 shadow-xl border-4 border-wisal-secondary">
            <div className="bg-white rounded-[2rem] overflow-hidden aspect-[9/19.5] relative group">
                {/* Mobile App Screenshot */}
                <img 
                 src="mobile.png" 
                 alt="تطبيق وِصال" 
                 className="w-full h-full object-cover"
               />
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm">تطبيق الجوال</span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default Screenshots;