import React, { useEffect, useState } from 'react';
import { Language } from './types';
import { contentData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ToolsSection } from './components/ToolsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServicesPage } from './components/ServicesPage';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-lang');
    return saved === 'ar' ? 'ar' : 'en';
  });

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const currentContent = contentData[lang];
  const isRTL = lang === 'ar';
  const isServicesPage = window.location.pathname.replace(/\/+$/, '') === '/services';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = currentContent.dir;
    localStorage.setItem('portfolio-lang', lang);
  }, [lang, currentContent.dir]);

  useEffect(() => {
    if (isServicesPage || !window.location.hash) return;

    const sectionId = decodeURIComponent(window.location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isServicesPage]);

  return (
    <div
      className={`min-h-screen bg-[#151312] text-white selection:bg-[#f46c38] selection:text-white ${
        isRTL ? 'font-["Cairo",sans-serif]' : 'font-["Poppins",sans-serif]'
      }`}
      style={{ direction: currentContent.dir as 'ltr' | 'rtl' }}
    >
      <Navbar lang={lang} onToggleLang={toggleLanguage} />
      {isServicesPage ? (
        <ServicesPage lang={lang} />
      ) : (
        <main>
          <HeroSection lang={lang} />
          <ProjectsSection lang={lang} />
          <ToolsSection lang={lang} />
          <ContactSection lang={lang} />
        </main>
      )}
      <Footer lang={lang} />
    </div>
  );
}
