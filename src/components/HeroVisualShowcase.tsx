import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Play, Sparkles, Layers, Video, Palette, Box, ArrowUpRight, Film, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroVisualShowcaseProps {
  lang: Language;
}

export const HeroVisualShowcase: React.FC<HeroVisualShowcaseProps> = ({ lang }) => {
  const isRTL = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'motion' | 'branding' | 'video'>('motion');
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-switch tabs subtly every 7 seconds unless interacted
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === 'motion') return 'branding';
        if (prev === 'branding') return 'video';
        return 'motion';
      });
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const tabOptions = [
    {
      id: 'motion',
      label: isRTL ? 'الموشن والتحريك' : 'Motion & Animation',
      icon: Film,
      badge: 'Showreel 2025',
    },
    {
      id: 'branding',
      label: isRTL ? 'الهوية والبراند' : 'Brand Systems',
      icon: Palette,
      badge: 'Identity',
    },
    {
      id: 'video',
      label: isRTL ? 'المونتاج و 3D' : 'Video & 3D',
      icon: Box,
      badge: 'CGI & Cut',
    },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#f46c38]/30 via-amber-500/10 to-[#c5ff41]/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000 -z-10" />

      {/* Main Container Card */}
      <div className="relative bg-[#1a1715]/90 border border-white/10 hover:border-[#f46c38]/50 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl transition-all duration-300">
        
        {/* Top Header & Discipline Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f46c38] animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-gray-300 uppercase">
              {isRTL ? 'معرض الأعمال الإبداعية' : 'SELECTED CREATIVE SHOWCASE'}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
            {tabOptions.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'motion' | 'branding' | 'video')}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#f46c38] shadow-md shadow-[#f46c38]/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] rounded-xl overflow-hidden bg-black/80 border border-white/10 group">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: MOTION & ANIMATION */}
            {activeTab === 'motion' && (
              <motion.div
                key="motion"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 bg-gradient-to-br from-[#1e1b18] via-[#12100f] to-[#281812]"
              >
                {/* Background Geometric Visual Art */}
                <div className="absolute inset-0 opacity-25 pointer-events-none overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-[#f46c38] animate-[spin_20s_linear_infinite]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-dashed border-[#c5ff41]/40 animate-[spin_30s_linear_infinite_reverse]" />
                </div>

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#f46c38]/40 text-[#f46c38] text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>2D / 3D Motion Reel</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    00:45 / 4K 60FPS
                  </span>
                </div>

                {/* Central Play/Motion Interactive Trigger */}
                <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="group/btn relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f46c38] hover:bg-[#e05a26] text-white flex items-center justify-center shadow-xl shadow-[#f46c38]/30 transition-all transform hover:scale-110 active:scale-95 cursor-pointer mb-3"
                  >
                    <span className="absolute -inset-2 rounded-full border border-[#f46c38]/40 animate-ping opacity-50" />
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ms-1" />
                  </button>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {isRTL ? 'عرض الـ Showreel السينمائي' : 'Watch Motion Graphics Showreel'}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {isRTL ? 'الموشن، الرسوم المتحركة، والمؤثرات البصرية' : 'Dynamic typography, kinetic animation & visual FX'}
                  </p>
                </div>

                {/* Timeline Audio/Keyframe Bar Mockup */}
                <div className="relative z-10 bg-black/60 backdrop-blur-md p-2.5 rounded-lg border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#c5ff41] animate-ping" />
                  <div className="flex-1 flex items-center gap-1 h-4">
                    {[40, 85, 55, 95, 30, 70, 100, 60, 80, 45, 90, 65, 35, 75, 50, 95, 40].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#f46c38]/80 hover:bg-[#c5ff41] rounded-full transition-all duration-300"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">4K HDR</span>
                </div>
              </motion.div>
            )}

            {/* TAB 2: BRAND SYSTEMS */}
            {activeTab === 'branding' && (
              <motion.div
                key="branding"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-5 sm:p-6 bg-gradient-to-br from-[#171a1c] via-[#101214] to-[#1c1822] flex flex-col justify-between"
              >
                {/* Brand Grid Header */}
                <div className="flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-[#c5ff41]/40 text-[#c5ff41] text-xs font-bold">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Brand System Architecture</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Identity Guidelines</span>
                </div>

                {/* Visual Brand Grid Showcase */}
                <div className="grid grid-cols-3 gap-3 my-auto z-10">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:border-[#f46c38] transition-all group/card">
                    <div className="w-10 h-10 rounded-full bg-[#f46c38]/20 text-[#f46c38] flex items-center justify-center font-black text-xl mb-2 group-hover/card:scale-110 transition-transform">
                      ✦
                    </div>
                    <span className="text-xs font-bold text-white">Logo Systems</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">Vector Marks</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:border-[#f46c38] transition-all group/card">
                    <div className="flex items-center gap-1 mb-2">
                      <span className="w-3 h-3 rounded-full bg-[#f46c38]" />
                      <span className="w-3 h-3 rounded-full bg-[#c5ff41]" />
                      <span className="w-3 h-3 rounded-full bg-white" />
                    </div>
                    <span className="text-xs font-bold text-white">Color Systems</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">Palette Rules</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:border-[#f46c38] transition-all group/card">
                    <span className="text-lg font-black text-[#c5ff41] mb-1 font-serif">Aa</span>
                    <span className="text-xs font-bold text-white">Typography</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">Editorial Pairings</span>
                  </div>
                </div>

                {/* Bottom Tag */}
                <div className="bg-black/60 p-2.5 rounded-lg border border-white/10 flex items-center justify-between text-xs z-10">
                  <span className="text-gray-300 font-medium">Integrated Brand Collateral & Packaging</span>
                  <CheckCircle2 className="w-4 h-4 text-[#c5ff41]" />
                </div>
              </motion.div>
            )}

            {/* TAB 3: VIDEO & 3D */}
            {activeTab === 'video' && (
              <motion.div
                key="video"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 p-5 sm:p-6 bg-gradient-to-br from-[#1a141c] via-[#120f17] to-[#1f1a26] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-purple-400/40 text-purple-300 text-xs font-bold">
                    <Box className="w-3.5 h-3.5" />
                    <span>3D & Video Production</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Blender / Premiere</span>
                </div>

                <div className="my-auto z-10 text-center">
                  <div className="relative inline-block p-4 rounded-2xl bg-white/5 border border-white/10 mb-2">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 mb-2">
                      <Video className="w-8 h-8" />
                    </div>
                    <h5 className="text-sm font-bold text-white">Commercial Editing & CGI</h5>
                    <p className="text-xs text-gray-400 mt-1">Color Grading · Sound Design · Motion Control</p>
                  </div>
                </div>

                <div className="bg-black/60 p-2.5 rounded-lg border border-white/10 flex items-center justify-between text-xs z-10">
                  <span className="text-gray-300 font-medium">Social Content & Campaign Ad Cut</span>
                  <span className="text-purple-400 font-mono text-[10px]">1080x1920 & 4K</span>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Quick Feature Highlights */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-300">
          <div className="bg-white/5 border border-white/5 rounded-lg py-2 px-1 hover:border-[#f46c38]/40 transition-colors">
            <span className="text-[#f46c38] block font-bold text-xs">Motion & 2D/3D</span>
            <span className="text-gray-400 text-[10px]">Animation</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-lg py-2 px-1 hover:border-[#f46c38]/40 transition-colors">
            <span className="text-[#f46c38] block font-bold text-xs">Brand Systems</span>
            <span className="text-gray-400 text-[10px]">Visual Identity</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-lg py-2 px-1 hover:border-[#f46c38]/40 transition-colors">
            <span className="text-[#f46c38] block font-bold text-xs">Video & Campaigns</span>
            <span className="text-gray-400 text-[10px]">Creative Content</span>
          </div>
        </div>

      </div>
    </div>
  );
};
