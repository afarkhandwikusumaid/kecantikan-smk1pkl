import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const Hero = lazy(() => import('./components/sections/Hero'));
const Sambutan = lazy(() => import('./components/sections/Sambutan'));
const Kompetensi = lazy(() => import('./components/sections/Kompetensi'));
const FAQ = lazy(() => import('./components/sections/FAQ'));
const Akademik = lazy(() => import('./components/sections/Akademik'));
const EduspaSalon = lazy(() => import('./components/sections/EduspaSalon'));
const Konsultasi = lazy(() => import('./components/sections/Konsultasi'));
const Karya = lazy(() => import('./components/sections/Karya'));
const Fasilitas = lazy(() => import('./components/sections/Fasilitas'));
const Dokumentasi = lazy(() => import('./components/sections/Dokumentasi'));
const Highlights = lazy(() => import('./components/sections/Highlights'));
const VisiMisi = lazy(() => import('./components/sections/VisiMisi'));

const AdminApp = lazy(() => import('./components/admin/AdminApp'));
import { supabase } from './lib/supabase';

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-20 space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-pink-200 border-t-pink-600 animate-spin" />
      <p className="text-sm font-medium text-pink-600/70 animate-pulse font-sans">Memuat halaman...</p>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [dynamicNews, setDynamicNews] = useState<any[]>([]);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);
  const [activePengumumanTab, setActivePengumumanTab] = useState<'berita' | 'dokumentasi'>('berita');

  useEffect(() => {
    if (activeSection === 'dokumentasi') {
      setActivePengumumanTab('dokumentasi');
    } else if (activeSection === 'pengumuman') {
      setActivePengumumanTab('berita');
    }
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

      <Suspense fallback={<LoadingFallback />}>
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

        {/* KOMPETENSI */}
        {activeSection === 'kompetensi' && (
          <div className="animate-fade-in bg-white">
            <div className="pt-20">
              <Kompetensi />
            </div>
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

        {/* PENGUMUMAN & DOKUMENTASI */}
        {(activeSection === 'pengumuman' || activeSection === 'dokumentasi') && (
          <div className="animate-fade-in bg-white min-h-[70vh]">
            {/* Section Header with Tabs */}
            <section className="pt-32 pb-8 bg-white border-b border-pink-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                <span className="text-[10px] tracking-[0.25em] font-extrabold text-pink-800 bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full uppercase">
                  INFORMASI PORTAL KAMPUS
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
                  Pengumuman &amp; Dokumentasi
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
                  Temukan informasi terbaru seputar aktivitas akademik, agenda sekolah, prestasi siswa, serta galeri dokumentasi kegiatan jurusan.
                </p>

                {/* Tab Switcher Buttons */}
                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      setActiveSection('pengumuman');
                      setActivePengumumanTab('berita');
                    }}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${activePengumumanTab === 'berita'
                      ? 'bg-pink-600 text-white border-transparent shadow-md'
                      : 'bg-white text-gray-600 hover:bg-pink-50 border-pink-100 hover:text-pink-600'
                      }`}
                  >
                    Pengumuman
                  </button>
                  <button
                    onClick={() => {
                      setActiveSection('dokumentasi');
                      setActivePengumumanTab('dokumentasi');
                    }}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${activePengumumanTab === 'dokumentasi'
                      ? 'bg-pink-600 text-white border-transparent shadow-md'
                      : 'bg-white text-gray-600 hover:bg-pink-50 border-pink-100 hover:text-pink-600'
                      }`}
                  >
                    Dokumentasi Kegiatan
                  </button>
                </div>
              </div>
            </section>

            {/* Tab Content 1: Berita & Pengumuman */}
            {activePengumumanTab === 'berita' && (
              <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* News Grid (3 cols) from data */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {dynamicNews.length === 0 ? (
                      <div className="col-span-3 text-center text-gray-500 py-10 font-medium">Belum ada berita yang diterbitkan.</div>
                    ) : (
                      dynamicNews.map((news) => (
                        <div
                          key={news.id}
                          onClick={() => setSelectedNews(news)}
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
            )}

            {/* Tab Content 2: Dokumentasi */}
            {activePengumumanTab === 'dokumentasi' && (
              <div className="bg-pink-50/20 py-2">
                <Dokumentasi />
              </div>
            )}

            {/* NEWS DETAIL DIALOG MODAL */}
            {selectedNews && (
              <div
                id="news-modal-container"
                className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-xs animate-fade-in"
                onClick={() => setSelectedNews(null)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-pink-100 flex flex-col max-h-[90vh] animate-scale-up"
                >
                  {/* Close button */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={() => setSelectedNews(null)}
                      className="w-10 h-10 rounded-full bg-white/90 text-gray-900 shadow-md flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="overflow-y-auto p-0">
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-8 sm:p-10 space-y-4">
                      <span className="bg-pink-400/30 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-white/20 inline-block">
                        {selectedNews.category}
                      </span>
                      <h2 className="font-serif text-xl sm:text-3xl font-bold leading-tight text-white">
                        {selectedNews.title}
                      </h2>
                      <p className="text-xs text-pink-100/90 font-mono">
                        Diterbitkan pada: {selectedNews.date}
                      </p>
                    </div>

                    {/* Content Body */}
                    <div className="p-8 sm:p-10 space-y-6">
                      <div className="text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4 font-normal">
                        {selectedNews.description.split('\n').map((paragraph: string, idx: number) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>

                      <div className="bg-pink-50/50 border border-pink-100 p-4 rounded-2xl flex items-center space-x-3.5 text-xs text-pink-700 leading-relaxed">
                        <span className="text-base">📢</span>
                        <p>
                          Informasi ini diterbitkan secara resmi oleh Jurusan Tata Kecantikan dan Spa SMK Negeri 1 Pekalongan untuk segenap sivitas akademika dan masyarakat luas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Control */}
                  <div className="bg-gray-50 px-8 py-4 border-t border-pink-100 flex justify-end">
                    <button
                      onClick={() => setSelectedNews(null)}
                      className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl cursor-pointer transition-all"
                    >
                      Tutup Pengumuman
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Suspense>

      {/* Website Official Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
