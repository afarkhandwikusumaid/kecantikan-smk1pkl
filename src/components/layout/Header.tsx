import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'akademik', label: 'Akademik' },
    { id: 'unggulan', label: 'Program Unggulan' },
    { id: 'pengumuman', label: 'Pengumuman' },
  ];

  const isDarkHeader = activeSection === 'akademik' && !isScrolled;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 backdrop-blur-md border-b border-white/40 shadow-sm py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            className="flex items-center space-x-3 sm:space-x-4 cursor-pointer group"
            onClick={() => handleNavClick('beranda')}
          >
            <img
              src="/logo-kecantikan.png"
              alt="Logo Jurusan Kecantikan dan Spa"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
            />
            <div className="flex flex-col justify-center">
              <span className={`font-serif text-lg sm:text-xl font-bold tracking-tight leading-tight transition-colors duration-350 ${isDarkHeader ? 'text-white' : 'text-gray-900'
                }`}>
                Kecantikan <span className={`font-sans font-medium text-base sm:text-lg transition-colors duration-350 ${isDarkHeader ? 'text-pink-200' : 'text-pink-600'
                  }`}>&amp; Spa</span>
              </span>
              <p className={`text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold mt-0.5 transition-colors duration-350 ${isDarkHeader ? 'text-pink-200/90' : 'text-pink-600/90'
                }`}>
                SMK Negeri 1 Pekalongan
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 font-sans">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              let btnClass = '';
              if (isActive) {
                btnClass = isDarkHeader
                  ? 'text-pink-900 bg-white font-semibold'
                  : 'text-pink-800 bg-pink-50 font-semibold';
              } else {
                btnClass = isDarkHeader
                  ? 'text-pink-100 hover:text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-pink-700 hover:bg-pink-50/50';
              }
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full relative group cursor-pointer ${btnClass}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Call to Action */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              id="cta-enroll"
              href="https://wa.me/6281229516969?text=Halo%20Admin%20Kecantikan%20SMKN%201%20Pekalongan,%20saya%20ingin%20bertanya%20mengenai%20program%20studi%20Kecantikan."
              target="_blank"
              rel="noreferrer"
              className={`font-medium text-sm px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-300 flex items-center space-x-1 ${isDarkHeader
                  ? 'bg-white text-pink-800 hover:bg-pink-50 hover:text-pink-900 shadow-white/10'
                  : 'bg-pink-800 text-white hover:bg-pink-900'
                }`}
            >
              <span>Daftar / Konsultasi</span>
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center">
            <button
              id="btn-mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none transition-all duration-300 ${isDarkHeader
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-600 hover:text-pink-800 hover:bg-pink-50'
                }`}
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
          className="md:hidden fixed inset-x-0 top-[60px] bg-white border-b border-pink-100 shadow-lg transition-all duration-300 z-50 animate-fade-in"
        >
          <div className="px-5 pt-4 pb-8 space-y-2 max-h-[85vh] overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left block px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeSection === item.id
                  ? 'text-pink-800 bg-pink-50 font-semibold'
                  : 'text-gray-600 hover:text-pink-800 hover:bg-pink-50/50'
                  }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-6 mt-4 border-t border-pink-50 px-1">
              <a
                id="mobile-cta-enroll"
                href="https://wa.me/6281229516969?text=Halo%20Admin%20Kecantikan%20SMKN%201%20Pekalongan,%20saya%2520ingin%2520bertanya%2520mengenai%2520program%2520studi%2520Kecantikan."
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-3.5 bg-pink-800 hover:bg-pink-900 text-white font-medium text-sm rounded-xl block shadow-sm"
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
