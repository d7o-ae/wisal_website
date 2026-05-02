import React, { useState } from 'react';
import Section from './Section';
import { Check, Crown, Sparkles, X, ChevronDown, ChevronUp, UserPlus, Megaphone, BarChart3, HeadphonesIcon, Zap, Calendar, Target, Globe, Bell, Shield, Users, Building2, FileText, Star, Image } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Pricing: React.FC = () => {
  const { t, lang } = useLanguage();
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleExpand = () => setAllExpanded(!allExpanded);

  const getStarterCategoryIcon = (index: number) => {
    const cls = 'w-4 h-4 text-wisal-primary';
    const icons = [
      <UserPlus className={cls} />,        // Registration & Subscription
      <Megaphone className={cls} />,       // Basic Publishing
      <BarChart3 className={cls} />,       // Basic Analytics
      <HeadphonesIcon className={cls} />, // Support
    ];
    return icons[index] ?? <Check className={cls} />;
  };

  const getProfessionalCategoryIcon = (index: number) => {
    const cls = 'w-4 h-4 text-wisal-azure';
    const icons = [
      <Zap className={cls} />,        // AI-Powered Content Writing
      <Calendar className={cls} />,   // Smart & Advanced Publishing
      <Image className={cls} />,      // Multimedia Posts
      <Target className={cls} />,     // Smart & Precise Targeting
      <Globe className={cls} />,      // Bilingual Content
      <Bell className={cls} />,       // Advanced Notifications & Alerts
      <BarChart3 className={cls} />,  // Advanced Analytics & Reports
      <Shield className={cls} />,     // Advanced Security & Access Management
      <Users className={cls} />,      // Advanced User Management
      <Building2 className={cls} />,  // Professional School Identity
      <FileText className={cls} />,   // Professional Communication Tools
      <Star className={cls} />,       // Exclusive Benefits
      <Sparkles className={cls} />,   // All Starter Plan Features
    ];
    return icons[index] ?? <Check className={cls} />;
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-wisal-primary mb-4">
            {t.pricing.title}
          </h2>
          <p className="text-xl text-wisal-secondary max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
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

            <p className="text-wisal-primary font-semibold mb-1">{t.pricing.starter.description}</p>
            <p className="text-wisal-secondary text-sm mb-6">{t.pricing.starter.subDescription}</p>

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
              {t.pricing.starter.features.slice(0, allExpanded ? undefined : 2).map((category: any, idx: number) => (
                <div key={idx}>
                  <h4 className="font-semibold text-wisal-primary mb-2 text-sm flex items-center gap-2">{getStarterCategoryIcon(idx)}{category.category}</h4>
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

              {/* Not included — shown when expanded */}
              {allExpanded && t.pricing.starter.notIncluded && (
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-wisal-secondary mb-2 text-sm">
                    ❌ {t.pricing.notIncludedLabel}
                  </h4>
                  <ul className="space-y-2">
                    {t.pricing.starter.notIncluded.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-wisal-secondary/70">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {t.pricing.starter.features.length > 2 && (
                <button
                  onClick={toggleExpand}
                  className="w-full mt-4 py-2 px-4 text-sm font-medium text-wisal-primary hover:bg-wisal-azure/20 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {allExpanded ? (
                    <><span>{t.pricing.showLess}</span><ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <><span>{t.pricing.showAllFeatures}</span><ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Professional Plan */}
          <div className="bg-gradient-to-br from-wisal-primary to-wisal-secondary rounded-2xl shadow-2xl p-8 border-2 border-wisal-rose relative transform md:scale-105">
            {/* Badge */}
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

            <p className="text-white font-semibold mb-1">{t.pricing.professional.description}</p>
            <p className="text-wisal-azure text-sm mb-6">{t.pricing.professional.subDescription}</p>

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
              {t.pricing.professional.features.slice(0, allExpanded ? undefined : 2).map((category: any, idx: number) => (
                <div key={idx}>
                  <h4 className="font-semibold text-white mb-2 text-sm flex items-center gap-2">{getProfessionalCategoryIcon(idx)}{category.category}</h4>
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
                  onClick={toggleExpand}
                  className="w-full mt-4 py-2 px-4 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {allExpanded ? (
                    <><span>{t.pricing.showLess}</span><ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <><span>{t.pricing.showAllFeatures}</span><ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-20 max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-wisal-primary text-center mb-8">
            {t.pricing.comparison.title}
          </h3>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-wisal-azure">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-wisal-primary text-white">
                    <th className={`py-4 px-6 ${lang === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold`}>{t.pricing.comparison.featureLabel}</th>
                    <th className="py-4 px-6 text-center text-sm font-semibold">{t.pricing.comparison.starterLabel}</th>
                    <th className="py-4 px-6 text-center text-sm font-semibold bg-wisal-rose/30">{t.pricing.comparison.professionalLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.pricing.comparison.rows.map((row: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-wisal-azure/10'}>
                      <td className={`py-3 px-6 text-sm font-medium text-wisal-primary ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{row.feature}</td>
                      <td className="py-3 px-6 text-sm text-center text-wisal-secondary">{row.starter}</td>
                      <td className="py-3 px-6 text-sm text-center font-medium text-wisal-primary bg-wisal-rose/5">{row.professional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ROI Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-wisal-primary text-center mb-8">
            {t.pricing.roi.title}
          </h3>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-wisal-azure">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-wisal-secondary text-white">
                    {t.pricing.roi.headers.map((header: string, idx: number) => (
                      <th key={idx} className={`py-3 px-4 ${lang === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold whitespace-nowrap`}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.pricing.roi.rows.map((row: any, idx: number) => (
                    <tr key={idx} className={row.highlight ? 'bg-wisal-primary' : idx % 2 === 0 ? 'bg-white' : 'bg-wisal-azure/10'}>
                      <td className={`py-3 px-4 text-sm font-medium whitespace-nowrap ${row.highlight ? 'text-white' : 'text-wisal-primary'} ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{row.method}</td>
                      <td className={`py-3 px-4 text-sm text-center ${row.highlight ? 'text-white' : 'text-wisal-secondary'}`}>{row.cost}</td>
                      <td className={`py-3 px-4 text-sm text-center ${row.highlight ? 'text-white font-semibold' : 'text-wisal-secondary'}`}>{row.media}</td>
                      <td className={`py-3 px-4 text-sm text-center ${row.highlight ? 'text-white font-semibold' : 'text-wisal-secondary'}`}>{row.analytics}</td>
                      <td className={`py-3 px-4 text-sm text-center ${row.highlight ? 'text-white font-semibold' : 'text-wisal-secondary'}`}>{row.ai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-wisal-azure/10 border-t border-wisal-azure">
              <p className="text-sm text-wisal-secondary text-center">{t.pricing.roi.subtext}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
