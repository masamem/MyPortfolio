import { ProjectItem, ExperienceItem, ToolItem, SocialItem } from '../types';

export const contentData = {
  en: {
    dir: 'ltr',
    name: 'Mugahed Al-Maari',
    role: 'Multimedia Designer',
    roleLine2: '',
    tagline:
      'Creating impactful brand experiences through design, motion, video, social content, and emerging creative technology.',
    available: 'Open to Creative Opportunities',
    location: 'Riyadh, Saudi Arabia',
    years: '6+ Years Creative Experience',
    roleCard: 'Multidisciplinary Creative Designer',
    cta: 'View My Work →',
    ctaResume: 'Download Resume ↓',
    ctaSecondary: 'View Behance',
    toggleLabel: '🇸🇦 عربي',
    sectionProjects: 'SELECTED WORK',
    sectionProjectsEyebrow: 'PORTFOLIO / SELECTED PROJECTS',
    sectionProjectsSubtitle:
      'A selection of campaigns, product visuals, motion, and digital experiences created for brands and businesses.',
    sectionTools: 'CAPABILITIES & TOOLS',
    sectionToolsEyebrow: 'WHAT I DO',
    sectionToolsSubtitle:
      'Creative capabilities across design, motion, content, and emerging visual technologies.',
    toolkitTitle: 'CREATIVE TOOLKIT',
    sectionContact: "LET'S WORK TOGETHER",
    contactSubtitle:
      "Have a project in mind? Let's create something great together.",
    navLinks: ['About', 'Capabilities', 'Contact'],
    education:
      'BSc (Hons) Multimedia Technology · Asia Pacific University, KL (2016–2020)',
    footerText: '© 2025 Mugahed Al-Maari · All rights reserved',
    quickCopyEmail: 'Copy Email',
    quickCopyPhone: 'Copy Phone Number',
    copiedText: 'Copied!',
    viewProjectModalCTA: 'View Project →',
    closeModal: 'Close',
    filterAll: 'All',
    filterCampaigns: 'Campaigns',
    filterSocial: 'Social',
    filterMotion: 'Motion & Video',
    filterBranding: 'Branding',
    filterDigital: 'Digital',
    contactFormTitle: 'Send a Direct Inquiry',
    formNamePlaceholder: 'Your Name',
    formEmailPlaceholder: 'Your Email',
    formProjectTypeLabel: 'Project Type',
    formMessagePlaceholder: 'Tell me about your project goals, timeline, and requirements...',
    formSubmit: 'Send Inquiry via Email',
    budgetLabel: 'Estimated Budget Range',
  },
  ar: {
    dir: 'rtl',
    name: 'مجاهد المعاري',
    role: 'مصمم وسائط متعددة',
    roleLine2: '',
    tagline:
      'صناعة تجارب علامات تجارية تؤثر من خلال التصميم، الموشن جرافيك، الفيديو، المحتوى الرقمي، والتقنيات الإبداعية الناشئة.',
    available: 'متاح للفرص الإبداعية',
    location: 'الرياض، المملكة العربية السعودية',
    years: '+6 سنوات خبرة إبداعية',
    roleCard: 'مصمم إبداعي متعدد التخصصات',
    cta: 'عرض أعمالي ←',
    ctaResume: 'تحميل السيرة الذاتية ↓',
    ctaSecondary: 'معرض بيهانس',
    toggleLabel: '🇺🇸 English',
    sectionProjects: 'أعمال مختارة',
    sectionProjectsEyebrow: 'معرض الأعمال / مشاريع مختارة',
    sectionProjectsSubtitle:
      'مجموعة مختارة من الحملات الإعلانية، بصريات المنتجات، الموشن، والتجارب الرقمية لعلامات تجارية وشركات.',
    sectionTools: 'القدرات والأدوات',
    sectionToolsEyebrow: 'ما أقدمه',
    sectionToolsSubtitle:
      'قدرات إبداعية تغطي التصميم، الموشن، صناعة المحتوى، والتقنيات البصرية الناشئة.',
    toolkitTitle: 'الأدوات الإبداعية',
    sectionContact: 'تواصل معي',
    contactSubtitle: 'لديك مشروع في ذهنك؟ لنصنع شيئاً رائعاً معاً.',
    navLinks: ['عنّي', 'القدرات والمهارات', 'تواصل'],
    education:
      'بكالوريوس تقنية الوسائط المتعددة · جامعة آسيا باسيفيك، كوالالمبور (٢٠١٦–٢٠٢٠)',
    footerText: '© ٢٠٢٥ مجاهد المعاري · جميع الحقوق محفوظة',
    quickCopyEmail: 'نسخ البريد الإلكتروني',
    quickCopyPhone: 'نسخ رقم الهاتف',
    copiedText: 'تم النسخ!',
    viewProjectModalCTA: 'عرض المشروع ←',
    closeModal: 'إغلاق',
    filterAll: 'الكل',
    filterCampaigns: 'حملات إعلانية',
    filterSocial: 'المحتوى الرقمي',
    filterMotion: 'موشن وفيديو',
    filterBranding: 'الهوية والتصميم',
    filterDigital: 'تجارب رقمية',
    contactFormTitle: 'أرسل استفسارك مباشرة',
    formNamePlaceholder: 'اسمك الكريم',
    formEmailPlaceholder: 'بريدك الإلكتروني',
    formProjectTypeLabel: 'نوع المشروع',
    formMessagePlaceholder: 'اكتب تفاصيل مشروعك والأهداف والجدول الزمني...',
    formSubmit: 'إرسال الاستفسار عبر البريد',
    budgetLabel: 'الميزانية التقديرية',
  },
};

export const projectsData: ProjectItem[] = [
  {
    id: 'rebune-beauty-campaign',
    client: 'REBUNE',
    title: {
      en: 'Beauty Product Campaign',
      ar: 'حملة منتجات التجميل والعناية',
    },
    desc: {
      en: 'Commercial beauty appliance campaign featuring art directed studio photography, social collateral, and retail launch assets.',
      ar: 'حملة إعلانية تجارية لأجهزة التجميل تشمل البصريات الاستوديو، الإخراج الفني، ومحتوى إطلاق المنتجات.',
    },
    fullDesc: {
      en: 'Comprehensive commercial campaign created for REBUNE beauty devices. Produced high-definition product visual styling, social campaign creative direction, multi-channel ad banners, and retail showcase collateral designed to elevate brand authority in regional e-commerce and retail markets.',
      ar: 'حملة إعلانية تجارية متكاملة تم تطويرها لصالح علامة REBUNE لأجهزة التجميل والعناية. تضمنت الإخراج الفني لبصريات المنتجات، المحتوى الإعلاني للسوشيال ميديا، المطبوعات، والهويات البصرية الموجهة لتعزيز المبيعات.',
    },
    category: 'campaigns',
    categories: ['campaigns', 'social'],
    disciplines: {
      en: ['Art Direction', 'Product Visuals', 'Social Content'],
      ar: ['الإخراج الفني', 'بصريات المنتجات', 'محتوى رقمي'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    year: '2024',
    tags: ['Beauty Campaign', 'Art Direction', 'Product Visuals', 'Social Ads', 'REBUNE'],
    deliverables: {
      en: ['Social Campaign Suite', 'Product Photography Visuals', 'Digital Ad Collateral', 'Brand Guidelines'],
      ar: ['حزمة حملة السوشيال ميديا', 'بصريات تصوير المنتجات', 'بنرات إعلانات رقمية', 'إرشادات العرض المرئي'],
    },
    stats: {
      label: { en: 'Campaign Reach', ar: 'انتشار الحملة' },
      value: '3.8M+',
    },
    accentColor: '#f46c38',
  },
  {
    id: 'rebune-social-motion',
    client: 'REBUNE',
    title: {
      en: 'Social Content & Motion Graphics',
      ar: 'المحتوى الرقمي والموشن جرافيك',
    },
    desc: {
      en: 'High-conversion motion graphics, product feature animatics, and rhythmic video editing for active social media channels.',
      ar: 'إنتاج مقاطع موشن جرافيك عالية التفاعل وأنيميشن ميزات المنتجات لمنصات التواصل الاجتماعي.',
    },
    fullDesc: {
      en: 'Dynamic video content and animated motion graphics designed for REBUNE social channels. Focused on thumb-stopping motion, product highlight reels, sound-synced video editing, and campaign stories optimized for Instagram, TikTok, and YouTube Shorts.',
      ar: 'إنتاج فيديوهات ومقاطع موشن جرافيك حركية لوسائل التواصل الاجتماعي لعلامة REBUNE. التركيز على تحريك المنتجات بطريقة جاذبة، ميكساج للصوت، والتأثيرات البصرية المتناغمة.',
    },
    category: 'motion',
    categories: ['social', 'motion'],
    disciplines: {
      en: ['Social Content', 'Motion Graphics', 'Video Editing'],
      ar: ['المحتوى الرقمي', 'موشن جرافيك', 'مونتاج فيديو'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41561-large.mp4',
    featured: false,
    year: '2024',
    tags: ['Motion Design', 'Social Media', 'Video Editing', 'After Effects', 'REBUNE'],
    deliverables: {
      en: ['Motion Graphics Reels (9:16)', 'Animated Product Trailers', 'Sound FX & Color Grading'],
      ar: ['مقاطع موشن ريلز (9:16)', 'إعلانات منتجات متحركة', 'مؤثرات صوتية ومعالجة ألوان'],
    },
    stats: {
      label: { en: 'Video Impressions', ar: 'مشاهدات الفيديو' },
      value: '2.1M+',
    },
    accentColor: '#38bdf8',
  },
  {
    id: 'lumina-brand-system',
    client: 'Lumina Agency',
    title: {
      en: 'Brand Identity & Visual System',
      ar: 'الهوية البصرية والنظام المرئي',
    },
    desc: {
      en: 'Minimalist brand architecture, bespoke typography, luxury packaging, and comprehensive brand guidelines.',
      ar: 'تصميم هويات بصرية فاخرة، اختيار وتنسيق الخطوط، وتغليف المنتجات المميز.',
    },
    fullDesc: {
      en: 'Complete brand identity transformation including custom logo suite, brand strategy, color theory, typography system, premium print collateral, and digital asset templates created for upscale consumer luxury markets.',
      ar: 'بناء وتطوير هوية بصرية فاخرة متكاملة تشمل دراسة إستراتيجية العلامة التجارية، تصميم حزمة الشعارات، اختيار وتنسيق الخطوط الفاخرة، المطبوعات والتغليف، والتطبيقات الرقمية.',
    },
    category: 'branding',
    categories: ['branding'],
    disciplines: {
      en: ['Brand Identity', 'Visual Direction', 'Packaging'],
      ar: ['الهوية البصرية', 'التوجيه الفني', 'التغليف'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    year: '2023 – 2024',
    tags: ['Brand Identity', 'Visual Identity', 'Typography', 'Packaging', 'Guidelines'],
    deliverables: {
      en: ['Brand Book PDF', 'Logo Suite & Vector Assets', 'Packaging Stationery', 'Social Templates'],
      ar: ['دليل استخدام الهوية PDF', 'حزمة الشعارات المجهزة للطباعة والويب', 'تصاميم التغليف والقرطاسية', 'قوالب وسائل التواصل'],
    },
    stats: {
      label: { en: 'Brand Value Boost', ar: 'نمو القيمة البصرية' },
      value: '100%',
    },
    accentColor: '#a855f7',
  },
  {
    id: 'apex-motion-reel',
    client: 'Apex Media',
    title: {
      en: 'Commercial Motion & 3D Reel',
      ar: 'الإعلانات التجارية والموشن جرافيك',
    },
    desc: {
      en: 'High-energy 3D product animation, kinetic camera movements, broadcast visual FX, and audio sync.',
      ar: 'إنتاج وتحريك مشاهد 3D ومؤثرات بصرية سينمائية للإعلانات التجارية.'
    },
    fullDesc: {
      en: '3D product motion graphics reel engineered in Cinema 4D, Blender, and After Effects. Features fluid camera transitions, realistic product material lighting, kinetic typography, and impact sound design.',
      ar: 'مشروع موشن جرافيك وأنيميشن 3D للإعلانات التجارية تم تنفيذه باستخدام بلندر وأدوبي أفتر إفيكتس. يتميز بحركات كاميرا انسيابية، إضاءة خامات واقعية، وتحريك نصوص ديناميكي.',
    },
    category: 'motion',
    categories: ['motion'],
    disciplines: {
      en: ['Motion Design', '3D Animation', 'Sound FX'],
      ar: ['تصميم حركي', 'أنيميشن 3D', 'مؤثرات صوتية'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-lights-background-41560-large.mp4',
    featured: false,
    year: '2024',
    tags: ['3D Motion', 'Blender', 'Commercial Reel', 'After Effects', 'CGI'],
    deliverables: {
      en: ['4K Rendered Commercial Reel', 'Product Reveal Animations', 'Sound FX Mix Track'],
      ar: ['فيديو تجاري بجودة 4K', 'أنيميشن استعراض المنتجات', 'ميكساج صوتي احترافي'],
    },
    stats: {
      label: { en: 'Render Quality', ar: 'دقة الإنتاج' },
      value: '4K Ultra',
    },
    accentColor: '#c5ff41',
  },
  {
    id: 'nova-digital-campaign',
    client: 'Nova Commerce',
    title: {
      en: 'Digital Campaign & E-Commerce Visuals',
      ar: 'الحملات الرقمية وبصريات المتاجر',
    },
    desc: {
      en: 'Integrated digital campaign assets, responsive UI/UX banners, social ad sets, and interactive storyboards.',
      ar: 'تطوير وتصميم أصول الحملات الرقمية، البنرات التفاعلية، وتجربة الواجهات للمتاجر.',
    },
    fullDesc: {
      en: 'Omnichannel digital campaign designed for an e-commerce platform launch. Included interactive web banner systems, mobile-optimized UI visual design, promotional carousel sets, and conversion-focused social media assets.',
      ar: 'حملة رقمية متكاملة لإطلاق منصة تجارة إلكترونية. تضمنت تصميم واجهات المستخدم، بنرات المواقع التفاعلية، تصاميم الكاروسيل للسوشيال ميديا، والأصول البصرية الموجهة لزيادة المبيعات.',
    },
    category: 'digital',
    categories: ['digital', 'campaigns'],
    disciplines: {
      en: ['Digital Design', 'UI/UX', 'Campaign Assets'],
      ar: ['التصميم الرقمي', 'واجهات المستخدم', 'أصول الحملات'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    year: '2024',
    tags: ['Digital Campaign', 'UI/UX Design', 'E-Commerce', 'Figma', 'Web Assets'],
    deliverables: {
      en: ['Responsive UI Component Library', 'Social Ad Campaign Suite', 'Interactive Prototypes'],
      ar: ['مكتبة مكونات الواجهات', 'حزمة الإعلانات الرقمية', 'نماذج تفاعلية'],
    },
    stats: {
      label: { en: 'Conversion Rate', ar: 'معدل التحويل' },
      value: '+180%',
    },
    accentColor: '#f46c38',
  },
  {
    id: 'rebune-product-styling',
    client: 'REBUNE',
    title: {
      en: 'Appliance & Lifestyle Campaign',
      ar: 'حملة الأجهزة المنزلية والشخصية',
    },
    desc: {
      en: 'Commercial product visual styling, lifestyle environment photography direction, and social campaign collateral.',
      ar: 'إخراج بصري تجاري لمنتجات الأجهزة مع تصاميم ومحتوى التسويق الإعلاني.',
    },
    fullDesc: {
      en: 'Commercial art direction for REBUNE personal care and hair styling product lines. Engineered studio environment concepts, vibrant graphic overlays, retail window posters, and multi-format social graphics reflecting modern elegance and quality.',
      ar: 'توجيه فني تجاري لخظوط منتجات العناية بالجمال من REBUNE. بناء المفاهيم البصرية للاستوديو، دمج الطبقات الجرافيكية، تصاميم المعارض، ومحتوى التواصل الاجتماعي.',
    },
    category: 'campaigns',
    categories: ['campaigns', 'social', 'branding'],
    disciplines: {
      en: ['Product Visuals', 'Campaign Strategy', 'Art Direction'],
      ar: ['بصريات المنتجات', 'إستراتيجية الحملات', 'الإخراج الفني'],
    },
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    year: '2024',
    tags: ['Product Styling', 'Commercial Visuals', 'Art Direction', 'REBUNE', 'Campaign'],
    deliverables: {
      en: ['Studio Visual Suite', 'Retail Showcase Displays', 'Digital Marketing Ads'],
      ar: ['حزمة البصريات الاستوديو', 'تصاميم شاشات العرض بالمعارض', 'إعلانات التسويق الرقمي'],
    },
    stats: {
      label: { en: 'Retail Outlets', ar: 'منافذ البيع' },
      value: '500+',
    },
    accentColor: '#e05a26',
  },
];

export const experienceData: ExperienceItem[] = [
  {
    role: {
      en: 'Freelance Graphic Designer & Motion Graphics',
      ar: 'مصمم جرافيك وموشن مستقل',
    },
    company: {
      en: 'Self-Employed',
      ar: 'العمل الحر',
    },
    period: {
      en: 'Oct 2020 – Present · Riyadh, Saudi Arabia',
      ar: 'أكتوبر ٢٠٢٠ – حتى الآن · الرياض، المملكة العربية السعودية',
    },
    location: {
      en: 'Riyadh, Saudi Arabia',
      ar: 'الرياض، المملكة العربية السعودية',
    },
    desc: {
      en: 'Conceptualized and designed brand identities, logos, and marketing collaterals. Created social media graphics, animated content, and video edits for diverse clients worldwide.',
      ar: 'تصميم هويات بصرية وشعارات ومواد تسويقية لعملاء متنوعين. إنتاج محتوى حركي ومقاطع فيديو لوسائل التواصل الاجتماعي.',
    },
    achievements: {
      en: [
        'Delivered 120+ branding and motion graphics projects for clients in Saudi Arabia, UAE, and international markets.',
        'Engineered high-converting video edits and social media motion assets that boosted client conversion rates.',
        'Managed end-to-end multimedia production from creative direction to final delivery.',
      ],
      ar: [
        'تنفيذ أكثر من ١٢٠ مشروع هوية بصرية وموشن جرافيك لعملاء داخل المملكة والخليج وحول العالم.',
        'إنتاج فيديوهات ومحتوى حركي إعلاني حقق أعلى معدلات تفاعل للعلامات التجارية.',
        'إدارة جميع مراحل الإنتاج الفني والوسائط المتعددة من الرؤية الإبداعية وحتى التسليم النهائي.',
      ],
    },
  },
  {
    role: {
      en: 'Graphic Designer Intern',
      ar: 'مصمم جرافيك متدرب',
    },
    company: {
      en: 'Seeka Technology Malaysia',
      ar: 'شركة سيكا للتكنولوجيا - ماليزيا',
    },
    period: {
      en: 'Jul 2018 – Sep 2018 · Kuala Lumpur, Malaysia',
      ar: 'يوليو ٢٠١٨ – سبتمبر ٢٠١٨ · كوالالمبور، ماليزيا',
    },
    location: {
      en: 'Kuala Lumpur, Malaysia',
      ar: 'كوالالمبور، ماليزيا',
    },
    desc: {
      en: 'Developed creative designs for websites, mobile apps, and marketing materials. Assisted in video production and editing. Collaborated with senior designers.',
      ar: 'تطوير تصاميم إبداعية للمواقع والتطبيقات والمواد التسويقية. المساعدة في إنتاج وتحرير الفيديو والتعاون مع كبار المصممين.',
    },
    achievements: {
      en: [
        'Designed promotional graphics and landing page UI assets for tech products.',
        'Assisted in editing promotional product videos and 2D animated explainers.',
      ],
      ar: [
        'تصميم أصول بصرية وبنرات تسويقية للمواقع والمنتجات التقنية.',
        'المشاركة في مونتاج الفيديوهات الترويجية والرسوم المتحركة التوضيحية.',
      ],
    },
  },
];

export interface CapabilityItem {
  id: string;
  title: { en: string; ar: string };
  descriptor: { en: string; ar: string };
  iconName: string;
}

export const capabilitiesData: CapabilityItem[] = [
  {
    id: 'art-direction',
    title: { en: 'Art Direction', ar: 'الإخراج الفني' },
    descriptor: {
      en: 'Visual concepts & creative strategy',
      ar: 'المفاهيم البصرية والإستراتيجية الإبداعية',
    },
    iconName: 'Compass',
  },
  {
    id: 'graphic-design',
    title: { en: 'Graphic Design', ar: 'التصميم الجرافيكي' },
    descriptor: {
      en: 'Brand collateral & visual identity',
      ar: 'تصاميم الهوية والمواد البصرية',
    },
    iconName: 'Palette',
  },
  {
    id: 'social-content',
    title: { en: 'Social Content', ar: 'المحتوى الرقمي' },
    descriptor: {
      en: 'Campaigns & platform-first creative',
      ar: 'حملات ومحتوى مخصص للمنصات',
    },
    iconName: 'Share2',
  },
  {
    id: 'motion-graphics',
    title: { en: 'Motion Graphics', ar: 'موشن جرافيك' },
    descriptor: {
      en: 'Animation & visual storytelling',
      ar: 'الرسوم المتحركة والسرد البصري',
    },
    iconName: 'Film',
  },
  {
    id: 'video-editing',
    title: { en: 'Video Editing', ar: 'المونتاج والفيديو' },
    descriptor: {
      en: 'Short-form & promotional content',
      ar: 'المونتاج والإعلانات القصيرة',
    },
    iconName: 'Video',
  },
  {
    id: 'brand-identity',
    title: { en: 'Brand Identity', ar: 'الهوية البصرية' },
    descriptor: {
      en: 'Visual systems & brand guidelines',
      ar: 'أنظمة الهويات وأدلة الاستخدام',
    },
    iconName: 'Sparkles',
  },
  {
    id: 'ai-visual-dev',
    title: { en: 'AI Visual Development', ar: 'التطوير البصري بالذكاء الاصطناعي' },
    descriptor: {
      en: 'Concept development & generative workflows',
      ar: 'تطوير المفاهيم وسير العمل الذكي',
    },
    iconName: 'Wand2',
  },
  {
    id: '3d-digital',
    title: { en: '3D & Digital', ar: '3D والتجارب الرقمية' },
    descriptor: {
      en: '3D visual elements & digital experiences',
      ar: 'العناصر ثلاثية الأبعاد والتجارب الرقمية',
    },
    iconName: 'Box',
  },
];

export const toolkitData = [
  { en: 'Adobe Photoshop', ar: 'أدوبي فوتوشوب', isAi: false },
  { en: 'Adobe Illustrator', ar: 'أدوبي إليستريتور', isAi: false },
  { en: 'Adobe After Effects', ar: 'أدوبي أفتر إفيكتس', isAi: false },
  { en: 'Adobe Premiere Pro', ar: 'أدوبي بريمير برو', isAi: false },
  { en: 'Figma', ar: 'فيجما', isAi: false },
  { en: 'Blender', ar: 'بلندر', isAi: false },
  { en: 'AI Creative Tools', ar: 'أدوات الذكاء الاصطناعي الإبداعية', isAi: true },
];

export const socialsData: SocialItem[] = [
  {
    label: { en: 'Behance', ar: 'بيهانس' },
    href: 'https://behance.net/mugahedalmaari',
    iconName: 'behance',
  },
  {
    label: { en: 'LinkedIn', ar: 'لينكد إن' },
    href: 'https://linkedin.com/in/mugahedalmaari',
    iconName: 'linkedin',
  },
  {
    label: { en: 'Instagram', ar: 'إنستغرام' },
    href: 'https://instagram.com/mugahedalmaari',
    iconName: 'instagram',
  },
];
