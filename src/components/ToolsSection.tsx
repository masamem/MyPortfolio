import React from 'react';
import { Language } from '../types';
import { contentData, capabilitiesData, toolkitData } from '../data/portfolioData';
import {
  Compass,
  Palette,
  Share2,
  Film,
  Video,
  Sparkles,
  Wand2,
  Box,
  Wrench,
  LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';

interface ToolsSectionProps {
  lang: Language;
}

const iconMap: Record<string, LucideIcon> = {
  Compass,
  Palette,
  Share2,
  Film,
  Video,
  Sparkles,
  Wand2,
  Box,
};

export const ToolsSection: React.FC<ToolsSectionProps> = ({ lang }) => {
  const t = contentData[lang];
  const isRTL = lang === 'ar';

  return (
    <section
      id="capabilities"
      className="py-16 sm:py-20 border-t border-white/10 relative bg-[#0b0a09]"
    >
      {/* Anchor for navigation links pointing to #tools */}
      <div id="tools" className="absolute -top-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ccf52b] mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#ccf52b] animate-pulse" />
              <span>{t.sectionToolsEyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none uppercase">
              {t.sectionTools}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed font-normal">
            {t.sectionToolsSubtitle}
          </p>
        </div>

        {/* Primary Area: Capabilities Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12 sm:mb-14">
          {capabilitiesData.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || Sparkles;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="group relative bg-[#141211] border border-white/10 hover:border-[#ccf52b]/50 rounded-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-md"
              >
                <div>
                  {/* Top Header: Icon & Subtle Corner Detail */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:text-[#ccf52b] group-hover:bg-[#ccf52b]/10 group-hover:border-[#ccf52b]/30 transition-all duration-300">
                      <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-600 group-hover:text-[#ccf52b]/70 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Capability Title */}
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#ccf52b] transition-colors leading-snug">
                    {item.title[lang]}
                  </h3>

                  {/* Supporting Descriptor */}
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.descriptor[lang]}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-gray-500 group-hover:text-gray-300 transition-colors">
                    {isRTL ? 'خدمة متخصصة' : 'Core Capability'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#ccf52b] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary Area: Creative Toolkit */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#ccf52b]" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-300">
                {t.toolkitTitle}
              </h3>
            </div>
            <span className="text-xs text-gray-500 font-normal">
              {isRTL
                ? 'البرامج والتطبيقات الأساسية المستخدمة لتنفيذ المشاريع'
                : 'Primary software utilized in production workflows'}
            </span>
          </div>

          {/* Compact Horizontal Pill List */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {toolkitData.map((tool, idx) => (
              <div
                key={idx}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 cursor-default ${
                  tool.isAi
                    ? 'bg-[#ccf52b]/10 text-[#ccf52b] border-[#ccf52b]/30 hover:bg-[#ccf52b]/20'
                    : 'bg-white/[0.04] text-gray-300 border-white/10 hover:border-white/25 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccf52b]" />
                <span>{tool[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
