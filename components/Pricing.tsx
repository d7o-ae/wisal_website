import React, { useState } from 'react';
import Section from './Section';
import { Check, Crown, Sparkles, UserPlus, Megaphone, Settings, BarChart3, HeadphonesIcon, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Pricing: React.FC = () => {
  const { t, lang } = useLanguage();
  const [starterExpanded, setStarterExpanded] = useState(false);
  const [professionalExpanded, setProfessionalExpanded] = useState(false);

  // Icon mapping for feature categories
  const getCategoryIcon = (index: number, isProfessional: boolean = false) => {
    const iconClass = isProfessional ? "w-4 h-4 text-wisal-azure" : "w-4 h-4 text-wisal-primary";
    const icons = [
      <UserPlus className={iconClass} />,           // Registration
      <Megaphone className={iconClass} />,          // Publishing
      <Settings className={iconClass} />,           // Management
      <BarChart3 className={iconClass} />,          // Analytics
      <HeadphonesIcon className={iconClass} />,     // Support
      <Zap className={iconClass} />,                // AI
    ];
    return icons[index] || <Check className={iconClass} />;
  };

  const scrollToRegister = () => {
    const element = document.querySelector('#register');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <Section id="pricing" background="gradient" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-wisal-rose rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-wisal-azure rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-wisal-primary mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-xl text-wisal-secondary max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-wisal-azure hover:border-wisal-muted transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-wisal-azure to-wisal-muted flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-wisal-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-wisal-primary">{t.pricing.starter.name}</h3>
                <p className="text-sm text-wisal-secondary">{t.pricing.starter.badge}</p>
              </div>
            </div>
            
            <p className="text-wisal-secondary mb-6 min-h-[60px]">{t.pricing.starter.description}</p>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-wisal-primary mb-1">{t.pricing.starter.price}</div>
              <div className="text-sm text-wisal-secondary">{t.pricing.starter.priceDescription}</div>
            </div>

            <button
              onClick={scrollToRegister}
              className="w-full bg-wisal-primary text-white py-3 px-6 rounded-xl font-semibold hover:bg-wisal-secondary transition-all duration-200 mb-8"
            >
              {t.pricing.starter.cta}
            </button>

            <div className="space-y-4">
              {t.pricing.starter.features.slice(0, starterExpanded ? undefined : 2).map((category: any, idx: number) => (
                <div key={idx}>
                  <h4 className="font-semibold text-wisal-primary mb-2 text-sm flex items-center gap-2">
                    {getCategoryIcon(idx)}
                    {category.category}
                  </h4>
                  <ul className="space-y-2">
                    {category.items.map((item: string, itemIdx: number) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-wisal-secondary">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {t.pricing.starter.features.length > 2 && (
                <button
                  onClick={() => setStarterExpanded(!starterExpanded)}
                  className="w-full mt-4 py-2 px-4 text-sm font-medium text-wisal-primary hover:bg-wisal-azure/20 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {starterExpanded ? (
                    <>
                      <span>{t.pricing.showLess}</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>{t.pricing.showAllFeatures}</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Professional Plan */}
          <div className="bg-gradient-to-br from-wisal-primary to-wisal-secondary rounded-2xl shadow-2xl p-8 border-2 border-wisal-rose relative transform md:scale-105">
            {/* Recommended Badge */}
            <div className={`absolute -top-4 ${lang === 'ar' ? '-right-4' : '-left-4'} bg-wisal-rose text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2`}>
              <Crown className="w-4 h-4" />
              {t.pricing.professional.recommended}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-wisal-rose to-amber-400 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{t.pricing.professional.name}</h3>
                <p className="text-sm text-wisal-azure">{t.pricing.professional.badge}</p>
              </div>
            </div>
            
            <p className="text-wisal-azure mb-6 min-h-[60px]">{t.pricing.professional.description}</p>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-white mb-1">{t.pricing.professional.price}</div>
              <div className="text-sm text-wisal-azure">{t.pricing.professional.priceDescription}</div>
            </div>

            <button
              onClick={scrollToRegister}
              className="w-full bg-white text-wisal-primary py-3 px-6 rounded-xl font-semibold hover:bg-wisal-azure transition-all duration-200 mb-8 shadow-lg"
            >
              {t.pricing.professional.cta}
            </button>

            <div className="space-y-4">
              {t.pricing.professional.features.slice(0, professionalExpanded ? undefined : 2).map((category: any, idx: number) => (
                <div key={idx}>
                  <h4 className="font-semibold text-white mb-2 text-sm flex items-center gap-2">
                    {getCategoryIcon(idx, true)}
                    {category.category}
                  </h4>
                  <ul className="space-y-2">
                    {category.items.map((item: string, itemIdx: number) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-wisal-azure">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {t.pricing.professional.features.length > 2 && (
                <button
                  onClick={() => setProfessionalExpanded(!professionalExpanded)}
                  className="w-full mt-4 py-2 px-4 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {professionalExpanded ? (
                    <>
                      <span>{t.pricing.showLess}</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>{t.pricing.showAllFeatures}</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
