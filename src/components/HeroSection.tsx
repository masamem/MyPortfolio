import React, { useState } from 'react';
import { Language } from '../types';
import { contentData } from '../data/portfolioData';
import { ArrowRight, ArrowLeft, Mail, Check, Sparkles, MapPin, Briefcase, Award, Download, Linkedin, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import heroPortrait from '../assets/mugahed-hero.webp';

interface HeroSectionProps {
  lang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const t = contentData[lang];
  const isRTL = lang === 'ar';
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [downloadingResume, setDownloadingResume] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setDownloadingResume(true);
    
    // Simulate/Trigger Resume Download or PDF View
    const resumeText = `Mugahed Al-Maari - Multimedia Designer Resume
Email: mugahedalmaari@gmail.com
Location: Riyadh, Saudi Arabia
LinkedIn: linkedin.com/in/mugahedalmaari
Behance: behance.net/mugahedalmaari
Experience: 6+ Years in Multimedia Design, Motion Graphics, Branding & Video Production.`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mugahed_AlMaari_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadingResume(false), 3000);
  };

  return (
    <section id="hero" className="relative pt-8 sm:pt-16 pb-12 sm:pb-20 overflow-hidden min-h-[85vh] flex items-center">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-[#f46c38]/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[250px] h-[250px] bg-[#c5ff41]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          
          {/* Left Column Container on Desktop (58% width ~ 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">

            {/* 1. Availability Badge (Mobile Order: 1) */}
            <div className="order-1 mb-6">
              <div className="inline-flex items-center gap-2.5 bg-[#c5ff41]/10 border border-[#c5ff41]/30 rounded-full px-4 py-1.5 shadow-sm hover:border-[#c5ff41]/60 transition-all">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5ff41] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c5ff41]"></span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#c5ff41] tracking-wide">
                  {t.available}
                </span>
              </div>
            </div>

            {/* 2. Main Heading (Mobile Order: 2) - Reduced by ~10-15% for balance */}
            <div className="order-2 mb-6">
              <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]">
                <span className="block">{t.role}</span>
                {t.roleLine2 && <span className="block text-[#f46c38]">{t.roleLine2}</span>}
              </h1>
            </div>

            {/* 3. Hero Description (Mobile Order: 3) */}
            <div className="order-3 mb-8">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl font-normal">
                {t.tagline}
              </p>
            </div>

            {/* 4. CTA Buttons (Mobile Order: 4) */}
            <div className="order-4 flex flex-wrap items-center gap-4 mb-8">
              {/* Download Resume CTA */}
              <a
                href="#"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2.5 font-bold text-sm sm:text-base text-white bg-[#f46c38] hover:bg-[#e05a26] rounded-xl px-7 py-3.5 sm:px-8 sm:py-4 shadow-lg shadow-[#f46c38]/25 hover:shadow-[#f46c38]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>{downloadingResume ? (isRTL ? 'جاري التحميل...' : 'Downloading...') : t.ctaResume}</span>
              </a>

              <a
                href="#work"
                onClick={(e) => scrollToSection(e, '#work')}
                className="inline-flex items-center gap-2.5 font-bold text-sm sm:text-base text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#f46c38]/60 rounded-xl px-7 py-3.5 sm:px-8 sm:py-4 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.cta}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4 text-[#f46c38]" /> : <ArrowRight className="w-4 h-4 text-[#f46c38]" />}
              </a>
            </div>

            {/* 5. Desktop Information Cards (Mobile Order: 6) */}
            <div className="order-6 lg:order-5 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {/* Card 1 */}
              <div className="border-s-4 border-[#f46c38] ps-3.5 py-2.5 bg-white/[0.03] rounded-e-xl border-y border-e border-white/10 flex items-center gap-3 hover:border-[#f46c38]/50 transition-colors">
                <Award className="w-4 h-4 text-[#f46c38] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white">{t.years}</span>
              </div>

              {/* Card 2 */}
              <div className="border-s-4 border-[#f46c38] ps-3.5 py-2.5 bg-white/[0.03] rounded-e-xl border-y border-e border-white/10 flex items-center gap-3 hover:border-[#f46c38]/50 transition-colors">
                <Briefcase className="w-4 h-4 text-[#f46c38] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white">{t.roleCard || 'Multidisciplinary Creative Designer'}</span>
              </div>

              {/* Card 3 */}
              <div className="border-s-4 border-[#f46c38] ps-3.5 py-2.5 bg-white/[0.03] rounded-e-xl border-y border-e border-white/10 flex items-center gap-3 hover:border-[#f46c38]/50 transition-colors">
                <MapPin className="w-4 h-4 text-[#f46c38] shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white">{t.location}</span>
              </div>
            </div>

            {/* Quick Reach Subtle Links */}
            <div className="order-7 lg:order-6 flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-3 border-t border-white/10 max-w-xl">
              <span className="font-semibold text-gray-500 uppercase tracking-wider">{isRTL ? 'تواصل سريع:' : 'Quick Reach:'}</span>
              
              {/* Email */}
              <button
                onClick={() => handleCopy('mugahedalmaari@gmail.com', 'email')}
                className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#f46c38]" />
                <span>mugahedalmaari@gmail.com</span>
                {copiedItem === 'email' ? (
                  <span className="text-[#c5ff41] font-bold flex items-center gap-1 ms-1">
                    <Check className="w-3 h-3" /> {t.copiedText}
                  </span>
                ) : null}
              </button>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/mugahedalmaari"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#f46c38]" />
                <span>linkedin.com/in/mugahedalmaari</span>
                <ExternalLink className="w-3 h-3 text-gray-500" />
              </a>
            </div>

          </div>

          {/* Portrait-led visual: personal, recognizable, and aligned with the portfolio palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: isRTL ? -24 : 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="order-5 lg:order-none lg:col-span-5 mt-10 lg:mt-0"
          >
            <div className="relative mx-auto max-w-[430px]">
              <div className="absolute -inset-5 rounded-[2.75rem] bg-gradient-to-br from-[#f46c38]/35 via-transparent to-[#c5ff41]/15 blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#201b19] shadow-2xl shadow-black/50">
                <img
                  src={heroPortrait}
                  alt={isRTL ? 'مجاهد المعاري، مصمم وسائط متعددة' : 'Mugahed Al-Maari, Multimedia Designer'}
                  className="h-full w-full object-cover object-[50%_28%] transition-transform duration-700 hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151312] via-transparent to-transparent opacity-70" />
                <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
                  {['Motion', 'Design', 'Video', 'AI'].map((skill) => (
                    <span key={skill} className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white backdrop-blur-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -end-4 top-8 rounded-2xl border border-[#f46c38]/35 bg-[#151312]/90 px-4 py-3 shadow-xl backdrop-blur-md">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">{isRTL ? 'خبرة إبداعية' : 'Creative experience'}</div>
                <div className="mt-1 text-xl font-black text-[#f46c38]">6+ {isRTL ? 'سنوات' : 'years'}</div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};
