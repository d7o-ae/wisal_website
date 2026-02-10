import React, { useState } from 'react';
import Button from './Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import DownloadAppModal from './DownloadAppModal';

const Hero: React.FC = () => {
  const { t, lang } = useLanguage();
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

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
          {t.hero.title1} <span className="text-wisal-rose">{t.hero.titleHighlight}</span> {t.hero.title2}<br className="hidden md:block"/> {t.hero.title3}
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-wisal-secondary/80 leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            className="text-lg px-8 py-4"
            onClick={() => scrollToSection('register')}
          >
            {t.hero.registerBtn}
          </Button>
          <Button 
            variant="outline" 
            className="text-lg px-8 py-4 group"
            onClick={() => window.open('https://wisal-5d1e5.web.app/', '_blank')}
          >
             {t.hero.dashboardBtn}
             <ArrowIcon className={`${lang === 'ar' ? 'mr-2' : 'ml-2'} w-5 h-5 transition-transform ${lang === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </Button>
        </div>

        {/* Parent App Download Link */}
        <div className="mt-6">
          <button 
            onClick={() => setShowDownloadModal(true)}
            className="inline-flex items-center text-wisal-secondary hover:text-wisal-rose transition-colors gap-2 text-base cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 3v12m0 0l-4-4m4 4l4-4" />
            </svg>
            <span>{t.hero.downloadParentApp}</span>
          </button>
        </div>

        <DownloadAppModal isOpen={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
      </div>
      
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-wisal-azure/20 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-wisal-rose/10 blur-3xl opacity-60"></div>
    </div>
  );
};

export default Hero;