import React from 'react';
import { ProjectItem, Language } from '../types';
import { contentData } from '../data/portfolioData';
import { X, Sparkles, CheckCircle, Calendar, User, ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, lang, onClose }) => {
  if (!project) return null;
  const t = contentData[lang];
  const isRTL = lang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl bg-[#1a1817] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Line */}
        <div 
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: project.accentColor || '#f46c38' }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
          aria-label={t.closeModal}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Content */}
        <div className="pt-2 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span 
              className="text-xs font-bold px-3 py-1 rounded-full text-white bg-white/10 border border-white/15 uppercase tracking-wider"
              style={{ color: project.accentColor || '#f46c38' }}
            >
              ✦ {project.category.toUpperCase()}
            </span>
            {project.year && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
            )}
            {project.client && (
              <span className="text-xs text-gray-400 flex items-center gap-1 ms-2">
                <User className="w-3.5 h-3.5" />
                {project.client}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {project.title[lang]}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {project.fullDesc[lang]}
          </p>
        </div>

        {/* Key Outcomes / Stats Highlight */}
        {project.stats && (
          <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 font-medium block">
                {project.stats.label[lang]}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#f46c38]">
                {project.stats.value}
              </span>
            </div>
            <Sparkles className="w-8 h-8 text-[#f46c38]/40" />
          </div>
        )}

        {/* Deliverables List */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#f46c38]" />
            <span>{isRTL ? 'المخرجات والخدمات المقدمة:' : 'Deliverables & Services:'}</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.deliverables[lang].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-200 bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="text-[#f46c38] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="text-xs font-semibold px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-gray-300">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <a
            href="https://behance.net/mugahedalmaari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white transition-colors"
          >
            <span>{t.ctaSecondary}</span>
            <ExternalLink className="w-4 h-4 text-[#f46c38]" />
          </a>

          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#f46c38] hover:bg-[#e05a26] px-6 py-3 rounded-xl shadow-md transition-all"
          >
            <span>{isRTL ? 'طلب مشروع مشابه' : 'Request Similar Project'}</span>
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </a>
        </div>
      </div>
    </div>
  );
};
