import React from 'react';
import Section from './Section';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  return (
    <Section id="about-wisal" background="white" className="border-y border-wisal-azure/50">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Problem */}
        <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-red-400 w-8 h-8" />
            <h2 className="text-2xl font-bold text-wisal-primary">
              هل تعاني من ضعف التواصل؟
            </h2>
          </div>
          <p className="text-wisal-secondary leading-relaxed text-lg">
            تعتمد المدارس على وسائل غير منظمة مثل الواتساب أو الرسائل النصية، مما يؤدي إلى ضياع المعلومات، ضعف التفاعل، وتأخر الإشعارات بالإضافة للتكلفة العالية.
          </p>
        </div>

        {/* Solution */}
        <div className="bg-wisal-azure/20 p-8 rounded-2xl border border-wisal-azure">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="text-wisal-rose w-8 h-8" />
            <h2 className="text-2xl font-bold text-wisal-primary">
              وِصال هو الحل
            </h2>
          </div>
          <p className="text-wisal-secondary leading-relaxed text-lg">
            وِصال يوفر حلاً احترافيًا يجمع كل التواصل في منصة واحدة واضحة وسهلة الاستخدام، مما يضمن وصول المعلومات الصحيحة للأشخاص المعنيين في الوقت المناسب.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ProblemSolution;