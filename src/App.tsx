import React, { useEffect, useState } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ServicesPage } from './components/ServicesPage';
import { PortfiHome } from './components/PortfiHome';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try { return localStorage.getItem('portfolio-lang') === 'ar' ? 'ar' : 'en'; }
    catch { return 'en'; }
  });
  const toggleLanguage = () => setLang(previous => previous === 'en' ? 'ar' : 'en');
  const isServicesPage = window.location.pathname.replace(/\/+$/, '') === '/services';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('portfolio-lang', lang); } catch { /* Language still works without storage. */ }
  }, [lang]);

  useEffect(() => {
    if (isServicesPage || !window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      try { document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView(); }
      catch { /* Ignore malformed external fragment links. */ }
    });
    return () => cancelAnimationFrame(frame);
  }, [isServicesPage]);

  if (!isServicesPage) return <PortfiHome lang={lang} onToggleLang={toggleLanguage} />;
  return <div className="min-h-screen bg-[#151312] text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
    <Navbar lang={lang} onToggleLang={toggleLanguage} />
    <ServicesPage lang={lang} />
    <Footer lang={lang} />
  </div>;
}


