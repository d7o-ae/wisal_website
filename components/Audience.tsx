import React from 'react';
import Section from './Section';
import { School, Building2, UserCog, Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LucideIcon } from 'lucide-react';

const audienceIcons: LucideIcon[] = [School, Building2, UserCog, Users];

const Audience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section background="white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-wisal-primary">
          {t.audience.title}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {t.audience.items.map((title, index) => {
          const Icon = audienceIcons[index];
          return (
            <div key={index} className="flex flex-col items-center justify-center p-6 bg-wisal-bg rounded-2xl border border-wisal-azure/50 hover:bg-wisal-azure/20 transition-colors">
              <Icon className="w-10 h-10 text-wisal-primary mb-4 opacity-80" />
              <h3 className="font-semibold text-wisal-secondary text-center">
                {title}
              </h3>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Audience;