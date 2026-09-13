import React, { useRef } from 'react';
import '@google/model-viewer';
import { Language } from '../types';
import { DrivePortfolioProject, PortfolioMedia } from '../lib/portfolioDrive';
import { X, Calendar, FolderOpen, ExternalLink, FileText, Box, Play, RotateCcw } from 'lucide-react';

interface ProjectDetailModalProps {
  project: DrivePortfolioProject | null;
  lang: Language;
  onClose: () => void;
}

const ModelPreview: React.FC<{ item: PortfolioMedia; isRTL: boolean }> = ({ item, isRTL }) => {
  const viewerRef = useRef<HTMLElement & { resetTurntableRotation?: () => void; cameraOrbit?: string }>(null);

  const resetView = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    viewer.resetTurntableRotation?.();
    viewer.cameraOrbit = '0deg 75deg 105%';
  };

  return (
    <div className="relative w-full h-full min-h-72 bg-[radial-gradient(circle_at_center,_#292523_0%,_#151312_55%,_#0d0c0b_100%)]">
      <model-viewer
        ref={viewerRef}
        src={item.url}
        alt={item.name}
        camera-controls
        auto-rotate
        auto-rotate-delay="1200"
        rotation-per-second="18deg"
        interaction-prompt="auto"
        shadow-intensity="1"
        shadow-softness="0.8"
        exposure="1"
        camera-orbit="0deg 75deg 105%"
        min-camera-orbit="auto auto 55%"
        max-camera-orbit="auto auto 220%"
        touch-action="pan-y"
        loading="eager"
        reveal="auto"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <div slot="progress-bar" className="absolute inset-x-8 top-1/2 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[#f46c38]" />
        </div>
        <a
          slot="poster"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-300"
        >
          <Box className="w-12 h-12 text-[#f46c38]" />
          <span className="text-sm font-bold">{isRTL ? 'تحميل المجسم ثلاثي الأبعاد' : 'Load 3D model'}</span>
        </a>
      </model-viewer>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-end justify-between gap-3 px-4">
        <span className="rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[11px] text-gray-300 backdrop-blur-sm">
          {isRTL ? 'اسحب للتدوير • مرّر للتكبير' : 'Drag to rotate • Scroll to zoom'}
        </span>
        <button
          type="button"
          onClick={resetView}
          className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/65 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#f46c38]"
          aria-label={isRTL ? 'إعادة ضبط زاوية العرض' : 'Reset model view'}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {isRTL ? 'إعادة الضبط' : 'Reset'}
        </button>
      </div>
    </div>
  );
};

const MediaPreview: React.FC<{ item: PortfolioMedia; title: string; isRTL: boolean }> = ({ item, title, isRTL }) => {
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

  if (item.type === '3d') {
    return <ModelPreview item={item} isRTL={isRTL} />;
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
                    <MediaPreview item={item} title={project.name} isRTL={isRTL} />
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
