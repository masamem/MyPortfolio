import React, {useEffect, useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {Language} from '../types';
import {DrivePortfolioProject, projectBlurb} from '../lib/portfolioDrive';

const arCategories:Record<string,string>={Branding:'الهوية البصرية',Videos:'الفيديو','Social Media':'التواصل الاجتماعي','3D':'ثلاثي الأبعاد','Other Work':'أعمال أخرى'};

export function LiquidGlassNav({lang,onToggleLang,dark,onToggleDark}:{lang:Language;onToggleLang:()=>void;dark:boolean;onToggleDark:()=>void}){
  const [open,setOpen]=useState(false); const ar=lang==='ar';
  return <header className={`fx-glass-nav${open?' is-open':''}`}><a className="fx-glass-brand" href="#home"><img src="/brand/muvfx-mark.svg" alt=""/><b>MUVFX</b></a><nav><a href="#about" onClick={()=>setOpen(false)}>{ar?'عني':'About'}</a><a href="#work" onClick={()=>setOpen(false)}>{ar?'الأعمال':'Work'}</a><a href="#contact" onClick={()=>setOpen(false)}>{ar?'تواصل':'Contact'}</a></nav><div className="fx-glass-actions"><button onClick={onToggleLang}>{ar?'EN':'AR'}</button><button onClick={onToggleDark} aria-pressed={dark}>◐</button><a href="#contact">{ar?'لنتحدث':'Let’s talk'} ↗</a><button className="fx-menu" onClick={()=>setOpen(v=>!v)} aria-expanded={open}><i/><i/></button></div></header>
}

function ProjectMedia({project}:{project:DrivePortfolioProject}){if(!project.cover)return <div className="fx-work-fallback">M</div>;return project.cover.type==='video'?<video src={project.cover.url} muted loop autoPlay playsInline/>:<img src={project.cover.url} alt="" loading="lazy"/>}

export function ApertureWork({projects,lang,onOpen}:{projects:DrivePortfolioProject[];lang:Language;onOpen:(project:DrivePortfolioProject)=>void}){
  const shown=projects.slice(0,6);const [active,setActive]=useState(0);const ar=lang==='ar';
  useEffect(()=>{if(active>shown.length-1)setActive(0)},[shown.length,active]);
  if(!shown.length)return null;
  return <div className="fx-aperture">{shown.map((project,index)=><article key={project.id} className={`fx-aperture-panel${active===index?' is-open':''}`} style={{'--tone':(['#c9ff38','#8370ff','#ff6946','#62b796','#e7b5cc','#82bedf'] as string[])[index%6]} as React.CSSProperties} onMouseEnter={()=>setActive(index)}><button className="fx-aperture-trigger" onClick={()=>setActive(index)} aria-expanded={active===index}><span>{String(index+1).padStart(2,'0')}</span><h3>{project.name}</h3><i>{active===index?'×':'+'}</i></button><div className="fx-aperture-body"><div className="fx-aperture-media"><ProjectMedia project={project}/></div><div className="fx-aperture-copy"><span>{ar?(arCategories[project.category]||project.category):project.category}</span><p>{projectBlurb(project,lang)}</p><button onClick={()=>onOpen(project)}>{ar?'عرض المشروع':'Explore project'} <ArrowUpRight/></button></div></div></article>)}</div>
}

// All brands visible at once (the old 5-at-a-time blur carousel read as placeholder text).
// When real logo files exist, add `logo: '/brand/<file>.svg'` and it renders instead of the wordmark.
const brands:{name:string;href?:string;logo?:string}[]=[
  {name:'Rebune',href:'https://library.rebune.com/'},
  {name:'Coponya',href:'https://coponya.com'},
  {name:'Stuffydneed'},
  {name:'Faro Home'},
  {name:'Tila'},
  {name:'Sahm'},
];
export function LogoBlurBrands({lang}:{lang:Language}){return <section className="fx-brand-flow"><div><span>{lang==='ar'?'علامات ومشاريع':'Brands & projects'}</span><p>{lang==='ar'?'هويات ومنتجات ساهمت في تشكيلها.':'Selected identities and products I’ve helped shape.'}</p></div><ul className="fx-brand-list">{brands.map(({name,href,logo})=>{const mark=logo?<img src={logo} alt={name}/>:<b>{name}</b>;return <li key={name}>{href?<a href={href} target="_blank" rel="noopener noreferrer">{mark}<ArrowUpRight aria-hidden/></a>:mark}</li>})}</ul></section>}

export function BreathingFooter({lang}:{lang:Language}){const ar=lang==='ar';return <footer className="fx-breathing-footer"><i className="fx-glow a"/><i className="fx-glow b"/><div className="fx-footer-top"><div className="fx-footer-intro"><a href="#home"><b>✦</b><span>MUVFX</span></a><p>{ar?'تصميم وسائط متعددة، موشن وتجارب رقمية — صُنعت في الرياض لتصنع أثراً.':'Multimedia design, motion and digital experiences—crafted in Riyadh, built to move.'}</p><a className="fx-footer-cta" href="mailto:mugahedalmaari@gmail.com">{ar?'لنتحدث':'Let’s talk'} ↗</a></div><div className="fx-footer-links"><div><h3>{ar?'استكشف':'Explore'}</h3><a href="#work">{ar?'الأعمال':'Work'}</a><a href="#about">{ar?'عني':'About'}</a><a href="#contact">{ar?'تواصل':'Contact'}</a></div><div><h3>{ar?'مشاريع':'Projects'}</h3><a href="https://library.rebune.com/">Rebune</a><a href="https://coponya.com">Coponya</a><a href="#work">Stuffydneed</a></div><div><h3>{ar?'روابط':'Connect'}</h3><a href="https://behance.net/mugahedalmaari">Behance</a><a href="https://linkedin.com/in/mugahedalmaari">LinkedIn</a><a href="mailto:mugahedalmaari@gmail.com">Email</a></div></div></div><div className="fx-footer-bottom"><span>© 2026 MUGAHED AL‑MAARI</span><span><b>✦</b> RIYADH, SAUDI ARABIA</span></div></footer>}
