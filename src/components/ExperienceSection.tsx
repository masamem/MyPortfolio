import React from 'react';
import {ArrowUpRight} from '@phosphor-icons/react';
import {Language} from '../types';
import {LINKEDIN, RESUME, t} from '../lib/copy';

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
    when: {en: 'Since Feb 2024', ar: 'منذ فبراير ٢٠٢٤'},
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
    org: {en: 'Independent designer and creative consultant', ar: 'مصمم مستقل ومستشار إبداعي'},
    when: {en: 'Since Oct 2020', ar: 'منذ أكتوبر ٢٠٢٠'},
    where: {en: 'Remote and Riyadh', ar: 'عن بُعد والرياض'},
    text: {
      en: 'Logos and brand systems for startups and SMEs. Social campaigns, short videos, marketing collateral and presentation decks, from the first brief to final delivery.',
      ar: 'شعارات وأنظمة هوية للشركات الناشئة والصغيرة والمتوسطة. حملات اجتماعية وفيديوهات قصيرة ومواد تسويقية وعروض تقديمية، من الفكرة الأولى حتى التسليم.',
    },
  },
  {
    mark: 'SK',
    role: {en: 'Graphic Designer Intern', ar: 'متدرب تصميم جرافيك'},
    org: {en: 'Seeka Technology', ar: 'سيكا تكنولوجي'},
    when: {en: 'Jun to Sep 2018', ar: 'يونيو إلى سبتمبر ٢٠١٨'},
    where: {en: 'Kuala Lumpur', ar: 'كوالالمبور'},
    text: {
      en: 'Branding and campaign design, promotional video edits, and wireframes, mockups and assets for web and mobile products.',
      ar: 'تصميم هوية وحملات، ومونتاج فيديوهات ترويجية، وإعداد نماذج وواجهات وأصول لمنتجات الويب والجوال.',
    },
  },
  {
    mark: 'APU',
    role: {en: 'BSc (Hons) Multimedia Technology', ar: 'بكالوريوس (مرتبة الشرف) في تقنية الوسائط المتعددة'},
    org: {en: 'Asia Pacific University of Technology and Innovation', ar: 'جامعة آسيا والمحيط الهادئ للتكنولوجيا والابتكار'},
    when: {en: '2016 to 2020', ar: '٢٠١٦ إلى ٢٠٢٠'},
    where: {en: 'Kuala Lumpur', ar: 'كوالالمبور'},
    text: {en: '', ar: ''},
  },
];

export function ExperienceSection({lang}: {lang: Language}) {
  const ar = lang === 'ar';
  const l = ar ? 'ar' : 'en';
  const c = t(lang).about;
  return (
    <section id="about" className="mx-section" aria-labelledby="about-title">
      <div className="mx-wrap mx-about">
        <div className="mx-about-copy" data-reveal>
          <p className="mx-eyebrow caption-1">{c.eyebrow}</p>
          <h2 id="about-title" className="heading-2">{c.title}</h2>
          <p className="title-2">{c.p1}</p>
          <p className="body-3">{c.p2}</p>
          <div className="mx-about-links">
            <a className="mx-btn mx-btn-quiet button-md" href={RESUME} target="_blank" rel="noopener noreferrer">{c.resume} <ArrowUpRight aria-hidden /></a>
            <a className="mx-link body-2" href={LINKEDIN} target="_blank" rel="noopener noreferrer">{c.linkedin} <ArrowUpRight aria-hidden /></a>
          </div>
        </div>
        <ol className="mx-exp" data-reveal>
          {experience.map((e) => (
            <li key={e.mark} data-now={e.now ? 'true' : undefined}>
              <span className="mx-exp-mark caption-3" aria-hidden>{e.mark}</span>
              <div className="mx-exp-main">
                <div className="mx-exp-top">
                  <h3 className="title-1">{e.role[l]}</h3>
                  <span className="mx-exp-when caption-1">{e.when[l]}</span>
                </div>
                <p className="mx-exp-org body-6">{e.org[l]} · {e.where[l]}</p>
                {e.text[l] && <p className="mx-exp-text body-6">{e.text[l]}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
