import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Language } from '../types';
import { contentData } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { DrivePortfolioProject, fetchPortfolioFromDrive } from '../lib/portfolioDrive';
import { ArrowUpRight, FolderOpen, Image as ImageIcon, LoaderCircle, Play, RefreshCw, TriangleAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsSectionProps {
  lang: Language;
}

const CATEGORY_ORDER = ['Branding', 'Motion Graphic', 'Motion Graphics', 'Social Media', '3D', 'Other Work'];

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  'Branding': { en: 'Branding', ar: 'الهوية البصرية' },
  'Motion Graphic': { en: 'Motion Graphic', ar: 'موشن جرافيك' },
  'Motion Graphics': { en: 'Motion Graphics', ar: 'موشن جرافيك' },
  'Social Media': { en: 'Social Media', ar: 'سوشيال ميديا' },
  '3D': { en: '3D', ar: 'ثلاثي الأبعاد' },
  'Other Work': { en: 'Other Work', ar: 'أعمال أخرى' },
};

function categoryLabel(name: string, lang: Language) {
  return CATEGORY_LABELS[name]?.[lang] || name;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const t = contentData[lang];
  const isRTL = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProject, setActiveProject] = useState<DrivePortfolioProject | null>(null);
  const [projects, setProjects] = useState<DrivePortfolioProject[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  const load = useCallback(async (forceRefresh = false) => {
    forceRefresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const data = await fetchPortfolioFromDrive(forceRefresh);
      setProjects(data.projects);
      setCategories([...data.categories].sort((a, b) => {
        const ai = CATEGORY_ORDER.indexOf(a.name);
        const bi = CATEGORY_ORDER.indexOf(b.name);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi) || a.name.localeCompare(b.name);
      }));
      setUpdatedAt(data.updatedAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load Google Drive portfolio.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPortfolioFromDrive(false, controller.signal)
      .then((data) => {
        setProjects(data.projects);
        setCategories([...data.categories].sort((a, b) => {
          const ai = CATEGORY_ORDER.indexOf(a.name);
          const bi = CATEGORY_ORDER.indexOf(b.name);
          return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi) || a.name.localeCompare(b.name);
        }));
        setUpdatedAt(data.updatedAt);
        setError(null);
      })
      .catch((err) => {
        if (err?.name !== 'AbortError') setError(err instanceof Error ? err.message : 'Unable to load Google Drive portfolio.');
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const filteredProjects = useMemo(
    () => selectedCategory === 'all' ? projects : projects.filter((project) => project.category === selectedCategory),
    [projects, selectedCategory]
  );

  return (
    <section id="work" className="py-24 sm:py-32 border-t border-white/10 relative bg-[#0d0c0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f46c38] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#f46c38] animate-pulse" />
              <span>{t.sectionProjectsEyebrow}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">
              {t.sectionProjects}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">{t.sectionProjectsSubtitle}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
              <span>{isRTL ? 'متصل بـ Google Drive' : 'Live from Google Drive'}</span>
              <span>•</span>
              <button
                onClick={() => load(true)}
                disabled={refreshing}
                className="inline-flex items-center gap-1.5 text-[#f46c38] hover:text-white disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                {isRTL ? 'تحديث' : 'Refresh'}
              </button>
              {updatedAt && <span className="hidden sm:inline">{new Date(updatedAt).toLocaleTimeString(lang === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</span>}
            </div>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 sm:mb-14 border-b border-white/10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${selectedCategory === 'all' ? 'bg-[#f46c38] text-white border border-[#f46c38]' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
          >
            {t.filterAll}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${selectedCategory === category.name ? 'bg-[#f46c38] text-white border border-[#f46c38]' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`}
            >
              {categoryLabel(category.name, lang)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="min-h-72 flex flex-col items-center justify-center gap-3 text-gray-400 border border-white/10 rounded-2xl bg-white/[0.02]">
            <LoaderCircle className="w-7 h-7 animate-spin text-[#f46c38]" />
            <span>{isRTL ? 'جاري تحميل أعمالك من Google Drive...' : 'Loading your work from Google Drive...'}</span>
          </div>
        ) : error ? (
          <div className="min-h-72 flex flex-col items-center justify-center gap-4 text-center border border-[#f46c38]/30 rounded-2xl bg-[#f46c38]/5 px-6">
            <TriangleAlert className="w-8 h-8 text-[#f46c38]" />
            <div>
              <p className="font-bold text-white">{isRTL ? 'لم يتم ربط Google Drive بعد' : 'Google Drive is not connected yet'}</p>
              <p className="text-sm text-gray-400 mt-2 max-w-2xl">{error}</p>
            </div>
            <button onClick={() => load(true)} className="rounded-xl bg-[#f46c38] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#e05a26] transition-colors">
              {isRTL ? 'إعادة المحاولة' : 'Try again'}
            </button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="min-h-72 flex flex-col items-center justify-center gap-3 text-center border border-dashed border-white/15 rounded-2xl text-gray-400 px-6">
            <FolderOpen className="w-9 h-9 text-[#f46c38]" />
            <p className="font-semibold text-white">{isRTL ? 'لا توجد مشاريع داخل هذا القسم حتى الآن' : 'No projects in this category yet'}</p>
            <p className="text-sm max-w-xl">{isRTL ? 'أنشئ مجلد مشروع جديد داخل القسم في Google Drive وسيظهر هنا تلقائيًا.' : 'Create a new project folder inside this category in Google Drive and it will appear here automatically.'}</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const cover = project.cover;
                const year = project.modifiedTime ? new Date(project.modifiedTime).getFullYear() : '';
                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className={`group relative bg-[#141211] border border-white/10 hover:border-[#f46c38]/60 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer shadow-xl ${index === 0 && selectedCategory === 'all' ? 'md:col-span-2' : ''}`}
                  >
                    <div className={`relative overflow-hidden bg-black/60 ${index === 0 && selectedCategory === 'all' ? 'aspect-[21/9] min-h-[300px]' : 'aspect-[16/10]'}`}>
                      {cover?.type === 'image' ? (
                        <img src={cover.url} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      ) : cover?.type === 'video' ? (
                        <video src={cover.url} muted loop autoPlay playsInline preload="metadata" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-white/[0.06] to-transparent text-gray-500">
                          <ImageIcon className="w-10 h-10" />
                          <span className="text-sm">{isRTL ? 'أضف cover.jpg داخل مجلد المشروع' : 'Add cover.jpg to this project folder'}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-black/20 to-transparent opacity-80" />
                      <div className="absolute top-4 start-4">
                        <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                          {categoryLabel(project.category, lang)}
                        </span>
                      </div>
                      {cover?.type === 'video' && (
                        <div className="absolute top-4 end-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white flex items-center gap-1.5 text-xs font-semibold">
                          <Play className="w-3 h-3 text-[#f46c38] fill-[#f46c38]" />
                          <span>{isRTL ? 'فيديو' : 'Video'}</span>
                        </div>
                      )}
                      <div className="absolute bottom-4 end-4 w-11 h-11 rounded-full bg-[#f46c38] text-white flex items-center justify-center shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 border-t border-white/5">
                      <div className="flex items-center gap-2 mb-2 text-xs">
                        <span className="font-bold text-[#f46c38] uppercase tracking-wider">{categoryLabel(project.category, lang)}</span>
                        {year && <><span className="text-gray-600">•</span><span className="text-gray-400">{year}</span></>}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-[#f46c38] transition-colors">{project.name}</h3>
                      <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5">
                        <span className="text-xs text-gray-400">{project.media.length} {isRTL ? 'ملف' : project.media.length === 1 ? 'file' : 'files'}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                          {isRTL ? 'عرض المشروع' : 'View project'} <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ProjectDetailModal project={activeProject} lang={lang} onClose={() => setActiveProject(null)} />
    </section>
  );
};
