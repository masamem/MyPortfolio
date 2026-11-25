import React, {useEffect, useState} from 'react';
import {ArrowUpRight} from '@phosphor-icons/react';
import type {Language} from '../types';
import {BEHANCE, EMAIL, LINKEDIN, t} from '../lib/copy';

type NavProps = {lang: Language; onToggleLang: () => void; active: string | null; onHome?: boolean};

const SECTIONS = ['work', 'services', 'about', 'faq', 'contact'] as const;
export const SECTION_IDS: string[] = [...SECTIONS];

/** Floating, content sized nav. On small screens a full height sheet with staggered links. */
export function SiteNav({lang, onToggleLang, active, onHome = true}: NavProps) {
  const c = t(lang).nav;
  const [open, setOpen] = useState(false);
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="mx-nav">
        <a className="mx-brand button-sm" href={onHome ? '#top' : '/'} aria-label={c.home}>
          <img src="/brand/muvfx-mark.svg" alt="" width={32} height={32} />
          <span>MUVFX</span>
        </a>
        <nav className="mx-nav-links body-5" aria-label="Primary">
          {SECTIONS.map((id) => (
            <a key={id} href={href(id)} aria-current={active === id ? 'true' : undefined}>
              {c[id]}
            </a>
          ))}
        </nav>
        <button type="button" className="mx-lang body-5" onClick={onToggleLang} aria-label={c.langLabel} lang={lang === 'en' ? 'ar' : 'en'}>
          {c.lang}
        </button>
        <a className="mx-btn mx-btn-primary button-sm" href={href('contact')}>
          {c.cta}
        </a>
        <button type="button" className="mx-menu" aria-expanded={open} aria-controls="mx-sheet" aria-label={c.menu} onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
        </button>
      </header>

      <div id="mx-sheet" className="mx-sheet" data-open={open} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {SECTIONS.map((id, i) => (
            <a
              key={id}
              className="heading-3"
              href={href(id)}
              tabIndex={open ? 0 : -1}
              aria-current={active === id ? 'true' : undefined}
              style={{'--i': i} as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              {c[id]}
            </a>
          ))}
        </nav>
        <div className="mx-sheet-foot" style={{'--i': SECTIONS.length} as React.CSSProperties}>
          <a className="mx-btn mx-btn-primary button-md" href={href('contact')} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            {c.cta}
          </a>
          <button type="button" className="mx-btn mx-btn-quiet button-md" tabIndex={open ? 0 : -1} onClick={onToggleLang}>
            {c.lang}
          </button>
        </div>
      </div>
    </>
  );
}

// Proof row. When real logo files exist, add `logo: '/brand/<file>.svg'` and render an <img> instead.
const brands: {name: {en: string; ar: string}; href?: string}[] = [
  {name: {en: 'Rebune', ar: 'ريبون'}, href: 'https://library.rebune.com/'},
  {name: {en: 'Coponya', ar: 'كوبونيا'}, href: 'https://coponya.com'},
  {name: {en: 'Stuffydneed', ar: 'Stuffydneed'}},
  {name: {en: 'Faro Home', ar: 'Faro Home'}},
  {name: {en: 'Tila', ar: 'Tila'}},
  {name: {en: 'Sahm', ar: 'سهم'}},
];

export function BrandsRow({lang}: {lang: Language}) {
  return (
    <section className="mx-brands" aria-label={t(lang).brands.label} data-reveal>
      <div className="mx-wrap">
        <p className="caption-1">{t(lang).brands.label}</p>
        <ul className="mx-brand-list title-3">
          {brands.map(({name, href}) => (
            <li key={name.en}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {name[lang]} <ArrowUpRight aria-hidden />
                </a>
              ) : (
                <span>{name[lang]}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SiteFooter({lang, onHome = true}: {lang: Language; onHome?: boolean}) {
  const c = t(lang);
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  return (
    <footer className="mx-footer">
      <div className="mx-wrap">
        <div className="mx-footer-top">
          <div className="mx-footer-intro">
            <a className="mx-brand button-sm" href={onHome ? '#top' : '/'}>
              <img src="/brand/muvfx-mark.svg" alt="" width={32} height={32} />
              <span>MUVFX</span>
            </a>
            <p className="body-6">{c.footer.line}</p>
          </div>
          <nav className="body-5" aria-label="Footer">
            {SECTIONS.map((id) => (
              <a key={id} href={href(id)}>{c.nav[id]}</a>
            ))}
            <a href={BEHANCE} target="_blank" rel="noopener noreferrer">Behance</a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${EMAIL}`}>Email</a>
          </nav>
        </div>
        <div className="mx-footer-bottom caption-4">
          <span>{c.footer.rights}</span>
          <nav aria-label="Legal">
            <a href="/legal#privacy">{c.footer.privacy}</a>
            <a href="/legal#terms">{c.footer.terms}</a>
            <a href={onHome ? '#top' : '/'}>{c.footer.top}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
