import React, { useState } from 'react';
import { Language } from '../types';
import { contentData } from '../data/portfolioData';
import { Mail, Phone, Copy, Check, Send, Sparkles, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const BehanceIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7V5h7v2zm-1.708 3.829c-.108-.344-.276-.653-.5-.929s-.515-.487-.872-.635c-.358-.148-.78-.222-1.266-.222-.596 0-1.115.111-1.558.332-.442.222-.811.528-1.107.919-.296.39-.513.85-.65 1.378-.137.528-.206 1.088-.206 1.68 0 .614.072 1.185.215 1.713.143.528.362.986.658 1.374.296.388.666.69 1.111.907.445.217.962.326 1.55.326.697 0 1.288-.152 1.774-.457.486-.305.867-.732 1.144-1.281l-1.921-.994c-.114.234-.271.417-.471.549-.201.132-.449.198-.745.198-.387 0-.702-.119-.945-.357-.243-.238-.385-.589-.426-1.053h6.417c.01-.1.015-.205.015-.315 0-.645-.078-1.248-.233-1.808a4.015 4.015 0 0 0-.895-1.442zM16.59 12.188c.036-.395.147-.704.333-.928.186-.224.444-.336.773-.336.31 0 .559.105.748.315.189.21.303.513.342.909h-2.196zM8.328 12.871c.421-.215.743-.513.966-.895.223-.382.335-.832.335-1.35 0-.584-.112-1.077-.335-1.479a2.86 2.86 0 0 0-.916-1.019c-.387-.253-.855-.429-1.404-.528C6.425 7.502 5.8 7.452 5.101 7.452H0v10.999h5.362c.769 0 1.455-.062 2.059-.187a4.343 4.343 0 0 0 1.636-.635c.47-.298.835-.689 1.096-1.173.261-.484.391-1.055.391-1.713 0-.717-.184-1.34-.551-1.872a3.376 3.376 0 0 0-1.665-1.002zM3.054 9.479h1.925c.451 0 .817.039 1.098.118.281.079.5.198.657.357.157.159.263.355.318.588.055.233.082.498.082.795 0 .614-.143 1.079-.429 1.395-.286.316-.723.474-1.311.474H3.054V9.479zm3.012 7.106H3.054v-2.388h2.955c.531 0 .942.062 1.233.187.291.125.509.289.654.492.145.203.218.438.218.705 0 .341-.081.62-.243.837-.162.217-.387.375-.675.474-.288.099-.684.148-1.189.148z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = contentData[lang];
  const isRTL = lang === 'ar';

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Motion Graphics',
    budget: '$1,000 - $3,000',
    message: '',
  });

  const [formSent, setFormSent] = useState(false);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} - ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget Range: ${formData.budget}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:mugahedalmaari@gmail.com?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <section id="contact" className="py-16 sm:py-28 border-t border-white/10 relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ccf52b] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#ccf52b]" />
            <span>{isRTL ? 'بدء التعاون' : 'GET IN TOUCH'}</span>
          </div>
          <h2 className="text-3xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none mb-4 sm:mb-6">
            {t.sectionContact}
          </h2>
          <p className="text-lg sm:text-xl text-gray-300">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Contact Info & Socials (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Email Card */}
              <div className="group bg-white/[0.04] border border-white/10 hover:border-[#ccf52b] rounded-2xl p-5 sm:p-6 transition-all">
                <div className="flex items-center justify-between">
                  <a
                    href="mailto:mugahedalmaari@gmail.com"
                    className="flex items-center gap-4 text-white hover:text-[#ccf52b] transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#ccf52b]/15 border border-[#ccf52b]/30 flex items-center justify-center text-[#ccf52b]">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">{isRTL ? 'البريد الإلكتروني' : 'Email Address'}</div>
                      <div className="text-base sm:text-lg font-bold">mugahedalmaari@gmail.com</div>
                    </div>
                  </a>

                  <button
                    onClick={() => handleCopy('mugahedalmaari@gmail.com', 'email')}
                    className="p-2.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                    title={t.quickCopyEmail}
                  >
                    {copiedField === 'email' ? <Check className="w-5 h-5 text-[#c5ff41]" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="group bg-white/[0.04] border border-white/10 hover:border-[#ccf52b] rounded-2xl p-5 sm:p-6 transition-all">
                <div className="flex items-center justify-between">
                  <a
                    href="tel:+966500582126"
                    className="flex items-center gap-4 text-white hover:text-[#ccf52b] transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#ccf52b]/15 border border-[#ccf52b]/30 flex items-center justify-center text-[#ccf52b]">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">{isRTL ? 'الهاتف / واتساب' : 'Phone / WhatsApp'}</div>
                      <div className="text-base sm:text-lg font-bold" dir="ltr">+966 50 0582126</div>
                    </div>
                  </a>

                  <button
                    onClick={() => handleCopy('+966500582126', 'phone')}
                    className="p-2.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                    title={t.quickCopyPhone}
                  >
                    {copiedField === 'phone' ? <Check className="w-5 h-5 text-[#c5ff41]" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Social Channels: Behance, LinkedIn, Instagram (No duplicates, brand icons) */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  {isRTL ? 'المنصات والمعارض الرقمية:' : 'Portfolio & Social Channels:'}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Behance */}
                  <a
                    href="https://behance.net/mugahedalmaari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#ccf52b] text-white transition-all cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
                      <BehanceIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white group-hover:text-[#ccf52b] transition-colors truncate">Behance</div>
                      <div className="text-[11px] text-gray-400 truncate">mugahedalmaari</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white shrink-0" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/mugahedalmaari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#ccf52b] text-white transition-all cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-600/20 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white group-hover:text-[#ccf52b] transition-colors truncate">LinkedIn</div>
                      <div className="text-[11px] text-gray-400 truncate">mugahedalmaari</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white shrink-0" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/mugahedalmaari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#ccf52b] text-white transition-all cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-pink-600/20 border border-pink-500/30 text-pink-400 flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
                      <InstagramIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white group-hover:text-[#ccf52b] transition-colors truncate">Instagram</div>
                      <div className="text-[11px] text-gray-400 truncate">mugahedalmaari</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ccf52b]" />
              <span>{t.contactFormTitle}</span>
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    {isRTL ? 'الاسم' : 'Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.formNamePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccf52b] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t.formEmailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccf52b] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    {t.formProjectTypeLabel}
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#151312] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccf52b] transition-colors"
                  >
                    <option value="Motion Graphics">Motion Graphics & Animation</option>
                    <option value="Brand Identity">Brand Identity & Visual Design</option>
                    <option value="Video Editing">Video Editing & Editing</option>
                    <option value="Social Media">Social Media Campaigns</option>
                    <option value="UI/UX Design">UI/UX & Web Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    {t.budgetLabel}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#151312] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccf52b] transition-colors"
                  >
                    <option value="< $1,000">&lt; $1,000</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  {isRTL ? 'تفاصيل المشروع' : 'Project Details'}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={t.formMessagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ccf52b] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 font-bold text-sm text-[#151312] bg-[#ccf52b] hover:bg-[#b8df20] py-3.5 rounded-xl transition-all shadow-md shadow-[#ccf52b]/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.formSubmit}</span>
              </button>

              {formSent && (
                <div className="p-3 bg-[#c5ff41]/15 border border-[#c5ff41]/30 text-[#c5ff41] text-xs font-semibold rounded-xl text-center">
                  {isRTL ? 'جاري فتح تطبيق البريد لإرسال رسالتك...' : 'Opening email client with pre-filled inquiry...'}
                </div>
              )}
            </form>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
