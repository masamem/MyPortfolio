import React, {useEffect, useRef} from 'react';
import '@google/model-viewer';
import {ArrowCounterClockwise, ArrowSquareOut, ArrowUpRight, Cube, FilePdf, X} from '@phosphor-icons/react';
import {Language} from '../types';
import {DrivePortfolioProject, PortfolioMedia, projectBlurb} from '../lib/portfolioDrive';
import {arCategories} from '../lib/copy';

interface ProjectDetailModalProps {
  project: DrivePortfolioProject | null;
  lang: Language;
  onClose: () => void;
}

const LIVE_SITES: Record<string, string> = {'rebune media library': 'https://library.rebune.com/'};

function ModelPreview({item, ar}: {item: PortfolioMedia; ar: boolean}) {
  const viewerRef = useRef<HTMLElement & {resetTurntableRotation?: () => void; cameraOrbit?: string}>(null);
  const resetView = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    viewer.resetTurntableRotation?.();
    viewer.cameraOrbit = '0deg 75deg 105%';
  };
  return (
    <>
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
      />
      <div className="mx-model-tools">
        <span className="caption-4">{ar ? 'اسحب للتدوير · مرّر للتكبير' : 'Drag to rotate · Scroll to zoom'}</span>
        <button type="button" className="mx-btn mx-btn-quiet button-sm" onClick={resetView}>
          <ArrowCounterClockwise aria-hidden />
          {ar ? 'إعادة الضبط' : 'Reset view'}
        </button>
      </div>
    </>
  );
}

function MediaPreview({item, title, ar}: {item: PortfolioMedia; title: string; ar: boolean}) {
  if (item.type === 'image') return <img src={item.url} alt={`${title}: ${item.name}`} loading="lazy" />;
  if (item.type === 'video') return <video src={item.url} controls playsInline preload="metadata" />;
  if (item.type === '3d') return <ModelPreview item={item} ar={ar} />;
  return (
    <a className="mx-media-file" href={item.url} target="_blank" rel="noopener noreferrer">
      {item.type === 'pdf' ? <FilePdf aria-hidden /> : <Cube aria-hidden />}
      <span className="title-4">{item.name}</span>
      <span className="caption-5">{ar ? 'فتح الملف' : 'Open file'} · {item.size}</span>
    </a>
  );
}

/** Full screen project sheet. Escape, the close button or a click on the backdrop closes it. */
export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({project, lang, onClose}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const ar = lang === 'ar';

  useEffect(() => {
    if (!project) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;
  const media = [...project.media].sort((a, b) => Number(b.isCover) - Number(a.isCover));
  const year = project.modifiedTime ? new Date(project.modifiedTime).getFullYear() : '';
  const live = LIVE_SITES[project.name.trim().toLowerCase()];
  const category = ar ? arCategories[project.category] || project.category : project.category;

  return (
    <div className="mx-viewer" role="dialog" aria-modal="true" aria-labelledby="viewer-title" onClick={onClose} dir={ar ? 'rtl' : 'ltr'}>
      <div className="mx-viewer-inner" onClick={(e) => e.stopPropagation()}>
        <div className="mx-viewer-bar">
          <button ref={closeRef} type="button" className="mx-viewer-close" onClick={onClose} aria-label={ar ? 'إغلاق المشروع' : 'Close project'}>
            <X aria-hidden />
          </button>
        </div>
        <header className="mx-viewer-head">
          <p className="mx-viewer-meta caption-1">
            <span>{project.subcategory ? `${category} · ${project.subcategory}` : category}</span>
            {year && <span>{year}</span>}
            <span>{media.length} {ar ? 'ملف' : media.length === 1 ? 'file' : 'files'}</span>
          </p>
          <h2 id="viewer-title" className="heading-2">{project.name}</h2>
          <p className="body-3">{projectBlurb(project, lang)}</p>
          {live && (
            <a className="mx-btn mx-btn-primary button-md" href={live} target="_blank" rel="noopener noreferrer">
              {ar ? 'زيارة الموقع المباشر' : 'Visit the live site'} <ArrowUpRight aria-hidden />
            </a>
          )}
        </header>

        {media.length === 0 ? (
          <div className="mx-empty">
            <h3 className="heading-5">{ar ? 'لا توجد ملفات بعد.' : 'No files here yet.'}</h3>
            <p className="body-3">{ar ? 'هذا المشروع لا يحتوي على صور أو فيديوهات مدعومة حتى الآن.' : 'This project has no supported images or videos yet.'}</p>
          </div>
        ) : (
          <div className="mx-viewer-grid">
            {media.map((item) => (
              <figure key={item.id} className="mx-media">
                <div className="mx-media-frame">
                  <MediaPreview item={item} title={project.name} ar={ar} />
                </div>
                <figcaption className="mx-media-cap caption-4">
                  <span>{item.name}</span>
                  <a className="mx-link" href={item.url} target="_blank" rel="noopener noreferrer">
                    {ar ? 'فتح' : 'Open'} <ArrowSquareOut aria-hidden />
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
