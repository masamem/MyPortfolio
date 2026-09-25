import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Box, Film, Grid2X2, Image as ImageIcon, Monitor, Palette, Play, Smartphone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { DrivePortfolioProject, fetchPortfolioFromDrive } from '../lib/portfolioDrive';

interface ShowcaseSectionProps {
  lang: Language;
}

type Discipline = 'motion' | 'branding' | 'video';
type Device = 'web' | 'mobile';

const disciplines = [
  { id: 'motion' as const, en: 'Motion', ar: 'موشن', icon: Sparkles, categories: ['Videos'] },
  { id: 'branding' as const, en: 'Branding', ar: 'هوية', icon: Palette, categories: ['Branding'] },
  { id: 'video' as const, en: 'Video & 3D', ar: 'فيديو و3D', icon: Box, categories: ['3D', 'Videos'] },
];

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ lang }) => {
  const isRTL = lang === 'ar';
  const [discipline, setDiscipline] = useState<Discipline>('motion');
  const [device, setDevice] = useState<Device>('web');
  const [projects, setProjects] = useState<DrivePortfolioProject[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchPortfolioFromDrive(false, controller.signal)
      .then((data) => setProjects(data.projects))
      .catch(() => setProjects([]));
    return () => controller.abort();
  }, []);

  const featured = useMemo(() => {
    const config = disciplines.find((item) => item.id === discipline)!;
    return projects.find((project) => config.categories.includes(project.category) && project.cover) || projects.find((project) => project.cover) || null;
  }, [discipline, projects]);

  const active = disciplines.find((item) => item.id === discipline)!;
  const ActiveIcon = active.icon;
  const mediaCount = featured?.media.length || 0;

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#090908] py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ccf52b]/60 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ccf52b]/[0.035] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ccf52b]/25 bg-[#ccf52b]/[0.07] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#ccf52b]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ccf52b]" />
            {isRTL ? 'معرض حي · ويب وموبايل' : 'Live showcase · Web & mobile'}
          </div>
          <h2 className="text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            {isRTL ? 'موفكس في حركة.' : 'MUVFX in motion.'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/48 sm:text-base sm:leading-7">
            {isRTL
              ? 'شاهد أعمال التصميم والموشن والفيديو كما تظهر على الشاشات التي صُممت من أجلها.'
              : 'See design, motion, and video work in the environments they were made for.'}
          </p>
        </motion.div>

        <div className="mb-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="mobile-hide-scrollbar flex max-w-full items-center gap-2 overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.025] p-1.5">
            {disciplines.map((item) => {
              const Icon = item.icon;
              const selected = discipline === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setDiscipline(item.id)}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-xs font-bold transition-all ${selected ? 'bg-[#ccf52b] text-[#10100e] shadow-lg shadow-[#ccf52b]/15' : 'text-white/45 hover:bg-white/[0.05] hover:text-white'}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {isRTL ? item.ar : item.en}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 rounded-2xl border border-white/8 bg-white/[0.025] p-1.5">
            <button
              onClick={() => setDevice('web')}
              className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-xs font-bold transition-all ${device === 'web' ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white'}`}
            >
              <Monitor className="h-3.5 w-3.5" /> WEB
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`inline-flex min-h-10 items-center gap-2 rounded-xl px-4 text-xs font-bold transition-all ${device === 'mobile' ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white'}`}
            >
              <Smartphone className="h-3.5 w-3.5" /> MOBILE
            </button>
          </div>
        </div>

        <div className="relative min-h-[540px] overflow-hidden rounded-[26px] border border-white/10 bg-[#0e0d0c] shadow-2xl shadow-black/60 sm:min-h-[620px]">
          <div className="flex h-12 items-center justify-between border-b border-white/8 bg-[#141210] px-4 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ccf52b]/50" />
            </div>
            <div className="rounded-lg border border-white/8 bg-black/20 px-3 py-1.5 font-mono text-[9px] text-white/35 sm:text-[10px]">
              muvfx.com/showcase/{discipline}
            </div>
            <span className="font-mono text-[9px] font-bold text-[#ccf52b]">LIVE</span>
          </div>

          <AnimatePresence mode="wait">
            {device === 'web' ? (
              <motion.div
                key={`web-${discipline}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="grid min-h-[492px] grid-cols-1 sm:min-h-[572px] lg:grid-cols-[220px_1fr_250px]"
              >
                <aside className="hidden border-e border-white/8 bg-[#11100f] p-5 lg:block">
                  <div className="mb-8 flex items-center gap-2 text-sm font-black text-white">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ccf52b] text-[#11100f]">M</span>
                    MUVFX
                  </div>
                  <div className="space-y-1.5">
                    {[{ label: 'Showcase', icon: Grid2X2 }, { label: 'Motion', icon: Sparkles }, { label: 'Branding', icon: Palette }, { label: 'Video & 3D', icon: Film }].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold ${index === 0 ? 'bg-[#ccf52b]/10 text-[#ccf52b]' : 'text-white/35'}`}>
                          <Icon className="h-4 w-4" /> {item.label}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-8 border-t border-white/8 pt-5 font-mono text-[9px] uppercase tracking-widest text-white/20">Selected work<br />2023—2026</div>
                </aside>

                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ccf52b]">
                        <ActiveIcon className="h-3.5 w-3.5" /> {isRTL ? active.ar : active.en}
                      </div>
                      <h3 className="text-2xl font-black tracking-tight text-white sm:text-4xl">{featured?.name || (isRTL ? 'أعمال مختارة' : 'Selected creative work')}</h3>
                    </div>
                    <span className="hidden rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] text-white/35 sm:inline">{String(mediaCount || 1).padStart(2, '0')} FILES</span>
                  </div>

                  <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#262b17] via-[#151511] to-[#0c0c0b]">
                    {featured?.cover?.type === 'image' ? (
                      <img src={featured.cover.url} alt={featured.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    ) : featured?.cover?.type === 'video' ? (
                      <video src={featured.cover.url} muted autoPlay loop playsInline className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-4 text-white/25">
                        <ImageIcon className="h-12 w-12 text-[#ccf52b]/40" />
                        <span className="font-mono text-xs uppercase tracking-widest">Live project preview</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#ccf52b]">MUVFX · SELECTED</div>
                        <div className="mt-1 text-sm font-bold text-white sm:text-lg">{isRTL ? 'اعرض المشروع بالكامل' : 'Open the full project'}</div>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ccf52b] text-[#11100f]"><ArrowUpRight className="h-5 w-5" /></span>
                    </div>
                  </div>
                </div>

                <aside className="hidden border-s border-white/8 bg-[#11100f] p-5 lg:flex lg:flex-col lg:justify-between">
                  <div>
                    <div className="mb-5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">Project signal</div>
                    <div className="space-y-3">
                      {['Art direction', 'Motion system', 'Final delivery'].map((label, index) => (
                        <div key={label} className="rounded-xl border border-white/8 bg-white/[0.025] p-3">
                          <div className="mb-2 flex items-center justify-between font-mono text-[9px] text-white/30"><span>0{index + 1}</span><span>{[96, 91, 100][index]}%</span></div>
                          <div className="text-xs font-bold text-white/70">{label}</div>
                          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-[#ccf52b]" style={{ width: `${[96, 91, 100][index]}%` }} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#ccf52b]/20 bg-[#ccf52b]/[0.06] p-4">
                    <div className="mb-2 flex items-center gap-2 text-xs font-black text-[#ccf52b]"><Play className="h-3.5 w-3.5 fill-current" /> READY TO PLAY</div>
                    <p className="text-[10px] leading-4 text-white/35">Optimized for campaign, social, and presentation screens.</p>
                  </div>
                </aside>
              </motion.div>
            ) : (
              <motion.div
                key={`mobile-${discipline}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex min-h-[492px] items-center justify-center p-5 sm:min-h-[572px]"
              >
                <div className="relative w-full max-w-[300px] rounded-[36px] border border-white/15 bg-[#11100f] p-2.5 shadow-2xl shadow-black/80">
                  <div className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
                  <div className="overflow-hidden rounded-[28px] border border-white/8 bg-[#151312]">
                    <div className="flex h-12 items-center justify-between px-4 pt-2 font-mono text-[9px] text-white/50"><span>9:41</span><span>MUVFX</span><span>•••</span></div>
                    <div className="px-3 pb-4">
                      <div className="mb-3 rounded-2xl border border-white/8 bg-white/[0.025] p-3">
                        <div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-[#ccf52b]"><ActiveIcon className="h-3 w-3" /> {isRTL ? active.ar : active.en}</div>
                        <div className="text-base font-black leading-tight text-white">{featured?.name || (isRTL ? 'أعمال مختارة' : 'Selected creative work')}</div>
                      </div>
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#262b17] to-[#0d0d0b]">
                        {featured?.cover?.type === 'image' ? <img src={featured.cover.url} alt={featured.name} className="h-full w-full object-cover" /> : featured?.cover?.type === 'video' ? <video src={featured.cover.url} muted autoPlay loop playsInline className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><Play className="h-10 w-10 text-[#ccf52b]" /></div>}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between"><span className="text-[10px] font-bold text-white">View project</span><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ccf52b] text-black"><ArrowUpRight className="h-3.5 w-3.5" /></span></div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {['Work', 'Services', 'Contact'].map((item, index) => <div key={item} className={`rounded-xl py-2 text-center text-[9px] font-bold ${index === 0 ? 'bg-[#ccf52b] text-black' : 'bg-white/5 text-white/35'}`}>{item}</div>)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-start">
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">01 / INTERACTIVE PORTFOLIO SHOWCASE</p>
          <a href="#work" className="inline-flex items-center gap-2 text-xs font-bold text-white/55 transition-colors hover:text-[#ccf52b]">
            {isRTL ? 'استكشف جميع الأعمال' : 'Explore all work'} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
