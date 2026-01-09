import React, { useState } from 'react';

interface SchoolRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  schoolName: string;
  responsiblePersonName: string;
  responsiblePersonRole: string;
  email: string;
  websiteUrl: string;
  countryCode: string;
  phone: string;
  country: string;
  city: string;
  studentsCount: string;
  commercialRecord: File | null;
  schoolLicense: File | null;
  preferredOption: string;
  preferredContactMethod: string;
}

const SchoolRegistrationModal: React.FC<SchoolRegistrationModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    responsiblePersonName: '',
    responsiblePersonRole: '',
    email: '',
    websiteUrl: '',
    countryCode: '+966',
    phone: '',
    country: '',
    city: '',
    studentsCount: '',
    commercialRecord: null,
    schoolLicense: null,
    preferredOption: '',
    preferredContactMethod: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      [e.target.name]: file,
    });
  };

  const validateStep1 = () => {
    return (
      formData.schoolName.trim() !== '' &&
      formData.responsiblePersonName.trim() !== '' &&
      formData.responsiblePersonRole !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== ''
    );
  };

  const validateStep2 = () => {
    return (
      formData.country !== '' &&
      formData.city.trim() !== '' &&
      formData.studentsCount !== '' &&
      formData.commercialRecord !== null &&
      formData.schoolLicense !== null
    );
  };

  const validateStep3 = () => {
    return (
      formData.preferredOption !== '' &&
      formData.preferredContactMethod !== ''
    );
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return validateStep1();
      case 2:
        return validateStep2();
      case 3:
        return validateStep3();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      schoolName: '',
      responsiblePersonName: '',
      responsiblePersonRole: '',
      email: '',
      websiteUrl: '',
      countryCode: '+966',
      phone: '',
      country: '',
      city: '',
      studentsCount: '',
      commercialRecord: null,
      schoolLicense: null,
      preferredOption: '',
      preferredContactMethod: '',
    });
    setSubmitted(false);
    onClose();
  };

  const countryCodes = [
    { code: '+966', flag: '🇸🇦', name: 'السعودية' },
    { code: '+971', flag: '🇦🇪', name: 'الإمارات' },
    { code: '+965', flag: '🇰🇼', name: 'الكويت' },
    { code: '+974', flag: '🇶🇦', name: 'قطر' },
    { code: '+973', flag: '🇧🇭', name: 'البحرين' },
    { code: '+968', flag: '🇴🇲', name: 'عُمان' },
    { code: '+962', flag: '🇯🇴', name: 'الأردن' },
    { code: '+20', flag: '🇪🇬', name: 'مصر' },
    { code: '+961', flag: '🇱🇧', name: 'لبنان' },
  ];

  const countries = [
    { value: 'sa', label: '🇸🇦 السعودية' },
    { value: 'ae', label: '🇦🇪 الإمارات' },
    { value: 'kw', label: '🇰🇼 الكويت' },
    { value: 'qa', label: '🇶🇦 قطر' },
    { value: 'bh', label: '🇧🇭 البحرين' },
    { value: 'om', label: '🇴🇲 عُمان' },
    { value: 'jo', label: '🇯🇴 الأردن' },
    { value: 'eg', label: '🇪🇬 مصر' },
    { value: 'lb', label: '🇱🇧 لبنان' },
    { value: 'other', label: 'آخر' },
  ];

  const roles = [
    'مدير المدرسة',
    'وكيل المدرسة',
    'منسق',
    'مسؤول تقنية',
    'آخر',
  ];

  const studentCountOptions = [
    { value: '<200', label: 'أقل من 200' },
    { value: '200-500', label: '200 – 500' },
    { value: '500-1000', label: '500 – 1000' },
    { value: '>1000', label: 'أكثر من 1000' },
  ];

  const preferredOptions = [
    { value: 'trial', label: 'تجربة مجانية' },
    { value: 'demo', label: 'عرض توضيحي (Demo)' },
    { value: 'contact', label: 'تواصل مباشر' },
  ];

  const contactMethods = [
    { value: 'call', label: '📞 اتصال هاتفي' },
    { value: 'email', label: '📧 بريد إلكتروني' },
    { value: 'whatsapp', label: '💬 واتساب' },
  ];

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-lg w-full p-8 md:p-10 relative animate-fadeIn">
          <button
            onClick={handleClose}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-3xl font-light"
            aria-label="إغلاق"
          >
            ×
          </button>
          
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-wisal-primary mb-4">
              🎉 تم التسجيل بنجاح!
            </h3>
            <p className="text-gray-600 text-lg mb-2">
              شكراً لتسجيلك في وِصال
            </p>
            <p className="text-gray-500">
              سنتواصل معك خلال 24 ساعة
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-3xl font-light z-10"
          aria-label="إغلاق"
        >
          ×
        </button>

        {/* Header */}
        <div className="bg-wisal-primary text-white rounded-t-3xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            سجّل مدرستك
          </h2>
          <p className="text-center text-gray-200">
            خطوة {currentStep} من 3
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6 bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-xl font-bold text-wisal-primary mb-4">المعلومات الأساسية</h3>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="schoolName">
                  اسم المدرسة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary text-right"
                  placeholder="اسم المدرسة"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="responsiblePersonName">
                    اسم الشخص المسؤول <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="responsiblePersonName"
                    name="responsiblePersonName"
                    value={formData.responsiblePersonName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary text-right"
                    placeholder="الاسم الكامل"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="responsiblePersonRole">
                    المسمى الوظيفي <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="responsiblePersonRole"
                    name="responsiblePersonRole"
                    value={formData.responsiblePersonRole}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary text-right"
                  >
                    <option value="">اختر المسمى</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    البريد الإلكتروني الرسمي <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary"
                    placeholder="example@school.com"
                    dir="ltr"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="websiteUrl">
                    الموقع الإلكتروني للمدرسة
                  </label>
                  <input
                    type="url"
                    id="websiteUrl"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary"
                    placeholder="https://school.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                  رقم الهاتف / واتساب <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-32 px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary text-right"
                    style={{ fontFamily: '"Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", system-ui, -apple-system, sans-serif' }}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code} style={{ fontFamily: '"Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", system-ui, sans-serif' }}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary"
                    placeholder="5X XXX XXXX"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Details */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-xl font-bold text-wisal-primary mb-4">الموقع والتفاصيل</h3>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="country">
                    الدولة <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary text-right"
                    style={{ fontFamily: '"Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", system-ui, -apple-system, sans-serif' }}
                  >
                    <option value="">اختر الدولة</option>
                    {countries.map((country) => (
                      <option key={country.value} value={country.value} style={{ fontFamily: '"Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", system-ui, sans-serif' }}>
                        {country.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
                    المدينة <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary text-right"
                    placeholder="المدينة"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="studentsCount">
                  عدد الطلاب (تقريبي) <span className="text-red-500">*</span>
                </label>
                <select
                  id="studentsCount"
                  name="studentsCount"
                  value={formData.studentsCount}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary text-right"
                >
                  <option value="">اختر العدد</option>
                  {studentCountOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="commercialRecord">
                  السجل التجاري <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="commercialRecord"
                  name="commercialRecord"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary text-right file:ml-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-wisal-primary file:text-white hover:file:bg-opacity-90"
                />
                <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (حد أقصى 5MB)</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="schoolLicense">
                  الرخصة المدرسية <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="schoolLicense"
                  name="schoolLicense"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary text-right file:ml-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-wisal-primary file:text-white hover:file:bg-opacity-90"
                />
                <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG (حد أقصى 5MB)</p>
              </div>
            </div>
          )}

          {/* Step 3: Preferred Option */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-xl font-bold text-wisal-primary mb-4">ماذا تفضل؟</h3>
              
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  نوع الخدمة <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {preferredOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-wisal-primary transition-colors"
                    >
                      <input
                        type="radio"
                        name="preferredOption"
                        value={option.value}
                        checked={formData.preferredOption === option.value}
                        onChange={handleInputChange}
                        required
                        className="ml-3 w-5 h-5 text-wisal-primary"
                      />
                      <span className="text-lg">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  طريقة التواصل المفضلة <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {contactMethods.map((method) => (
                    <label
                      key={method.value}
                      className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-wisal-primary transition-colors"
                    >
                      <input
                        type="radio"
                        name="preferredContactMethod"
                        value={method.value}
                        checked={formData.preferredContactMethod === method.value}
                        onChange={handleInputChange}
                        required
                        className="ml-3 w-5 h-5 text-wisal-primary"
                      />
                      <span className="text-lg">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-gray-50 rounded-xl p-4 mt-6 text-sm text-gray-600 space-y-2">
                <p className="flex items-start">
                  <span className="ml-2">🔒</span>
                  <span>لن نشارك بياناتك مع أي طرف ثالث</span>
                </p>
                <p className="flex items-start">
                  <span className="ml-2">⏱</span>
                  <span>سيتم التواصل خلال يوم عمل واحد</span>
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 px-6 py-3 border-2 border-wisal-primary text-wisal-primary rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                السابق
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className={`flex-1 px-6 py-3 rounded-xl font-bold transition-colors ${
                  isStepValid(currentStep)
                    ? 'bg-wisal-primary text-white hover:bg-opacity-90 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                التالي
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStepValid(currentStep)}
                className={`flex-1 px-6 py-3 rounded-xl font-bold transition-colors ${
                  isStepValid(currentStep)
                    ? 'bg-wisal-primary text-white hover:bg-opacity-90 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                سجل الآن
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolRegistrationModal;
