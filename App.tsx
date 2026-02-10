import React from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Audience from './components/Audience';
import Screenshots from './components/Screenshots';
import WhyWisal from './components/WhyWisal';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import AboutAndFooter from './components/AboutAndFooter';

const AppContent: React.FC = () => {
  const { dir } = useLanguage();
  return (
    <div dir={dir} className={`min-h-screen bg-wisal-bg font-sans selection:bg-wisal-rose selection:text-white ${dir === 'ltr' ? 'text-left' : 'text-right'}`}>
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <Features />
        <Audience />
        <Screenshots />
        <WhyWisal />
        <FAQ />
        <CallToAction />
      </main>
      <footer className="bg-wisal-bg">
        <AboutAndFooter />
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;