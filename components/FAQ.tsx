import React, { useState } from 'react';
import Section from './Section';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: 'هل يحتاج أولياء الأمور إلى تسجيل حساب؟',
    answer: 'لا، التطبيق لا يتطلب أي تسجيل دخول لأولياء الأمور. يمكنهم ببساطة اختيار الدولة والمدرسة من القائمة لبدء استقبال الإشعارات، دون الحاجة لإدخال أي معلومات شخصية مثل الاسم أو البريد الإلكتروني أو رقم الجوال.'
  },
  {
    id: 2,
    question: 'كيف تضمن وِصال أمان البيانات؟',
    answer: 'نلتزم بأعلى معايير الأمان من خلال تشفير البيانات أثناء النقل والتخزين، استخدام خوادم آمنة ومحمية، والتحكم الصارم في الوصول للبيانات. كما أننا لا نجمع أي معلومات شخصية من أولياء الأمور، فقط بيانات تقنية لإرسال الإشعارات.'
  },
  {
    id: 3,
    question: 'ما أنواع المدارس التي يمكنها استخدام وِصال؟',
    answer: 'وِصال مصمم للمدارس العالمية والأهلية، إدارات المدارس الحكومية، ومسؤولي التواصل المدرسي في جميع الدول. المنصة مناسبة لأي مدرسة مرخصة رسمياً تسعى لتحسين التواصل مع أولياء الأمور.'
  },
  {
    id: 4,
    question: 'ما اللغات المدعومة في المنصة؟',
    answer: 'وِصال يدعم اللغتين العربية والإنجليزية بشكل كامل، مما يجعله مناسباً للمدارس الوطنية والدولية على حد سواء. يمكن للمدارس نشر المحتوى بأي من اللغتين حسب احتياجاتها.'
  },
  {
    id: 5,
    question: 'كم تبلغ تكلفة استخدام وِصال؟',
    answer: 'يوفر وِصال توفيراً كبيراً في التكلفة بنسبة تصل إلى 72% مقارنة بالطرق التقليدية مثل الرسائل النصية. للحصول على عرض سعر مخصص يناسب حجم مدرستك، يرجى تسجيل مدرستك وسيتواصل معك فريقنا خلال 24 ساعة.'
  },
  {
    id: 6,
    question: 'كيف يمكنني البدء باستخدام وِصال؟',
    answer: 'الأمر بسيط جداً! قم بتسجيل مدرستك من خلال النموذج في الموقع، وسيتواصل معك فريق الدعم لمساعدتك في إعداد الحساب والبدء. العملية تستغرق أقل من 24 ساعة وسنوفر لك كل الدعم اللازم.'
  },
  {
    id: 7,
    question: 'هل يمكنني استهداف فئات معينة من أولياء الأمور؟',
    answer: 'نعم بالتأكيد! وِصال يتيح لك استهداف دقيق للرسائل حسب الصف، القسم، أو أي فئة محددة، مما يضمن وصول المعلومات الصحيحة للأشخاص المعنيين فقط دون إزعاج الآخرين.'
  }
];

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section id="faq" background="white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 scroll-animate animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-wisal-primary mb-4">
            الأسئلة الشائعة
          </h2>
          <p className="text-wisal-secondary">
            إجابات سريعة على أكثر الأسئلة شيوعاً حول منصة وِصال
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className={`scroll-animate animate-fadeInUp animate-delay-${Math.min(index, 5) * 100} border border-wisal-azure rounded-2xl overflow-hidden transition-all duration-300 ${
                openId === faq.id ? 'bg-wisal-azure/10' : 'bg-white hover:bg-wisal-azure/5'
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 text-right flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-wisal-rose focus:ring-offset-2 rounded-2xl"
                aria-expanded={openId === faq.id}
              >
                <span className="text-lg font-semibold text-wisal-primary flex-1">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-wisal-rose transition-transform duration-300 flex-shrink-0 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
