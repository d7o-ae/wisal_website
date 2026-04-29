import React from 'react';
import Section from './Section';
import { Megaphone, Target, BarChart2, ShieldCheck, Languages, Smartphone, Clock, TrendingDown, UserX, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LucideIcon } from 'lucide-react';

const featureIcons: LucideIcon[] = [Megaphone, Target, BarChart2, ShieldCheck, Languages, Smartphone, Clock, TrendingDown, UserX, Sparkles];

const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section id="features" background="azure">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-wisal-primary mb-4">
          {t.features.title}
        </h2>
        <p className="text-wisal-secondary max-w-2xl mx-auto">
          {t.features.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {t.features.items.map((feature, index) => {
          const Icon = featureIcons[index];
          return (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-wisal-azure hover:shadow-md transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-wisal-bg flex items-center justify-center mb-4 text-wisal-rose">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-wisal-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-wisal-secondary/80 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Features;