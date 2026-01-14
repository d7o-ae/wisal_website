import React from 'react';
import Section from './Section';
import { Megaphone, Target, BarChart2, ShieldCheck, Languages, Smartphone, Clock, TrendingDown, UserX, Sparkles } from 'lucide-react';
import { FeatureItem } from '../types';

const features: FeatureItem[] = [
  { id: 1, title: 'منشورات ذكية وإشعارات فورية', icon: Megaphone, description: 'نظام نشر مرن يضمن وصول المعلومة.' },
  { id: 2, title: 'استهداف دقيق للفئات', icon: Target, description: 'وجّه رسالتك للصف أو القسم المعني فقط.' },
  { id: 3, title: 'تقارير تفاعل وإحصائيات', icon: BarChart2, description: 'تعرف على مدى وصول رسائلك.' },
  { id: 4, title: 'نظام صلاحيات مرن وآمن', icon: ShieldCheck, description: 'تحكم كامل بمن ينشر وماذا ينشر.' },
  { id: 5, title: 'دعم العربية والإنجليزية', icon: Languages, description: 'واجهة متعددة اللغات لخدمة الجميع.' },
  { id: 6, title: 'تطبيق جوال لأولياء الأمور', icon: Smartphone, description: 'تجربة مستخدم سلسة على الآيفون والأندرويد.' },
  { id: 7, title: 'جدولة المنشورات مسبقًا', icon: Clock, description: 'خطط لإعلاناتك المدرسية بكل راحة.' },
  { id: 8, title: 'توفير في التكلفة بنسبة 72%', icon: TrendingDown, description: 'خفض كبير في تكاليف الرسائل والتواصل.' },
  { id: 9, title: 'بدون تسجيل لأولياء الأمور', icon: UserX, description: 'لا حاجة لإنشاء حساب أو تذكر كلمة مرور.' },
  { id: 10, title: 'واجهة بسيطة ومباشرة', icon: Sparkles, description: 'سهلة الاستخدام لجميع الأعمار والفئات.' },
];

const Features: React.FC = () => {
  return (
    <Section id="features" background="azure">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-wisal-primary mb-4">
          مميزات تجعل التواصل أكثر فعالية
        </h2>
        <p className="text-wisal-secondary max-w-2xl mx-auto">
          أدوات مصممة خصيصًا لتلبية احتياجات البيئة المدرسية الحديثة.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div 
            key={feature.id} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-wisal-azure hover:shadow-md transition-all duration-300 flex flex-col items-start"
          >
            <div className="w-12 h-12 rounded-xl bg-wisal-bg flex items-center justify-center mb-4 text-wisal-rose">
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-wisal-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-wisal-muted text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Features;