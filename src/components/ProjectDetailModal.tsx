import React from 'react';
import { Language } from '../types';
import { DrivePortfolioProject, PortfolioMedia } from '../lib/portfolioDrive';
import { X, Calendar, FolderOpen, ExternalLink, FileText, Box, Play } from 'lucide-react';

interface ProjectDetailModalProps {
  project: DrivePortfolioProject | null;
  lang: Language;
  onClose: () => void;
}

const MediaPreview: React.FC<{ item: PortfolioMedia; title: string }> = ({ item, title }) => {
  if (item.type === 'image') {
    return <img src={item.url} alt={`${title} - ${item.name}`} className="w-full h-full object-cover" loading="lazy" />;
  }

  if (item.type === 'video') {
    return (
      <video
        src={item.url}
        controls
        playsInline
        preload="metadata"
        className="w-full h-full object-contain bg-black"
      />
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full h-full min-h-52 flex flex-col items-center justify-center gap-3 bg-white/[0.04] text-gray-300 hover:text-white transition-colors"
    >
      {item.type === 'pdf' ? <FileText className="w-10 h-10 text-[#f46c38]" /> : <Box className="w-10 h-10 text-[#f46c38]" />}
      <span className="font-bold text-sm">{item.name}</span>
      <span className="text-xs text-gray-500">{item.size}</span>
      <ExternalLink className="w-4 h-4" />
    </a>
  );
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, lang, onClose }) => {
  if (!project) return null;
  const isRTL = lang === 'ar';
  const visibleMedia = [...project.media].sort((a, b) => Number(b.isCover) - Number(a.isCover));
  const modifiedYear = project.modifiedTime ? new Date(project.modifiedTime).getFullYear() : '';

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-md overflow-y-auto p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <div
        className="relative w-full max-w-6xl mx-auto my-4 sm:my-8 bg-[#151312] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 bg-[#f46c38]" />
        <button
          onClick={onClose}
          className="absolute top-5 end-5 z-20 p-2.5 rounded-full bg-black/60 border border-white/15 text-gray-300 hover:text-white hover:bg-black/80 transition-all"
          aria-label={isRTL ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-8 lg:p-10 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f46c38]/15 border border-[#f46c38]/30 text-[#f46c38] px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <FolderOpen className="w-3.5 h-3.5" />
              {project.subcategory ? `${project.category} · ${project.subcategory}` : project.category}
            </span>
            {modifiedYear && (
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                {modifiedYear}
              </span>
            )}
            <span className="text-xs text-gray-500">
              {project.media.length} {isRTL ? 'ملف' : project.media.length === 1 ? 'file' : 'files'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight pe-12">{project.name}</h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl">
            {isRTL
              ? 'هذا المشروع يتم تحميله مباشرة من مجلد Google Drive الخاص بك. أي تحديث للملفات سيظهر تلقائيًا في البورتفوليو.'
              : 'This project is loaded directly from your Google Drive folder. Updates to the folder appear automatically in the portfolio.'}
          </p>
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          {visibleMedia.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/15 rounded-2xl text-gray-400">
              {isRTL ? 'هذا المشروع لا يحتوي ملفات مدعومة حتى الآن.' : 'This project does not contain supported media yet.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
              {visibleMedia.map((item, index) => (
                <div
                  key={item.id}
                  className={`group overflow-hidden rounded-2xl border border-white/10 bg-[#0d0c0b] ${index === 0 ? 'md:col-span-2' : ''}`}
                >
                  <div className={index === 0 ? 'aspect-video max-h-[70vh]' : 'aspect-[4/3]'}>
                    <MediaPreview item={item} title={project.name} />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-4 border-t border-white/10">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.extension.toUpperCase()} · {item.size}</p>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#f46c38] hover:text-white transition-colors"
                    >
                      {item.type === 'video' && <Play className="w-3.5 h-3.5" />}
                      <span>{isRTL ? 'فتح' : 'Open'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
