import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  const toggleDropdown = (name: string) => {
    if (openDropdown === name) setOpenDropdown(null);
    else setOpenDropdown(name);
  };

  const navItems = [
    { path: '/', label: 'Beranda' },
    { 
      label: 'Profil Jurusan', 
      path: '/profil',
      dropdown: [
        { path: '/profil/sejarah', label: 'Sejarah Singkat' },
        { path: '/profil/visi-misi', label: 'Visi Misi' },
        { path: '/profil/struktur', label: 'Struktur Guru' },
        { path: '/profil/akreditasi', label: 'Akreditasi & Sertifikasi' },
      ]
    },
    { 
      label: 'Akademik', 
      path: '/akademik',
      dropdown: [
        { path: '/akademik/kurikulum', label: 'Kurikulum Kami' },
        { path: '/akademik/pembelajaran', label: 'Mata Pelajaran' }
      ]
    },
    { path: '/fasilitas', label: 'Sarana & Prasarana' },
    { path: '/galeri', label: 'Dokumentasi' },
  ];

  return (
    <header
      className={`bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-300 w-full sticky top-0 z-50 ${isScrolled ? 'shadow-md' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group">
            <img src="/logo-kecantikan.png" alt="Logo SMKN 1 Pekalongan" className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0" />
            <div className="flex flex-col justify-center border-l-2 border-primary pl-2.5 sm:pl-3">
              <span className="font-serif text-sm sm:text-base md:text-lg font-black tracking-wide text-primary-900 uppercase leading-tight">
                SMK Negeri 1 Pekalongan
              </span>
              <p className="text-[9px] sm:text-[11px] tracking-wider uppercase font-semibold text-slate-500 leading-tight mt-0.5">
                Program Keahlian Tata Kecantikan & Spa
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 font-sans">
            {navItems.map((item, idx) => (
              <div key={idx} className="relative group">
                {item.dropdown ? (
                  <>
                    <button className="flex items-center space-x-1 px-4 py-7 text-sm font-bold uppercase tracking-wide text-slate-700 hover:text-primary-600 transition-all">
                      <span>{item.label}</span>
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top-left -translate-y-2 group-hover:translate-y-0 rounded-b-xl overflow-hidden">
                      <div className="py-2">
                        {item.dropdown.map((sub, sIdx) => (
                          <Link 
                            key={sIdx} 
                            to={sub.path} 
                            className="block px-5 py-3 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-700 font-medium transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-4 py-7 text-sm font-bold uppercase tracking-wide transition-all border-b-[3px] ${isActive
                        ? 'text-primary-700 border-primary-600 bg-slate-50'
                        : 'text-slate-700 border-transparent hover:text-primary-600 hover:border-primary-300'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Icon */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl focus:outline-none text-slate-700 hover:text-primary-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-pink-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay / Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[64px] sm:top-[80px] bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-4 space-y-1.5 max-h-[calc(100vh-80px)] overflow-y-auto pb-8">
            {navItems.map((item, idx) => (
              <div key={idx}>
                {item.dropdown ? (
                  <div className="rounded-xl overflow-hidden border border-slate-100 mb-1">
                    <button 
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                        openDropdown === item.label ? 'bg-pink-50 text-pink-700' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180 text-pink-600' : 'text-slate-400'}`} />
                    </button>
                    {openDropdown === item.label && (
                      <div className="bg-slate-50/80 py-1.5 px-2 space-y-1">
                        {item.dropdown.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            to={sub.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-pink-600 hover:bg-white transition-all"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `w-full text-left block px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all ${isActive
                        ? 'text-pink-700 bg-pink-50/80 font-bold border border-pink-200'
                        : 'text-slate-700 hover:text-pink-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
