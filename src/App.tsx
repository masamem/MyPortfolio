import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { contentData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ToolsSection } from './components/ToolsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<Language>('en');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const currentContent = contentData[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = currentContent.dir;
  }, [lang, currentContent.dir]);

  return (
    <div 
      className={`min-h-screen bg-[#151312] text-white selection:bg-[#f46c38] selection:text-white ${
        isRTL ? 'font-["Cairo",sans-serif]' : 'font-["Poppins",sans-serif]'
      }`}
      style={{ direction: currentContent.dir as 'ltr' | 'rtl' }}
    >
      <Navbar lang={lang} onToggleLang={toggleLanguage} />
      <main>
        <HeroSection lang={lang} />
        <ProjectsSection lang={lang} />
        <ToolsSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
