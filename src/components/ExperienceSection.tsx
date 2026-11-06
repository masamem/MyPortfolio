import React from 'react';
import {Language} from '../types';

type Entry = {
  mark: string;
  now?: boolean;
  role: {en: string; ar: string};
  org: {en: string; ar: string};
  when: {en: string; ar: string};
  where: {en: string; ar: string};
  text: {en: string; ar: string};
};

// Taken from the résumé in /public/downloads. Keep both in sync when roles change.
const experience: Entry[] = [
  {
    mark: 'RE',
    now: true,
    role: {en: 'Graphic Designer', ar: 'مصمم جرافيك'},
    org: {en: 'Rebune International Trading Co.', ar: 'شركة ريبون العالمية للتجارة'},
    when: {en: 'Feb 2024 — Now', ar: 'فبراير ٢٠٢٤ — الآن'},
    where: {en: 'Riyadh', ar: 'الرياض'},
    text: {
      en: 'Marketing campaigns, packaging concepts and digital assets. Product visuals, social creatives, motion graphics and promotional videos, with the marketing and product teams.',
      ar: 'حملات تسويقية ومفاهيم تغليف وأصول رقمية. مرئيات منتجات وتصاميم اجتماعية وموشن جرافيك وفيديوهات ترويجية، بالتعاون مع فرق التسويق والمنتجات.',
    },
  },
  {
    mark: 'FR',
    now: true,
    role: {en: 'Freelance Multimedia Designer', ar: 'مصمم وسائط متعددة مستقل'},
    org: {en: 'Independent designer & creative consultant', ar: 'مصمم مستقل ومستشار إبداعي'},
    when: {en: 'Oct 2020 — Now', ar: 'أكتوبر ٢٠٢٠ — الآن'},
    where: {en: 'Remote & Riyadh', ar: 'عن بُعد والرياض'},
    text: {
      en: 'Logos and brand systems for startups and SMEs. Social campaigns, short-form videos, marketing collateral and presentation decks, from the first brief to final delivery.',
      ar: 'شعارات وأنظمة هوية للشركات الناشئة والصغيرة والمتوسطة. حملات اجتماعية وفيديوهات قصيرة ومواد تسويقية وعروض تقديمية، من الفكرة الأولى حتى التسليم.',
    },
  },
  {
    mark: 'SK',
    role: {en: 'Graphic Designer Intern', ar: 'متدرب تصميم جرافيك'},
    org: {en: 'Seeka Technology', ar: 'سيكا تكنولوجي'},
    when: {en: 'Jun — Sep 2018', ar: 'يونيو — سبتمبر ٢٠١٨'},
    where: {en: 'Kuala Lumpur', ar: 'كوالالمبور'},
    text: {
      en: 'Branding and campaign design, promotional video edits, and wireframes, mockups and assets for web and mobile products.',
      ar: 'تصميم هوية وحملات، ومونتاج فيديوهات ترويجية، وإعداد نماذج وواجهات وأصول لمنتجات الويب والجوال.',
    },
  },
  {
    mark: 'APU',
    role: {en: 'BSc (Hons) Multimedia Technology', ar: 'بكالوريوس (مرتبة الشرف) في تقنية الوسائط المتعددة'},
    org: {en: 'Asia Pacific University of Technology & Innovation', ar: 'جامعة آسيا والمحيط الهادئ للتكنولوجيا والابتكار'},
    when: {en: '2016 — 2020', ar: '٢٠١٦ — ٢٠٢٠'},
    where: {en: 'Kuala Lumpur', ar: 'كوالالمبور'},
    text: {en: '', ar: ''},
  },
];

export function ExperienceSection({lang}: {lang: Language}) {
  const ar = lang === 'ar';
  const l = ar ? 'ar' : 'en';
  return (
    <section id="experience" className="sp-section sp-experience">
      <p className="sp-kicker">03 · {ar ? 'الخبرة' : 'Experience'}</p>
      <h2>
        {ar ? <>أكثر من ٦ سنوات من <em>تحريك الأفكار.</em></> : <>6+ years of <em>making ideas move.</em></>}
      </h2>
      <ol className="sp-exp-list">
        {experience.map((e) => (
          <li key={e.mark}>
            <span className="sp-exp-mark" aria-hidden>{e.mark}</span>
            <div className="sp-exp-main">
              <h3>
                {e.role[l]}
                {e.now && <span className="sp-exp-now">{ar ? 'حالياً' : 'Now'}</span>}
              </h3>
              <p className="sp-exp-org">{e.org[l]} · {e.where[l]}</p>
              {e.text[l] && <p className="sp-exp-text">{e.text[l]}</p>}
            </div>
            <span className="sp-exp-when">{e.when[l]}</span>
          </li>
        ))}
      </ol>
      <a className="sp-exp-cv" href="/downloads/Mugahed_AlMaari_Resume.pdf" target="_blank" rel="noreferrer">
        {ar ? 'السيرة الذاتية كاملة' : 'Full résumé'} ↗
      </a>
    </section>
  );
}
