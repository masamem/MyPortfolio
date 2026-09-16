import React, { useState } from 'react';
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

interface ServicePlan {
  name: { en: string; ar: string };
  price: string;
  note: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
  popular?: boolean;
}

const servicePackages: Array<{ serviceIndex: number; plans: ServicePlan[] }> = [
  {
    serviceIndex: 0,
    plans: [
      { name: { en: 'Single Video', ar: 'فيديو منفرد' }, price: '$110', note: { en: 'one-time', ar: 'مرة واحدة' }, features: { en: ['1 video up to 2 minutes', 'Professional edit and sound', '2 revision rounds'], ar: ['فيديو واحد حتى دقيقتين', 'مونتاج ومعالجة صوتية', 'جولتان من التعديلات'] } },
      { name: { en: 'Creator', ar: 'صانع المحتوى' }, price: '$400', note: { en: 'per month', ar: 'شهريًا' }, features: { en: ['4 videos up to 2 minutes each', 'Titles and visual elements', 'Platform-ready exports'], ar: ['4 فيديوهات حتى دقيقتين لكل فيديو', 'عناوين وعناصر بصرية', 'تصدير جاهز للمنصات'] }, popular: true },
      { name: { en: 'Studio', ar: 'الاستوديو' }, price: '$750', note: { en: 'per month', ar: 'شهريًا' }, features: { en: ['8 videos up to 2 minutes each', 'Priority production schedule', 'Consistent branded style'], ar: ['8 فيديوهات حتى دقيقتين لكل فيديو', 'أولوية في جدول الإنتاج', 'أسلوب بصري موحد للعلامة'] } },
    ],
  },
  {
    serviceIndex: 1,
    plans: [
      { name: { en: 'Motion Starter', ar: 'موشن أساسي' }, price: '$180', note: { en: 'one-time', ar: 'مرة واحدة' }, features: { en: ['Up to 15 seconds', 'Logo or text animation', '2 revision rounds'], ar: ['حتى 15 ثانية', 'تحريك شعار أو نص', 'جولتان من التعديلات'] } },
      { name: { en: 'Brand Motion', ar: 'موشن للعلامة' }, price: '$450', note: { en: 'starting at', ar: 'يبدأ من' }, features: { en: ['Up to 30 seconds', 'Custom branded graphics', 'Sound design included'], ar: ['حتى 30 ثانية', 'جرافيكس مخصص للعلامة', 'يشمل التصميم الصوتي'] }, popular: true },
      { name: { en: 'Motion Campaign', ar: 'حملة موشن' }, price: '$900', note: { en: 'starting at', ar: 'يبدأ من' }, features: { en: ['Up to 60 seconds', 'Storyboard and visual direction', 'Multiple platform formats'], ar: ['حتى 60 ثانية', 'ستوري بورد واتجاه بصري', 'مقاسات متعددة للمنصات'] } },
    ],
  },
  {
    serviceIndex: 2,
    plans: [
      { name: { en: 'Social Starter', ar: 'سوشيال أساسي' }, price: '$180', note: { en: 'one-time', ar: 'مرة واحدة' }, features: { en: ['6 social media designs', 'Platform-ready sizes', '2 revision rounds'], ar: ['6 تصاميم سوشيال ميديا', 'مقاسات جاهزة للمنصات', 'جولتان من التعديلات'] } },
      { name: { en: 'Monthly Growth', ar: 'النمو الشهري' }, price: '$420', note: { en: 'per month', ar: 'شهريًا' }, features: { en: ['12 social designs', '4 animated stories or posts', 'Monthly visual consistency'], ar: ['12 تصميم سوشيال', '4 ستوري أو منشورات متحركة', 'اتساق بصري شهري'] }, popular: true },
      { name: { en: 'Content Engine', ar: 'محرك المحتوى' }, price: '$850', note: { en: 'starting per month', ar: 'يبدأ شهريًا من' }, features: { en: ['16 social designs', '8 short-form videos', 'Campaign visual direction'], ar: ['16 تصميم سوشيال', '8 فيديوهات قصيرة', 'اتجاه بصري للحملة'] } },
    ],
  },
  {
    serviceIndex: 3,
    plans: [
      { name: { en: 'Design Essentials', ar: 'أساسيات التصميم' }, price: '$150', note: { en: 'one-time', ar: 'مرة واحدة' }, features: { en: ['3 branded design assets', 'Digital-ready files', '2 revision rounds'], ar: ['3 تصاميم متوافقة مع الهوية', 'ملفات جاهزة للاستخدام الرقمي', 'جولتان من التعديلات'] } },
      { name: { en: 'Campaign Kit', ar: 'حزمة الحملة' }, price: '$400', note: { en: 'starting at', ar: 'يبدأ من' }, features: { en: ['1 campaign key visual', '6 format adaptations', 'Organized source files'], ar: ['تصميم رئيسي للحملة', '6 مقاسات وتطبيقات', 'ملفات مصدر منظمة'] }, popular: true },
      { name: { en: 'Brand Support', ar: 'دعم العلامة' }, price: '$750', note: { en: 'starting per month', ar: 'يبدأ شهريًا من' }, features: { en: ['12 design assets', 'Priority design support', 'Consistent brand execution'], ar: ['12 مادة تصميمية', 'أولوية في دعم التصميم', 'تطبيق متسق للهوية'] } },
    ],
  },
  {
    serviceIndex: 4,
    plans: [
      { name: { en: 'Product Starter', ar: 'منتج أساسي' }, price: '$180', note: { en: 'one-time', ar: 'مرة واحدة' }, features: { en: ['5 product visuals', 'Clean feature callouts', 'Store-ready exports'], ar: ['5 تصاميم للمنتج', 'إبراز واضح للمميزات', 'ملفات جاهزة للمتجر'] } },
      { name: { en: 'Listing Growth', ar: 'تطوير صفحة المنتج' }, price: '$420', note: { en: 'one-time', ar: 'مرة واحدة' }, features: { en: ['10 product visuals', 'Feature and benefit graphics', '2 storefront banners'], ar: ['10 تصاميم للمنتج', 'جرافيكس للمميزات والفوائد', 'بنران للمتجر'] }, popular: true },
      { name: { en: 'Storefront System', ar: 'نظام المتجر' }, price: '$850', note: { en: 'starting at', ar: 'يبدأ من' }, features: { en: ['20 product and category visuals', 'Storefront banner system', 'Reusable visual templates'], ar: ['20 تصميمًا للمنتجات والتصنيفات', 'نظام بنرات للمتجر', 'قوالب بصرية قابلة لإعادة الاستخدام'] } },
    ],
  },
  {
    serviceIndex: 5,
    plans: [
      { name: { en: 'Custom Creative Scope', ar: 'نطاق إبداعي مخصص' }, price: 'Quote', note: { en: 'built around your project', ar: 'حسب احتياج المشروع' }, features: { en: ['Mix design, motion, video and digital production', 'Clear scope and delivery schedule', 'Tailored quotation before work begins'], ar: ['دمج التصميم والموشن والفيديو والإنتاج الرقمي', 'نطاق وجدول تسليم واضحان', 'عرض سعر مخصص قبل بدء العمل'] }, popular: true },
    ],
  },
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
  const [selectedService, setSelectedService] = useState(0);
  const activePackageGroup = servicePackages[selectedService];

  const goContact = () => {
    window.location.assign(`${window.location.origin}/#contact`);
  };

  const chooseService = (index: number) => {
    setSelectedService(index);
    window.requestAnimationFrame(() => {
      document.getElementById('service-packages')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const goWhatsApp = (plan: ServicePlan) => {
    const serviceName = services[activePackageGroup.serviceIndex][lang].title;
    const planName = plan.name[lang];
    const planNote = plan.note[lang];
    const featureList = plan.features[lang].map((feature) => `• ${feature}`).join('\n');
    const message = isAr
      ? `مرحبًا مجاهد، أرغب في الاستفسار عن خدمة ${serviceName} — باقة ${planName}.\nالسعر: ${plan.price} USD (${planNote})\n\nتشمل الباقة:\n${featureList}\n\nتفاصيل مشروعي:\nموعد البدء المفضل:`
      : `Hi Mugahed, I'm interested in ${serviceName} — ${planName}.\nPrice: ${plan.price} USD (${planNote})\n\nPackage includes:\n${featureList}\n\nMy project details:\nPreferred start date:`;

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
          <div className="absolute -top-36 -right-24 h-96 w-96 rounded-full bg-[#ccf52b]/15 blur-3xl" />
          <div className="absolute -bottom-48 left-0 h-96 w-96 rounded-full bg-[#c5ff41]/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 lg:py-36">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#ccf52b] uppercase mb-6">
              <Sparkles className="w-4 h-4" /> {t.eyebrow}
            </div>
            <h1 className="text-4xl min-[390px]:text-5xl sm:text-6xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.98] sm:leading-[0.95]">
              {t.titleA} <span className="text-[#ccf52b]">{t.titleB}</span>
            </h1>
            <p className="mt-6 sm:mt-8 text-base sm:text-xl text-gray-300 leading-relaxed max-w-2xl">{t.intro}</p>
            <button onClick={goContact} className="mt-8 sm:mt-9 inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 bg-[#ccf52b] text-[#151312] font-bold rounded-full px-7 py-3.5 hover:bg-[#d9fa68] transition-all hover:-translate-y-0.5 cursor-pointer">
              {t.cta} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">{t.servicesTitle}</h2>
          <p className="mt-4 text-gray-400 text-lg">{t.servicesSub}</p>
        </div>
        <div className="flex gap-4 overflow-x-auto -mx-4 px-4 pb-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
          {services.map((service, index) => {
            const Icon = service.icon;
            const item = service[lang];
            return (
              <motion.button type="button" onClick={() => chooseService(index)} key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="group min-w-[84vw] sm:min-w-0 snap-center text-start rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-7 hover:border-[#ccf52b]/45 hover:bg-white/[0.045] active:scale-[0.99] transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-[#ccf52b]/12 border border-[#ccf52b]/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 text-[#ccf52b]" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-gray-400 leading-relaxed">{item.desc}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#ccf52b]">
                  {isAr ? 'عرض الباقات' : 'View packages'}
                  <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#11100f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div className="relative aspect-video rounded-3xl sm:rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-[#26211e] to-[#121110] flex items-center justify-center group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(204,245,43,.22),transparent_35%)]" />
              <div className="relative w-20 h-20 rounded-full border border-white/15 bg-white/10 backdrop-blur flex items-center justify-center group-hover:scale-105 transition-transform">
                <Play className="w-8 h-8 text-[#ccf52b] fill-[#ccf52b] translate-x-0.5" />
              </div>
              <div className="absolute left-6 bottom-6 right-6 flex items-center justify-between text-xs font-bold tracking-widest text-gray-400 uppercase">
                <span>Selected Editing Work</span><span>01:33</span>
              </div>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#ccf52b] uppercase">{t.featuredEyebrow}</div>
              <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight leading-[1.05]">{t.featuredTitle}</h2>
              <p className="mt-5 text-gray-400 text-lg leading-relaxed">{t.featuredText}</p>
              <div className="mt-7 space-y-3">
                {t.featuredPoints.map((point) => <div key={point} className="flex items-center gap-3 text-gray-200"><Check className="w-5 h-5 text-[#c5ff41] shrink-0" /><span>{point}</span></div>)}
              </div>
              <a href="#service-packages" className="mt-8 inline-flex items-center gap-2 text-[#ccf52b] font-bold hover:text-[#d9fa68] transition-colors">{t.featuredCta}<ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} /></a>
            </div>
          </div>
        </div>
      </section>

      <section id="service-packages" className="border-b border-white/10 bg-black/15 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#c5ff41] uppercase">
              {isAr ? 'باقات الخدمات بالدولار' : 'SERVICE PACKAGES · USD'}
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight">
              {isAr ? 'اختر الخدمة وشاهد أسعارها.' : 'Choose a service. See clear pricing.'}
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              {isAr ? 'أسعار ثابتة للخدمات المحددة، وأسعار تبدأ من للمشاريع التي يختلف نطاقها.' : 'Fixed prices for defined deliverables and starting prices where the creative scope can vary.'}
            </p>
          </div>

          <div className="sm:hidden mb-8">
            <label htmlFor="mobile-service-selector" className="block mb-2 text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
              {isAr ? 'اختر الخدمة' : 'Select a service'}
            </label>
            <select
              id="mobile-service-selector"
              value={selectedService}
              onChange={(event) => setSelectedService(Number(event.target.value))}
              className="w-full min-h-12 rounded-2xl border border-[#ccf52b]/50 bg-[#1b1918] px-4 py-3 text-base font-bold text-white outline-none focus:border-[#ccf52b] focus:ring-2 focus:ring-[#ccf52b]/20"
            >
              {services.map((service, index) => (
                <option key={service.en.title} value={index}>{service[lang].title}</option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex gap-3 overflow-x-auto pb-4 mb-8 snap-x">
            {services.map((service, index) => {
              const Icon = service.icon;
              const active = selectedService === index;
              return (
                <button
                  key={service.en.title}
                  onClick={() => setSelectedService(index)}
                  className={`snap-start shrink-0 inline-flex min-h-12 items-center gap-2 rounded-full border px-4 py-3 text-sm font-bold transition-all cursor-pointer ${active ? 'border-[#ccf52b] bg-[#ccf52b] text-[#151312]' : 'border-white/10 bg-white/[0.035] text-gray-300 hover:border-[#ccf52b]/50'}`}
                >
                  <Icon className="w-4 h-4" />
                  {service[lang].title}
                </button>
              );
            })}
          </div>

          <motion.div
            key={selectedService}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-7 flex items-center gap-3">
              {React.createElement(services[activePackageGroup.serviceIndex].icon, { className: 'w-7 h-7 text-[#ccf52b]' })}
              <h3 className="text-2xl sm:text-3xl font-black">{services[activePackageGroup.serviceIndex][lang].title}</h3>
            </div>

            <div className={`grid gap-4 sm:gap-5 items-stretch ${activePackageGroup.plans.length === 1 ? 'max-w-2xl' : 'md:grid-cols-3'}`}>
              {activePackageGroup.plans.map((plan) => (
                <article key={plan.name.en} className={`relative rounded-3xl p-6 sm:p-7 border flex flex-col ${plan.popular ? 'border-[#ccf52b] bg-[#ccf52b]/[0.07] shadow-[0_0_0_1px_rgba(204,245,43,0.15)]' : 'border-white/10 bg-[#1b1918]'}`}>
                  {plan.popular && activePackageGroup.plans.length > 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#ccf52b] px-4 py-1.5 text-[10px] font-black tracking-[0.14em] text-[#151312]">
                      {isAr ? 'الخيار الأنسب' : 'RECOMMENDED'}
                    </div>
                  )}
                  <div className="text-lg font-bold">{plan.name[lang]}</div>
                  <div className="mt-5 flex items-end gap-2">
                    {plan.price === 'Quote' ? (
                      <span className="text-4xl font-black tracking-tight">{isAr ? 'عرض سعر' : 'Custom quote'}</span>
                    ) : (
                      <>
                        <span className="text-4xl sm:text-5xl font-black tracking-tight">{plan.price}</span>
                        <span className="text-gray-400 pb-1">USD</span>
                      </>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">{plan.note[lang]}</div>
                  <div className="h-px bg-white/10 my-6" />
                  <div className="space-y-3 text-sm text-gray-300 flex-1">
                    {plan.features[lang].map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <BadgeCheck className="w-4 h-4 mt-0.5 text-[#c5ff41] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => goWhatsApp(plan)} className={`mt-7 min-h-12 w-full rounded-full px-5 py-3 text-sm font-bold cursor-pointer transition-all ${plan.popular ? 'bg-[#ccf52b] text-[#151312] hover:bg-[#d9fa68]' : 'bg-white text-[#151312] hover:bg-gray-200'}`}>
                    {isAr ? 'استفسر عن الباقة' : 'Ask About This Package'}
                  </button>
                </article>
              ))}
            </div>
          </motion.div>

          <p className="mt-8 text-sm text-gray-500">
            {isAr ? 'الأسعار لا تشمل شراء المواد المدفوعة أو التصوير أو التعليق الصوتي ما لم يُذكر خلاف ذلك.' : 'Prices exclude paid stock assets, filming and voice-over unless specifically included in the agreed scope.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2rem] border border-white/10 bg-[#ccf52b] px-6 py-10 sm:px-12 sm:py-16 text-[#151312]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 blur-3xl rounded-full" />
          <div className="relative max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">{t.finalTitle}</h2>
            <p className="mt-4 text-[#151312]/80 text-lg leading-relaxed">{t.finalText}</p>
            <button onClick={goContact} className="mt-8 inline-flex w-full sm:w-auto min-h-12 items-center justify-center gap-2 rounded-full bg-[#151312] text-white px-7 py-3.5 font-bold hover:bg-black transition-colors cursor-pointer">
              {t.finalCta} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
