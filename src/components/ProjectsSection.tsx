import React, { useState } from 'react';
import { Language, ProjectItem } from '../types';
import { contentData, projectsData } from '../data/portfolioData';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectsSectionProps {
  lang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const t = contentData[lang];
  const isRTL = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filterOptions = [
    { id: 'all', label: t.filterAll },
    { id: 'campaigns', label: t.filterCampaigns },
    { id: 'social', label: t.filterSocial },
    { id: 'motion', label: t.filterMotion },
    { id: 'branding', label: t.filterBranding },
    { id: 'digital', label: t.filterDigital },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter((p) =>
          p.categories ? p.categories.includes(selectedCategory) : p.category === selectedCategory
        );

  return (
    <section id="work" className="py-24 sm:py-32 border-t border-white/10 relative bg-[#0d0c0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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
          <p className="text-base sm:text-lg text-gray-400 max-w-md leading-relaxed font-normal">
            {t.sectionProjectsSubtitle}
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 sm:mb-14 scrollbar-none border-b border-white/10">
          {filterOptions.map((opt) => {
            const isActive = selectedCategory === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedCategory(opt.id)}
                className={`text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#f46c38] text-white shadow-lg shadow-[#f46c38]/25 border border-[#f46c38]'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Selected Work Editorial Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const disciplinesList = project.disciplines[lang] || [];
              const isFeatured = project.featured && selectedCategory === 'all';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`group relative bg-[#141211] border border-white/10 hover:border-[#f46c38]/60 rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl ${
                    isFeatured ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Top 75% Visual Media Container */}
                  <div className={`relative overflow-hidden bg-black/60 ${isFeatured ? 'aspect-[21/9] min-h-[300px]' : 'aspect-[16/10]'}`}>
                    {project.videoUrl ? (
                      <div className="relative w-full h-full">
                        <video
                          src={project.videoUrl}
                          poster={project.imageUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white flex items-center gap-1.5 text-xs font-semibold">
                          <Play className="w-3 h-3 text-[#f46c38] fill-[#f46c38]" />
                          <span>Video Loop</span>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={project.imageUrl}
                        alt={project.title[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Client Pill Tag */}
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                      <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                        {project.client}
                      </span>
                    </div>

                    {/* Hover Action Arrow Badge */}
                    <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 w-11 h-11 rounded-full bg-[#f46c38] text-white flex items-center justify-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom 25% Project Info */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow border-t border-white/5">
                    <div>
                      {/* Client Subtitle / Category Eyebrow */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-[#f46c38] uppercase tracking-wider">
                          {project.client}
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="text-xs text-gray-400 font-medium">
                          {project.year || '2024'}
                        </span>
                      </div>

                      {/* Main Project Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 group-hover:text-[#f46c38] transition-colors leading-snug">
                        {project.title[lang]}
                      </h3>

                      {/* Disciplines Separated by Dots */}
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium">
                        {disciplinesList.map((disc, idx) => (
                          <React.Fragment key={idx}>
                            <span>{disc}</span>
                            {idx < disciplinesList.length - 1 && (
                              <span className="text-[#f46c38] font-bold">•</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Footer View Action Prompt */}
                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                      <span>{t.viewProjectModalCTA}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#f46c38] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        lang={lang}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
