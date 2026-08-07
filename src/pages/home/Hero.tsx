import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      img: "/images/photo-1540555700478-4be289fbecef.jpg",
      title: "Pendidikan Vokasi Kecantikan & Spa",
      subtitle: "Membentuk Generasi Unggul dan Berkarakter",
    },
    {
      img: "/images/photo-1487412720507-e7ab37603c6f.jpg",
      title: "Seni Hairdressing Kreatif",
      subtitle: "Kurikulum Standar Industri Nasional",
    },
    {
      img: "/images/photo-1512290923902-8a9f81dc236c.jpg",
      title: "Estetika & Kosmetologi",
      subtitle: "Fasilitas Praktik Berstandar Eduspa Klinik",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[600px] h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] bg-slate-900 overflow-hidden">
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            src={slides[activeSlide].img}
            alt={slides[activeSlide].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-slate-900/40" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
            <div className="max-w-3xl">
              <motion.div
                key={`text-${activeSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-1 bg-accent"></div>
                  <span className="text-accent font-bold tracking-widest uppercase text-xs sm:text-sm">SMK Negeri 1 Pekalongan</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-sans font-black text-white leading-tight mb-4 sm:mb-6 tracking-tight">
                  {slides[activeSlide].title}
                </h1>
                
                <p className="text-sm sm:text-base md:text-xl text-slate-200 mb-6 sm:mb-10 font-medium leading-relaxed max-w-2xl">
                  {slides[activeSlide].subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/pendaftaran"
                    className="w-full sm:w-auto text-center bg-accent hover:brightness-90 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all shadow-lg uppercase tracking-wider text-xs sm:text-sm"
                  >
                    Informasi Pendaftaran
                  </Link>
                  <Link
                    to="/profil"
                    className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/40 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-colors uppercase tracking-wider text-xs sm:text-sm"
                  >
                    Profil Jurusan
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows (Hidden on very small screens to avoid obstructing text) */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx ? 'w-8 bg-accent' : 'w-2 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
