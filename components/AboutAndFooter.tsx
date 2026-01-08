import React from 'react';
import Section from './Section';

const AboutAndFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Section id="about" background="default" className="pb-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-wisal-primary mb-4">من نحن</h2>
          <p className="text-wisal-secondary/80 leading-relaxed text-lg">
            تم تطوير منصة وِصال بواسطة <span className="font-semibold text-wisal-primary">Tech-Code.net</span>، وهي شركة تقنية متخصصة في بناء الحلول الرقمية للقطاع التعليمي، وتهدف إلى دعم التحول الرقمي وتقديم أنظمة عملية وموثوقة تلبي احتياجات المؤسسات التعليمية.
          </p>
        </div>

        <div className="border-t border-wisal-azure pt-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                 <img src="wisal_logo.png" alt="وِصال" className="h-10 w-auto object-contain" />
              </div>
              <p className="text-sm text-wisal-muted max-w-xs">
                منصة التواصل المدرسي التي تجمع بين البساطة والفعالية.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-wisal-primary mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm text-wisal-secondary">
                <li><a href="#" onClick={scrollToTop} className="hover:text-wisal-rose transition-colors">الرئيسية</a></li>
                <li><a href="#features" className="hover:text-wisal-rose transition-colors">المميزات</a></li>
                <li><a href="#how-it-works" className="hover:text-wisal-rose transition-colors">كيف يعمل</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-wisal-primary mb-4">قانوني</h4>
              <ul className="space-y-2 text-sm text-wisal-secondary">
                <li><a href="#" className="hover:text-wisal-rose transition-colors">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-wisal-rose transition-colors">شروط الاستخدام</a></li>
                <li><a href="#" className="hover:text-wisal-rose transition-colors">تواصل معنا</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-wisal-azure/50 text-center text-sm text-wisal-muted">
            <p>جميع الحقوق محفوظة © {currentYear} منصة وِصال.</p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AboutAndFooter;