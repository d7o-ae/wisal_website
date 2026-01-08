import React from 'react';
import Button from './Button';
import { ArrowLeft } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="home" className="relative overflow-hidden bg-wisal-bg pt-10 pb-16 md:pt-20 md:pb-24 lg:pt-28 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wisal-primary leading-tight tracking-tight mb-6">
          وِصال… <span className="text-wisal-rose">لأن التواصل</span> مع المدرسة<br className="hidden md:block"/> يجب أن يكون أسهل
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-wisal-secondary/80 leading-relaxed">
          منصة ذكية تربط المدارس بأولياء الأمور عبر منشورات وإشعارات مخصصة، في الوقت المناسب، وبطريقة منظمة وآمنة.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            className="text-lg px-8 py-4"
            onClick={() => scrollToSection('register')}
          >
            سجّل مدرستك
          </Button>
          <Button 
            variant="outline" 
            className="text-lg px-8 py-4 group"
            onClick={() => scrollToSection('features')}
          >
             جرّب المنصة الآن
             <ArrowLeft className="mr-2 w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </Button>
        </div>
      </div>
      
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-wisal-azure/20 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-wisal-rose/10 blur-3xl opacity-60"></div>
    </div>
  );
};

export default Hero;