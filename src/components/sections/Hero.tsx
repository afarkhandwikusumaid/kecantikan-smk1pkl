import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Award, Users, Briefcase, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [partnerships, setPartnerships] = useState<any[]>([
    { id: '1', name: 'Martha Tilaar', subtitle: 'GROUP', isPink: false },
    { id: '2', name: 'Mustika Ratu', subtitle: '', isPink: true },
    { id: '3', name: 'Wardah', subtitle: 'Cosmetics', isPink: false },
    { id: '4', name: 'BNSP LSP-P1', subtitle: '', isPink: false },
    { id: '5', name: 'Rudy Hadisuwarno', subtitle: '', isPink: true }
  ]);

  useEffect(() => {
    async function fetchMitra() {
      try {
        const { data } = await supabase.from('site_settings').select('value').eq('key', 'mitra_industri').single();
        if (data && data.value) setPartnerships(data.value as any[]);
      } catch (err) { console.error(err); }
    }
    fetchMitra();
  }, []);

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
      title: "Praktik Eduspa Salon",
      subtitle: "Teaching Factory Unggulan"
    },
    {
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800",
      title: "Seni Hairdressing Kreatif",
      subtitle: "Kurikulum Hubungan Industri"
    },
    {
      img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800",
      title: "Rias Pengantin Nusantara",
      subtitle: "Estetika Tradisional & Modern"
    }
  ];

  // Auto-cycle slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="beranda" className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-white">
      {/* Background Subtle Sparkle Accents */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-pink-50/40 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full bg-rose-50/25 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Bold Titles, UDINUS Inspired Structure */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Round Program Tag with Pink highlight */}
            <div className="inline-flex items-center space-x-2 bg-pink-50/70 border border-pink-100/60 px-4 py-2 rounded-full text-pink-700 text-xs font-semibold tracking-wide animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              <span>Program Keahlian Tata Kecantikan Kulit &amp; Rambut</span>
              <span className="text-pink-400">✦</span>
            </div>

            {/* Main School Heading with customized UDINUS styling (using pink/rose accent) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-sans font-black text-gray-950 leading-[1.08] tracking-tight">
                Membentuk <br />
                <span className="text-pink-600">Kecantikan &amp;</span> <br />
                <span className="text-gold-500 font-serif italic font-normal">Estetika Unggul</span>
              </h1>

              {/* Segmented Underline Pills - exact reference match */}
              <div className="flex gap-1.5 pt-1">
                <div className="w-10 h-1 bg-pink-600 rounded-full" />
                <div className="w-14 h-1 bg-pink-500 rounded-full" />
                <div className="w-8 h-1 bg-pink-400 rounded-full" />
                <div className="w-12 h-1 bg-pink-300 rounded-full" />
                <div className="w-5 h-1 bg-pink-200 rounded-full" />
              </div>
            </motion.div>

            {/* Program Description */}
            <p className="text-gray-600 text-sm sm:text-base md:text-[15px] leading-relaxed max-w-xl font-medium">
              Membangun masa depan karir gemilang melalui <strong className="text-gray-950 font-extrabold bg-pink-50/80 px-1 py-0.5 rounded">pendidikan vokasi kecantikan</strong> yang bersertifikasi industri nasional dan internasional serta berbasis technopreneurship yang inovatif.
            </p>

            {/* Interactive Call to Actions */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                id="hero-enroll-action"
                onClick={() => onNavigate('akademik')}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-xl transition-all duration-300 shadow-sm hover:shadow-pink-200/50 hover:shadow-lg flex items-center space-x-2 group shrink-0"
              >
                <span>Buka Kurikulum Akademik</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                id="hero-see-competence"
                onClick={() => onNavigate('kompetensi')}
                className="bg-white border border-gray-200 hover:border-pink-200 hover:bg-pink-50/30 text-gray-700 hover:text-pink-700 font-bold text-xs uppercase tracking-widest px-5 py-4 rounded-xl transition-all duration-300 flex items-center space-x-2"
              >
                <span>Lihat Kompetensi</span>
              </button>
            </div>

            {/* Elegant Vertical/Horizontal Statistics Cards - Exact reference style */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              
              {/* Stat 1 */}
              <div className="bg-white rounded-2xl border border-gray-150 p-3 sm:p-4 shadow-2xs flex sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-3.5 hover:shadow-xs transition-all duration-300 flex-col sm:flex-row">
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-pink-600" />
                </div>
                <div className="space-y-0.5">
                  <span className="block font-sans text-lg sm:text-xl font-black text-gray-950 leading-none">100%</span>
                  <span className="block text-sm sm:text-base text-gray-500 font-semibold whitespace-nowrap">Asesor BNSP</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white rounded-2xl border border-gray-150 p-3 sm:p-4 shadow-2xs flex sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-3.5 hover:shadow-xs transition-all duration-300 flex-col sm:flex-row">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-rose-600" />
                </div>
                <div className="space-y-0.5">
                  <span className="block font-sans text-lg sm:text-xl font-black text-gray-950 leading-none">98%</span>
                  <span className="block text-sm sm:text-base text-gray-500 font-semibold whitespace-nowrap">Peluang Kerja</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white rounded-2xl border border-gray-150 p-3 sm:p-4 shadow-2xs flex sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-3.5 hover:shadow-xs transition-all duration-300 flex-col sm:flex-row">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div className="space-y-0.5">
                  <span className="block font-sans text-lg sm:text-xl font-black text-gray-950 leading-none">A</span>
                  <span className="block text-sm sm:text-base text-gray-500 font-semibold whitespace-nowrap">Akreditasi Unggul</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Hero Slider Frame - reference matched style */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[1.4] lg:aspect-[1.12] rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg group">
              
              {/* Active Image slide */}
              <div className="relative w-full h-full bg-gray-50 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    src={slides[activeSlide].img}
                    alt={slides[activeSlide].title}
                    className="w-full h-full object-cover filter brightness-[0.93]"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {/* Decorative dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Star / Prestige Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-pink-100/30 shadow-md rounded-xl px-3 py-1.5 flex items-center space-x-1.5 z-10">
                <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-black text-gray-800 uppercase tracking-widest">Sekolah Hebat</span>
              </div>

              {/* Floating Slide Info Box - Clean white card reference match */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-md rounded-2xl py-3.5 px-4.5 shadow-lg border border-white/50 max-w-[260px] z-15 transform hover:scale-[1.02] transition-transform duration-300">
                <span className="text-xs font-black uppercase tracking-widest text-pink-600 block">
                  {slides[activeSlide].subtitle}
                </span>
                <h3 className="font-sans text-[13px] font-extrabold text-gray-950 mt-1.5 leading-snug">
                  {slides[activeSlide].title}
                </h3>
              </div>

              {/* Slider Dots - Reference bottom right placement */}
              <div className="absolute bottom-5 right-5 flex gap-1.5 bg-black/40 backdrop-blur-xs px-3 py-2 rounded-full z-15">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeSlide === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Trust & Academic Excellence Banner */}
      <div className="mt-16 bg-white py-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm tracking-[0.25em] text-pink-600 uppercase font-black mb-8">
            Kemitraan Industri &amp; Sertifikasi Terpercaya
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-75">
            {partnerships.map((partner) => (
              <div key={partner.id} className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all cursor-pointer">
                <span className={`font-serif font-bold ${partner.isPink ? 'text-pink-700' : 'text-gray-700'} text-lg sm:text-xl`}>
                  {partner.name}
                </span>
                {partner.subtitle && (
                  <span className="text-xs text-pink-400 font-sans tracking-widest uppercase">
                    {partner.subtitle}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
