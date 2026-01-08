import React from 'react';
import Section from './Section';
import { School, Building2, UserCog, Users } from 'lucide-react';

const audienceList = [
  { id: 1, title: 'المدارس الدولية والأهلية', icon: School },
  { id: 2, title: 'إدارات المدارس', icon: Building2 },
  { id: 3, title: 'مسؤولي التواصل المدرسي', icon: UserCog },
  { id: 4, title: 'أولياء الأمور', icon: Users },
];

const Audience: React.FC = () => {
  return (
    <Section background="white">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-wisal-primary">
          وِصال مخصص لـ
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {audienceList.map((item) => (
          <div key={item.id} className="flex flex-col items-center justify-center p-6 bg-wisal-bg rounded-2xl border border-wisal-azure/50 hover:bg-wisal-azure/20 transition-colors">
            <item.icon className="w-10 h-10 text-wisal-primary mb-4 opacity-80" />
            <h3 className="font-semibold text-wisal-secondary text-center">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Audience;