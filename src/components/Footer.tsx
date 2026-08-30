import React from 'react';
import { Language } from '../types';
import { contentData } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';
import { BrandIcon } from './BrandIcon';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = contentData[lang];
  const isRTL = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 py-8 bg-[#100e0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-3">
          <BrandIcon className="w-6 h-6 rounded-full" />
          <span>{t.footerText}</span>
        </div>

        <div className="flex items-center gap-6">
          <span>{isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
          
          <button
            onClick={scrollToTop}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors border border-white/10"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
