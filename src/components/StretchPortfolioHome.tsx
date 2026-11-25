import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ArrowDown, ArrowUpRight, Check, CheckCircle, Copy, ImageSquare} from '@phosphor-icons/react';
import type {Language} from '../types';
import {DrivePortfolioProject, fetchPortfolioFromDrive, projectBlurb} from '../lib/portfolioDrive';
import {arCategories, BEHANCE, EMAIL, LINKEDIN, RESUME, RISK_REVERSAL, t} from '../lib/copy';
import {useActiveSection, useInView, useReveal, useWordReveal} from '../lib/useReveal';
import {ProjectDetailModal} from './ProjectDetailModal';
import {FaceCanvas, Mood} from '../stretchFace/FaceCanvas';
import {faces} from '../stretchFace/content';
import {ExperienceSection} from './ExperienceSection';
import {BrandsRow, SECTION_IDS, SiteFooter, SiteNav} from './SiteChrome';
import './stretch-portfolio.css';

/** Same hex as --accent in stretch-portfolio.css; the WebGL disc needs a literal colour. */
const DISC = '#bde94e';

const moodAr: Record<string, string> = {base: 'هادئ', l_left: 'يراقبك', l_right: 'يراقبك', x_cross: 'مرتاب', x_tongue: 'مرح', x_shock: 'مندهش', x_laugh: 'يضحك', x_skeptic: 'غير مقتنع', x_whistle: 'بريء', x_smug: 'واثق', x_dizzy: 'يرى النجوم', g_grimace: 'مضغوط', g_ouch: 'آخ', g_squish: 'مقرص'};

type WorkState = 'loading' | 'ready' | 'error';

export function StretchPortfolioHome({lang, onToggleLang}: {lang: Language; onToggleLang: () => void}) {
  const ar = lang === 'ar';
  const c = t(lang);
  const stageRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<Mood>({face: 'base', patience: 100, pulls: 0});
  const [projects, setProjects] = useState<DrivePortfolioProject[]>([]);
  const [state, setState] = useState<WorkState>('loading');
  const [attempt, setAttempt] = useState(0);
  const [active, setActive] = useState<DrivePortfolioProject | null>(null);
  const onMood = useCallback((next: Mood) => setMood(next), []);
  const current = useActiveSection(SECTION_IDS);
  useReveal(`${state}-${lang}`);

  useEffect(() => {
    document.documentElement.dataset.theme = 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#000000');
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setState('loading');
    fetchPortfolioFromDrive(false, controller.signal)
      .then((data) => {
        setProjects(data.projects.slice(0, 8));
        setState('ready');
      })
      .catch(() => {
        if (!controller.signal.aborted) setState('error');
      });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  const moodName = ar ? moodAr[mood.face] : faces[mood.face].mood;

  return (
    <div className="mx" dir={ar ? 'rtl' : 'ltr'} id="top">
      <a className="mx-skip button-sm" href="#main">{c.skip}</a>
      <SiteNav lang={lang} onToggleLang={onToggleLang} active={current} />

      <main id="main">
        <section className="mx-hero" aria-labelledby="hero-title">
          <div className="mx-wrap mx-hero-grid">
            <div className="mx-hero-copy">
              <p className="mx-status caption-1"><i aria-hidden />{c.hero.status}</p>
              <h1 id="hero-title" className="heading-1">
                <span>{c.hero.title[0]}</span>
                <span>{c.hero.title[1]}</span>
              </h1>
              <p className="mx-hero-sub title-2">
                {c.hero.sub[0]}<strong>{c.hero.sub[1]}</strong>{c.hero.sub[2]}
              </p>
              <div className="mx-hero-actions">
                <a className="mx-btn mx-btn-primary button-md" href="#contact">{c.hero.cta}</a>
                <a className="mx-link body-2" href="#work">{c.hero.secondary} <ArrowDown aria-hidden /></a>
              </div>
              <p className="mx-proof caption-1">
                <span>{c.hero.proofLabel}</span>
                {c.hero.proof.map((name) => <b key={name}>{name}</b>)}
              </p>
            </div>
            <div className="mx-stage-wrap">
              <div ref={stageRef} className="mx-stage">
                <p className="mx-stage-hint caption-3" data-hidden={mood.pulls > 0}>{c.hero.hint}</p>
              </div>
              <p className="mx-mood caption-4" aria-live="polite">
                <span>{c.hero.mood} <b>{moodName}</b></span>
                <span>{c.hero.patience} <b>{mood.patience}%</b></span>
              </p>
            </div>
          </div>
          <FaceCanvas stageRef={stageRef} discColor={DISC} onMood={onMood} />
        </section>

        <BrandsRow lang={lang} />

        <section id="work" className="mx-section" aria-labelledby="work-title">
          <div className="mx-wrap">
            <header className="mx-section-head" data-reveal>
              <p className="mx-eyebrow caption-1">{c.work.eyebrow}</p>
              <h2 id="work-title" className="heading-2">{c.work.title}</h2>
              <p className="body-3">{c.work.intro}</p>
            </header>
            <WorkGrid lang={lang} state={state} projects={projects} onOpen={setActive} onRetry={() => setAttempt((n) => n + 1)} />
          </div>
        </section>

        <Tagline lang={lang} />

        <section id="services" className="mx-section" aria-labelledby="services-title">
          <div className="mx-wrap">
            <header className="mx-section-head" data-reveal>
              <p className="mx-eyebrow caption-1">{c.services.eyebrow}</p>
              <h2 id="services-title" className="heading-2">{c.services.title}</h2>
            </header>
            <ul className="mx-services" data-reveal>
              {c.services.items.map((item) => (
                <li key={item.name}>
                  <h3 className="heading-5">{item.name}</h3>
                  <p className="body-3">{item.text}</p>
                  <small className="caption-1">{item.proof} <b>{item.proofName}</b></small>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-section" aria-labelledby="process-title">
          <div className="mx-wrap">
            <header className="mx-section-head" data-reveal>
              <p className="mx-eyebrow caption-1">{c.process.eyebrow}</p>
              <h2 id="process-title" className="heading-2">{c.process.title}</h2>
            </header>
            <ol className="mx-steps" data-reveal>
              {c.process.steps.map((step) => (
                <li key={step.name}>
                  <h3 className="heading-6">{step.name}</h3>
                  <p className="body-6">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <ExperienceSection lang={lang} />

        <section id="faq" className="mx-section" aria-labelledby="faq-title">
          <div className="mx-wrap">
            <header className="mx-section-head" data-reveal>
              <p className="mx-eyebrow caption-1">{c.faq.eyebrow}</p>
              <h2 id="faq-title" className="heading-2">{c.faq.title}</h2>
            </header>
            <dl className="mx-faq" data-reveal>
              {c.faq.items.map((item, i) => (
                <div key={item.q}>
                  <dt className="title-2">{item.q}</dt>
                  <dd className="body-3">
                    {item.a}
                    {i === c.faq.items.length - 1 && (
                      <> <a href={BEHANCE} target="_blank" rel="noopener noreferrer">Behance</a> · <a href={RESUME} target="_blank" rel="noopener noreferrer">{c.about.resume}</a></>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <ContactSection lang={lang} />
      </main>

      <SiteFooter lang={lang} />
      <ProjectDetailModal project={active} lang={lang} onClose={() => setActive(null)} />
    </div>
  );
}

function WorkGrid({lang, state, projects, onOpen, onRetry}: {lang: Language; state: WorkState; projects: DrivePortfolioProject[]; onOpen: (p: DrivePortfolioProject) => void; onRetry: () => void}) {
  const c = t(lang).work;
  if (state === 'loading') {
    return (
      <div className="mx-work-grid" aria-busy="true" aria-label="Loading projects">
        {Array.from({length: 4}, (_, i) => (
          <div key={i} className="mx-card mx-skeleton" aria-hidden>
            <div className="mx-card-media" />
            <div className="mx-card-body"><i /><i /></div>
          </div>
        ))}
      </div>
    );
  }
  if (state === 'error' || projects.length === 0) {
    const error = state === 'error';
    return (
      <div className="mx-empty" role={error ? 'alert' : undefined}>
        <h3 className="heading-5">{error ? c.errorTitle : c.emptyTitle}</h3>
        <p className="body-3">{error ? c.errorText : c.emptyText}</p>
        <div>
          {error && <button type="button" className="mx-btn mx-btn-primary button-md" onClick={onRetry}>{c.retry}</button>}
          <a className="mx-link body-2" href={BEHANCE} target="_blank" rel="noopener noreferrer">{c.behance} <ArrowUpRight aria-hidden /></a>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-work-grid">
      {projects.map((project) => <WorkCard key={project.id} project={project} lang={lang} onOpen={onOpen} />)}
    </div>
  );
}

function WorkCard({project, lang, onOpen}: {project: DrivePortfolioProject; lang: Language; onOpen: (p: DrivePortfolioProject) => void}) {
  const c = t(lang).work;
  const [ref, inView] = useInView<HTMLButtonElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const category = lang === 'ar' ? arCategories[project.category] || project.category : project.category;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView]);

  return (
    <button ref={ref} type="button" className="mx-card" onClick={() => onOpen(project)} data-reveal>
      <div className="mx-card-media">
        {!project.cover ? (
          <div className="mx-card-fallback"><ImageSquare aria-hidden /></div>
        ) : project.cover.type === 'video' ? (
          <video ref={videoRef} src={project.cover.url} muted loop playsInline preload="metadata" aria-hidden />
        ) : (
          <img src={project.cover.url} alt={`${project.name} cover`} loading="lazy" />
        )}
        <span className="mx-card-badge caption-4">{c.files(project.media.length)}</span>
      </div>
      <div className="mx-card-body">
        <span className="mx-card-cat caption-1">{category}</span>
        <div className="mx-card-row">
          <h3 className="heading-5">{project.name}</h3>
          <ArrowUpRight aria-label={c.view} />
        </div>
        <p className="body-6">{projectBlurb(project, lang)}</p>
      </div>
    </button>
  );
}

function Tagline({lang}: {lang: Language}) {
  const ref = useRef<HTMLParagraphElement>(null);
  useWordReveal(ref);
  const {before, after} = t(lang).tagline;
  const words = (text: string, accent = false) =>
    text.split(' ').map((w, i) => (
      <React.Fragment key={`${w}${i}`}>
        <span data-word className={accent ? 'mx-accent' : undefined}>{w}</span>{' '}
      </React.Fragment>
    ));
  return (
    <section className="mx-tagline" aria-label={`${before} ${after}`}>
      <div className="mx-wrap">
        <p ref={ref} aria-hidden>
          {words(before)}
          <br />
          {words(after, true)}
        </p>
      </div>
    </section>
  );
}

type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ContactSection({lang}: {lang: Language}) {
  const c = t(lang).contact;
  const [errors, setErrors] = useState<FormErrors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const reversal = RISK_REVERSAL[lang];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    window.setTimeout(() => setCopyState('idle'), 2400);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const type = String(data.get('type') || '');
    const message = String(data.get('message') || '').trim();
    const next: FormErrors = {};
    if (!name) next.name = c.errName;
    if (!EMAIL_RE.test(email)) next.email = c.errEmail;
    if (message.length < 10) next.message = c.errMessage;
    setErrors(next);
    const firstError = Object.keys(next)[0];
    if (firstError) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }
    const subject = `${type}: ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSentTo(name);
  };

  const field = (key: keyof FormErrors) => ({
    id: `contact-${key}`,
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    onInput: () => errors[key] && setErrors((prev) => ({...prev, [key]: undefined})),
  });

  return (
    <section id="contact" className="mx-section" aria-labelledby="contact-title">
      <div className="mx-wrap mx-contact">
        <div className="mx-contact-copy" data-reveal>
          <p className="mx-eyebrow caption-1">{t(lang).contact.eyebrow}</p>
          <h2 id="contact-title" className="heading-2">{c.title}</h2>
          <p className="body-3">{c.text}</p>
          {reversal && <p className="mx-reversal body-2"><CheckCircle aria-hidden weight="fill" />{reversal}</p>}
          <div className="mx-mail">
            <code className="title-2" dir="ltr">{EMAIL}</code>
            <button type="button" className="mx-btn mx-btn-quiet button-sm" onClick={copyEmail}>
              {copyState === 'copied' ? <Check aria-hidden /> : <Copy aria-hidden />}
              {copyState === 'copied' ? c.copied : c.copy}
            </button>
          </div>
          {copyState === 'failed' && <p className="caption-1" role="status">{c.copyFail}</p>}
          <p className="caption-1">{c.based} · <a className="mx-link" href={BEHANCE} target="_blank" rel="noopener noreferrer">Behance</a> · <a className="mx-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </div>

        <form className="mx-form" noValidate onSubmit={submit} data-reveal>
          <div className="mx-field">
            <label className="title-4" htmlFor="contact-name">{c.name}</label>
            <input {...field('name')} type="text" autoComplete="name" required />
            {errors.name && <p id="contact-name-error" className="mx-field-error caption-1">{errors.name}</p>}
          </div>
          <div className="mx-field">
            <label className="title-4" htmlFor="contact-email">{c.email}</label>
            <input {...field('email')} type="email" inputMode="email" autoComplete="email" dir="ltr" required />
            {errors.email && <p id="contact-email-error" className="mx-field-error caption-1">{errors.email}</p>}
          </div>
          <div className="mx-field mx-field-wide">
            <label className="title-4" htmlFor="contact-type">{c.type}</label>
            <select id="contact-type" name="type" defaultValue={c.types[0]}>
              {c.types.map((type) => <option key={type}>{type}</option>)}
            </select>
          </div>
          <div className="mx-field mx-field-wide">
            <label className="title-4" htmlFor="contact-message">{c.message}</label>
            <textarea {...field('message')} placeholder={c.messageHint} required />
            {errors.message && <p id="contact-message-error" className="mx-field-error caption-1">{errors.message}</p>}
          </div>
          <div className="mx-form-foot">
            <button type="submit" className="mx-btn mx-btn-primary button-md">{c.submit}</button>
            <span className="mx-form-note caption-1">{c.note}</span>
          </div>
          {sentTo && (
            <p className="mx-form-done body-5" role="status"><CheckCircle aria-hidden weight="fill" />{c.done(sentTo)}</p>
          )}
        </form>
      </div>
    </section>
  );
}
