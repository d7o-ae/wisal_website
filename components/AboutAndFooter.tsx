import React, { useState } from 'react';
import Section from './Section';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfUse from './TermsOfUse';
import { useLanguage } from '../i18n/LanguageContext';

const AboutAndFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const path = window.location.pathname;
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(() => path.endsWith('/privacy'));
  const [isTermsOpen, setIsTermsOpen] = useState(() => path.endsWith('/terms'));
  const { t, lang } = useLanguage();

  const openPrivacy = () => {
    setIsPrivacyOpen(true);
    history.pushState(null, '', '/privacy');
  };

  const closePrivacy = () => {
    setIsPrivacyOpen(false);
    history.pushState(null, '', '/');
  };

  const openTerms = () => {
    setIsTermsOpen(true);
    history.pushState(null, '', '/terms');
  };

  const closeTerms = () => {
    setIsTermsOpen(false);
    history.pushState(null, '', '/');
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Section id="about" background="default" className="pb-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-wisal-primary mb-4">{t.footer.aboutTitle}</h2>
          <p className="text-wisal-secondary/80 leading-relaxed text-lg">
            {t.footer.aboutText} <span className="font-semibold text-wisal-primary">{t.footer.techCode}</span>{t.footer.aboutText2}
          </p>
        </div>

        <div className="border-t border-wisal-azure pt-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                 <img src="logo_footer.png" alt={t.nav.brandName} width="150" height="64" className="h-16 w-auto object-contain" />
              </div>
              <p className="text-sm text-wisal-secondary/80 max-w-xs">
                {t.footer.tagline}
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-wisal-primary mb-4">{t.footer.quickLinks}</h3>
              <ul className="space-y-2 text-sm text-wisal-secondary">
                <li><a href="#" onClick={scrollToTop} className="hover:text-wisal-rose transition-colors">{t.footer.home}</a></li>
                <li><a href="#features" className="hover:text-wisal-rose transition-colors">{t.nav.features}</a></li>
                <li><a href="#how-it-works" className="hover:text-wisal-rose transition-colors">{t.nav.howItWorks}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-wisal-primary mb-4">{t.footer.more}</h3>
              <ul className="space-y-2 text-sm text-wisal-secondary">
                <li>
                  <button 
                    onClick={openPrivacy} 
                    className={`hover:text-wisal-rose transition-colors ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  >
                    {t.footer.privacyPolicy}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={openTerms} 
                    className={`hover:text-wisal-rose transition-colors ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  >
                    {t.footer.termsOfUse}
                  </button>
                </li>
                <li><a href="https://tech-code.net/contact" target="_blank" rel="noopener noreferrer" className="hover:text-wisal-rose transition-colors">{t.footer.contactUs}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-wisal-azure/50 text-center text-sm text-wisal-secondary/70">
            <p>{t.footer.copyright.replace('{year}', String(currentYear))}</p>
          </div>
        </div>
      </Section>

      <PrivacyPolicy isOpen={isPrivacyOpen} onClose={closePrivacy} />
      <TermsOfUse isOpen={isTermsOpen} onClose={closeTerms} />
    </>
  );
};

export default AboutAndFooter;