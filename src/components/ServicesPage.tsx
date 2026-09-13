import React from 'react';
import {
  ArrowRight,
  BadgeCheck,
  CirclePlay,
  Clock3,
  MessageCircle,
  Play,
  Check,
  Clapperboard,
  Layers3,
  MonitorPlay,
  Palette,
  ShoppingBag,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';

interface ServicesPageProps {
  lang: Language;
}

const services = [
  {
    icon: Clapperboard,
    en: { title: 'Video Editing', desc: 'Polished edits, pacing, typography, transitions, sound treatment, and visual storytelling for digital content.' },
    ar: { title: 'مونتاج الفيديو', desc: 'مونتاج احترافي، إيقاع بصري، نصوص، انتقالات، معالجة صوتية وسرد بصري للمحتوى الرقمي.' },
  },
  {
    icon: WandSparkles,
    en: { title: 'Motion Graphics', desc: 'Kinetic typography, animated graphics, product explainers, visual effects, and branded motion systems.' },
    ar: { title: 'الموشن جرافيك', desc: 'تحريك النصوص والعناصر، شرح المنتجات، المؤثرات البصرية وبناء أنظمة حركة متوافقة مع الهوية.' },
  },
  {
    icon: MonitorPlay,
    en: { title: 'Social Media Content', desc: 'Reels, short-form video, campaign assets, and platform-ready creative built to stop the scroll.' },
    ar: { title: 'محتوى السوشيال ميديا', desc: 'ريلز وفيديوهات قصيرة وأصول حملات ومحتوى جاهز للمنصات بأسلوب بصري جاذب.' },
  },
  {
    icon: Palette,
    en: { title: 'Graphic Design', desc: 'Campaign visuals, key art, social posts, digital advertising, presentations, and brand collateral.' },
    ar: { title: 'التصميم الجرافيكي', desc: 'تصاميم الحملات، السوشيال، الإعلانات الرقمية، العروض والمواد البصرية للعلامات التجارية.' },
  },
  {
    icon: ShoppingBag,
    en: { title: 'Product & E-commerce Design', desc: 'Product visuals, feature graphics, storefront banners, listing content, and conversion-focused e-commerce assets.' },
    ar: { title: 'تصميم المنتجات والمتاجر', desc: 'صور المنتجات، إبراز المميزات، البنرات ومحتوى صفحات المنتجات والأصول المخصصة للتجارة الإلكترونية.' },
  },
  {
    icon: Layers3,
    en: { title: 'Custom Creative Projects', desc: 'Need a mix of design, motion, video, and digital production? Let’s build a tailored creative scope.' },
    ar: { title: 'مشاريع إبداعية مخصصة', desc: 'إذا كان مشروعك يجمع التصميم والموشن والفيديو والإنتاج الرقمي، يمكن بناء نطاق عمل مخصص لاحتياجك.' },
  },
];

const plans = [
  { key: 'single', videos: '1', minutes: '2', price: '400', average: '400' },
  { key: 'starter', videos: '4', minutes: '8', price: '1,500', average: '375' },
  { key: 'pro', videos: '8', minutes: '16', price: '2,800', average: '350', popular: true },
  { key: 'studio', videos: '12', minutes: '24', price: '3,900', average: '325' },
];

const copy = {
  en: {
    eyebrow: 'CREATIVE SERVICES',
    titleA: 'From idea to',
    titleB: 'final frame.',
    intro: 'Creative services for brands, businesses, and content creators across video, motion, design, and digital production.',
    cta: 'Start a Project',
    servicesTitle: 'What I can help you create',
    servicesSub: 'Flexible creative support, from one focused deliverable to ongoing monthly production.',
    pricingEyebrow: 'VIDEO EDITING PACKAGES',
    pricingTitle: 'Consistent content. Clear pricing.',
    pricingSub: 'Choose a one-off video or a monthly production package. Each video can be up to 2 minutes.',
    planNames: { single: 'Single Video', starter: 'Starter', pro: 'Pro', studio: 'Studio' },
    perMonth: '/ month',
    oneTime: 'one-time',
    videos: 'videos',
    video: 'video',
    total: 'total minutes',
    avg: 'SAR avg. / video',
    popular: 'MOST POPULAR',
    includes: 'Every package includes',
    includedItems: ['Professional editing', 'Titles & typography', 'Visual elements & graphics', 'Transitions & motion', 'Sound & music treatment', 'High-quality final export', '2 revision rounds per video'],
    extra: '+150 SAR for each additional minute beyond the included duration.',
    featuredEyebrow: 'VIDEO EDITING',
    featuredTitle: 'Editing built around the story, not just the timeline.',
    featuredText: 'From raw footage to a polished final cut: pacing, typography, supporting visuals, motion details and sound are shaped into one clear piece of content.',
    featuredPoints: ['Up to 2 minutes per video', '2 revision rounds included', 'Ready for social & digital platforms'],
    featuredCta: 'View Packages',
    processEyebrow: 'HOW IT WORKS',
    processTitle: 'Simple process. Thoughtful execution.',
    process: [['01', 'Brief', 'Share the goal, footage, references and deadline.'], ['02', 'Edit', 'I shape the story, pacing, visuals, motion and sound.'], ['03', 'Review', 'You receive a preview and up to two revision rounds.'], ['04', 'Deliver', 'Final files are exported and ready to publish.']],
    faqEyebrow: 'FAQ',
    faqTitle: 'Before we start',
    faqs: [['What counts as a revision?', 'A revision is an adjustment to the approved direction, such as text, timing, shot choices or small visual changes. A new concept or major restructure is quoted separately.'], ['Can unused monthly videos roll over?', 'Monthly packages are reserved production capacity for that month, so unused videos do not automatically roll over.'], ['Do you offer longer videos?', 'Yes. The listed packages cover videos up to 2 minutes each. Additional duration is priced at 150 SAR per extra minute.'], ['Can I request a custom package?', 'Absolutely. If your project has a different volume, format or motion requirement, I can quote a custom scope.']],
    finalTitle: 'Have a project in mind?',
    finalText: 'Tell me what you’re building, how many videos you need, and the style you’re after. I’ll help shape the right scope.',
    finalCta: 'Let’s Work Together',
  },
  ar: {
    eyebrow: 'الخدمات الإبداعية',
    titleA: 'من الفكرة إلى',
    titleB: 'المشهد النهائي.',
    intro: 'خدمات إبداعية للعلامات التجارية والمشاريع وصناع المحتوى تشمل الفيديو، الموشن، التصميم والإنتاج الرقمي.',
    cta: 'ابدأ مشروعك',
    servicesTitle: 'كيف أقدر أساعدك؟',
    servicesSub: 'دعم إبداعي مرن، من تنفيذ عمل واحد إلى إنتاج شهري مستمر.',
    pricingEyebrow: 'باقات مونتاج الفيديو',
    pricingTitle: 'محتوى مستمر. وتسعير واضح.',
    pricingSub: 'اختر فيديو منفرد أو باقة إنتاج شهرية. مدة الفيديو الواحد تصل إلى دقيقتين.',
    planNames: { single: 'فيديو منفرد', starter: 'الأساسية', pro: 'الاحترافية', studio: 'الإنتاج المستمر' },
    perMonth: '/ شهريًا',
    oneTime: 'مرة واحدة',
    videos: 'فيديوهات',
    video: 'فيديو',
    total: 'دقيقة إجمالية',
    avg: 'ريال متوسط / فيديو',
    popular: 'الأكثر طلبًا',
    includes: 'تشمل جميع الباقات',
    includedItems: ['مونتاج احترافي', 'العناوين وتنسيق النصوص', 'الجرافيكس والعناصر البصرية', 'الانتقالات والحركة', 'معالجة الصوت والموسيقى', 'تصدير نهائي بجودة عالية', 'جولتان من التعديلات لكل فيديو'],
    extra: '+150 ريال لكل دقيقة إضافية بعد المدة المشمولة في الباقة.',
    featuredEyebrow: 'مونتاج الفيديو',
    featuredTitle: 'مونتاج مبني حول القصة، وليس مجرد ترتيب لقطات.',
    featuredText: 'من الملفات الخام إلى النسخة النهائية: يتم بناء الإيقاع، النصوص، العناصر الداعمة، تفاصيل الحركة والصوت لتخرج كقطعة محتوى واحدة واضحة ومتماسكة.',
    featuredPoints: ['حتى دقيقتين لكل فيديو', 'جولتان من التعديلات مشمولة', 'جاهز للنشر على المنصات الرقمية'],
    featuredCta: 'شاهد الباقات',
    processEyebrow: 'آلية العمل',
    processTitle: 'خطوات واضحة. وتنفيذ مدروس.',
    process: [['01', 'التفاصيل', 'ترسل الهدف، الملفات، المراجع والموعد المطلوب.'], ['02', 'التنفيذ', 'أبني القصة والإيقاع والعناصر والحركة والصوت.'], ['03', 'المراجعة', 'تستلم نسخة للمعاينة مع جولتين من التعديلات.'], ['04', 'التسليم', 'تصدير الملفات النهائية وتجهيزها للنشر.']],
    faqEyebrow: 'الأسئلة الشائعة',
    faqTitle: 'قبل ما نبدأ',
    faqs: [['ما المقصود بجولة تعديل؟', 'هي تعديلات ضمن الاتجاه المعتمد مثل النص، التوقيت، اختيار اللقطات أو تغييرات بصرية بسيطة. تغيير الفكرة بالكامل أو إعادة الهيكلة يتم تسعيره بشكل منفصل.'], ['هل تنتقل الفيديوهات غير المستخدمة للشهر التالي؟', 'الباقة الشهرية تحجز وقت إنتاج مخصص خلال الشهر، لذلك الفيديوهات غير المستخدمة لا تنتقل تلقائيًا للشهر التالي.'], ['هل يمكن تنفيذ فيديو أطول من دقيقتين؟', 'نعم. الباقات المعروضة تشمل حتى دقيقتين للفيديو، وتضاف 150 ريال لكل دقيقة إضافية.'], ['هل يمكن عمل باقة مخصصة؟', 'بالتأكيد. إذا كان لديك عدد مختلف من الفيديوهات أو متطلبات موشن وإنتاج خاصة، يتم تجهيز عرض مخصص للمشروع.']],
    finalTitle: 'عندك مشروع في بالك؟',
    finalText: 'شارك معي فكرة المشروع، عدد الفيديوهات والأسلوب المطلوب، ونحدد معًا نطاق العمل الأنسب.',
    finalCta: 'خلّنا نبدأ',
  },
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ lang }) => {
  const t = copy[lang];
  const isAr = lang === 'ar';

  const goContact = () => {
    window.location.href = '/#contact';
  };

  const goWhatsApp = (plan: (typeof plans)[number]) => {
    const planName = t.planNames[plan.key as keyof typeof t.planNames];
    const billing = plan.key === 'single' ? t.oneTime : t.perMonth;
    const message = isAr
      ? `مرحبًا مجاهد، أرغب في باقة ${planName} لمونتاج الفيديو:
• ${plan.videos} ${plan.videos === '1' ? t.video : t.videos}
• ${plan.minutes} ${t.total}
• ${plan.price} ريال ${billing}

تفاصيل مشروعي:
موعد البدء المفضل:`
      : `Hi Mugahed, I'm interested in the ${planName} video editing package:
• ${plan.videos} ${plan.videos === '1' ? t.video : t.videos}
• ${plan.minutes} ${t.total}
• ${plan.price} SAR ${billing}

My project:
Preferred start date:`;

    window.open(
      `https://wa.me/966500582126?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-36 -right-24 h-96 w-96 rounded-full bg-[#f46c38]/15 blur-3xl" />
          <div className="absolute -bottom-48 left-0 h-96 w-96 rounded-full bg-[#c5ff41]/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#f46c38] uppercase mb-6">
              <Sparkles className="w-4 h-4" /> {t.eyebrow}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.95]">
              {t.titleA} <span className="text-[#f46c38]">{t.titleB}</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">{t.intro}</p>
            <button onClick={goContact} className="mt-9 inline-flex items-center gap-2 bg-[#f46c38] text-white font-bold rounded-full px-7 py-3.5 hover:bg-[#ff7b46] transition-all hover:-translate-y-0.5 cursor-pointer">
              {t.cta} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">{t.servicesTitle}</h2>
          <p className="mt-4 text-gray-400 text-lg">{t.servicesSub}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            const item = service[lang];
            return (
              <motion.article key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="group rounded-3xl border border-white/10 bg-white/[0.025] p-7 hover:border-[#f46c38]/45 hover:bg-white/[0.045] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#f46c38]/12 border border-[#f46c38]/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 text-[#f46c38]" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#11100f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-[#26211e] to-[#121110] flex items-center justify-center group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(244,108,56,.22),transparent_35%)]" />
              <div className="relative w-20 h-20 rounded-full border border-white/15 bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-105 transition-transform">
                <Play className="w-8 h-8 text-[#f46c38] fill-[#f46c38] translate-x-0.5" />
              </div>
              <div className="absolute left-6 bottom-6 right-6 flex items-center justify-between text-xs font-bold tracking-widest text-gray-400 uppercase">
                <span>Selected Editing Work</span><span>01:33</span>
              </div>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#f46c38] uppercase">{t.featuredEyebrow}</div>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight leading-[1.05]">{t.featuredTitle}</h2>
              <p className="mt-5 text-gray-400 text-lg leading-relaxed">{t.featuredText}</p>
              <div className="mt-7 space-y-3">
                {t.featuredPoints.map((point) => <div key={point} className="flex items-center gap-3 text-gray-200"><Check className="w-5 h-5 text-[#c5ff41] shrink-0" /><span>{point}</span></div>)}
              </div>
              <a href="#video-packages" className="mt-8 inline-flex items-center gap-2 text-[#f46c38] font-bold hover:text-[#ff8658] transition-colors">{t.featuredCta}<ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="video-packages" className="border-b border-white/10 bg-black/15 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl mb-12">
            <div className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#c5ff41] uppercase">{t.pricingEyebrow}</div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight">{t.pricingTitle}</h2>
            <p className="mt-4 text-gray-400 text-lg">{t.pricingSub}</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {plans.map((plan) => (
              <article key={plan.key} className={`relative rounded-3xl p-7 border flex flex-col ${plan.popular ? 'border-[#f46c38] bg-[#f46c38]/[0.07] shadow-[0_0_0_1px_rgba(244,108,56,0.15)]' : 'border-white/10 bg-[#1b1918]'}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f46c38] px-4 py-1.5 text-[10px] font-black tracking-[0.14em] text-white">{t.popular}</div>}
                <div className="text-lg font-bold">{t.planNames[plan.key as keyof typeof t.planNames]}</div>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight">{plan.price}</span>
                  <span className="text-gray-400 pb-1">SAR</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">{plan.key === 'single' ? t.oneTime : t.perMonth}</div>
                <div className="h-px bg-white/10 my-6" />
                <div className="space-y-3 text-sm text-gray-300 flex-1">
                  <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-[#c5ff41]" /><strong>{plan.videos}</strong> {plan.videos === '1' ? t.video : t.videos}</div>
                  <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-[#c5ff41]" /><strong>{plan.minutes}</strong> {t.total}</div>
                  <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-[#c5ff41]" /><strong>{plan.average}</strong> {t.avg}</div>
                </div>
                <button onClick={() => goWhatsApp(plan)} className={`mt-7 w-full rounded-full px-5 py-3 text-sm font-bold cursor-pointer transition-all ${plan.popular ? 'bg-[#f46c38] text-white hover:bg-[#ff7b46]' : 'bg-white text-[#151312] hover:bg-gray-200'}`}>{t.cta}</button>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-9">
            <h3 className="text-xl font-bold">{t.includes}</h3>
            <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
              {t.includedItems.map((item) => <div key={item} className="flex gap-2 text-sm text-gray-300"><BadgeCheck className="w-4 h-4 mt-0.5 shrink-0 text-[#c5ff41]" /><span>{item}</span></div>)}
            </div>
            <p className="mt-6 text-sm text-[#f4a17d]">{t.extra}</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#f46c38] px-7 py-12 sm:px-12 sm:py-16 text-white">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 blur-3xl rounded-full" />
          <div className="relative max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">{t.finalTitle}</h2>
            <p className="mt-4 text-white/80 text-lg leading-relaxed">{t.finalText}</p>
            <button onClick={goContact} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#151312] px-7 py-3.5 font-bold hover:bg-black transition-colors cursor-pointer">
              {t.finalCta} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
