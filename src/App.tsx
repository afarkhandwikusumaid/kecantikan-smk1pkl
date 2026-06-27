import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Sambutan from './components/sections/Sambutan';
import Kompetensi from './components/sections/Kompetensi';
import FAQ from './components/sections/FAQ';
import Akademik from './components/sections/Akademik';
import EduspaSalon from './components/sections/EduspaSalon';
import Konsultasi from './components/sections/Konsultasi';
import Karya from './components/sections/Karya';
import Fasilitas from './components/sections/Fasilitas';
import Dokumentasi from './components/sections/Dokumentasi';
import Footer from './components/layout/Footer';
import Highlights from './components/sections/Highlights';
import VisiMisi from './components/sections/VisiMisi';
import AdminApp from './components/admin/AdminApp';
import { supabase } from './lib/supabase';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>(() => {
    return localStorage.getItem('publicActiveSection') || 'beranda';
  });
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [dynamicNews, setDynamicNews] = useState<any[]>([]);

  useEffect(() => {
    localStorage.setItem('publicActiveSection', activeSection);
  }, [activeSection]);

  useEffect(() => {
    async function fetchHomeNews() {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('date', { ascending: false })
          .limit(3);
        if (data) {
          setDynamicNews(data);
        }
      } catch (err) {
        console.error('Error fetching home news:', err);
      }
    }
    fetchHomeNews();
  }, []);
  
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) {
      setIsAdminRoute(true);
    }
  }, []);

  // Scroll to top on page navigate to simulate multi-page routing
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSection]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  if (isAdminRoute) {
    return <AdminApp />;
  }

  return (
    <div id="beauty-spa-app-root" className="min-h-screen bg-pink-50/10 text-gray-800 antialiased selection:bg-pink-200 selection:text-pink-900 font-sans">
      
      {/* Dynamic Floating Navigation */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* BERANDA */}
      {activeSection === 'beranda' && (
        <div className="animate-fade-in">
          {/* Hero Welcome Slide */}
          <Hero onNavigate={handleNavigate} />

          {/* Highlights & Achievement Badges widget */}
          <Highlights />

          {/* Head of Department Greeting Message */}
          <Sambutan />

          {/* FAQ (Pertanyaan Sering Diajukan) Section */}
          <FAQ />

          {/* Center Call to Action via WhatsApp Block */}
          <section className="bg-pink-50/30 py-20 border-t border-pink-100">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-6 flex flex-col items-center">
              <span className="text-[10px] tracking-[0.25em] font-extrabold text-pink-800 bg-pink-100 border border-pink-200 px-4 py-1.5 rounded-full uppercase">
                HUBUNGI ADMIN KAMPUS
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                Ada Pertanyaan Seputar Program Tata Kecantikan?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
                Silakan hubungi kami sekadar untuk bertanya mengenai agenda KBM, ketersediaan beasiswa, magang DUDI, ataupun konsultasi pendaftaran. Hubungi admin kami secara langsung melalui tautan WhatsApp berikut.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/6281229516969?text=Halo%2520Admin%2520Kecantikan%2520SMKN%25201%2520Pekalongan%2520saya%2520ingin%2520bertanya%2520mengenai%2520program%2520studi%2520Kecantikan."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2.5 bg-pink-800 hover:bg-pink-900 text-white font-medium text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-md transition-all duration-300"
                >
                  <span>Chat Admin via WhatsApp</span>
                  <span>&nbsp;→</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* PROFIL */}
      {activeSection === 'profil' && (
        <div className="pb-12 animate-fade-in bg-white">
          {/* Section: Visi, Misi & Sasaran Strategis */}
          <VisiMisi onNavigate={handleNavigate} />
          
          {/* Facilities tour & certified teams */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4 border-b border-pink-50 mb-8">
              <span className="text-[10px] tracking-widest font-bold text-pink-800 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full uppercase">
                PROFIL &amp; FASILITAS
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                Fasilitas &amp; Tenaga Pendidik
              </h1>
              <p className="text-sm text-gray-600 max-w-xl mx-auto">
                Eksplorasi fasilitas laboratorium berstandar industri dan jajaran tenaga pendidik profesional kami.
              </p>
            </div>
            <Fasilitas />
          </div>
        </div>
      )}

      {/* AKADEMIK */}
      {activeSection === 'akademik' && (
        <div className="animate-fade-in bg-[#fcf8fa]">
          <Akademik />
        </div>
      )}

      {/* PROGRAM UNGGULAN */}
      {activeSection === 'unggulan' && (
        <div className="animate-fade-in space-y-4 bg-white">
          <div className="bg-white pb-12">
            <div className="max-w-7xl mx-auto px-4 pt-32 pb-16 text-center space-y-4 border-b border-pink-50 mb-8">
              <span className="text-[10px] tracking-widest font-bold text-pink-800 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full uppercase">
                EDUSPA CLINIC &amp; SALON
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                Teaching Factory (TEFA) Living Lab
              </h1>
              <p className="text-sm text-gray-600 max-w-xl mx-auto">
                Kalkulator estimasi dan katalog harga resmi Salon &amp; Wellness Klinik SMKN 1 Pekalongan yang dilayani secara higienis oleh siswi kami.
              </p>
            </div>
            <EduspaSalon />
          </div>

          <div className="bg-pink-50/20 pb-12">
            <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4 border-b border-pink-50 mb-8">
              <span className="text-[10px] tracking-widest font-bold text-pink-800 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full uppercase">
                STUDENT GALLERY
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                Galeri Unjuk Karya Siswi Estetika
              </h1>
              <p className="text-sm text-gray-600 max-w-xl mx-auto">
                Puncak kreativitas visual, penataan rambut prada, riasan pengantin, hingga ramuan ramuan spa tradisional terbaik.
              </p>
            </div>
            <Karya />
          </div>

          <div className="bg-white pb-12">
            <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4 border-b border-pink-50 mb-8">
              <span className="text-[10px] tracking-widest font-bold text-pink-800 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full uppercase">
                DIAGNOSTIK FORMULASI
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                Konsultan Kecantikan &amp; Uji Kecocokan
              </h1>
              <p className="text-sm text-gray-600 max-w-xl mx-auto">
                Sistem pendukung keputusan terpadu untuk melakukan diagnosa jenis kulit tropis wajah Anda dan penentuan bahan skincare yang aman.
              </p>
            </div>
            <Konsultasi />
          </div>
        </div>
      )}

      {/* PENGUMUMAN */}
      {activeSection === 'pengumuman' && (
        <div className="animate-fade-in bg-white">
          {/* Section: Berita, Pengumuman & Agenda Terkini */}
          <section className="pt-32 pb-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span className="text-[10px] tracking-[0.25em] font-bold text-pink-800 bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full uppercase">
                  INFORMASI PORTAL KAMPUS
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
                  Kabar &amp; Pengumuman Terkini
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
                  Menyajikan kabar aktivitas akademik, prestasi siswi, agenda eksternal, dan pengumuman terbaru resmi jurusan.
                </p>
              </div>

              {/* News Grid (3 cols) from data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {dynamicNews.length === 0 ? (
                  <div className="col-span-3 text-center text-gray-500 py-10 font-medium">Belum ada berita yang diterbitkan.</div>
                ) : (
                  dynamicNews.map((news) => (
                    <div 
                      key={news.id}
                      onClick={() => handleNavigate('dokumentasi')}
                      className="bg-white border border-pink-100/50 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium border-b border-pink-50 pb-2">
                          <span className="bg-pink-50 text-pink-800 px-2.5 py-1 rounded-md uppercase tracking-wider font-bold">{news.category}</span>
                          <span>{news.date}</span>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-serif text-base font-bold text-gray-900 leading-snug group-hover:text-pink-700 transition-colors line-clamp-2">
                            {news.title}
                          </h4>
                          <p className="text-xs text-gray-600 leading-relaxed font-normal line-clamp-3">
                            {news.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Dokumentasi */}
          <div className="bg-pink-50/20 py-8">
            <Dokumentasi />
          </div>
        </div>
      )}

      {/* Website Official Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
