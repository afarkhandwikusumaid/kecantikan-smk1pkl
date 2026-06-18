import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from './firebase';
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
import { homeNews } from './data';
import { Sparkles, GraduationCap, Check, ArrowRight, Award, Trophy, Heart, ShieldCheck } from 'lucide-react';
import AdminApp from './components/admin/AdminApp';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [firebaseNews, setFirebaseNews] = useState<any[]>([]);

  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) {
      setIsAdminRoute(true);
    }
    
    const fetchNews = async () => {
      try {
        const q = query(collection(db, 'news'), limit(3));
        const snapshot = await getDocs(q);
        const fetchedNews: any[] = [];
        snapshot.forEach(doc => {
          fetchedNews.push({ id: doc.id, ...doc.data() });
        });
        if (fetchedNews.length > 0) {
          setFirebaseNews(fetchedNews);
        } else {
          setFirebaseNews(homeNews);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setFirebaseNews(homeNews);
      }
    };
    fetchNews();
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
    <div id="beauty-spa-app-root" className="min-h-screen bg-white text-gray-800 antialiased selection:bg-pink-200 selection:text-pink-900">
      
      {/* Dynamic Floating Navigation */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {activeSection === 'beranda' && (
        <div className="animate-fade-in">
          {/* Hero Welcome Slide */}
          <Hero onNavigate={handleNavigate} />

          {/* Highlights & Achievement Badges widget */}
          <Highlights />

          {/* Section: Visi, Misi & Sasaran Strategis */}
          <VisiMisi onNavigate={handleNavigate} />

          {/* Head of Department Greeting Message */}
          <Sambutan />

          {/* Section: Berita, Pengumuman & Agenda Terkini */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span className="text-[10px] tracking-[0.25em] font-extrabold text-pink-600 bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full uppercase">
                  INFORMASI PORTAL KAMPUS
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950">
                  Kabar &amp; Pengumuman Terkini
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
                  Menyajikan kabar aktivitas akademik, prestasi siswi, agenda eksternal, dan pengumuman terbaru resmi jurusan.
                </p>
              </div>

              {/* News Grid (3 cols) from data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {firebaseNews.map((news) => (
                  <div 
                    key={news.id}
                    onClick={() => handleNavigate('dokumentasi')}
                    className="bg-white border border-pink-100/80 rounded-[2rem] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold border-b border-pink-50 pb-2">
                        <span className="bg-pink-50 text-pink-600 px-2.5 py-1 rounded-md uppercase tracking-wider font-extrabold">{news.category}</span>
                        <span>{news.date}</span>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-serif text-base font-bold text-gray-900 leading-snug group-hover:text-pink-600 transition-colors line-clamp-2">
                          {news.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed font-normal line-clamp-3">
                          {news.desc}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-pink-50/50 mt-4 text-[11px] font-bold text-pink-500 group-hover:underline flex items-center justify-between">
                      <span>Buka Dokumentasi Kegiatan</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ (Pertanyaan Sering Diajukan) Section */}
          <FAQ />

          {/* Center Call to Action via WhatsApp Block */}
          <section className="bg-pink-50/10 py-20 border-t border-pink-100">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-6 flex flex-col items-center">
              <span className="text-[10px] tracking-[0.25em] font-extrabold text-pink-600 bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full uppercase">
                HUBUNGI ADMIN KAMPUS
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950">
                Ada Pertanyaan Seputar Program Tata Kecantikan?
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
                Silakan hubungi kami sekadar untuk bertanya mengenai agenda KBM, ketersediaan beasiswa, magang DUDI, ataupun konsultasi pendaftaran. Hubungi admin kami secara langsung melalui tautan WhatsApp berikut.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/6282328981111?text=Halo%2520Admin%2520Kecantikan%2520SMKN%25201%2520Pekalongan%2520saya%2520ingin%2520bertanya%2520mengenai%2520program%2520studi%2520Kecantikan."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-md shadow-pink-100 transition-all duration-300"
                >
                  <span>Chat Admin via WhatsApp</span>
                  <span>&nbsp;→</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Pages 2: Kompetensi */}
      {activeSection === 'kompetensi' && (
        <div className="pt-24 pb-12 bg-[#fffafd] animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center space-y-4 border-b border-pink-50 mb-12">
            <span className="text-[10px] tracking-widest font-extrabold text-pink-600 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full uppercase">
              KOMPETENSI KEAHLIAN
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950">
              Spesialisasi Seni &amp; Sains Kecantikan
            </h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Empat fokus pembelajaran utama dalam dunia kecantikan yang dipersiapkan secara integratif guna melahirkan praktisi andal siap kerja.
            </p>
          </div>
          <Kompetensi />
        </div>
      )}

      {/* Pages 3: Akademik tables */}
      {activeSection === 'akademik' && (
        <Akademik />
      )}

      {/* Pages 4: Eduspa Salon */}
      {activeSection === 'eduspa' && (
        <div className="pt-24 pb-12 bg-[#fffafd] animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center space-y-4 border-b border-pink-50 mb-12">
            <span className="text-[10px] tracking-widest font-extrabold text-pink-600 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full uppercase">
              EDUSPA CLINIC &amp; SALON
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950">
              Teaching Factory (TEFA) Living Lab
            </h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Kalkulator estimasi dan katalog harga resmi Salon &amp; Wellness Klinik SMKN 1 Pekalongan yang dilayani secara higienis oleh siswi kami.
            </p>
          </div>
          <EduspaSalon />
        </div>
      )}

      {/* Pages 5: Diagnostic Skin Analyzer */}
      {activeSection === 'konsultasi' && (
        <div className="pt-24 pb-12 bg-white animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center space-y-4 border-b border-pink-50 mb-12">
            <span className="text-[10px] tracking-widest font-extrabold text-pink-600 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full uppercase">
              DIAGNOSTIK FORMULASI
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950">
              Konsultan Kecantikan &amp; Uji Kecocokan
            </h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Sistem pendukung keputusan terpadu untuk melakukan diagnosa jenis kulit tropis wajah Anda dan penentuan bahan skincare yang aman.
            </p>
          </div>
          <Konsultasi />
        </div>
      )}

      {/* Pages 6: Sample masterpiece portfolio */}
      {activeSection === 'karya' && (
        <div className="pt-24 pb-12 bg-[#fffafd] animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center space-y-4 border-b border-pink-50 mb-12">
            <span className="text-[10px] tracking-widest font-extrabold text-pink-600 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full uppercase">
              STUDENT GALLERY
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950">
              Galeri Unjuk Karya Siswi Estetika
            </h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Puncak kreativitas visual, penataan rambut prada, riasan pengantin, hingga ramuan ramuan spa tradisional terbaik.
            </p>
          </div>
          <Karya />
        </div>
      )}

      {/* Pages 7: Facilities tour & certified teams */}
      {activeSection === 'fasilitas' && (
        <div className="pt-24 pb-12 bg-white animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center space-y-4 border-b border-pink-50 mb-12">
            <span className="text-[10px] tracking-widest font-extrabold text-pink-600 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full uppercase">
              PROFIL, AKREDITASI &amp; FASILITAS
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-950">
              Profil Lengkap, Akreditasi &amp; Fasilitas
            </h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Eksplorasi pengertian jurusan, lembar sertifikat akreditasi resmi BAN-PDM, tur laboratorium standar industri, serta jajaran foto dewan guru.
            </p>
          </div>
          <Fasilitas />
        </div>
      )}

      {/* Pages 8: Dokumentasi Kegiatan */}
      {activeSection === 'dokumentasi' && (
        <Dokumentasi />
      )}

      {/* Website Official Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
