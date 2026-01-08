import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Audience from './components/Audience';
import Screenshots from './components/Screenshots';
import WhyWisal from './components/WhyWisal';
import CallToAction from './components/CallToAction';
import AboutAndFooter from './components/AboutAndFooter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-wisal-bg font-sans selection:bg-wisal-rose selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <Features />
        <Audience />
        <Screenshots />
        <WhyWisal />
        <CallToAction />
      </main>
      <footer className="bg-wisal-bg">
        <AboutAndFooter />
      </footer>
    </div>
  );
};

export default App;