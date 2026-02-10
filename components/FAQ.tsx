import React, { useState } from 'react';
import Section from './Section';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const { t, lang } = useLanguage();

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section id="faq" background="white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 scroll-animate animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-wisal-primary mb-4">
            {t.faq.title}
          </h2>
          <p className="text-wisal-secondary">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((faq, index) => (
            <div
              key={index}
              className={`scroll-animate animate-fadeInUp animate-delay-${Math.min(index, 5) * 100} border border-wisal-azure rounded-2xl overflow-hidden transition-all duration-300 ${
                openId === index ? 'bg-wisal-azure/10' : 'bg-white hover:bg-wisal-azure/5'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-5 ${lang === 'ar' ? 'text-right' : 'text-left'} flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-wisal-rose focus:ring-offset-2 rounded-2xl`}
                aria-expanded={openId === index}
              >
                <span className="text-lg font-semibold text-wisal-primary flex-1">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-wisal-rose transition-transform duration-300 flex-shrink-0 ${
                    openId === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-wisal-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FAQ;
