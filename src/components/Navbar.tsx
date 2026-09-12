import React, { useState } from 'react';
import { Language } from '../types';
import { contentData } from '../data/portfolioData';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandIcon } from './BrandIcon';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
  const t = contentData[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: t.navLinks[0], target: '#hero' },
    { label: t.navLinks[1], target: '#work' },
    { label: t.navLinks[2], target: '#capabilities' },
    { label: t.navLinks[3], target: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#151312]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Name & Icon */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#')}
          className="group font-bold text-xl sm:text-2xl text-white tracking-tight hover:text-[#f46c38] transition-colors flex items-center gap-3"
        >
          <BrandIcon className="w-8 h-8 rounded-full ring-2 ring-white/10 group-hover:ring-[#f46c38]/50 transition-all" />
          <span>{t.name}</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#f46c38] hover:after:w-full after:transition-all"
            >
              {item.label}
            </a>
          ))}

          {/* Language Toggle Button */}
          <button
            onClick={onToggleLang}
            className="text-xs font-bold text-white bg-[#f46c38]/15 hover:bg-[#f46c38] border border-[#f46c38]/40 hover:border-[#f46c38] rounded-full px-4 py-2 cursor-pointer transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95"
            aria-label="Toggle language"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f46c38] group-hover:text-white" />
            <span>{t.toggleLabel}</span>
          </button>
        </div>

        {/* Mobile Menu Trigger & Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onToggleLang}
            className="text-xs font-bold text-white bg-[#f46c38]/20 border border-[#f46c38]/50 rounded-full px-3 py-1.5 cursor-pointer active:scale-95"
          >
            {t.toggleLabel}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white rounded-lg bg-white/5 border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#151312] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

