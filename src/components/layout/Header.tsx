import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Menu, X, Heart, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'profil' | 'layanan' | null>(null);
  
  const profilRef = useRef<HTMLDivElement>(null);
  const layananRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideProfil = profilRef.current && profilRef.current.contains(target);
      const clickedInsideLayanan = layananRef.current && layananRef.current.contains(target);
      
      if (!clickedInsideProfil && !clickedInsideLayanan) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const isProfilActive = ['kompetensi', 'fasilitas'].includes(activeSection);
  const isLayananActive = ['eduspa', 'konsultasi', 'karya'].includes(activeSection);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/60 backdrop-blur-md border-b border-white/40 shadow-lg shadow-pink-900/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('beranda')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-pink-600 text-white shadow-md shadow-pink-200/50 transition-transform duration-500 group-hover:rotate-12">
              <Sparkles className="w-5 h-5" />
              <Heart className="w-2.5 h-2.5 absolute bottom-1 right-1 text-pink-100 fill-pink-100 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-gray-900">
                  BEAUTY<span className="text-pink-600 font-sans font-light text-base ml-1">SMK 1PKL</span>
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-pink-600 uppercase font-bold -mt-1">
                Tata Kecantikan &amp; Spa
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 font-sans">
            {/* Beranda */}
            <button
              id="nav-link-beranda"
              onClick={() => handleNavClick('beranda')}
              className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full relative group cursor-pointer ${
                activeSection === 'beranda'
                  ? 'text-pink-600 bg-pink-50/60 font-bold'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/20'
              }`}
            >
              Beranda
              {activeSection === 'beranda' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-pink-500 rounded-full" />
              )}
            </button>

            {/* Profil (Dropdown) */}
            <div className="relative" ref={profilRef}>
              <button
                id="nav-link-profil-trigger"
                onClick={() => setActiveDropdown(activeDropdown === 'profil' ? null : 'profil')}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full flex items-center space-x-1 group cursor-pointer ${
                  isProfilActive
                    ? 'text-pink-600 bg-pink-50/40 font-bold border border-pink-100'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/20'
                }`}
              >
                <span>Profil</span>
                <ChevronDown className={`w-3.5 h-3.5 text-pink-500 transition-transform duration-300 ${activeDropdown === 'profil' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'profil' && (
                <div 
                  id="nav-profil-dropdown"
                  className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-pink-100 rounded-2xl shadow-xl py-2 z-50 animate-fade-in"
                >
                  <button
                    onClick={() => handleNavClick('kompetensi')}
                    className={`w-full text-left px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 block ${
                      activeSection === 'kompetensi'
                        ? 'text-pink-600 bg-pink-50/60 font-bold'
                        : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/30'
                    }`}
                  >
                    Kompetensi Keahlian
                  </button>
                  <button
                    onClick={() => handleNavClick('fasilitas')}
                    className={`w-full text-left px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 block ${
                      activeSection === 'fasilitas'
                        ? 'text-pink-600 bg-pink-50/60 font-bold'
                        : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/30'
                    }`}
                  >
                    Profil &amp; Fasilitas
                  </button>
                </div>
              )}
            </div>

            {/* Akademik */}
            <button
              id="nav-link-akademik"
              onClick={() => handleNavClick('akademik')}
              className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full relative group cursor-pointer ${
                activeSection === 'akademik'
                  ? 'text-pink-600 bg-pink-50/60 font-bold'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/20'
              }`}
            >
              Akademik
              {activeSection === 'akademik' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-pink-500 rounded-full" />
              )}
            </button>

            {/* Dokumentasi */}
            <button
              id="nav-link-dokumentasi"
              onClick={() => handleNavClick('dokumentasi')}
              className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full relative group cursor-pointer ${
                activeSection === 'dokumentasi'
                  ? 'text-pink-600 bg-pink-50/60 font-bold'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/20'
              }`}
            >
              Dokumentasi
              {activeSection === 'dokumentasi' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-pink-500 rounded-full" />
              )}
            </button>

            {/* Layanan (Dropdown) */}
            <div className="relative" ref={layananRef}>
              <button
                id="nav-link-layanan-trigger"
                onClick={() => setActiveDropdown(activeDropdown === 'layanan' ? null : 'layanan')}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full flex items-center space-x-1 group cursor-pointer ${
                  isLayananActive
                    ? 'text-pink-600 bg-pink-50/40 font-bold border border-pink-100'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/20'
                }`}
              >
                <span>Layanan</span>
                <ChevronDown className={`w-3.5 h-3.5 text-pink-500 transition-transform duration-300 ${activeDropdown === 'layanan' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'layanan' && (
                <div 
                  id="nav-layanan-dropdown"
                  className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md border border-pink-100 rounded-2xl shadow-xl py-2 z-50 animate-fade-in"
                >
                  <button
                    onClick={() => handleNavClick('eduspa')}
                    className={`w-full text-left px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 block ${
                      activeSection === 'eduspa'
                        ? 'text-pink-600 bg-pink-50/60 font-bold'
                        : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/30'
                    }`}
                  >
                    Eduspa Salon (TEFA)
                  </button>
                  <button
                    onClick={() => handleNavClick('konsultasi')}
                    className={`w-full text-left px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 block ${
                      activeSection === 'konsultasi'
                        ? 'text-pink-600 bg-pink-50/60 font-bold'
                        : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/30'
                    }`}
                  >
                    Uji Diagnosis Kulit
                  </button>
                  <button
                    onClick={() => handleNavClick('karya')}
                    className={`w-full text-left px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 block ${
                      activeSection === 'karya'
                        ? 'text-pink-600 bg-pink-50/60 font-bold'
                        : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/30'
                    }`}
                  >
                    Karya Siswa
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Action Button & Call to Action */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              id="cta-enroll"
              href="https://wa.me/6282328981111"
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-pink-200 hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-1"
            >
              <span>Daftar / Konsultasi (WA)</span>
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center">
            <button
              id="btn-mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-pink-600 hover:bg-pink-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay / Sidebar */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden fixed inset-x-0 top-[60px] bg-white border-b border-pink-100 shadow-xl transition-all duration-300 z-50 animate-fade-in"
        >
          <div className="px-5 pt-4 pb-8 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Menu Sections Group */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-pink-500 px-3 pb-1.5 border-b border-pink-50">Menu Utama</div>
              <button
                onClick={() => handleNavClick('beranda')}
                className={`w-full text-left block px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === 'beranda'
                    ? 'text-pink-600 bg-pink-50 font-bold'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/50'
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => handleNavClick('akademik')}
                className={`w-full text-left block px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === 'akademik'
                    ? 'text-pink-600 bg-pink-50 font-bold'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/50'
                }`}
              >
                Akademik
              </button>
              <button
                onClick={() => handleNavClick('dokumentasi')}
                className={`w-full text-left block px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === 'dokumentasi'
                    ? 'text-pink-600 bg-pink-50 font-bold'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/50'
                }`}
              >
                Dokumentasi
              </button>
            </div>

            {/* Profil Group */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-pink-500 px-3 pt-2 pb-1.5 border-b border-pink-50">Profil Jurusan</div>
              <button
                onClick={() => handleNavClick('kompetensi')}
                className={`w-full text-left block px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === 'kompetensi'
                    ? 'text-pink-600 bg-pink-50 font-bold'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/50'
                }`}
              >
                Kompetensi Keahlian
              </button>
              <button
                onClick={() => handleNavClick('fasilitas')}
                className={`w-full text-left block px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === 'fasilitas'
                    ? 'text-pink-600 bg-pink-50 font-bold'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/50'
                }`}
              >
                Profil &amp; Fasilitas
              </button>
            </div>

            {/* Layanan Group */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-pink-500 px-3 pt-2 pb-1.5 border-b border-pink-50">Layanan &amp; Portal</div>
              <button
                onClick={() => handleNavClick('eduspa')}
                className={`w-full text-left block px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === 'eduspa'
                    ? 'text-pink-600 bg-pink-50 font-bold'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/50'
                }`}
              >
                Eduspa Salon (TEFA)
              </button>
              <button
                onClick={() => handleNavClick('konsultasi')}
                className={`w-full text-left block px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === 'konsultasi'
                    ? 'text-pink-600 bg-pink-50 font-bold'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/50'
                }`}
              >
                Uji Diagnosis Kulit
              </button>
              <button
                onClick={() => handleNavClick('karya')}
                className={`w-full text-left block px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === 'karya'
                    ? 'text-pink-600 bg-pink-50 font-bold'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/50'
                }`}
              >
                Karya Siswa
              </button>
            </div>

            <div className="pt-4 border-t border-pink-50 px-1">
              <a
                id="mobile-cta-enroll"
                href="https://wa.me/6282328981111"
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm rounded-xl block shadow-md shadow-pink-100"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
