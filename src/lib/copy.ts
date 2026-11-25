import type {Language} from '../types';

/**
 * Every visible string on the home page, in both languages.
 * Copy rules from the redesign skill: sentence case, no hyphens inside copy,
 * no filler words, a verb plus an outcome on every call to action.
 */

export const EMAIL = 'mugahedalmaari@gmail.com';
export const BEHANCE = 'https://www.behance.net/mugahedalmaari';
export const LINKEDIN = 'https://www.linkedin.com/in/mugahedalmaari';
export const RESUME = '/downloads/Mugahed_AlMaari_Resume.pdf';

/**
 * PLACEHOLDER: the skill asks for one risk reversal next to the final call to action.
 * Replace with an offer you actually make (for example a free intro call), or set to ''.
 */
export const RISK_REVERSAL: Record<Language, string> = {
  en: '',
  ar: '',
};

export const copy = {
  en: {
    skip: 'Skip to content',
    nav: {work: 'Work', services: 'Services', about: 'About', faq: 'FAQ', contact: 'Contact', lang: 'العربية', langLabel: 'Switch to Arabic', cta: 'Start a project', menu: 'Menu', home: 'MUVFX home'},
    hero: {
      status: 'Available for freelance · Riyadh',
      title: ['I design brands', 'and make them move.'],
      sub: ['I’m ', 'Mugahed Al‑Maari', ', a multimedia designer in Riyadh. For over six years I’ve built brand identities, motion graphics, product videos and social campaigns, from the first brief to the final export.'],
      cta: 'Start a project',
      secondary: 'See selected work',
      proofLabel: 'Recent work for',
      proof: ['Rebune', 'Riyadh Bus', 'Hamdan University', 'Coponya'],
      hint: 'Drag my face',
      mood: 'Mood',
      patience: 'Patience',
    },
    brands: {label: 'Brands and products I’ve helped shape'},
    work: {
      eyebrow: 'Selected work',
      title: 'Projects, straight from my Drive.',
      intro: 'Each project opens with the full set of files: stills, videos and interactive 3D models.',
      view: 'View project',
      files: (n: number) => `${n} ${n === 1 ? 'file' : 'files'}`,
      errorTitle: 'Projects didn’t load.',
      errorText: 'Google Drive didn’t respond. Try again, or see the full portfolio on Behance.',
      retry: 'Try again',
      behance: 'Open Behance',
      emptyTitle: 'New projects are on the way.',
      emptyText: 'Nothing is published here right now. The full archive is on Behance.',
    },
    tagline: {before: 'Good design gets noticed.', after: 'Design that moves gets remembered.'},
    services: {
      eyebrow: 'Services',
      title: 'What I can make for you',
      items: [
        {name: 'Brand identity', text: 'A logo and visual system your team can apply to packaging, social posts and print without guessing.', proof: 'See', proofName: 'Brand identity'},
        {name: 'Motion graphics', text: 'Explainers and promos that land the message before people scroll past.', proof: 'For', proofName: 'Riyadh Bus, Hamdan University, Tawaqud'},
        {name: 'Product video, 3D and AI', text: 'Product films and 3D models that show how a product looks and works before anyone holds it.', proof: 'For', proofName: 'Rebune'},
        {name: 'Social campaigns', text: 'Offer and launch posts in Arabic and English, designed as a set so the feed stays consistent.', proof: 'Archive of', proofName: '294 social designs'},
        {name: 'Web and UI', text: 'Interfaces designed for desktop and phone, with search, filters and media previews that stay fast.', proof: 'Live at', proofName: 'library.rebune.com'},
      ],
    },
    process: {
      eyebrow: 'How it works',
      title: 'From brief to final files in three steps',
      steps: [
        {name: 'Send the brief', text: 'Tell me what you need, who it’s for and when it’s due. A few lines is enough to start.'},
        {name: 'Agree the concept', text: 'I come back with a direction and the list of deliverables, so we both know what’s being made.'},
        {name: 'Design and deliver', text: 'I design, animate and edit, then hand over the final files in every size you need.'},
      ],
    },
    about: {
      eyebrow: 'About',
      title: 'Six years of design and motion',
      p1: 'I’m Mugahed Al‑Maari, a multimedia designer based in Riyadh. I combine visual identity, motion graphics, video editing, 3D and AI tools to turn ideas into clear visual stories.',
      p2: 'My work spans freelance projects, in house brand and product work, campaign content and media production. I hold a BSc (Hons) in Multimedia Technology.',
      resume: 'Read my résumé',
      linkedin: 'LinkedIn',
      now: 'Now',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions clients ask first',
      items: [
        {q: 'What kind of projects do you take on?', a: 'Brand identities, motion graphics, product and promo videos, social campaigns, 3D product models and web interfaces. Many projects combine several of these.'},
        {q: 'Do you work with clients outside Riyadh?', a: 'Yes. I work remotely as well as in Riyadh, and I’ve worked with teams in Saudi Arabia and Malaysia.'},
        {q: 'Can you design in Arabic and English?', a: 'Yes. Most of my campaigns and videos ship in Arabic, English or both, and this site works in both languages.'},
        {q: 'Can you handle a whole campaign?', a: 'Yes. I can take a campaign from the first brief to final delivery: key visuals, social posts, short videos and presentation decks.'},
        {q: 'Do you use AI in your work?', a: 'Where it helps. Some Rebune product videos were made with AI tools, then edited and finished by hand.'},
        {q: 'How do I start a project?', a: 'Use the form below or email me with a short brief, the deadline and any references.'},
        {q: 'Where can I see more work?', a: 'The full archive is on Behance, and my résumé lists every role.'},
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Start a project',
      text: 'Send a short brief and I’ll reply from my own inbox. No agency, no account manager.',
      copy: 'Copy email',
      copied: 'Email copied',
      copyFail: 'Copy failed. Select the address instead.',
      name: 'Your name',
      email: 'Your email',
      type: 'What do you need?',
      types: ['Brand identity', 'Motion graphics', 'Product video', 'Social campaign', 'Web or UI', 'Something else'],
      message: 'Project details',
      messageHint: 'Goal, deadline and any links',
      submit: 'Send project brief',
      note: 'Opens your email app with the brief filled in.',
      errName: 'Add your name so I know who to reply to.',
      errEmail: 'Enter an email like name@company.com.',
      errMessage: 'Add a sentence or two about the project.',
      done: (name: string) => `Your email app opened with the brief, ${name}. If it didn’t, copy the address and send it from your inbox.`,
      based: 'Riyadh, Saudi Arabia',
    },
    footer: {
      line: 'Multimedia design, motion and digital work from Riyadh.',
      privacy: 'Privacy',
      terms: 'Terms',
      top: 'Back to top',
      rights: '© 2026 Mugahed Al‑Maari',
    },
  },
  ar: {
    skip: 'انتقل إلى المحتوى',
    nav: {work: 'الأعمال', services: 'الخدمات', about: 'عني', faq: 'الأسئلة', contact: 'تواصل', lang: 'English', langLabel: 'التبديل إلى الإنجليزية', cta: 'ابدأ مشروعاً', menu: 'القائمة', home: 'الرئيسية'},
    hero: {
      status: 'متاح للعمل الحر · الرياض',
      title: ['أصمم العلامات التجارية', 'وأجعلها تتحرك.'],
      sub: ['أنا ', 'مجاهد المعاري', '، مصمم وسائط متعددة في الرياض. منذ أكثر من ست سنوات أصمم الهويات البصرية والموشن جرافيك وفيديوهات المنتجات والحملات الاجتماعية، من الفكرة الأولى حتى التسليم النهائي.'],
      cta: 'ابدأ مشروعاً',
      secondary: 'شاهد الأعمال المختارة',
      proofLabel: 'أعمال حديثة لـ',
      proof: ['ريبون', 'حافلات الرياض', 'جامعة حمدان', 'كوبونيا'],
      hint: 'اسحب وجهي',
      mood: 'المزاج',
      patience: 'الصبر',
    },
    brands: {label: 'علامات ومنتجات ساهمت في تشكيلها'},
    work: {
      eyebrow: 'أعمال مختارة',
      title: 'مشاريع مباشرة من ملفاتي.',
      intro: 'كل مشروع يفتح بكامل ملفاته: صور وفيديوهات ومجسمات ثلاثية الأبعاد تفاعلية.',
      view: 'عرض المشروع',
      files: (n: number) => `${n} ملف`,
      errorTitle: 'لم يتم تحميل المشاريع.',
      errorText: 'لم يستجب Google Drive. حاول مرة أخرى، أو شاهد الأعمال كاملة على Behance.',
      retry: 'حاول مرة أخرى',
      behance: 'افتح Behance',
      emptyTitle: 'مشاريع جديدة في الطريق.',
      emptyText: 'لا توجد مشاريع منشورة هنا حالياً. الأرشيف الكامل على Behance.',
    },
    tagline: {before: 'التصميم الجيد يُلاحَظ.', after: 'والتصميم المتحرك يبقى في الذاكرة.'},
    services: {
      eyebrow: 'الخدمات',
      title: 'ما الذي يمكنني صنعه لك',
      items: [
        {name: 'الهوية البصرية', text: 'شعار ونظام بصري يستطيع فريقك تطبيقه على التغليف والمنشورات والمطبوعات بلا تخمين.', proof: 'شاهد', proofName: 'الهوية البصرية'},
        {name: 'الموشن جرافيك', text: 'فيديوهات شرح وترويج توصل الرسالة قبل أن يمرّر المشاهد.', proof: 'لـ', proofName: 'حافلات الرياض، جامعة حمدان، توقد'},
        {name: 'فيديو المنتجات وثلاثي الأبعاد والذكاء الاصطناعي', text: 'أفلام منتجات ومجسمات ثلاثية الأبعاد تُظهر شكل المنتج وطريقة عمله قبل أن يلمسه أحد.', proof: 'لـ', proofName: 'ريبون'},
        {name: 'الحملات الاجتماعية', text: 'منشورات عروض وإطلاق بالعربية والإنجليزية، مصممة كمجموعة واحدة ليبقى الحساب متناسقاً.', proof: 'أرشيف من', proofName: '٢٩٤ تصميماً'},
        {name: 'الويب وواجهات الاستخدام', text: 'واجهات مصممة للكمبيوتر والجوال، مع بحث وفلاتر ومعاينة وسائط سريعة.', proof: 'مباشر على', proofName: 'library.rebune.com'},
      ],
    },
    process: {
      eyebrow: 'طريقة العمل',
      title: 'من الفكرة إلى الملفات النهائية في ثلاث خطوات',
      steps: [
        {name: 'أرسل الفكرة', text: 'أخبرني بما تحتاجه ولمن وموعد التسليم. بضعة أسطر تكفي للبدء.'},
        {name: 'نتفق على المفهوم', text: 'أعود إليك باتجاه بصري وقائمة بالمخرجات، لنعرف معاً ما الذي سيُصنع.'},
        {name: 'التصميم والتسليم', text: 'أصمم وأحرّك وأُمنتج، ثم أسلّم الملفات النهائية بكل المقاسات التي تحتاجها.'},
      ],
    },
    about: {
      eyebrow: 'عني',
      title: 'ست سنوات من التصميم والحركة',
      p1: 'أنا مجاهد المعاري، مصمم وسائط متعددة مقيم في الرياض. أجمع بين الهوية البصرية والموشن جرافيك والمونتاج وثلاثي الأبعاد وأدوات الذكاء الاصطناعي لصناعة قصص بصرية واضحة.',
      p2: 'تشمل خبرتي العمل الحر والعمل الداخلي على العلامات والمنتجات ومحتوى الحملات والإنتاج الإعلامي. حاصل على بكالوريوس بمرتبة الشرف في تقنية الوسائط المتعددة.',
      resume: 'اقرأ سيرتي الذاتية',
      linkedin: 'LinkedIn',
      now: 'حالياً',
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      title: 'أول ما يسأل عنه العملاء',
      items: [
        {q: 'ما نوع المشاريع التي تعمل عليها؟', a: 'الهويات البصرية والموشن جرافيك وفيديوهات المنتجات والترويج والحملات الاجتماعية والمجسمات ثلاثية الأبعاد وواجهات الويب. كثير من المشاريع تجمع أكثر من نوع.'},
        {q: 'هل تعمل مع عملاء خارج الرياض؟', a: 'نعم. أعمل عن بُعد وفي الرياض، وعملت مع فرق في السعودية وماليزيا.'},
        {q: 'هل تصمم بالعربية والإنجليزية؟', a: 'نعم. معظم حملاتي وفيديوهاتي تصدر بالعربية أو الإنجليزية أو كليهما، وهذا الموقع يعمل باللغتين.'},
        {q: 'هل يمكنك تنفيذ حملة كاملة؟', a: 'نعم. أستطيع أخذ الحملة من الفكرة الأولى حتى التسليم: التصاميم الرئيسية والمنشورات والفيديوهات القصيرة والعروض التقديمية.'},
        {q: 'هل تستخدم الذكاء الاصطناعي؟', a: 'حين يفيد. بعض فيديوهات منتجات ريبون صُنعت بأدوات الذكاء الاصطناعي ثم حُررت وأُنهيت يدوياً.'},
        {q: 'كيف أبدأ مشروعاً؟', a: 'استخدم النموذج أدناه أو راسلني بفكرة مختصرة وموعد التسليم وأي مراجع.'},
        {q: 'أين أجد المزيد من الأعمال؟', a: 'الأرشيف الكامل على Behance، وسيرتي الذاتية تذكر كل الأدوار.'},
      ],
    },
    contact: {
      eyebrow: 'تواصل',
      title: 'ابدأ مشروعاً',
      text: 'أرسل فكرة مختصرة وسأرد عليك من بريدي مباشرة. بلا وكالة ولا وسطاء.',
      copy: 'انسخ البريد',
      copied: 'تم نسخ البريد',
      copyFail: 'تعذر النسخ. حدد العنوان يدوياً.',
      name: 'اسمك',
      email: 'بريدك الإلكتروني',
      type: 'ما الذي تحتاجه؟',
      types: ['هوية بصرية', 'موشن جرافيك', 'فيديو منتج', 'حملة اجتماعية', 'ويب أو واجهة', 'شيء آخر'],
      message: 'تفاصيل المشروع',
      messageHint: 'الهدف وموعد التسليم وأي روابط',
      submit: 'أرسل تفاصيل المشروع',
      note: 'يفتح تطبيق البريد لديك مع تعبئة التفاصيل.',
      errName: 'أضف اسمك لأعرف لمن أرد.',
      errEmail: 'أدخل بريداً مثل name@company.com.',
      errMessage: 'أضف جملة أو جملتين عن المشروع.',
      done: (name: string) => `فُتح تطبيق البريد مع التفاصيل يا ${name}. إن لم يُفتح، انسخ العنوان وأرسل من بريدك.`,
      based: 'الرياض، المملكة العربية السعودية',
    },
    footer: {
      line: 'تصميم وسائط متعددة وموشن وأعمال رقمية من الرياض.',
      privacy: 'الخصوصية',
      terms: 'الشروط',
      top: 'العودة للأعلى',
      rights: '© 2026 مجاهد المعاري',
    },
  },
} as const;

export type Copy = (typeof copy)['en'];
export const t = (lang: Language) => copy[lang] as unknown as Copy;

export const arCategories: Record<string, string> = {
  Branding: 'الهوية البصرية',
  Videos: 'الفيديو',
  'Social Media': 'التواصل الاجتماعي',
  '3D': 'ثلاثي الأبعاد',
  'Other Work': 'أعمال أخرى',
  'UI UX · Web Development': 'واجهات وتطوير ويب',
};
