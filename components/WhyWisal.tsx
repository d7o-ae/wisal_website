import React from 'react';
import Section from './Section';
import { Check } from 'lucide-react';

const reasons = [
  'يقلل الاعتماد على وسائل غير رسمية (واتساب، إلخ)',
  'يعزز ثقة أولياء الأمور بالمؤسسة التعليمية',
  'منظم، آمن، وقابل للتوسع مع نمو المدرسة',
  'مصمم خصيصًا للقطاع التعليمي واحتياجاته',
  'يقلل تكلفة الرسائل القصيرة والقنوات الأخرى بنسبة 72%',
];

const WhyWisal: React.FC = () => {
  return (
    <Section background="azure">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl mx-auto">
        
        <div className="md:w-1/2">
           <h2 className="text-3xl md:text-4xl font-bold text-wisal-primary mb-8">
            لماذا تختار وِصال؟
          </h2>
          <div className="space-y-4">
            {reasons.map((reason, index) => (
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
                <h3 className="text-xl font-bold text-wisal-primary mb-2">شريكك التقني</h3>
                <p className="text-wisal-muted">
                    نحن لا نقدم برنامجاً فحسب، بل نقدم بيئة تواصل متكاملة تدعم نجاح مدرستك.
                </p>
            </div>
        </div>

      </div>
    </Section>
  );
};

export default WhyWisal;