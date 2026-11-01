import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronDown, Mail, Menu, RefreshCw, X } from 'lucide-react';
import { Language } from '../types';
import { DrivePortfolioProject, fetchPortfolioFromDrive } from '../lib/portfolioDrive';
import { ProjectDetailModal } from './ProjectDetailModal';
import { StretchPortrait } from './StretchPortrait';
import './portfi-home.css';

const arLabels: Record<string, string> = { Branding:'الهوية البصرية', Videos:'الفيديو', 'Social Media':'محتوى التواصل', '3D':'ثلاثي الأبعاد', 'Other Work':'أعمال أخرى' };

function ProjectImage({ project }: { project: DrivePortfolioProject }) {
  const cover = project.cover;
  if (!cover) return <div className="pf-fallback"><span>MUVFX</span></div>;
  return cover.type === 'video'
    ? <video src={cover.url} muted loop autoPlay playsInline preload="metadata" />
    : <img src={cover.url} alt="" loading="lazy" />;
}

export function PortfiHome({ lang, onToggleLang }: { lang: Language; onToggleLang: () => void }) {
  const ar = lang === 'ar';
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<DrivePortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [active, setActive] = useState<DrivePortfolioProject | null>(null);
  const [openJob, setOpenJob] = useState(0);
  const modal = useRef<HTMLDivElement>(null);

  const load = async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    try { const data = await fetchPortfolioFromDrive(refresh); setProjects(data.projects); }
    catch { /* The designed fallback remains visible. */ }
    finally { setLoading(false); setRefreshing(false); }
  };
  useEffect(() => { load(); }, []);
  useEffect(() => { document.body.style.overflow = menuOpen || active ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen, active]);

  const displayProjects = projects.length ? projects : [];
  const menuProjects = displayProjects.slice(0, 6);
  const rowA = useMemo(() => displayProjects.filter((_, i) => i % 2 === 0).slice(0, 6), [displayProjects]);
  const rowB = useMemo(() => displayProjects.filter((_, i) => i % 2 === 1).slice(0, 6), [displayProjects]);
  const featured = displayProjects.slice(0, 4);
  const category = (project: DrivePortfolioProject) => ar ? arLabels[project.category] || project.category : project.category;

  const experience = [
    { company:'Rebune Global Trading', role: ar ? 'مدير إعلامي' : 'Media Manager', dates:'2025 — Present', body: ar ? 'إدارة إنتاج الفيديو والموشن جرافيك والمحتوى والحملات والتعاون مع صناع المحتوى.' : 'Leading video, motion, campaign content, production partners, and creator collaborations.' },
    { company:'SAHM AL-SAHEL', role: ar ? 'مساعد مبيعات وإدارة' : 'Sales & Administration Assistant', dates:'2021 — Present', body: ar ? 'إدارة قواعد البيانات والمخزون والفواتير والموردين والتقارير الإدارية.' : 'Managing databases, inventory, quotations, invoices, suppliers, and administrative reporting.' },
    { company:'Sika Technology · Malaysia', role: ar ? 'متدرب وسائط متعددة' : 'Multimedia Intern', dates:'2018', body: ar ? 'خبرة مبكرة في الإنتاج الرقمي والتصميم ضمن بيئة تقنية.' : 'Early professional experience in digital production and design within a technology environment.' },
  ];
  const tools = ['After Effects','Premiere Pro','Photoshop','Illustrator','Cinema 4D','Figma','Unity','AI Creative Tools'];

  return <div className="pf" dir={ar ? 'rtl' : 'ltr'}>
    <header className="pf-nav">
      <a href="#top" className="pf-logo"><img src="/brand/muvfx-transparent-v2.svg" alt="MUVFX" /></a>
      <div className="pf-nav-right">
        <button onClick={onToggleLang} className="pf-lang">{ar ? 'EN' : 'عربي'}</button>
        <button className="pf-menu-button" onClick={() => setMenuOpen(true)} aria-label={ar ? 'فتح القائمة' : 'Open menu'}><span>{ar ? 'القائمة' : 'Menu'}</span><Menu /></button>
      </div>
    </header>

    <div className={`pf-menu-overlay${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
      <div className="pf-menu-grid" />
      <button className="pf-menu-close" onClick={() => setMenuOpen(false)}><span>{ar ? 'إغلاق' : 'Close'}</span><X /></button>
      <div className="pf-menu-preview">
        {menuProjects.length ? menuProjects.map((p, i) => <div className="pf-menu-image" key={p.id} style={{'--i':i} as React.CSSProperties}><ProjectImage project={p}/></div>) : <div className="pf-menu-image pf-menu-fallback">MUVFX</div>}
      </div>
      <nav className="pf-menu-links">
        {[['top',ar?'الرئيسية':'Home'],['about',ar?'عني':'About'],['projects',ar?'المشاريع':'Projects'],['services',ar?'الخدمات':'Services'],['experience',ar?'الخبرة':'Experience'],['contact',ar?'تواصل':'Contact']].map(([id,label], i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} onMouseEnter={() => document.documentElement.style.setProperty('--pf-menu-index',String(i))}><span>0{i+1}</span>{label}</a>)}
      </nav>
    </div>

    <main id="top">
      <section className="pf-hero">
        <div className="pf-hero-name"><h1>Mugahed<br/><em>Almaari</em></h1></div>
        <div className="pf-hero-portrait"><StretchPortrait ar={ar}/></div>
        <div className="pf-role-slider" aria-label={ar ? 'التخصصات' : 'Creative roles'}><div><span>{ar?'مصمم وسائط متعددة':'Multimedia Designer'}</span><span>{ar?'مصمم موشن':'Motion Designer'}</span><span>{ar?'مخرج إبداعي':'Creative Director'}</span><span>{ar?'صانع قصص بصرية':'Visual Storyteller'}</span><span>{ar?'مصمم وسائط متعددة':'Multimedia Designer'}</span></div></div>
        <div className="pf-hero-bottom"><div className="pf-socials"><a href="https://www.behance.net/mugahedalmaari" target="_blank" rel="noreferrer">Be</a><a href="https://www.linkedin.com/in/mugahedalmaari" target="_blank" rel="noreferrer">in</a><a href="mailto:mugahedalmaari@gmail.com"><Mail/></a></div><a href="#projects" className="pf-scroll">{ar?'استكشف':'Scroll to explore'} <ArrowDown/></a></div>
      </section>

      <section id="projects" className="pf-project-marquee">
        <div className="pf-marquee-row pf-forward">{[...rowA,...rowA].map((p,i)=><button key={`${p.id}-${i}`} onClick={()=>setActive(p)} className="pf-marquee-card"><ProjectImage project={p}/><span>{category(p)} · {p.name}</span></button>)}</div>
        <div className="pf-marquee-row pf-reverse">{[...rowB,...rowB].map((p,i)=><button key={`${p.id}-${i}`} onClick={()=>setActive(p)} className="pf-marquee-card"><ProjectImage project={p}/><span>{category(p)} · {p.name}</span></button>)}</div>
        {loading && <div className="pf-loading">{ar?'جاري تحميل المشاريع…':'Loading projects…'}</div>}
      </section>

      <section id="about" className="pf-about">
        <div className="pf-about-image"><StretchPortrait ar={ar}/></div>
        <div><p className="pf-label">01 · {ar?'عني':'About'}</p><h2>{ar?'أصنع أفكاراً تستحق المشاهدة.':'I make ideas worth watching.'}</h2><p>{ar?'أنا مجاهد المعاري، مصمم وسائط متعددة مقيم في الرياض. أجمع بين الهوية البصرية والموشن جرافيك والفيديو والتقنيات الإبداعية الحديثة لصناعة أعمال تترك أثراً.' : 'I’m Mugahed Al-Maari, a Riyadh-based multimedia designer. I combine brand identity, motion, film, and modern creative technology to make work that leaves an impression.'}</p><a href="/downloads/Mugahed_AlMaari_Resume.pdf" target="_blank" rel="noreferrer">{ar?'عرض السيرة الذاتية':'View résumé'} <ArrowUpRight/></a></div>
      </section>

      <section className="pf-recent">
        <div className="pf-section-title"><p className="pf-label">02 · {ar?'أحدث الأعمال':'Recent work'}</p><h2>{ar?'أعمال مختارة':'Selected projects'}</h2></div>
        <div className="pf-card-grid"><div className="pf-text-card">{ar?'أحدث':'Recent'}<br/>{ar?'الأعمال':'works'}</div>{featured.map(p=><button key={p.id} className="pf-project-card" onClick={()=>setActive(p)}><ProjectImage project={p}/><div><span>{category(p)}</span><h3>{p.name}</h3></div></button>)}<a href="#projects" className="pf-view-all">{ar?'عرض الكل':'View all'} <ArrowUpRight/></a></div>
      </section>

      <section id="services" className="pf-services">
        <div className="pf-section-title"><p className="pf-label">03 · {ar?'الخدمات':'Services'}</p><h2>{ar?'من الفكرة إلى الإطلاق':'From idea to launch'}</h2></div>
        {[
          [ar?'الهوية البصرية':'Brand Identity',ar?'أنظمة هوية واضحة ومميزة قابلة للتطبيق عبر جميع نقاط التواصل.':'Distinctive visual systems designed to work across every brand touchpoint.'],
          [ar?'الحركة والفيديو':'Motion & Video',ar?'موشن جرافيك ومونتاج وفيديو يحول الأفكار إلى قصص جذابة.':'Motion graphics, editing, and film that turn ideas into engaging stories.'],
          [ar?'محتوى الحملات':'Campaign Content',ar?'محتوى بصري للسوشيال ميديا والحملات والمنصات الرقمية.':'Visual content systems for campaigns, social platforms, and digital channels.']
        ].map(([name,desc],i)=><article className="pf-service" key={name}><span>0{i+1}</span><h3>{name}</h3><div className="pf-service-preview">{featured[i] ? <ProjectImage project={featured[i]}/> : null}</div><p>{desc}</p></article>)}
      </section>

      <section className="pf-highlights"><div className="pf-big-word">MUVFX</div><div className="pf-highlight-grid">{[['6+','Years experience'],['BSc','Multimedia Technology'],['Riyadh','Saudi Arabia'],['AI +','Creative production']].map(([big,small])=><div key={small}><strong>{big}</strong><span>{small}</span></div>)}</div></section>

      <section id="experience" className="pf-experience">
        <div className="pf-section-title"><p className="pf-label">04 · {ar?'الخبرة':'Experience'}</p><h2>{ar?'المسار المهني':'Career history'}</h2></div>
        {experience.map((job,i)=><article className={`pf-job${openJob===i?' is-open':''}`} key={job.company}><button onClick={()=>setOpenJob(openJob===i?-1:i)}><div><span>{job.company}</span><h3>{job.role}</h3></div><time>{job.dates}</time><ChevronDown/></button><div className="pf-job-body"><p>{job.body}</p></div></article>)}
      </section>

      <section className="pf-tools"><p className="pf-label">05 · {ar?'الأدوات والمهارات':'Tools & skills'}</p><h2>{ar?'مجموعة أدوات إبداعية':'Creative toolkit'}</h2><div className="pf-tool-grid">{tools.map((tool,i)=><div key={tool}><span>{String(i+1).padStart(2,'0')}</span><strong>{tool}</strong></div>)}</div></section>

      <section className="pf-reviews"><p className="pf-label">06 · {ar?'التوصيات':'Reviews'}</p><h2>{ar?'آراء العملاء':'What collaborators say'}</h2><div className="pf-review-track">{[1,2,3].map(i=><article key={i}><div className="pf-review-person"><span>{i}</span><div><strong>{ar?'شهادة عميل':'Client testimonial'}</strong><small>{ar?'جاهزة للإضافة':'Ready to add'}</small></div></div><p>{ar?'أضف هنا شهادة حقيقية من عميل لتقوية الثقة والمصداقية في ملف الأعمال.' : 'Add a verified client quote here to strengthen trust and credibility in the portfolio.'}</p></article>)}</div></section>
    </main>

    <footer id="contact" className="pf-footer"><p className="pf-label">{ar?'هل لديك مشروع؟':'Have a project?'}</p><h2>{ar?'لنصنع شيئاً رائعاً.':'Let’s make something great.'}</h2><a href="mailto:mugahedalmaari@gmail.com">mugahedalmaari@gmail.com <ArrowUpRight/></a><div className="pf-footer-bottom"><img src="/brand/muvfx-transparent-v2.svg" alt="MUVFX"/><span>© {new Date().getFullYear()} Mugahed Al-Maari</span><span>Riyadh, Saudi Arabia</span><button onClick={()=>load(true)} disabled={refreshing}><RefreshCw className={refreshing?'pf-spin':''}/> {ar?'تحديث الأعمال':'Refresh work'}</button></div></footer>
    <div ref={modal}><ProjectDetailModal project={active} lang={lang} onClose={()=>setActive(null)}/></div>
  </div>;
}
