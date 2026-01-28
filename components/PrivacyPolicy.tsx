import React from 'react';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-wisal-azure">
          <h2 className="text-2xl font-bold text-wisal-primary">سياسة الخصوصية</h2>
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
              نحن في منصة <span className="font-bold text-wisal-rose">وِصال</span> نلتزم بحماية خصوصيتك وبياناتك الشخصية. 
              توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي تقدمها عند استخدام منصتنا.
            </p>
          </div>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">1. المعلومات التي نجمعها</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-wisal-secondary mb-2">معلومات المدرسة:</h4>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>اسم المدرسة وموقعها</li>
                  <li>رقم الترخيص والسجل التجاري</li>
                  <li>بيانات المسؤول عن الحساب (الاسم، البريد الإلكتروني، رقم الجوال)</li>
                  <li>معلومات الاتصال الرسمية للمدرسة</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-wisal-secondary mb-2">معلومات المستخدمين (أولياء الأمور والطلاب):</h4>
                <p className="text-wisal-muted mb-2 bg-wisal-azure/20 p-3 rounded-lg">
                  <span className="font-semibold text-wisal-rose">⚠️ مهم:</span> لا نجمع أي معلومات شخصية عن أولياء الأمور أو الطلاب. 
                  التطبيق لا يتطلب تسجيل دخول ولا يطلب الاسم أو البريد الإلكتروني أو رقم الجوال.
                </p>
                <p className="font-semibold text-wisal-secondary mb-2">نجمع فقط البيانات التقنية التالية:</p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>معلومات الجهاز (نوع الجهاز، نظام التشغيل، الإصدار)</li>
                  <li>معرّف الجهاز الفريد (Device ID) لأغراض إرسال الإشعارات فقط</li>
                  <li>الدولة والمدرسة المشترك بها المستخدم</li>
                  <li>تفضيلات الإشعارات (نوع الإشعارات المفضلة) لتخصيص التجربة</li>
                  <li>بيانات استخدام عامة لأغراض الإحصائيات والتحليل</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">2. كيف نستخدم المعلومات</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-wisal-secondary mb-2">استخدام معلومات المدرسة:</h4>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>إنشاء وإدارة حساب المدرسة في المنصة</li>
                  <li>التواصل مع المسؤولين بخصوص الخدمة والدعم الفني</li>
                  <li>التحقق من صحة الترخيص والامتثال للمتطلبات التنظيمية</li>
                  <li>إرسال التحديثات والإشعارات المتعلقة بالمنصة</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-wisal-secondary mb-2">استخدام البيانات التقنية:</h4>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>إرسال الإشعارات والتنبيهات المدرسية للأجهزة المناسبة</li>
                  <li>تحليل أداء المنصة وتحسين تجربة المستخدم</li>
                  <li>توفير إحصائيات للمدارس حول وصول المنشورات والتفاعل معها</li>
                  <li>تخصيص تجربة الإشعارات بناءً على تفضيلات المستخدم</li>
                  <li>ضمان أمان واستقرار المنصة</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">3. حماية البيانات والأمان</h3>
            <p className="leading-relaxed mb-3">
              نتخذ إجراءات أمنية صارمة لحماية بياناتك، بما في ذلك:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>تشفير البيانات أثناء النقل والتخزين</li>
              <li>استخدام خوادم آمنة ومحمية</li>
              <li>التحكم الصارم في الوصول إلى البيانات</li>
              <li>مراجعة دورية للإجراءات الأمنية</li>
              <li>نسخ احتياطية منتظمة للبيانات</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">4. مشاركة البيانات</h3>
            <p className="leading-relaxed mb-3">
              نحن لا نبيع أو نؤجر بياناتك الشخصية لأي طرف ثالث. قد نشارك البيانات فقط في الحالات التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>مع المدرسة المسجل فيها الطالب (للمعلومات ذات الصلة)</li>
              <li>مع الجهات الحكومية عند الطلب الرسمي</li>
              <li>مع مزودي الخدمات التقنية (بموجب اتفاقيات سرية)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">5. حقوقك</h3>
            <p className="leading-relaxed mb-3">لديك الحق في:</p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>الوصول إلى بياناتك الشخصية ومراجعتها</li>
              <li>طلب تصحيح أو تحديث بياناتك</li>
              <li>طلب حذف حسابك وبياناتك</li>
              <li>الاعتراض على معالجة بياناتك في حالات معينة</li>
              <li>سحب الموافقة على معالجة بياناتك</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">6. التصفح وبيانات الموقع الإلكتروني</h3>
            <p className="leading-relaxed mb-3">
              عند زيارتك لموقعنا الإلكتروني، قد نقوم بتسجيل بعض البيانات التقنية تلقائياً مثل:
            </p>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>عنوان بروتوكول الإنترنت (IP Address)</li>
              <li>نوع المتصفح ونظام التشغيل</li>
              <li>تاريخ ووقت الزيارة</li>
              <li>الصفحات التي تمت زيارتها ومدة البقاء</li>
            </ul>
            <p className="leading-relaxed mt-3">
              تُستخدم هذه البيانات لأغراض تحليلية فقط لتحسين أداء الموقع وتجربة المستخدم، ولا يتم ربطها بأي معلومات شخصية تعرّف بهويتك.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">7. ملفات تعريف الارتباط (Cookies)</h3>
            <p className="leading-relaxed">
              نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم، وحفظ تفضيلاتك، وتحليل استخدام المنصة. 
              يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">8. خصوصية الأطفال</h3>
            <p className="leading-relaxed">
              منصتنا مخصصة للمدارس وأولياء الأمور. نحن لا نجمع معلومات من الأطفال مباشرة دون موافقة ولي الأمر أو المدرسة. 
              جميع معلومات الطلاب تُدار من قبل المدرسة أو ولي الأمر المسجل.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">9. الاحتفاظ بالبيانات</h3>
            <p className="leading-relaxed">
              نحتفظ بالبيانات الشخصية طالما كان حسابك نشطًا أو حسب الحاجة لتقديم الخدمات. 
              عند إغلاق الحساب، يتم حذف البيانات أو إخفاء هويتها وفقًا لسياساتنا والمتطلبات القانونية.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">10. التغييرات على سياسة الخصوصية</h3>
            <p className="leading-relaxed">
              قد نقوم بتحديث سياسة الخصوصية من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية عبر المنصة أو البريد الإلكتروني. 
              ننصحك بمراجعة هذه الصفحة بشكل دوري.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-wisal-primary mb-3">11. اتصل بنا</h3>
            <p className="leading-relaxed mb-3">
              إذا كان لديك أي استفسارات أو مخاوف بشأن سياسة الخصوصية هذه، يرجى التواصل معنا:
            </p>
            <div className="bg-wisal-azure/30 rounded-lg p-4 space-y-2">
              <p><span className="font-semibold">البريد الإلكتروني:</span> info@tech-code.net</p>
              <p><span className="font-semibold">العنوان:</span> المملكة العربية السعودية</p>
            </div>
          </section>

          <div className="border-t border-wisal-azure pt-4 mt-6">
            <p className="text-sm text-wisal-muted text-center">
              بإستخدامك لمنصة وِصال، فإنك توافق على شروط سياسة الخصوصية هذه.
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

export default PrivacyPolicy;
