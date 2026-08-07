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
    <section className="relative w-full h-[calc(100vh-80px)] bg-slate-900 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <motion.div
                key={`text-${activeSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-1 bg-accent"></div>
                  <span className="text-accent font-bold tracking-widest uppercase text-sm">SMK Negeri 1 Pekalongan</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-black text-white leading-tight mb-6">
                  {slides[activeSlide].title}
                </h1>
                
                <p className="text-lg md:text-xl text-slate-200 mb-10 font-medium">
                  {slides[activeSlide].subtitle}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/pendaftaran"
                    className="inline-block bg-accent hover:brightness-90 text-white font-bold px-8 py-4 rounded transition-all shadow-lg uppercase tracking-wider text-sm"
                  >
                    Informasi Pendaftaran
                  </Link>
                  <Link
                    to="/profil"
                    className="inline-block bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold px-8 py-4 rounded transition-colors uppercase tracking-wider text-sm"
                  >
                    Profil Jurusan
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-y-1/2 flex gap-3">
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
