import React from 'react';
import Section from './Section';
import { PenTool, Users, Send, Bell, BarChart3 } from 'lucide-react';
import { StepItem } from '../types';

const steps: StepItem[] = [
  {
    id: 1,
    title: 'إنشاء المنشورات',
    description: 'كتابة وتنسيق المنشورات بسهولة من لوحة التحكم الخاصة بالإدارة.',
    icon: PenTool,
  },
  {
    id: 2,
    title: 'تحديد الفئة',
    description: 'اختيار الجمهور المستهدف بدقة (صف معين، قسم، أو جنس محدد).',
    icon: Users,
  },
  {
    id: 3,
    title: 'النشر الفوري',
    description: 'ظهور المنشورات مباشرة في تطبيق أولياء الأمور بشكل منظم.',
    icon: Send,
  },
  {
    id: 4,
    title: 'إشعارات ذكية',
    description: 'وصول تنبيهات فورية للأهل لضمان عدم تفويت أي تحديث.',
    icon: Bell,
  },
  {
    id: 5,
    title: 'متابعة التفاعل',
    description: 'الاطلاع على تقارير القراءة والتفاعل من لوحة التحكم.',
    icon: BarChart3,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <Section id="how-it-works" background="default">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-wisal-primary mb-4">
          كيف تعمل منصة وِصال؟
        </h2>
        <div className="w-24 h-1.5 bg-wisal-rose mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex flex-col items-center text-center group">
            
            {/* Connector Line (Desktop only) */}
            {index !== steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-0 -ml-[50%] w-full h-0.5 bg-wisal-muted/30 -z-0"></div>
            )}

            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-wisal-azure flex items-center justify-center mb-6 relative z-10 group-hover:shadow-md group-hover:border-wisal-rose transition-all duration-300">
              <step.icon className="w-7 h-7 text-wisal-secondary group-hover:text-wisal-rose transition-colors" />
            </div>
            
            <h3 className="text-lg font-bold text-wisal-primary mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-wisal-secondary/80 leading-relaxed px-2">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default HowItWorks;