import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowDown, CheckCircle2, Clapperboard, Compass, Lightbulb, PackageCheck, PenTool, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { BrandIcon } from './BrandIcon';

interface ProcessRoadmapProps {
  lang: Language;
}

const steps = [
  {
    number: '01',
    title: { en: 'Discover', ar: 'الاكتشاف' },
    description: { en: 'Understanding the brand, audience, challenge, and objective.', ar: 'فهم العلامة التجارية والجمهور والتحدي والهدف.' },
    detail: { en: 'Brief · Research · Direction', ar: 'موجز · بحث · توجه' },
    icon: Compass,
  },
  {
    number: '02',
    title: { en: 'Concept', ar: 'المفهوم' },
    description: { en: 'Turning strategy into a clear visual idea and creative story.', ar: 'تحويل الاستراتيجية إلى فكرة بصرية واضحة وقصة إبداعية.' },
    detail: { en: 'Ideas · Moodboards · Story', ar: 'أفكار · لوحات إلهام · قصة' },
    icon: Lightbulb,
  },
  {
    number: '03',
    title: { en: 'Design', ar: 'التصميم' },
    description: { en: 'Building the key visuals, layouts, and complete design system.', ar: 'بناء العناصر البصرية والتخطيطات ونظام التصميم المتكامل.' },
    detail: { en: 'Identity · Layout · Visuals', ar: 'هوية · تخطيط · بصريات' },
    icon: PenTool,
  },
  {
    number: '04',
    title: { en: 'Animate', ar: 'التحريك' },
    description: { en: 'Adding motion, video, 3D, rhythm, and carefully designed sound.', ar: 'إضافة الحركة والفيديو و3D والإيقاع والصوت المصمم بعناية.' },
    detail: { en: 'Motion · Video · 3D · Sound', ar: 'موشن · فيديو · 3D · صوت' },
    icon: Clapperboard,
  },
  {
    number: '05',
    title: { en: 'Refine', ar: 'التحسين' },
    description: { en: 'Testing, reviewing feedback, and polishing every final detail.', ar: 'الاختبار ومراجعة الملاحظات وصقل جميع التفاصيل النهائية.' },
    detail: { en: 'Review · Feedback · Polish', ar: 'مراجعة · ملاحظات · صقل' },
    icon: Sparkles,
  },
  {
    number: '06',
    title: { en: 'Deliver', ar: 'التسليم' },
    description: { en: 'Exporting platform-ready assets, organized and ready to perform.', ar: 'تصدير ملفات جاهزة للمنصات، منظمة ومهيأة لتحقيق النتائج.' },
    detail: { en: 'Export · Handoff · Impact', ar: 'تصدير · تسليم · تأثير' },
    icon: PackageCheck,
  },
];

export const ProcessRoadmap: React.FC<ProcessRoadmapProps> = ({ lang }) => {
  const isRTL = lang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setActiveIndex(next);
  });

  const active = steps[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section ref={sectionRef} className="relative border-t border-white/10 bg-[#0b0a09] lg:h-[360vh]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ccf52b]/40 to-transparent" />

      <div className="px-4 py-16 sm:px-6 sm:py-24 lg:hidden">
        <div className="mx-auto max-w-lg">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ccf52b]/25 bg-[#ccf52b]/[0.07] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#ccf52b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ccf52b]" />
            {isRTL ? 'العملية الإبداعية' : 'The creative process'}
          </div>
          <h2 className="max-w-md text-4xl font-black leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl">
            {isRTL ? 'من الموجز إلى التأثير.' : 'From brief to impact.'}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/45">
            {isRTL ? 'عملية إبداعية مركزة تحول الأفكار إلى تجارب بصرية واضحة ومؤثرة.' : 'A focused creative process that turns ideas into clear, memorable visual experiences.'}
          </p>

          <div className="relative mt-10 space-y-3 ps-6 before:absolute before:bottom-8 before:start-[7px] before:top-8 before:w-px before:bg-gradient-to-b before:from-[#ccf52b] before:via-[#ccf52b]/35 before:to-white/5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="relative rounded-[22px] border border-white/8 bg-[#141211] p-4"
                >
                  <span className="absolute -start-[26px] top-7 h-3.5 w-3.5 rounded-full border-2 border-[#0b0a09] bg-[#ccf52b] shadow-[0_0_16px_rgba(204,245,43,0.35)]" />
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#ccf52b]/20 bg-[#ccf52b]/[0.08] text-[#ccf52b]"><Icon className="h-5 w-5" /></div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center justify-between gap-3"><h3 className="text-lg font-black text-white">{step.title[lang]}</h3><span className="font-mono text-[10px] text-[#ccf52b]">{step.number}</span></div>
                      <p className="text-xs leading-5 text-white/45">{step.description[lang]}</p>
                      <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">{step.detail[lang]}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sticky top-0 hidden h-screen overflow-hidden lg:flex lg:items-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ccf52b]/[0.035] blur-[110px]" />
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[1fr_330px_1fr] items-center gap-16 px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ccf52b]/25 bg-[#ccf52b]/[0.07] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#ccf52b]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ccf52b]" />
              {isRTL ? 'العملية الإبداعية' : 'The creative process'}
            </div>
            <h2 className="max-w-lg text-6xl font-black leading-[0.96] tracking-[-0.06em] text-white xl:text-7xl">
              {isRTL ? 'من الموجز إلى التأثير.' : 'From brief to impact.'}
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/42">
              {isRTL ? 'عملية إبداعية مركزة تحول الأفكار إلى تجارب بصرية واضحة ومؤثرة.' : 'A focused creative process that turns ideas into clear, memorable visual experiences.'}
            </p>
            <div className="mt-8 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/22"><ArrowDown className="h-3.5 w-3.5 text-[#ccf52b]" /> {isRTL ? 'مرر للاستكشاف' : 'Scroll to explore'}</div>
          </div>

          <div className="relative flex h-[330px] w-[330px] items-center justify-center">
            <motion.div className="absolute inset-0 rounded-full border border-dashed border-[#ccf52b]/25" animate={{ rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: 'linear' }} />
            <motion.div className="absolute inset-8 rounded-full border border-white/8" animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
              {steps.map((step, index) => <span key={step.number} className={`absolute left-1/2 top-1/2 h-2 w-2 rounded-full transition-all duration-500 ${index <= activeIndex ? 'bg-[#ccf52b] shadow-[0_0_12px_rgba(204,245,43,0.7)]' : 'bg-white/15'}`} style={{ transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-132px)` }} />)}
            </motion.div>
            <div className="absolute inset-[72px] rounded-full border border-[#ccf52b]/25 bg-gradient-to-br from-[#202515] via-[#141510] to-[#0c0c0b] shadow-[0_0_90px_rgba(204,245,43,0.08)]" />
            <AnimatePresence mode="wait">
              <motion.div key={active.number} initial={{ opacity: 0, scale: 0.8, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.8, rotate: 8 }} transition={{ duration: 0.3 }} className="relative z-10 flex flex-col items-center text-center">
                <ActiveIcon className="mb-3 h-9 w-9 text-[#ccf52b]" />
                <BrandIcon className="h-14 w-14 rounded-full border border-[#ccf52b]/25 shadow-[0_0_30px_rgba(204,245,43,0.12)]" />
                <span className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#ccf52b]">MUVFX</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div key={active.number} initial={{ opacity: 0, x: isRTL ? -30 : 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: isRTL ? 20 : -20 }} transition={{ duration: 0.35, ease: 'easeOut' }} className="rounded-[26px] border border-white/10 bg-[#141211]/95 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="mb-8 flex items-center justify-between"><span className="font-mono text-[11px] font-black tracking-[0.2em] text-[#ccf52b]">STEP {active.number}</span><CheckCircle2 className="h-4 w-4 text-[#ccf52b]" /></div>
                <h3 className="text-4xl font-black tracking-[-0.04em] text-white">{active.title[lang]}</h3>
                <p className="mt-4 text-sm leading-6 text-white/45">{active.description[lang]}</p>
                <div className="mt-8 border-t border-white/8 pt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">{active.detail[lang]}</div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-5 grid grid-cols-6 gap-2">
              {steps.map((step, index) => <div key={step.number} className={`h-1 rounded-full transition-all duration-500 ${index <= activeIndex ? 'bg-[#ccf52b]' : 'bg-white/8'}`} />)}
            </div>
            <div className="mt-3 flex justify-between font-mono text-[9px] text-white/18"><span>01</span><span>{String(activeIndex + 1).padStart(2, '0')} / 06</span><span>06</span></div>
          </div>
        </div>
      </div>
    </section>
  );
};
