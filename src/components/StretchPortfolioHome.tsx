import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ArrowDown, ArrowUpRight, RefreshCw} from 'lucide-react';
import {Language} from '../types';
import {DrivePortfolioProject, fetchPortfolioFromDrive} from '../lib/portfolioDrive';
import {ProjectDetailModal} from './ProjectDetailModal';
import {FaceCanvas, Mood} from '../stretchFace/FaceCanvas';
import {faces} from '../stretchFace/content';
import {useFitHeadline, useTheme} from '../stretchFace/hooks';
import './stretch-portfolio.css';
import './framer-effects.css';
import {ApertureWork, BreathingFooter, LiquidGlassNav, LogoBlurBrands} from './FramerEffects';

const DISC = '#c9ff38';
const arCategories: Record<string,string> = {Branding:'الهوية البصرية',Videos:'الفيديو','Social Media':'التواصل الاجتماعي','3D':'ثلاثي الأبعاد','Other Work':'أعمال أخرى'};

function ProjectCover({project}:{project:DrivePortfolioProject}) {
  if (!project.cover) return <div className="sp-project-fallback"><i/><b>MUVFX</b></div>;
  return project.cover.type === 'video'
    ? <video src={project.cover.url} muted loop autoPlay playsInline preload="metadata" />
    : <img src={project.cover.url} alt="" loading="lazy" />;
}

export function StretchPortfolioHome({lang,onToggleLang}:{lang:Language;onToggleLang:()=>void}) {
  const ar = lang === 'ar';
  const [dark,toggleDark] = useTheme();
  const title = useFitHeadline<HTMLHeadingElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const [mood,setMood] = useState<Mood>({face:'base',patience:100,pulls:0});
  const [projects,setProjects] = useState<DrivePortfolioProject[]>([]);
  const [loading,setLoading] = useState(true);
  const [refreshing,setRefreshing] = useState(false);
  const [active,setActive] = useState<DrivePortfolioProject|null>(null);
  const onMood = useCallback((next:Mood)=>setMood(next),[]);

  const load = async(force=false) => {
    force ? setRefreshing(true) : setLoading(true);
    try { const data = await fetchPortfolioFromDrive(force); setProjects(data.projects); }
    catch { setProjects([]); }
    finally { setLoading(false); setRefreshing(false); }
  };
  useEffect(()=>{load();},[]);
  useEffect(()=>{document.body.style.overflow=active?'hidden':'';return()=>{document.body.style.overflow='';};},[active]);
  const featured = useMemo(()=>projects.slice(0,8),[projects]);
  const moodName = ar ? ({base:'هادئ',l_left:'يراقبك',l_right:'يراقبك',x_cross:'مرتاب',x_tongue:'مرح',x_shock:'مندهش',x_laugh:'يضحك',x_skeptic:'غير مقتنع',x_whistle:'بريء',x_smug:'واثق',x_dizzy:'يرى النجوم',g_grimace:'مضغوط',g_ouch:'آخ!',g_squish:'مقرص'} as Record<string,string>)[mood.face] : faces[mood.face].mood;

  return <div className="sp" dir={ar?'rtl':'ltr'}>
    <LiquidGlassNav lang={lang} onToggleLang={onToggleLang} dark={dark} onToggleDark={toggleDark}/>

    <main id="home" className="sp-hero">
      <h1 ref={title} className="sp-headline"><span>{ar?'مرحباً، أنا':'Hey, I’m'}</span> <em>{ar?'مجاهد':'Mugahed'}</em></h1>
      <div className="sp-hero-grid">
        <div className="sp-intro"><strong>{ar?'أحوّل الأفكار إلى حركة.':'I make ideas move.'}</strong><p>{ar?'أنا مجاهد المعاري، مصمم وسائط متعددة في الرياض بخبرة تتجاوز ٦ سنوات في الجرافيك والموشن والفيديو والمحتوى الاجتماعي والتجارب التفاعلية.':'I’m Mugahed Al-Maari, a Riyadh-based multimedia designer with 6+ years across branding, motion graphics, video, social content and interactive experiences.'}</p><p>{ar?'متاح لمشاريع العمل الحر والتعاون الإبداعي وفرص الوسائط المتعددة.':'Available for freelance projects, creative collaborations and multimedia opportunities.'}</p></div>
        <div ref={stageRef} className="sp-stage"><p className={`sp-hint${mood.pulls?' hidden':''}`}>{ar?'اسحب وجهي':'pull my face'} ↙</p></div>
        <div className="sp-mood" aria-live="polite"><div><span>{ar?'الحالة الحالية':'Current mood'}</span><strong>{moodName}</strong></div><div><span>{ar?'الصبر':'Patience'}</span><strong>{mood.patience}%</strong></div><div className="sp-patience"><i style={{width:`${mood.patience}%`}}/></div><form className="sp-quick-contact" action="mailto:mugahedalmaari@gmail.com" method="get"><label htmlFor="project-email">{ar?'هل لديك مشروع؟':'Have a project in mind?'}</label><div><input id="project-email" name="subject" type="email" inputMode="email" placeholder={ar?'بريدك الإلكتروني':'you@email.com'} aria-label={ar?'بريدك الإلكتروني':'Your email'}/><button type="submit">{ar?'لنتحدث':'Let’s talk'} <span>→</span></button></div></form><a href="#work">{ar?'استكشف الأعمال':'Explore work'} <ArrowDown/></a></div>
      </div>
      <FaceCanvas stageRef={stageRef} discColor={DISC} onMood={onMood}/>
    </main>

    <section id="about" className="sp-section sp-about"><p className="sp-kicker">01 · {ar?'عني':'About'}</p><div><h2><span>{ar?'تصميم':'Design that'}</span><em>{ar?'يحرّك الناس.':'moves people.'}</em></h2><article><p>{ar?'أنا مجاهد المعاري، مصمم وسائط متعددة ومحترف إبداعي مقيم في الرياض. أجمع بين الهوية البصرية والموشن جرافيك والمونتاج وثلاثي الأبعاد وأدوات الذكاء الاصطناعي لصناعة قصص بصرية واضحة ومؤثرة.':'I’m Mugahed Al-Maari, a multimedia designer and creative professional based in Riyadh. I combine visual identity, motion graphics, video editing, 3D and emerging AI tools to turn ideas into clear, memorable visual stories.'}</p><p>{ar?'خبرتي تشمل العمل الحر وإدارة الإعلام ومحتوى الحملات والإنتاج متعدد الوسائط، وحاصل على بكالوريوس بمرتبة الشرف في تقنية الوسائط المتعددة.':'My experience spans freelance creative work, media management, campaign content and multimedia production. I hold a BSc (Hons) in Multimedia Technology.'}</p><div className="sp-about-links"><a href="/downloads/Mugahed_AlMaari_Resume.pdf" target="_blank" rel="noreferrer">{ar?'عرض السيرة الذاتية':'View résumé'} <ArrowUpRight/></a><a className="sp-linkedin" href="https://www.linkedin.com/in/mugahedalmaari" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight/></a></div></article></div></section>

    <section id="work" className="sp-section sp-work"><div className="sp-work-heading"><p className="sp-kicker">02 · {ar?'أعمال مختارة':'Selected work'}</p><h2>{ar?'أفكار أصبحت مرئية.':'Ideas, made visible.'}</h2><button onClick={()=>load(true)} disabled={refreshing}><RefreshCw className={refreshing?'sp-spin':''}/>{ar?'تحديث':'Refresh'}</button></div>{loading?<div className="sp-status">{ar?'جاري تحميل المشاريع من Google Drive…':'Loading projects from Google Drive…'}</div>:featured.length?<ApertureWork projects={featured} lang={lang} onOpen={setActive}/>:<div className="sp-status">{ar?'تعذر تحميل المشاريع حالياً.':'Projects are temporarily unavailable.'}</div>}</section>

    <LogoBlurBrands lang={lang}/>

    <section id="contact" className="sp-section sp-contact"><p className="sp-kicker">03 · {ar?'تواصل':'Contact'}</p><h2>{ar?'لنصنع شيئاً يستحق المشاهدة.':'Let’s make something worth watching.'}</h2><a className="sp-email" href="mailto:mugahedalmaari@gmail.com">mugahedalmaari@gmail.com <ArrowUpRight/></a><div className="sp-contact-row"><span>{ar?'الرياض، المملكة العربية السعودية':'Riyadh, Saudi Arabia'}</span><a href="https://www.behance.net/mugahedalmaari" target="_blank" rel="noreferrer">Behance</a><a href="https://www.linkedin.com/in/mugahedalmaari" target="_blank" rel="noreferrer">LinkedIn</a></div><div className="sp-specialties"><span>{ar?'متخصص في':'Specialized in'}</span><em>Brand Identity</em><b>Motion</b><strong>video editing</strong><em>Creative Direction</em><b>3D / AI</b><em>Social Content</em></div></section>
    <BreathingFooter lang={lang}/>
    <ProjectDetailModal project={active} lang={lang} onClose={()=>setActive(null)}/>
  </div>;
}
