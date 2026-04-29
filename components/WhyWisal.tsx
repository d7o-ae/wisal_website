import React from 'react';
import Section from './Section';
import { Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const WhyWisal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section background="azure">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
        
        <div className="md:w-1/2">
           <h2 className="text-3xl md:text-4xl font-bold text-wisal-primary mb-8">
            {t.whyWisal.title}
          </h2>
          <div className="space-y-4">
            {t.whyWisal.reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-wisal-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-lg text-wisal-secondary font-medium">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 w-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-wisal-azure text-center">
                <div className="w-20 h-20 bg-wisal-bg rounded-full mx-auto flex items-center justify-center mb-4 text-4xl">
                    🤝
                </div>
                <h3 className="text-xl font-bold text-wisal-primary mb-2">{t.whyWisal.partnerTitle}</h3>
                <p className="text-wisal-secondary/80">
                    {t.whyWisal.partnerText}
                </p>
            </div>
        </div>

      </div>
    </Section>
  );
};

export default WhyWisal;