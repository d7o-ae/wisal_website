import React from 'react';
import Section from './Section';
import { PenTool, Users, Send, Bell, BarChart3 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LucideIcon } from 'lucide-react';

const stepIcons: LucideIcon[] = [PenTool, Users, Send, Bell, BarChart3];

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section id="how-it-works" background="default">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-wisal-primary mb-4">
          {t.howItWorks.title}
        </h2>
        <div className="w-24 h-1.5 bg-wisal-rose mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {t.howItWorks.steps.map((step, index) => {
          const Icon = stepIcons[index];
          return (
            <div key={index} className="relative flex flex-col items-center text-center group">
              
              {/* Connector Line (Desktop only) */}
              {index !== t.howItWorks.steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-0 -ml-[50%] w-full h-0.5 bg-wisal-muted/30 -z-0"></div>
              )}

              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-wisal-azure flex items-center justify-center mb-6 relative z-10 group-hover:shadow-md group-hover:border-wisal-rose transition-all duration-300">
                <Icon className="w-7 h-7 text-wisal-secondary group-hover:text-wisal-rose transition-colors" />
              </div>
              
              <h3 className="text-lg font-bold text-wisal-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-wisal-secondary/80 leading-relaxed px-2">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default HowItWorks;