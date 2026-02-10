import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ar } from './ar';
import { en } from './en';

export type Language = 'ar' | 'en';
export type Translations = Omit<typeof ar, 'dir'> & { dir: 'rtl' | 'ltr' };

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
}

const translations: Record<Language, Translations> = { ar, en };

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  t: ar,
  setLang: () => {},
  dir: 'rtl',
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('wisal-lang');
    return (saved === 'en' || saved === 'ar') ? saved : 'ar';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('wisal-lang', newLang);
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};
