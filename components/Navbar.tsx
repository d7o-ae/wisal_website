import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import { useLanguage } from '../i18n/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, t, setLang } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: '#about-wisal' },
    { label: t.nav.features, href: '#features' },
    { label: t.nav.howItWorks, href: '#how-it-works' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (href === '#home' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(href);
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

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className="sticky top-0 z-50 bg-wisal-bg/95 backdrop-blur-sm border-b border-wisal-azure">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="#home" 
              onClick={(e) => handleScroll(e, '#home')} 
              className="flex items-center gap-3 focus:outline-none"
            >
              <img src="wisal_logo.png" alt={t.nav.brandName} className="h-12 w-auto object-contain" />
              <span className="text-2xl font-bold text-wisal-primary">{t.nav.brandName}</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center ${lang === 'ar' ? 'space-x-8 space-x-reverse' : 'space-x-8'}`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-wisal-secondary hover:text-wisal-rose transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-wisal-azure hover:border-wisal-rose hover:bg-wisal-azure/20 transition-all duration-200 text-sm font-medium text-wisal-secondary"
              aria-label="Switch language"
            >
              {lang === 'ar' ? (
                <>
                  <img src="https://flagcdn.com/w40/gb.png" alt="EN" className="w-5 h-4 rounded-sm object-cover" />
                  <span>EN</span>
                </>
              ) : (
                <>
                  <img src="https://flagcdn.com/w40/sa.png" alt="عربي" className="w-5 h-4 rounded-sm object-cover" />
                  <span>عربي</span>
                </>
              )}
            </button>

            <Button 
              variant="primary" 
              className={`${lang === 'ar' ? 'mr-4' : 'ml-4'} !py-2 !px-4 text-sm`}
              onClick={(e) => handleScroll(e, '#register')}
            >
              {t.nav.registerSchool}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-wisal-primary hover:text-wisal-rose focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-wisal-azure shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="block px-3 py-2 rounded-md text-base font-medium text-wisal-secondary hover:bg-wisal-azure/30"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-base font-medium text-wisal-secondary hover:bg-wisal-azure/30 transition-all"
              >
                {lang === 'ar' ? (
                  <>
                    <img src="https://flagcdn.com/w40/gb.png" alt="EN" className="w-5 h-4 rounded-sm object-cover" />
                    <span>EN</span>
                  </>
                ) : (
                  <>
                    <img src="https://flagcdn.com/w40/sa.png" alt="عربي" className="w-5 h-4 rounded-sm object-cover" />
                    <span>عربي</span>
                  </>
                )}
              </button>
            </div>
            <div className="pt-2">
              <Button 
                fullWidth 
                onClick={(e) => handleScroll(e, '#register')}
              >
                {t.nav.registerSchool}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;