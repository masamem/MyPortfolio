import React from 'react';
import { ArrowUpRight, BriefcaseBusiness, MapPin, Play, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { contentData } from '../data/portfolioData';

interface MobileHomeProps {
  lang: Language;
}

export const MobileHome: React.FC<MobileHomeProps> = ({ lang }) => {
  const t = contentData[lang];
  const isRTL = lang === 'ar';

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="px-4 pb-12 pt-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="mx-auto max-w-md"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ccf52b]/25 bg-[#ccf52b]/10 px-3 py-2 text-[11px] font-bold text-[#ccf52b]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ccf52b] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ccf52b]" />
            </span>
            {t.available}
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">MUVFX · 2026</span>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#1b1918] p-5 shadow-2xl shadow-black/35">
          <div className="pointer-events-none absolute -end-20 -top-20 h-56 w-56 rounded-full bg-[#ccf52b]/10 blur-3xl" />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
              <Sparkles className="h-4 w-4 text-[#ccf52b]" />
              {isRTL ? 'تصميم · موشن · فيديو' : 'Design · Motion · Video'}
            </div>

            <h1 className="max-w-[330px] text-[2.65rem] font-black leading-[0.98] tracking-[-0.055em] text-white">
              {t.role}
              {t.roleLine2 && <span className="mt-1 block text-[#ccf52b]">{t.roleLine2}</span>}
            </h1>

            <p className="mt-5 text-[15px] leading-6 text-white/62">{t.tagline}</p>

            <div className="mt-6 grid grid-cols-[1fr_auto] gap-2.5">
              <a
                href="#work"
                onClick={(event) => scrollTo(event, '#work')}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-[#ccf52b] px-5 text-sm font-black text-[#151312] shadow-lg shadow-[#ccf52b]/15 active:scale-[0.98]"
              >
                {isRTL ? 'استكشف أعمالي' : 'Explore my work'}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                onClick={(event) => scrollTo(event, '#contact')}
                aria-label={isRTL ? 'ابدأ مشروعاً' : 'Start a project'}
                className="inline-flex h-13 w-13 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-white active:scale-[0.96]"
              >
                <BriefcaseBusiness className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <div className="rounded-2xl border border-white/8 bg-white/[0.035] px-3 py-3.5">
            <strong className="block text-base font-black text-white">6+</strong>
            <span className="mt-0.5 block text-[10px] leading-4 text-white/45">{isRTL ? 'سنوات خبرة' : 'Years creative'}</span>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.035] px-3 py-3.5">
            <strong className="flex items-center gap-1 text-base font-black text-white"><Zap className="h-3.5 w-3.5 text-[#ccf52b]" /> 5</strong>
            <span className="mt-0.5 block text-[10px] leading-4 text-white/45">{isRTL ? 'خدمات رئيسية' : 'Core services'}</span>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.035] px-3 py-3.5">
            <strong className="flex items-center gap-1 text-sm font-black text-white"><MapPin className="h-3.5 w-3.5 text-[#ccf52b]" /> Riyadh</strong>
            <span className="mt-0.5 block text-[10px] leading-4 text-white/45">{isRTL ? 'متاح عالمياً' : 'Available worldwide'}</span>
          </div>
        </div>

        <a
          href="#work"
          onClick={(event) => scrollTo(event, '#work')}
          className="group relative mt-3 flex min-h-[148px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#202615] via-[#171713] to-[#11100f] p-5 active:scale-[0.99]"
        >
          <div className="pointer-events-none absolute end-[-38px] top-[-34px] h-40 w-40 rounded-full border border-[#ccf52b]/20" />
          <div className="pointer-events-none absolute end-[-12px] top-[-8px] h-28 w-28 rounded-full border border-dashed border-[#ccf52b]/30" />
          <div className="relative flex w-full items-end justify-between gap-4">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#ccf52b]/25 bg-black/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ccf52b]">
                <Play className="h-3 w-3 fill-current" /> {isRTL ? 'مختارات إبداعية' : 'Featured reel'}
              </span>
              <h2 className="max-w-[220px] text-xl font-black leading-tight text-white">
                {isRTL ? 'شاهد التصميم وهو يتحرك' : 'See the work in motion'}
              </h2>
              <p className="mt-1.5 text-xs text-white/45">Motion · Brand · Video · 3D</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ccf52b] text-[#151312] shadow-lg shadow-[#ccf52b]/20">
              <Play className="h-4 w-4 fill-current ms-0.5" />
            </span>
          </div>
        </a>
      </motion.div>
    </div>
  );
};
