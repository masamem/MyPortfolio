import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Play, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { DrivePortfolioProject, PortfolioMedia, fetchPortfolioFromDrive } from '../lib/portfolioDrive';
import { ProjectDetailModal } from './ProjectDetailModal';
import './editorial.css';
import './soft-minimal.css';
import './personal.css';
import { StretchPortrait } from './StretchPortrait';
import { SoftCapabilities } from './SoftCapabilities';

const labels: Record<string, string> = { Branding: 'الهوية البصرية', Videos: 'الفيديو', 'Motion Graphics': 'موشن جرافيك', 'AI Videos': 'فيديو بالذكاء الاصطناعي', 'Other Videos': 'فيديوهات أخرى', 'Social Media': 'محتوى التواصل', '3D': 'ثلاثي الأبعاد', 'Other Work': 'أعمال أخرى' };
const title = (project: DrivePortfolioProject, ar: boolean) => {
  const name = project.name.trim();
  const fallback = project.subcategory || project.category;
  return !name || /^project$/i.test(name) ? (ar ? labels[fallback] || fallback : fallback) : name;
};

function Cover({ media, name, featured = false }: { media: PortfolioMedia | null; name: string; featured?: boolean }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [media?.url]);
  if (!media || failed || !['image', 'video'].includes(media.type)) {
    return <div className="ed-cover-fallback"><span>MUVFX</span><span>{name}</span></div>;
  }
  return media.type === 'image'
    ? <img src={media.url} alt={name} loading={featured ? 'eager' : 'lazy'} onError={() => setFailed(true)} />
    : <video src={media.url} muted playsInline preload="metadata" aria-label={name} onError={() => setFailed(true)} />;
}

export function EditorialHome({ lang, onToggleLang, aboutPage = false }: { lang: Language; onToggleLang: () => void; aboutPage?: boolean }) {
  const ar = lang === 'ar';
  const [activeNav, setActiveNav] = useState(aboutPage ? 'about' : window.location.hash.slice(1));
  useEffect(() => {
    let pending = 0;
    const update = () => {
      const nav = document.querySelector('.ed-nav');
      const boundary = (nav?.getBoundingClientRect().bottom || 100) + 100;
      let current = aboutPage ? 'about' : '';
      for (const id of ['work', 'about', 'contact']) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= boundary) current = id;
      }
      const contact = document.getElementById('contact');
      if (contact && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = 'contact';
      setActiveNav(current);
    };
    const schedule = () => { cancelAnimationFrame(pending); pending = requestAnimationFrame(update); };
    const hash = () => { const id = window.location.hash.slice(1); if (['work','about','contact'].includes(id)) setActiveNav(id); };
    update(); window.addEventListener('scroll', schedule, {passive:true}); window.addEventListener('resize', schedule); window.addEventListener('hashchange',hash);
    return () => { cancelAnimationFrame(pending); window.removeEventListener('scroll',schedule); window.removeEventListener('resize',schedule); window.removeEventListener('hashchange',hash); };
  }, [aboutPage]);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const [projects, setProjects] = useState<DrivePortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState('all');
  const [visible, setVisible] = useState(6);
  const [active, setActive] = useState<DrivePortfolioProject | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const modal = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const load = async (refresh = false) => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    refresh ? setRefreshing(true) : setLoading(true);
    setError(false);
    try {
      const data = await fetchPortfolioFromDrive(refresh, controller.signal);
      if (!controller.signal.aborted) setProjects(data.projects);
    } catch (err) {
      if (!controller.signal.aborted) setError(true);
    } finally {
      if (!controller.signal.aborted) { setLoading(false); setRefreshing(false); }
    }
  };
  useEffect(() => { if (!aboutPage) load(); return () => request.current?.abort(); }, [aboutPage]);
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () => Array.from(modal.current?.querySelectorAll<HTMLElement>('button, a[href], video[controls], model-viewer, [tabindex="0"]') || []).filter(el => el.getClientRects().length > 0);
    focusable()[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setActive(null); }
      if (event.key === 'Tab') {
        const items = focusable();
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', keydown);
      opener.current?.focus();
    };
  }, [active]);
  const open = (project: DrivePortfolioProject, button: HTMLButtonElement) => { opener.current = button; setActive(project); };
  const categories = ['Branding', 'Social Media', 'Videos', '3D', 'Other Work'];
  const filtered = projects.filter(p => category === 'all' || p.category === category);
  const feature = projects.find(p => p.media.some(m => m.type === 'video')) || projects[0];
  const featureMedia = feature?.media.find(m => m.type === 'video') || feature?.cover || null;
  const categoryLabel = (name: string) => ar ? labels[name] || name : name;

  return <div className={`editorial personal${dark ? ' personal-dark' : ''}${aboutPage ? ' ed-about-page' : ''}`} dir={ar ? 'rtl' : 'ltr'}>
    <a className="ed-skip" href="#main-content">{ar ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
    <header className={`ed-nav ed-shell${scrolled ? ' is-scrolled' : ''}`}>
      <a href="/" className="ed-logo" aria-label="MUVFX home"><img className="personal-brand-logo" src="/brand/muvfx-transparent-v2.svg" alt="MUVFX" /></a>
      <nav aria-label={ar ? 'القائمة الرئيسية' : 'Main navigation'}>
        <a href="/#work" aria-current={activeNav === 'work' ? 'location' : undefined} onClick={() => setActiveNav('work')}>{ar ? 'الأعمال' : 'Work'}</a>
        <a href="/about" aria-current={activeNav === 'about' ? (aboutPage ? 'page' : 'location') : undefined}>{ar ? 'عني' : 'About'}</a>
        <a href="#contact" aria-current={activeNav === 'contact' ? 'location' : undefined} onClick={() => setActiveNav('contact')}>{ar ? 'تواصل' : 'Contact'}</a>
        <button className="finish-toggle" onClick={() => setDark(v => !v)} aria-label={ar ? "تغيير المظهر" : "Toggle dark theme"} aria-pressed={dark}><span /></button><button onClick={onToggleLang} lang={ar ? 'en' : 'ar'}>{ar ? 'EN' : 'عربي'}</button>
      </nav>
    </header>
    <main id="main-content" tabIndex={-1}>
      {aboutPage ? <section id="hero" className="ed-shell ed-about-hero">
        <span className="ed-eyebrow">{ar ? 'مجاهد المعاري / عني' : 'MUGAHED AL-MAARI / ABOUT'}</span>
        <h1>{ar ? 'مرحباً' : 'Hello'}<span className="ed-period">.</span></h1>
        <div className="ed-about-intro"><p>{ar ? 'أنا مجاهد، مصمم وسائط متعددة في الرياض. أجمع الهوية البصرية والحركة والمحتوى لصناعة تجارب تعبر عن العلامات وتتواصل مع جمهورها.' : 'I’m Mugahed, a multimedia designer in Riyadh. I bring identity, motion, and content together to create visual experiences that connect brands with people.'}</p><span className="ed-about-signature"><img src="/brand/muvfx-transparent-v2.svg" alt="MUVFX" /></span></div>
      </section> : <>
      <section id="hero" className="ed-shell ed-hero">
        <div className="ed-hero-layout">
          <div className="ed-hero-copy">
            <p className="ed-available"><span />{ar ? 'متاح لفرص إبداعية' : 'Open to creative opportunities'}</p>
            <p className="ed-kicker">{ar ? 'مصمم وسائط متعددة · الرياض' : 'MULTIMEDIA DESIGNER · RIYADH'}</p>
            <div className="ed-intro"><h1>{ar ? <>أهلاً! أنا<br /><mark>مجاهد</mark></> : <>Hi! My name<br />is <mark>Mugahed</mark></>}</h1></div>
            <div className="ed-bio"><p className="personal-lead">{ar ? 'أحب تحويل الأفكار إلى شيء يستحق المشاهدة.' : 'I love bringing ideas to life.'}</p><p>{ar ? 'أنا مجاهد المعاري. أصمم هويات بصرية، وأحرك القصص، وأصنع محتوى يربط العلامات بجمهورها.' : 'I’m Mugahed Al-Maari. I build visual identities, put stories in motion, and create content that connects brands with people.'}</p><p>{ar ? 'من الهوية البصرية إلى الحركة والحملات، أجمع أكثر من ٦ سنوات من الخبرة في التصميم لصناعة تجارب تترك أثراً.' : 'From brand identity to motion and campaigns, I bring 6+ years of design experience to visual work made to leave an impression.'}</p></div>
            <div className="ed-actions"><a className="ed-primary" href="#work">{ar ? 'اكتشف أعمالي' : 'Explore my work'} <ArrowDown size={18} /></a><a className="ed-text-link" href="#contact">{ar ? 'ناقش مشروعك' : 'Let’s talk'} <ArrowUpRight size={18} /></a></div>
            <p className="ed-hero-note">{ar ? 'الرياض، السعودية · خبرة أكثر من ٦ سنوات' : 'Riyadh, Saudi Arabia · 6+ years of creative experience'}</p>
          </div>
          <figure className="personal-portrait"><StretchPortrait ar={ar} /><figcaption><span>01 / MUVFX</span><span>{ar ? 'مصمم، وصانع أفكار.' : 'DESIGNER. VISUAL THINKER.'}</span></figcaption><a href="#contact" className="portrait-sticker">{ar ? 'لنعمل معاً' : 'Let’s make it move'} <ArrowUpRight size={22}/></a></figure>
          <div className="ed-skill-band" aria-label={ar ? 'التخصصات الإبداعية' : 'Creative disciplines'}>
            <span>{ar ? 'الهوية البصرية' : 'Brand identity'}</span><span>{ar ? 'موشن جرافيك' : 'Motion graphics'}</span><span>{ar ? 'محتوى الحملات' : 'Campaign content'}</span><span>{ar ? 'التصميم ثلاثي الأبعاد' : '3D & visual stories'}</span>
          </div>
        </div>
      </section>
      <section id="work" className="ed-shell ed-work">
        <div className="ed-section-heading"><div><span className="ed-eyebrow">{ar ? 'الفكرة. الحرفة. الأثر.' : '01 / SELECTED PROJECTS'}</span><h2>{ar ? 'أعمالي' : 'Selected work'}</h2></div><button className="ed-refresh" onClick={() => load(true)} disabled={refreshing || loading} aria-label={ar ? 'تحديث الأعمال' : 'Refresh work'}><RefreshCw size={15} className={refreshing ? 'ed-spin' : ''} />{ar ? 'تحديث' : 'Refresh'}</button></div>
        <div className="ed-filters" aria-label={ar ? 'تصفية الأعمال' : 'Filter work'}>
          {['all', ...categories].map(name => <button key={name} aria-pressed={category === name} onClick={() => { setCategory(name); setVisible(6); }}>{name === 'all' ? (ar ? 'الكل' : 'All work') : categoryLabel(name)}</button>)}
        </div>
        <div role="status" aria-live="polite">{loading && <p className="ed-status">{ar ? 'جاري تحميل الأعمال…' : 'Loading work…'}</p>}{error && <p className="ed-status">{ar ? 'تعذر تحميل الأعمال. حاول التحديث.' : 'Work could not be loaded. Please try refreshing.'} <button onClick={() => load(true)}>{ar ? 'حاول مجدداً' : 'Try again'}</button></p>}{!loading && !error && !filtered.length && <p className="ed-status">{ar ? 'لا توجد أعمال في هذا القسم حتى الآن.' : 'No work in this collection yet.'}</p>}</div>
        <div className="ed-projects">
          {filtered.slice(0, visible).map((project, index) => <article key={project.id}>
            <button className="ed-project" onClick={e => open(project, e.currentTarget)}>
              <div className="ed-project-image"><Cover media={project.cover} name={title(project, ar)} /><span className="ed-project-arrow"><ArrowUpRight size={23} /></span>{project.cover?.type === 'video' && <span className="ed-video-label"><Play size={13} />{ar ? 'فيديو' : 'Video'}</span>}</div>
              <div className="ed-project-caption"><span className="ed-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{title(project, ar)}</h3><p>{categoryLabel(project.subcategory || project.category)}</p></div><ArrowUpRight size={20} /></div>
            </button>
          </article>)}
        </div>
        {filtered.length > visible && <button className="ed-more" onClick={() => setVisible(n => n + 6)}>{ar ? 'عرض المزيد' : 'More work'} <ArrowDown size={17} /></button>}
      </section>
      </>}
      <section id="services" className="ed-shell ed-services" aria-label={ar ? 'الخدمات' : 'Services'}>
        <div className="ed-service-heading"><span className="ed-eyebrow">{ar ? 'كيف أساعدك' : '02 / HOW I CAN HELP'}</span><h2>{ar ? 'من الفكرة إلى الأثر.' : 'From idea to impact.'}</h2><p>{ar ? 'ثلاث طرق لصناعة حضور بصري أقوى لعلامتك.' : 'Three ways to build a stronger visual presence for your brand.'}</p></div>
        {[
          [ar ? 'الهوية البصرية' : 'Brand Identity', ar ? 'أنظمة بصرية تمنح العلامات شخصية واضحة وحضوراً مميزاً.' : 'Distinctive visual systems that give brands a clear and lasting presence.'],
          [ar ? 'الحركة والفيديو' : 'Motion & Video', ar ? 'أنيميشن وموشن جرافيك وفيديو يحول الأفكار إلى قصص.' : 'Animation, motion graphics, and film that turn ideas into stories.'],
          [ar ? 'محتوى الحملات' : 'Campaign Content', ar ? 'محتوى بصري مصمم للتواصل عبر المنصات.' : 'Thoughtful campaign visuals and social content, made for every platform.']
        ].map(([name, description], i) => <div className="ed-service-card" key={name}><span className="ed-number">0{i + 1}</span><h3>{name}</h3><p>{description}</p><a className="ed-text-link" href="#contact">{ar ? 'ناقش مشروعك' : 'Discuss your project'} <ArrowUpRight size={17} /></a></div>)}
      </section>
      <SoftCapabilities lang={lang} />
      <section id="about" className="ed-shell ed-about">
        <div><span className="ed-eyebrow">{ar ? 'عن المصمم' : '03 / A LITTLE ABOUT ME'}</span><h2>{ar ? <>فكر مستقل.<br />إبداع متعدد التخصصات.</> : <>Independent mind.<br />Multidisciplinary craft.</>}</h2></div>
        <div><p>{ar ? 'أنا مجاهد، مصمم وسائط متعددة مقيم في الرياض بخبرة تتجاوز ٦ سنوات في الهوية البصرية والموشن جرافيك ومحتوى الحملات.' : 'I’m Mugahed, a multimedia designer based in Riyadh with 6+ years of experience across brand identity, motion graphics, and campaign content.'}</p><a className="ed-text-link" href="/downloads/Mugahed_AlMaari_Resume.pdf" target="_blank" rel="noopener noreferrer">{ar ? 'السيرة الذاتية (PDF بالإنجليزية)' : 'View résumé (PDF)'} <ArrowUpRight size={18} /></a></div>
      </section>
      <section id="contact" className="ed-shell ed-contact"><span className="ed-eyebrow">{ar ? 'هل لديك فكرة؟' : '04 / HAVE SOMETHING IN MIND?'}</span><h2>{ar ? 'لنصنع الأثر معاً.' : 'Tell me about your next project.'}</h2><a className="ed-email" href="mailto:mugahedalmaari@gmail.com">mugahedalmaari@gmail.com <ArrowUpRight /></a><div className="ed-socials"><a href="https://wa.me/966500582126" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a href="https://www.linkedin.com/in/mugahedalmaari" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://www.behance.net/mugahedalmaari" target="_blank" rel="noopener noreferrer">Behance ↗</a><a href="/downloads/Mugahed_AlMaari_Portfolio.pdf" target="_blank" rel="noopener noreferrer">{ar ? 'ملف الأعمال PDF' : 'Portfolio PDF'} ↗</a></div></section>
    </main>
    <footer className="ed-shell ed-footer"><a href="#hero" className="ed-logo" aria-label="MUVFX — back to top"><img className="ed-footer-logo" src="/brand/muvfx-transparent-v2.svg" alt="MUVFX" /></a><span>© {new Date().getFullYear()} {ar ? 'مجاهد المعاري' : 'Mugahed Al-Maari'}</span><span>{ar ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}</span></footer>
    <div ref={modal}><ProjectDetailModal project={active ? { ...active, name: title(active, ar) } : null} lang={lang} onClose={() => setActive(null)} /></div>
  </div>;
}


