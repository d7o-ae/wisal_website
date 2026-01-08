import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'عن وِصال', href: '#about-wisal' },
    { label: 'المميزات', href: '#features' },
    { label: 'كيف يعمل', href: '#how-it-works' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Handle "Home" or top scroll
    if (href === '#home' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Handle section scroll
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-wisal-bg/95 backdrop-blur-sm border-b border-wisal-azure">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="#home" 
              onClick={(e) => handleScroll(e, '#home')} 
              className="flex items-center focus:outline-none"
            >
              <img src="/wisal_logo.png" alt="وِصال" className="h-12 w-auto object-contain" />
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-wisal-secondary hover:text-wisal-rose transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button 
              variant="primary" 
              className="mr-4 !py-2 !px-4 text-sm"
              onClick={(e) => handleScroll(e, '#register')}
            >
              سجّل مدرستك
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-wisal-primary hover:text-wisal-rose focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-wisal-azure shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="block px-3 py-2 rounded-md text-base font-medium text-wisal-secondary hover:bg-wisal-azure/30"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <Button 
                fullWidth 
                onClick={(e) => handleScroll(e, '#register')}
              >
                سجّل مدرستك
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;