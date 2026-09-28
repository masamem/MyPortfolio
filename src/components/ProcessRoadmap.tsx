import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { Clapperboard, Compass, Lightbulb, PackageCheck, PenTool, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { BrandIcon } from './BrandIcon';

interface ProcessRoadmapProps { lang: Language; }

const steps = [
  { number: '01', title: { en: 'Discover', ar: 'الاكتشاف' }, description: { en: 'Understanding the brand, audience, challenge, and objective.', ar: 'فهم العلامة التجارية والجمهور والتحدي والهدف.' }, detail: { en: 'Brief · Research · Direction', ar: 'موجز · بحث · توجه' }, icon: Compass },
  { number: '02', title: { en: 'Concept', ar: 'المفهوم' }, description: { en: 'Turning strategy into a clear visual idea and creative story.', ar: 'تحويل الاستراتيجية إلى فكرة بصرية واضحة وقصة إبداعية.' }, detail: { en: 'Ideas · Moodboards · Story', ar: 'أفكار · لوحات إلهام · قصة' }, icon: Lightbulb },
  { number: '03', title: { en: 'Design', ar: 'التصميم' }, description: { en: 'Building the key visuals, layouts, and complete design system.', ar: 'بناء العناصر البصرية والتخطيطات ونظام التصميم المتكامل.' }, detail: { en: 'Identity · Layout · Visuals', ar: 'هوية · تخطيط · بصريات' }, icon: PenTool },
  { number: '04', title: { en: 'Animate', ar: 'التحريك' }, description: { en: 'Adding motion, video, 3D, rhythm, and carefully designed sound.', ar: 'إضافة الحركة والفيديو و3D والإيقاع والصوت المصمم بعناية.' }, detail: { en: 'Motion · Video · 3D · Sound', ar: 'موشن · فيديو · 3D · صوت' }, icon: Clapperboard },
  { number: '05', title: { en: 'Refine', ar: 'التحسين' }, description: { en: 'Testing, reviewing feedback, and polishing every final detail.', ar: 'الاختبار ومراجعة الملاحظات وصقل جميع التفاصيل النهائية.' }, detail: { en: 'Review · Feedback · Polish', ar: 'مراجعة · ملاحظات · صقل' }, icon: Sparkles },
  { number: '06', title: { en: 'Deliver', ar: 'التسليم' }, description: { en: 'Exporting platform-ready assets, organized and ready to perform.', ar: 'تصدير ملفات جاهزة للمنصات، منظمة ومهيأة لتحقيق النتائج.' }, detail: { en: 'Export · Handoff · Impact', ar: 'تصدير · تسليم · تأثير' }, icon: PackageCheck },
];

const Coin = ({ rotateY }: { rotateY: ReturnType<typeof useTransform<number, number>> }) => (
  <div className="[perspective:800px]">
    <motion.div className="relative h-[82px] w-[82px] [transform-style:preserve-3d] sm:h-[104px] sm:w-[104px]" style={{ rotateY, rotateX: 7 }}>
      {Array.from({ length: 11 }).map((_, index) => (
        <span key={index} className="absolute inset-0 rounded-full border border-[#8fae18]/70 bg-gradient-to-br from-[#e1ff58] via-[#769111] to-[#252d06]" style={{ transform: `translateZ(${index - 5}px)` }} />
      ))}
      {[
        '[transform:translateZ(6px)]',
        '[transform:rotateY(180deg)_translateZ(6px)]',
      ].map((transformClass, index) => (
        <div key={index} className={`absolute inset-0 overflow-hidden rounded-full border-2 border-[#e8ff81]/80 bg-[#090a07] p-[6px] shadow-[inset_0_0_18px_rgba(204,245,43,0.25),0_0_40px_rgba(204,245,43,0.24)] [backface-visibility:hidden] ${transformClass}`}>
          <BrandIcon className="h-full w-full rounded-full" />
          <span className="absolute inset-[6px] rounded-full bg-gradient-to-br from-white/22 via-transparent to-black/40" />
          <span className="absolute inset-[3px] rounded-full border border-dashed border-[#ccf52b]/50" />
        </div>
      ))}
    </motion.div>
  </div>
);

export const ProcessRoadmap: React.FC<ProcessRoadmapProps> = ({ lang }) => {
  const isRTL = lang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 26, mass: 0.35 });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const stageProgress = Math.max(0, (value - 0.2) / 0.72);
    setActiveIndex(Math.min(steps.length - 1, Math.floor(stageProgress * steps.length)));
  });

  const coinY = useTransform(smooth, [0, 0.18, 1], ['-9vh', '-31vh', '-31vh']);
  const coinScale = useTransform(smooth, [0, 0.18, 1], [1.55, 0.72, 0.72]);
  const coinRotateY = useTransform(smooth, [0, 1], [0, 1800]);
  const introOpacity = useTransform(smooth, [0, 0.11, 0.2], [1, 1, 0]);
  const introY = useTransform(smooth, [0, 0.2], [0, -70]);
  const roadmapOpacity = useTransform(smooth, [0.13, 0.22, 0.94, 1], [0, 1, 1, 0]);
  const lineScale = useTransform(smooth, [0.18, 0.92], [0, 1]);
  const active = steps[activeIndex];
  const ActiveIcon = active.icon;
  const showLeft = activeIndex % 2 === 0;

  return (
    <section ref={sectionRef} className="relative h-[350vh] border-t border-white/10 bg-[#080807]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(204,245,43,0.055),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ccf52b]/45 to-transparent" />

        <motion.div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2" style={{ y: coinY, scale: coinScale }}>
          <Coin rotateY={coinRotateY} />
        </motion.div>

        <motion.div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 pt-52 text-center" style={{ opacity: introOpacity, y: introY }}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ccf52b]/25 bg-[#ccf52b]/[0.07] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#ccf52b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ccf52b]" />
            {isRTL ? 'العملية الإبداعية' : 'The creative process'}
          </div>
          <h2 className="text-4xl font-black leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">{isRTL ? 'من الموجز إلى التأثير.' : 'From brief to impact.'}</h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/45 sm:text-base">{isRTL ? 'عملية إبداعية مركزة تحول الأفكار إلى تجارب بصرية واضحة ومؤثرة.' : 'A focused creative process that turns ideas into clear, memorable visual experiences.'}</p>
          <span className="mt-7 font-mono text-[9px] uppercase tracking-[0.22em] text-white/25">{isRTL ? 'مرر للاستكشاف' : 'Scroll to explore'}</span>
        </motion.div>

        <motion.div className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-4 sm:px-8" style={{ opacity: roadmapOpacity }}>
          <div className="relative mx-auto h-[390px] max-w-5xl">
            <div className="absolute left-1/2 top-1/2 h-[280px] w-px -translate-x-1/2 -translate-y-1/2 bg-white/8" />
            <motion.div className="absolute left-1/2 top-1/2 h-[280px] w-px origin-top -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-[#ccf52b] via-[#ccf52b]/70 to-[#ccf52b]/15 shadow-[0_0_15px_rgba(204,245,43,0.35)]" style={{ scaleY: lineScale }} />
            <div className="absolute left-1/2 top-1/2 flex h-[280px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between">
              {steps.map((step, index) => <span key={step.number} className={`h-2.5 w-2.5 -translate-x-[4.5px] rounded-full border-2 border-[#080807] transition-all duration-300 ${index <= activeIndex ? 'bg-[#ccf52b] shadow-[0_0_12px_rgba(204,245,43,0.7)]' : 'bg-white/15'}`} />)}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={active.number}
                initial={{ opacity: 0, x: showLeft ? -45 : 45, y: 16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: showLeft ? 30 : -30, y: -12 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute top-1/2 w-[42vw] max-w-[360px] -translate-y-1/2 rounded-[20px] border border-white/10 bg-[#12110f]/95 p-4 shadow-2xl shadow-black/45 backdrop-blur-xl sm:w-[360px] sm:rounded-[24px] sm:p-7 ${showLeft ? 'right-[54%] text-end' : 'left-[54%] text-start'}`}
              >
                <div className={`mb-5 flex items-center gap-4 ${showLeft ? 'flex-row-reverse' : ''}`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#ccf52b]/20 bg-[#ccf52b]/[0.08] text-[#ccf52b]"><ActiveIcon className="h-5 w-5" /></div>
                  <span className="font-mono text-[10px] font-black tracking-[0.2em] text-[#ccf52b]">STEP {active.number}</span>
                </div>
                <h3 className="text-lg font-black tracking-[-0.04em] text-white sm:text-4xl">{active.title[lang]}</h3>
                <p className="mt-3 text-[10px] leading-4 text-white/45 sm:text-sm sm:leading-6">{active.description[lang]}</p>
                <div className="mt-5 border-t border-white/8 pt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-white/25 sm:text-[9px]">{active.detail[lang]}</div>
              </motion.article>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 font-mono text-[9px] tracking-[0.18em] text-white/18">{String(activeIndex + 1).padStart(2, '0')} / 06</div>
      </div>
    </section>
  );
};
