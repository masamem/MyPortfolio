import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { contentData } from '../data/portfolioData';
import { Sparkles, UserRound, BriefcaseBusiness, Grid2X2, Zap, MessageCircle } from 'lucide-react';

import { BrandIcon } from './BrandIcon';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang }) => {
  const t = contentData[lang];
  const onServicesPage = window.location.pathname.replace(/\/+$/, '') === '/services';
  const [activeMobileSection, setActiveMobileSection] = useState(onServicesPage ? 'services' : 'hero');

  const navLinks = [
    { key: 'hero', label: t.navLinks[0], mobileLabel: lang === 'ar' ? 'عني' : 'About', href: '/#hero', target: '#hero', icon: UserRound },
    { key: 'work', label: t.navLinks[1], mobileLabel: lang === 'ar' ? 'أعمالي' : 'Work', href: '/#work', target: '#work', icon: BriefcaseBusiness },
    { key: 'services', label: t.navLinks[2], mobileLabel: lang === 'ar' ? 'الخدمات' : 'Services', href: '/services', route: true, icon: Grid2X2 },
    { key: 'capabilities', label: t.navLinks[3], mobileLabel: lang === 'ar' ? 'المهارات' : 'Skills', href: '/#capabilities', target: '#capabilities', icon: Zap },
    { key: 'contact', label: t.navLinks[4], mobileLabel: lang === 'ar' ? 'تواصل' : 'Contact', href: '/#contact', target: '#contact', icon: MessageCircle },
  ];

  useEffect(() => {
    if (onServicesPage) {
      setActiveMobileSection('services');
      return;
    }

    const sectionIds = ['hero', 'work', 'capabilities', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveMobileSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [onServicesPage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target?: string, route?: boolean) => {
    if (route || onServicesPage || !target) return;

    e.preventDefault();
    const targetElement = document.querySelector(target);
    if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#151312]/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 sm:h-18 flex items-center justify-between">
        <a href="/" className="group min-w-0 font-bold text-base sm:text-2xl text-white tracking-tight hover:text-[#ccf52b] transition-colors flex items-center gap-2 sm:gap-3">
          <BrandIcon className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-full ring-2 ring-white/10 group-hover:ring-[#ccf52b]/50 transition-all" />
          <span className="text-lg tracking-[-0.03em] md:hidden">MUVFX</span>
          <span className="hidden truncate sm:max-w-none md:inline">{t.name}</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.target, item.route)}
              className={`text-sm font-medium transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#ccf52b] after:transition-all ${item.route && onServicesPage ? 'text-white after:w-full' : 'text-gray-300 hover:text-white after:w-0 hover:after:w-full'}`}
            >
              {item.label}
            </a>
          ))}

          <button
            onClick={onToggleLang}
            className="group text-xs font-bold text-white hover:text-[#151312] bg-[#ccf52b]/15 hover:bg-[#ccf52b] border border-[#ccf52b]/40 hover:border-[#ccf52b] rounded-full px-4 py-2 cursor-pointer transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95"
            aria-label="Toggle language"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ccf52b] group-hover:text-[#151312]" />
            <span>{t.toggleLabel}</span>
          </button>
        </div>

        <div className="flex md:hidden items-center">
          <button
            onClick={onToggleLang}
            className="min-h-10 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-[11px] font-bold text-white cursor-pointer active:scale-95"
            aria-label="Toggle language"
          >
            {t.toggleLabel}
          </button>
        </div>
      </div>
      </nav>

      <nav
        className="fixed z-50 md:hidden left-3 right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] rounded-[22px] border border-white/10 bg-[#1b1918]/92 px-1.5 py-1.5 shadow-2xl shadow-black/70 backdrop-blur-2xl"
        aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
      >
        <div className="grid grid-cols-5 gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = activeMobileSection === item.key;

            return (
              <a
                key={item.key}
                href={item.href}
                onClick={(event) => {
                  setActiveMobileSection(item.key);
                  handleNavClick(event, item.target, item.route);
                }}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-h-[58px] min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 transition-all active:scale-95 ${active ? 'bg-[#ccf52b]/12 text-[#ccf52b]' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
              >
                {active && <span className="absolute top-1 h-0.5 w-5 rounded-full bg-[#ccf52b]" />}
                <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.5 : 2} />
                <span className="max-w-full truncate text-[10px] font-bold leading-none">{item.mobileLabel}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
};
