import React from 'react';
import { Compass, Palette, Share2, Film, Video, Sparkles, Wand2, Box, Wrench } from 'lucide-react';
import { Language } from '../types';
import { capabilitiesData, toolkitData } from '../data/portfolioData';

const icons = { Compass, Palette, Share2, Film, Video, Sparkles, Wand2, Box };

export function SoftCapabilities({ lang }: { lang: Language }) {
  const ar = lang === 'ar';
  return <section id="capabilities" className="ed-shell soft-capabilities" aria-labelledby="soft-cap-title">
    <div id="tools" />
    <div className="soft-cap-heading">
      <div><span className="ed-eyebrow">{ar ? 'ماذا أقدم' : 'WHAT I DO'}</span><h2 id="soft-cap-title">{ar ? 'القدرات والأدوات' : 'Capabilities & tools'}</h2></div>
      <p>{ar ? 'قدرات إبداعية تجمع التصميم والحركة والمحتوى والتقنيات البصرية الحديثة.' : 'Creative capabilities across design, motion, content, and emerging visual technologies.'}</p>
    </div>
    <div className="soft-cap-grid">
      {capabilitiesData.map((item, index) => {
        const Icon = icons[item.iconName as keyof typeof icons] || Sparkles;
        return <article key={item.id} className="soft-cap-card">
          <div className="soft-cap-card-top"><span className="soft-cap-icon"><Icon size={20} aria-hidden="true" /></span><span className="soft-cap-number">{String(index + 1).padStart(2, '0')}</span></div>
          <h3>{item.title[lang]}</h3><p>{item.descriptor[lang]}</p>
          <div className="soft-cap-caption"><span>{ar ? 'قدرة أساسية' : 'Core capability'}</span><span aria-hidden="true">•</span></div>
        </article>;
      })}
    </div>
    <div className="soft-toolkit">
      <div className="soft-toolkit-heading"><h3><Wrench size={17} aria-hidden="true" />{ar ? 'أدواتي الإبداعية' : 'Creative toolkit'}</h3><p>{ar ? 'البرامج الأساسية المستخدمة في الإنتاج' : 'Primary software used in production workflows'}</p></div>
      <ul>{toolkitData.map(tool => <li key={tool.en} className={tool.isAi ? 'soft-tool-ai' : ''}><span aria-hidden="true">•</span>{tool[lang]}</li>)}</ul>
    </div>
  </section>;
}

