import React, {useEffect} from 'react';
import {ArrowLeft, ArrowRight} from '@phosphor-icons/react';
import type {Language} from '../types';
import {EMAIL, t} from '../lib/copy';
import {SiteFooter, SiteNav} from './SiteChrome';
import './stretch-portfolio.css';

function Shell({lang, onToggleLang, children}: {lang: Language; onToggleLang: () => void; children: React.ReactNode}) {
  useEffect(() => {
    document.documentElement.dataset.theme = 'dark';
  }, []);
  return (
    <div className="mx" dir={lang === 'ar' ? 'rtl' : 'ltr'} id="top">
      <a className="mx-skip button-sm" href="#main">{t(lang).skip}</a>
      <SiteNav lang={lang} onToggleLang={onToggleLang} active={null} onHome={false} />
      <main id="main" className="mx-page">
        <div className="mx-wrap">{children}</div>
      </main>
      <SiteFooter lang={lang} onHome={false} />
    </div>
  );
}

function BackHome({lang}: {lang: Language}) {
  const Arrow = lang === 'ar' ? ArrowRight : ArrowLeft;
  return (
    <a className="mx-link body-2" href="/">
      <Arrow aria-hidden /> {lang === 'ar' ? 'العودة إلى الرئيسية' : 'Back to the portfolio'}
    </a>
  );
}

/** Privacy and terms. Written to match what the site actually does today; update if analytics or a form backend are added. */
export function LegalPage({lang, onToggleLang}: {lang: Language; onToggleLang: () => void}) {
  const ar = lang === 'ar';
  return (
    <Shell lang={lang} onToggleLang={onToggleLang}>
      <article>
        <BackHome lang={lang} />
        <h1 className="heading-2">{ar ? 'الخصوصية والشروط' : 'Privacy and terms'}</h1>
        <p className="caption-1">{ar ? 'آخر تحديث: نوفمبر 2026' : 'Last updated: November 2026'}</p>

        <h2 id="privacy" className="heading-5">{ar ? 'الخصوصية' : 'Privacy'}</h2>
        <ul className="body-3">
          {ar ? (
            <>
              <li>لا يستخدم هذا الموقع ملفات تعريف الارتباط ولا أدوات تتبع أو تحليلات.</li>
              <li>يحفظ متصفحك اللغة التي اخترتها فقط، ولا تُرسل إلى أي خادم.</li>
              <li>نموذج التواصل لا يرسل بياناتك إلى أي خادم. يفتح تطبيق البريد لديك لترسل الرسالة بنفسك.</li>
              <li>تُحمَّل الخطوط من Google Fonts، وتُعرض ملفات المشاريع من Google Drive.</li>
              <li>لأي سؤال عن بياناتك راسلني على {EMAIL}.</li>
            </>
          ) : (
            <>
              <li>This site sets no cookies and runs no tracking or analytics.</li>
              <li>Your browser remembers the language you picked. It is never sent to a server.</li>
              <li>The contact form doesn’t send your details anywhere. It opens your own email app so you send the message yourself.</li>
              <li>Fonts load from Google Fonts, and project files are served from Google Drive.</li>
              <li>Questions about your data: email {EMAIL}.</li>
            </>
          )}
        </ul>

        <h2 id="terms" className="heading-5">{ar ? 'الشروط' : 'Terms'}</h2>
        <ul className="body-3">
          {ar ? (
            <>
              <li>جميع الأعمال المعروضة مملوكة لمجاهد المعاري أو لعملائه، وتُعرض هنا كنماذج أعمال فقط.</li>
              <li>لا يجوز نسخ أو إعادة استخدام أي عمل دون إذن كتابي.</li>
              <li>الأسماء والعلامات التجارية تعود لأصحابها.</li>
            </>
          ) : (
            <>
              <li>All work shown belongs to Mugahed Al‑Maari or to the clients it was made for, and is shown here as portfolio samples.</li>
              <li>Please don’t copy or reuse any work without written permission.</li>
              <li>Brand names and logos belong to their owners.</li>
            </>
          )}
        </ul>
      </article>
    </Shell>
  );
}

export function NotFoundPage({lang, onToggleLang}: {lang: Language; onToggleLang: () => void}) {
  const ar = lang === 'ar';
  useEffect(() => {
    document.title = ar ? 'الصفحة غير موجودة · MUVFX' : 'Page not found · MUVFX';
  }, [ar]);
  return (
    <Shell lang={lang} onToggleLang={onToggleLang}>
      <article>
        <p className="mx-eyebrow caption-1">404</p>
        <h1 className="heading-2">{ar ? 'هذه الصفحة لم تعد هنا.' : 'This page didn’t make the final cut.'}</h1>
        <p className="body-3">
          {ar ? 'ربما تغيّر الرابط أو حُذفت الصفحة. الأعمال كلها في الصفحة الرئيسية.' : 'The link may be old or mistyped. All the work lives on the home page.'}
        </p>
        <div className="mx-hero-actions">
          <a className="mx-btn mx-btn-primary button-md" href="/#work">{ar ? 'شاهد الأعمال' : 'See the work'}</a>
          <BackHome lang={lang} />
        </div>
      </article>
    </Shell>
  );
}
