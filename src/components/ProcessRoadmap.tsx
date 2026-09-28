import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, Clapperboard, Compass, Lightbulb, PackageCheck, PenTool, Sparkles } from 'lucide-react';
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

export const ProcessRoadmap: React.FC<ProcessRoadmapProps> = ({ lang }) => {
  const isRTL = lang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 70%', 'end 35%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const coinTop = useTransform(progress, [0, 0.12, 0.88, 1], ['5%', '15%', '84%', '93%']);
  const coinRotate = useTransform(progress, [0, 1], [0, 1260]);
  const coinScale = useTransform(progress, [0, 0.12, 0.25, 1], [1.7, 1.12, 0.9, 0.9]);
  const lineScale = useTransform(progress, [0.08, 0.94], [0, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-white/10 bg-[#080807] px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ccf52b]/45 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#ccf52b]/[0.045] blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#ccf52b]/25 bg-[#ccf52b]/[0.07] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#ccf52b]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ccf52b]" />
          {isRTL ? 'العملية الإبداعية' : 'The creative process'}
        </div>
        <h2 className="text-5xl font-black leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">{isRTL ? 'من الموجز إلى التأثير.' : 'From brief to impact.'}</h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/45 sm:text-base">{isRTL ? 'عملية إبداعية مركزة تحول الأفكار إلى تجارب بصرية واضحة ومؤثرة.' : 'A focused creative process that turns ideas into clear, memorable visual experiences.'}</p>
        <div className="mt-8 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/25"><ArrowDown className="h-3.5 w-3.5 text-[#ccf52b]" />{isRTL ? 'مرر لتتبع الرحلة' : 'Scroll to follow the journey'}</div>
      </div>

      <div className="relative mx-auto mt-32 max-w-6xl pb-24 sm:mt-40 lg:mt-48">
        <div className="absolute bottom-0 left-[27px] top-0 w-px bg-white/8 lg:left-1/2 lg:-translate-x-1/2" />
        <motion.div className="absolute bottom-0 left-[27px] top-0 w-px origin-top bg-gradient-to-b from-[#ccf52b] via-[#ccf52b]/65 to-[#ccf52b]/10 shadow-[0_0_16px_rgba(204,245,43,0.35)] lg:left-1/2 lg:-translate-x-1/2" style={{ scaleY: lineScale }} />

        <motion.div className="pointer-events-none absolute left-[27px] z-30 -translate-x-1/2 lg:left-1/2" style={{ top: coinTop, rotate: coinRotate, scale: coinScale }}>
          <div className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#ccf52b]/55 bg-[#0a0a08] p-1.5 shadow-[0_0_0_7px_rgba(8,8,7,0.95),0_0_36px_rgba(204,245,43,0.28)] sm:h-[66px] sm:w-[66px]">
            <BrandIcon className="h-full w-full rounded-full" />
            <span className="absolute inset-[-5px] rounded-full border border-dashed border-[#ccf52b]/35" />
          </div>
        </motion.div>

        <div className="space-y-24 sm:space-y-28 lg:space-y-36">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const leftSide = index % 2 === 0;
            return (
              <div key={step.number} className="relative grid min-h-[190px] grid-cols-[56px_1fr] items-center lg:grid-cols-2 lg:gap-28">
                <motion.article
                  initial={{ opacity: 0, x: leftSide ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ amount: 0.55, once: false }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`col-start-2 rounded-[24px] border border-white/10 bg-[#12110f]/95 p-5 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-7 lg:col-start-auto lg:max-w-md ${leftSide ? 'lg:justify-self-end' : 'lg:col-start-2 lg:justify-self-start'}`}
                >
                  <div className="mb-6 flex items-center justify-between gap-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ccf52b]/20 bg-[#ccf52b]/[0.08] text-[#ccf52b]"><Icon className="h-5 w-5" /></div>
                    <span className="font-mono text-[10px] font-black tracking-[0.2em] text-[#ccf52b]">STEP {step.number}</span>
                  </div>
                  <h3 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{step.title[lang]}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/45">{step.description[lang]}</p>
                  <div className="mt-6 border-t border-white/8 pt-4 font-mono text-[9px] uppercase tracking-[0.17em] text-white/25">{step.detail[lang]}</div>
                </motion.article>
                <span className="absolute left-[27px] top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#080807] bg-[#ccf52b] shadow-[0_0_13px_rgba(204,245,43,0.65)] lg:left-1/2" />
              </div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: 0.8 }} className="relative z-10 mx-auto mt-28 max-w-md rounded-[28px] border border-[#ccf52b]/25 bg-[#ccf52b]/[0.065] px-6 py-8 text-center shadow-[0_0_70px_rgba(204,245,43,0.08)]">
          <Sparkles className="mx-auto h-6 w-6 text-[#ccf52b]" />
          <div className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">{isRTL ? 'جاهز لصناعة التأثير.' : 'Ready to make an impact.'}</div>
          <p className="mt-2 text-xs leading-5 text-white/40">{isRTL ? 'فكرة واضحة، تنفيذ دقيق، ونتيجة مصممة لتُذكر.' : 'Clear thinking, crafted execution, and a result designed to be remembered.'}</p>
        </motion.div>
      </div>
    </section>
  );
};
