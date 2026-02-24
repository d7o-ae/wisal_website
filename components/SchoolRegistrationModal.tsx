import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../src/firebase/config';
import { useLanguage } from '../i18n/LanguageContext';

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
  phone: string;
  country: string;
  city: string;
  studentsCount: string;
  commercialRecord: File | null;
  schoolLicense: File | null;
  preferredPlan: string;
  preferredContactMethod: string;
  hearAboutUs: string;
}

const SchoolRegistrationModal: React.FC<SchoolRegistrationModalProps> = ({ isOpen, onClose }) => {
  const { t, lang } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    schoolName: '',
    responsiblePersonName: '',
    responsiblePersonRole: '',
    email: '',
    websiteUrl: '',
    phone: '',
    country: '',
    city: '',
    studentsCount: '',
    commercialRecord: null,
    schoolLicense: null,
    preferredPlan: '',
    preferredContactMethod: '',
    hearAboutUs: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [fileErrors, setFileErrors] = useState<{
    commercialRecord?: string;
    schoolLicense?: string;
  }>({});

  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Test Firebase connection on mount
  useEffect(() => {
    if (isOpen) {
      console.log('🔵 Modal opened - Testing Firebase connection...');
      console.log('🔵 Firestore DB object:', db);
      console.log('🔵 DB app name:', db.app.name);
      console.log('🔵 DB type:', db.type);
      
      if (!db) {
        console.error('❌ Firestore DB is not initialized!');
      } else {
        console.log('✅ Firebase connection looks good');
      }
    }
  }, [isOpen]);

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validate phone number: digits only, max 11 digits
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 11) {
        setFormData({
          ...formData,
          [name]: digitsOnly,
        });
      }
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const fieldName = e.target.name as 'commercialRecord' | 'schoolLicense';
    
    // Check file size (500 KB = 500 * 1024 bytes = 512000 bytes)
    const MAX_FILE_SIZE = 500 * 1024; // 500 KB in bytes
    
    if (file && file.size > MAX_FILE_SIZE) {
      setFileErrors({
        ...fileErrors,
        [fieldName]: t.modal.fileSizeError.replace('{size}', String(Math.round(file.size / 1024))),
      });
      // Clear the file input
      e.target.value = '';
      setFormData({
        ...formData,
        [fieldName]: null,
      });
    } else {
      // Clear any previous error for this field
      setFileErrors({
        ...fileErrors,
        [fieldName]: undefined,
      });
      setFormData({
        ...formData,
        [fieldName]: file,
      });
    }
  };

  const validateStep1 = () => {
    // Check required fields
    if (
      formData.schoolName.trim() === '' ||
      formData.responsiblePersonName.trim() === '' ||
      formData.responsiblePersonRole === '' ||
      formData.email.trim() === '' ||
      formData.phone.trim() === ''
    ) {
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return false;
    }
    
    // Validate phone number (must be digits only, between 7-11 digits)
    if (!/^\d{7,11}$/.test(formData.phone)) {
      return false;
    }
    
    return true;
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
      formData.preferredPlan !== '' &&
      formData.preferredContactMethod !== '' &&
      formData.hearAboutUs !== ''
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('🔵 Starting form submission...');
      
      let commercialRecordURL = '';
      let schoolLicenseURL = '';
      
      // Upload files to Firebase Storage
      if (formData.commercialRecord) {
        console.log('📤 Uploading commercial record...');
        const timestamp = Date.now();
        const fileName = `${timestamp}_${formData.commercialRecord.name}`;
        const storageRef = ref(storage, `requests/${fileName}`);
        await uploadBytes(storageRef, formData.commercialRecord);
        commercialRecordURL = await getDownloadURL(storageRef);
        console.log('✅ Commercial record uploaded:', commercialRecordURL);
      }
      
      if (formData.schoolLicense) {
        console.log('📤 Uploading school license...');
        const timestamp = Date.now();
        const fileName = `${timestamp}_${formData.schoolLicense.name}`;
        const storageRef = ref(storage, `requests/${fileName}`);
        await uploadBytes(storageRef, formData.schoolLicense);
        schoolLicenseURL = await getDownloadURL(storageRef);
        console.log('✅ School license uploaded:', schoolLicenseURL);
      }
      
      // Prepare data for Firestore with file URLs
      const requestData = {
        schoolName: formData.schoolName,
        responsiblePersonName: formData.responsiblePersonName,
        responsiblePersonRole: formData.responsiblePersonRole,
        email: formData.email,
        websiteUrl: formData.websiteUrl || '',
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        studentsCount: formData.studentsCount,
        preferredPlan: formData.preferredPlan,
        preferredContactMethod: formData.preferredContactMethod,
        hearAboutUs: formData.hearAboutUs,
        // Add file URLs and names
        commercialRecordFileName: formData.commercialRecord?.name || '',
        commercialRecordURL: commercialRecordURL,
        schoolLicenseFileName: formData.schoolLicense?.name || '',
        schoolLicenseURL: schoolLicenseURL,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      console.log('🔵 Request data prepared:', requestData);
      console.log('🔵 Attempting to add document to Firestore...');

      // Add document to Firestore 'requests' collection
      const docRef = await addDoc(collection(db, 'requests'), requestData);
      
      console.log('✅ Document written successfully with ID:', docRef.id);
      
      setSubmitted(true);
    } catch (error: any) {
      console.error('❌ Error adding document:', error);
      console.error('❌ Error code:', error?.code);
      console.error('❌ Error message:', error?.message);
      console.error('❌ Full error:', JSON.stringify(error, null, 2));
      
      let errorMessage = t.modal.errorGeneral;
      
      if (error?.code === 'permission-denied') {
        errorMessage = t.modal.errorPermission;
        console.error('❌ FIRESTORE PERMISSION DENIED - Check Firebase rules');
      } else if (error?.code === 'unavailable') {
        errorMessage = t.modal.errorUnavailable;
        console.error('❌ FIRESTORE UNAVAILABLE - Check internet connection');
      } else if (error?.message?.includes('Firebase')) {
        errorMessage = t.modal.errorFirebase;
        console.error('❌ FIREBASE CONFIG ERROR - Check firebase config');
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      schoolName: '',
      responsiblePersonName: '',
      responsiblePersonRole: '',
      email: '',
      websiteUrl: '',
      phone: '',
      country: '',
      city: '',
      studentsCount: '',
      commercialRecord: null,
      schoolLicense: null,
      preferredPlan: '',
      preferredContactMethod: '',
      hearAboutUs: '',
    });
    setSubmitted(false);
    onClose();
  };

  const countries = t.modal.countries;

  // Filter countries based on search
  const filteredCountries = countries.filter((country: any) =>
    country.label.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.value.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Get country code from value (e.g., 'sa' -> 'SA')
  const getCountryCode = (value: string) => {
    if (value === 'other') return null;
    return value.toUpperCase();
  };

  const roles = t.modal.roles;

  const studentCountOptions = t.modal.studentCounts;

  const contactMethods = t.modal.contactMethods;

  const hearAboutUsOptions = t.modal.hearAboutUsOptions;

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-lg w-full p-8 md:p-10 relative animate-fadeIn">
          <button
            onClick={handleClose}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-3xl font-light"
            aria-label={t.modal.close}
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
              {t.modal.successTitle}
            </h3>
            <p className="text-gray-600 text-lg mb-2">
              {t.modal.successMessage}
            </p>
            <p className="text-gray-500">
              {t.modal.successSubMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-8 relative" style={{ fontFamily: '"Rubik", "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", system-ui, -apple-system, sans-serif' }}>
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-3xl font-light z-10"
          aria-label={t.modal.close}
        >
          ×
        </button>

        {/* Header */}
        <div className="bg-wisal-primary text-white rounded-t-3xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            {t.modal.registerTitle}
          </h2>
          <p className="text-center text-gray-200">
            {t.modal.step.replace('{current}', String(currentStep)).replace('{total}', '3')}
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
              <h3 className="text-xl font-bold text-wisal-primary mb-4">{t.modal.step1Title}</h3>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="schoolName">
                  {t.modal.schoolName} <span className="text-red-500">{t.modal.required}</span>
                </label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  placeholder={t.modal.schoolNamePlaceholder}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="responsiblePersonName">
                    {t.modal.responsibleName} <span className="text-red-500">{t.modal.required}</span>
                  </label>
                  <input
                    type="text"
                    id="responsiblePersonName"
                    name="responsiblePersonName"
                    value={formData.responsiblePersonName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                    placeholder={t.modal.responsibleNamePlaceholder}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="responsiblePersonRole">
                    {t.modal.jobTitle} <span className="text-red-500">{t.modal.required}</span>
                  </label>
                  <select
                    id="responsiblePersonRole"
                    name="responsiblePersonRole"
                    value={formData.responsiblePersonRole}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                  >
                    <option value="">{t.modal.jobTitlePlaceholder}</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    {t.modal.email} <span className="text-red-500">{t.modal.required}</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary"
                    placeholder={t.modal.emailPlaceholder}
                    dir="ltr"
                    title={t.modal.emailValidation}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="websiteUrl">
                    {t.modal.website}
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
                  {t.modal.phone} <span className="text-red-500">{t.modal.required}</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary"
                  placeholder={t.modal.phonePlaceholder}
                  dir="ltr"
                />
              </div>
            </div>
          )}

          {/* Step 2: Location & Details */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-xl font-bold text-wisal-primary mb-4">{t.modal.step2Title}</h3>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="country">
                    {t.modal.country} <span className="text-red-500">{t.modal.required}</span>
                  </label>
                  <div className="relative" ref={countryDropdownRef}>
                    <div className="flex items-center gap-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-wisal-primary">
                      {formData.country && getCountryCode(formData.country) && (
                        <img
                          src={`https://flagcdn.com/w20/${getCountryCode(formData.country)?.toLowerCase()}.png`}
                          alt=""
                          className="w-5 h-4"
                        />
                      )}
                      <input
                        type="text"
                        id="country"
                        value={countrySearch}
                        onChange={(e) => {
                          setCountrySearch(e.target.value);
                          setShowCountryDropdown(true);
                        }}
                        onFocus={() => setShowCountryDropdown(true)}
                        required={!formData.country}
                        placeholder={t.modal.countryPlaceholder}
                        className={`flex-1 outline-none ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                      />
                    </div>
                    {showCountryDropdown && filteredCountries.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {filteredCountries.map((country: any) => (
                          <div
                            key={country.value}
                            onClick={() => {
                              setFormData({ ...formData, country: country.value });
                              setCountrySearch(country.label.replace(/🇸🇦|🇦🇪|🇰🇼|🇶🇦|🇧🇭|🇴🇲|🇯🇴|🇪🇬|🇱🇧|🇸🇾|🇮🇶|🇾🇪|🇵🇸|🇩🇿|🇲🇦|🇹🇳|🇱🇾|🇸🇩|🇲🇷|🇸🇴|🇩🇯|🇰🇲|🇹🇷|🇮🇷|🇦🇫|🇵🇰|🇺🇸|🇬🇧|🇨🇦|🇦🇺|🇩🇪|🇫🇷|🇮🇹|🇪🇸|🇳🇱|🇸🇪|🇳🇴|🇩🇰|🇨🇭|🇦🇹|🇧🇪|🇷🇺|🇨🇳|🇯🇵|🇰🇷|🇮🇳|🇮🇩|🇲🇾|🇸🇬|🇹🇭|🇧🇷|🇲🇽|🇦🇷|🇿🇦|🇳🇬|🇰🇪/g, '').trim());
                              setShowCountryDropdown(false);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                          >
                            {getCountryCode(country.value) ? (
                              <img
                                src={`https://flagcdn.com/w20/${getCountryCode(country.value)?.toLowerCase()}.png`}
                                alt=""
                                className="w-5 h-4"
                              />
                            ) : (
                              <span className="w-5"></span>
                            )}
                            <span className={lang === 'ar' ? 'text-right' : 'text-left'}>
                              {country.label.replace(/🇸🇦|🇦🇪|🇰🇼|🇶🇦|🇧🇭|🇴🇲|🇯🇴|🇪🇬|🇱🇧|🇸🇾|🇮🇶|🇾🇪|🇵🇸|🇩🇿|🇲🇦|🇹🇳|🇱🇾|🇸🇩|🇲🇷|🇸🇴|🇩🇯|🇰🇲|🇹🇷|🇮🇷|🇦🇫|🇵🇰|🇺🇸|🇬🇧|🇨🇦|🇦🇺|🇩🇪|🇫🇷|🇮🇹|🇪🇸|🇳🇱|🇸🇪|🇳🇴|🇩🇰|🇨🇭|🇦🇹|🇧🇪|🇷🇺|🇨🇳|🇯🇵|🇰🇷|🇮🇳|🇮🇩|🇲🇾|🇸🇬|🇹🇭|🇧🇷|🇲🇽|🇦🇷|🇿🇦|🇳🇬|🇰🇪/g, '').trim()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <input
                      type="hidden"
                      name="country"
                      value={formData.country}
                      required
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
                    {t.modal.city} <span className="text-red-500">{t.modal.required}</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                    placeholder={t.modal.cityPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="studentsCount">
                  {t.modal.studentsCount} <span className="text-red-500">{t.modal.required}</span>
                </label>
                <select
                  id="studentsCount"
                  name="studentsCount"
                  value={formData.studentsCount}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  <option value="">{t.modal.studentsCountPlaceholder}</option>
                  {studentCountOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="commercialRecord">
                  {t.modal.commercialRecord} <span className="text-red-500">{t.modal.required}</span>
                </label>
                <input
                  type="file"
                  id="commercialRecord"
                  name="commercialRecord"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary ${lang === 'ar' ? 'text-right' : 'text-left'} file:${lang === 'ar' ? 'ml-4' : 'mr-4'} file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-wisal-primary file:text-white hover:file:bg-opacity-90`}
                />
                <p className="text-sm text-gray-500 mt-1">{t.modal.fileNote}</p>
                {fileErrors.commercialRecord && (
                  <p className="text-sm text-red-500 mt-1 font-medium">⚠️ {fileErrors.commercialRecord}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="schoolLicense">
                  {t.modal.schoolLicense} <span className="text-red-500">{t.modal.required}</span>
                </label>
                <input
                  type="file"
                  id="schoolLicense"
                  name="schoolLicense"
                  onChange={handleFileChange}
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary ${lang === 'ar' ? 'text-right' : 'text-left'} file:${lang === 'ar' ? 'ml-4' : 'mr-4'} file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-wisal-primary file:text-white hover:file:bg-opacity-90`}
                />
                <p className="text-sm text-gray-500 mt-1">{t.modal.fileNote}</p>
                {fileErrors.schoolLicense && (
                  <p className="text-sm text-red-500 mt-1 font-medium">⚠️ {fileErrors.schoolLicense}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Preferred Option */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <h3 className="text-xl font-bold text-wisal-primary mb-4">{t.modal.step3Title}</h3>
              
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  {t.modal.preferredPlan} <span className="text-red-500">{t.modal.required}</span>
                </label>
                <div className="space-y-3">
                  {t.modal.plans.map((plan: any) => (
                    <label
                      key={plan.value}
                      className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-wisal-primary transition-colors"
                    >
                      <input
                        type="radio"
                        name="preferredPlan"
                        value={plan.value}
                        checked={formData.preferredPlan === plan.value}
                        onChange={handleInputChange}
                        required
                        className="ml-3 w-5 h-5 text-wisal-primary"
                      />
                      <span className="text-lg">{plan.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  {t.modal.contactMethod} <span className="text-red-500">{t.modal.required}</span>
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

              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="hearAboutUs">
                  {t.modal.howHeard} <span className="text-red-500">{t.modal.required}</span>
                </label>
                <select
                  id="hearAboutUs"
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wisal-primary ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  <option value="">{t.modal.howHeardPlaceholder}</option>
                  {hearAboutUsOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Privacy Notice */}
              <div className="bg-gray-50 rounded-xl p-4 mt-6 text-sm text-gray-600 space-y-2">
                <p className="flex items-start">
                  <span className={`${lang === 'ar' ? 'ml-2' : 'mr-2'}`}>🔒</span>
                  <span>{t.modal.privacyNote1}</span>
                </p>
                <p className="flex items-start">
                  <span className={`${lang === 'ar' ? 'ml-2' : 'mr-2'}`}>⏱</span>
                  <span>{t.modal.privacyNote2}</span>
                </p>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4 text-red-600">
                  {submitError}
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 border-2 border-wisal-primary text-wisal-primary rounded-xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {t.modal.previous}
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
                {t.modal.next}
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isStepValid(currentStep) || isSubmitting}
                className={`flex-1 px-6 py-3 rounded-xl font-bold transition-colors ${
                  isStepValid(currentStep) && !isSubmitting
                    ? 'bg-wisal-primary text-white hover:bg-opacity-90 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? t.modal.submitting : t.modal.submit}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolRegistrationModal;
