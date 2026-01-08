import React from 'react';
import { X } from 'lucide-react';

interface TermsOfUseProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-wisal-azure">
          <h2 className="text-2xl font-bold text-wisal-primary">شروط الاستخدام</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-wisal-azure rounded-lg transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-6 h-6 text-wisal-secondary" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-wisal-secondary">
          <div>
            <p className="text-sm text-wisal-muted mb-4">
              آخر تحديث: {new Date().toLocaleDateString('ar-SA')}
            </p>
            <p className="leading-relaxed">
              مرحبًا بك في منصة <span className="font-bold text-wisal-rose">وِصال</span>. باستخدامك لهذه المنصة، 
              فإنك توافق على الالتزام بشروط الاستخدام التالية. يرجى قراءتها بعناية قبل استخدام خدماتنا.
            </p>
          </div>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">1. قبول الشروط</h3>
            <p className="leading-relaxed mb-3">
              من خلال الوصول إلى منصة وِصال واستخدامها، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بشروط الاستخدام هذه 
              وسياسة الخصوصية الخاصة بنا. إذا كنت لا توافق على هذه الشروط، فيرجى عدم استخدام المنصة.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">2. الأهلية للاستخدام</h3>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>المنصة مخصصة للمدارس المرخصة رسميًا في المملكة العربية السعودية</li>
              <li>يجب أن يكون عمر أولياء الأمور المستخدمين 18 عامًا أو أكثر</li>
              <li>يجب تقديم معلومات صحيحة ودقيقة عند التسجيل</li>
              <li>يحظر استخدام المنصة لأغراض غير قانونية أو غير مصرح بها</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">3. التسجيل والحسابات</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-wisal-secondary mb-2">حسابات المدارس:</h4>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>يجب على المدارس تقديم وثائق الترخيص الرسمية</li>
                  <li>المدرسة مسؤولة عن جميع الأنشطة التي تتم من خلال حسابها</li>
                  <li>يجب تعيين مسؤول نظام واحد أو أكثر لإدارة الحساب</li>
                  <li>الحفاظ على سرية بيانات الدخول وعدم مشاركتها</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-wisal-secondary mb-2">حسابات أولياء الأمور:</h4>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>يتم إنشاء الحساب بناءً على دعوة من المدرسة</li>
                  <li>يجب التحقق من رقم الجوال أو البريد الإلكتروني</li>
                  <li>ولي الأمر مسؤول عن أمان حسابه الشخصي</li>
                  <li>عدم مشاركة بيانات الدخول مع أي شخص آخر</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">4. استخدام المنصة</h3>
            <p className="leading-relaxed mb-3">يُسمح لك باستخدام المنصة للأغراض التالية:</p>
            <ul className="list-disc list-inside space-y-2 mr-4 mb-3">
              <li>التواصل بين المدرسة وأولياء الأمور</li>
              <li>نشر واستقبال الإشعارات والتحديثات المدرسية</li>
              <li>مشاركة المعلومات الأكاديمية والإدارية</li>
              <li>إدارة الأحداث والفعاليات المدرسية</li>
            </ul>
            <p className="leading-relaxed font-semibold text-wisal-rose mb-2">يُحظر عليك:</p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>نشر محتوى غير قانوني، مسيء، أو غير لائق</li>
              <li>انتحال شخصية الغير أو تقديم معلومات مضللة</li>
              <li>محاولة اختراق أو تعطيل المنصة أو أنظمتها</li>
              <li>جمع بيانات مستخدمين آخرين دون إذن</li>
              <li>استخدام المنصة لأغراض تجارية دون موافقة خطية</li>
              <li>نسخ أو تعديل أو توزيع محتوى المنصة دون إذن</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">5. المحتوى والملكية الفكرية</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-wisal-secondary mb-2">محتوى المستخدمين:</h4>
                <p className="leading-relaxed mb-2">
                  أنت تحتفظ بملكية المحتوى الذي تنشره على المنصة، ولكنك تمنحنا ترخيصًا غير حصري لاستخدام وعرض 
                  وتوزيع هذا المحتوى ضمن نطاق تقديم الخدمة.
                </p>
                <p className="leading-relaxed">
                  أنت مسؤول عن المحتوى الذي تنشره وتضمن أنه لا ينتهك حقوق الآخرين.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-wisal-secondary mb-2">محتوى المنصة:</h4>
                <p className="leading-relaxed">
                  جميع العلامات التجارية والشعارات والنصوص والتصاميم والبرمجيات الخاصة بمنصة وِصال هي ملك لنا أو 
                  لمانحي التراخيص. لا يجوز استخدامها دون إذن كتابي مسبق.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">6. الرسوم والدفع</h3>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>قد تكون بعض خدمات المنصة مدفوعة وفقًا لخطط الاشتراك المعلنة</li>
              <li>جميع الرسوم غير قابلة للاسترداد ما لم ينص على خلاف ذلك</li>
              <li>نحتفظ بالحق في تعديل الأسعار مع إشعار مسبق</li>
              <li>الفشل في الدفع قد يؤدي إلى تعليق أو إنهاء الخدمة</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">7. التوفر والصيانة</h3>
            <p className="leading-relaxed mb-3">
              نسعى لتوفير المنصة بشكل مستمر، ولكننا لا نضمن توفرها بدون انقطاع. قد نقوم بإجراء صيانة دورية أو طارئة 
              قد تؤدي إلى توقف مؤقت للخدمة. سنبذل قصارى جهدنا لإشعاركم مسبقًا.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">8. إنهاء الحساب</h3>
            <div className="space-y-3">
              <p className="leading-relaxed">نحتفظ بالحق في تعليق أو إنهاء حسابك في الحالات التالية:</p>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>انتهاك شروط الاستخدام أو سياسة الخصوصية</li>
                <li>نشاط مشبوه أو احتيالي</li>
                <li>عدم الدفع أو الإخلال بالتزامات الدفع</li>
                <li>عدم الاستخدام لفترة طويلة (حسابات غير نشطة)</li>
              </ul>
              <p className="leading-relaxed mt-3">
                يمكنك إنهاء حسابك في أي وقت عن طريق التواصل معنا. عند إنهاء الحساب، قد يتم حذف بياناتك 
                وفقًا لسياسة الاحتفاظ بالبيانات.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">9. إخلاء المسؤولية</h3>
            <p className="leading-relaxed mb-3">
              المنصة مقدمة "كما هي" و"كما هي متاحة" دون أي ضمانات من أي نوع. لا نضمن:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>دقة أو اكتمال أو موثوقية المحتوى على المنصة</li>
              <li>عدم انقطاع أو خلو الخدمة من الأخطاء</li>
              <li>أمان المعلومات المرسلة عبر المنصة بشكل مطلق</li>
              <li>نتائج محددة من استخدام المنصة</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">10. حدود المسؤولية</h3>
            <p className="leading-relaxed">
              في حدود ما يسمح به القانون، لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية 
              أو خاصة تنشأ عن استخدام أو عدم القدرة على استخدام المنصة، بما في ذلك على سبيل المثال لا الحصر: 
              فقدان البيانات، أو خسائر الأرباح، أو انقطاع الأعمال.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">11. التعويض</h3>
            <p className="leading-relaxed">
              توافق على تعويضنا والدفاع عنا وإبراء ذمتنا وشركائنا وموظفينا من أي مطالبات أو التزامات أو أضرار أو 
              خسائر أو تكاليف تنشأ عن استخدامك للمنصة أو انتهاكك لهذه الشروط أو انتهاكك لحقوق أي طرف ثالث.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">12. القانون الحاكم</h3>
            <p className="leading-relaxed">
              تخضع شروط الاستخدام هذه وتفسر وفقًا لأنظمة المملكة العربية السعودية. أي نزاع ينشأ عن هذه الشروط 
              يخضع للاختصاص القضائي الحصري للمحاكم في المملكة العربية السعودية.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">13. التعديلات على الشروط</h3>
            <p className="leading-relaxed">
              نحتفظ بالحق في تعديل شروط الاستخدام هذه في أي وقت. سيتم نشر النسخة المحدثة على المنصة مع تاريخ 
              "آخر تحديث". استمرارك في استخدام المنصة بعد التعديلات يعني موافقتك على الشروط الجديدة.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">14. معلومات الاتصال</h3>
            <p className="leading-relaxed mb-3">
              إذا كان لديك أي أسئلة أو استفسارات حول شروط الاستخدام، يمكنك التواصل معنا:
            </p>
            <div className="bg-wisal-azure/30 rounded-lg p-4 space-y-2">
              <p><span className="font-semibold">البريد الإلكتروني:</span> support@wisal.app</p>
              <p><span className="font-semibold">الهاتف:</span> +966 XX XXX XXXX</p>
              <p><span className="font-semibold">العنوان:</span> المملكة العربية السعودية</p>
            </div>
          </section>

          <div className="border-t border-wisal-azure pt-4 mt-6">
            <p className="text-sm text-wisal-muted text-center">
              باستخدامك لمنصة وِصال، فإنك تقر بأنك قد قرأت وفهمت ووافقت على شروط الاستخدام هذه.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-wisal-azure">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-wisal-rose text-white rounded-lg hover:bg-wisal-rose/90 transition-colors font-medium"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
