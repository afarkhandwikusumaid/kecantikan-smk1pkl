import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  User, 
  Tag, 
  BookOpen, 
  Search, 
  Award, 
  ChevronRight, 
  FileText,
  Clock,
  Camera,
  X,
  Share2,
  Building
} from 'lucide-react';
import { activityDocs, ActivityDoc } from '../../data';
import { supabase } from '../../lib/supabase';

export default function Dokumentasi() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [featuredDoc, setFeaturedDoc] = useState<ActivityDoc | null>(null);
  const [docs, setDocs] = useState<ActivityDoc[]>([]);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const { data, error } = await supabase
          .from('galleries')
          .select('*')
          .order('date', { ascending: false });
        
        if (data && data.length > 0) {
          const activityItems = data.filter((item: any) => 
            ['Kegiatan', 'Fasilitas'].includes(item.category)
          );

          if (activityItems.length > 0) {
            const mapped = activityItems.map((item: any) => {
              let cat: 'Sertifikasi & Lisensi' | 'Sempro & Expo' | 'Seminar & Workshop' | 'Pengabdian Masyarakat' | 'Kemitraan DUDI' = 'Sertifikasi & Lisensi';
              const titleLower = item.title.toLowerCase();
              if (titleLower.includes('uji') || titleLower.includes('lsp') || titleLower.includes('sertifikasi')) {
                cat = 'Sertifikasi & Lisensi';
              } else if (titleLower.includes('expo') || titleLower.includes('pameran') || titleLower.includes('pekan')) {
                cat = 'Sempro & Expo';
              } else if (titleLower.includes('workshop') || titleLower.includes('seminar') || titleLower.includes('kursus')) {
                cat = 'Seminar & Workshop';
              } else if (titleLower.includes('sosial') || titleLower.includes('bakti') || titleLower.includes('masyarakat') || titleLower.includes('peduli')) {
                cat = 'Pengabdian Masyarakat';
              } else if (titleLower.includes('martha') || titleLower.includes('mustika') || titleLower.includes('dudi') || titleLower.includes('mitra') || titleLower.includes('kemitraan')) {
                cat = 'Kemitraan DUDI';
              }

              const formattedDate = new Date(item.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });

              return {
                id: item.id,
                title: item.title,
                date: formattedDate,
                category: cat,
                summary: `Dokumentasi resmi kegiatan ${item.title} yang dilaksanakan pada tanggal ${formattedDate}.`,
                description: `Pelaksanaan kegiatan ${item.title} ini merupakan bagian dari penjaminan mutu kurikulum vokasi Tata Kecantikan Kulit dan Spa SMKN 1 Pekalongan, bertujuan untuk mematangkan kesiapan kerja peserta didik dan jalinan mitra industri.`,
                imageUrl: item.image_url,
                writer: "Humas Eduspa SMKN 1",
                tags: [item.category, "Eduspa", "Kegiatan"],
                location: "Kampus SMKN 1 Pekalongan"
              };
            });
            setDocs(mapped);
          }
        }
      } catch (err) {
        console.error('Error fetching activity docs from Supabase:', err);
      }
    }
    fetchDocs();
  }, []);

  // Get distinct categories
  const categories = ['Semua', 'Sertifikasi & Lisensi', 'Sempro & Expo', 'Seminar & Workshop', 'Pengabdian Masyarakat', 'Kemitraan DUDI'];

  // Filter docs
  const filteredDocs = docs.filter((doc) => {
    const matchesCategory = selectedCategory === 'Semua' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#fcf8fa] min-h-screen pt-24 pb-20 font-sans">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-4 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-pink-500/20 text-pink-300 text-sm font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider border border-pink-500/30">
            <Camera className="w-3.5 h-3.5" />
            <span>DOKUMENTASI JURUSAN</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white">
            Dokumentasi Kegiatan &amp; Berita Utama
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-300 leading-relaxed font-light font-sans">
            Arsip digital resmi publikasi kegiatan belajar-mengajar, unjuk kreasi vokasi, uji sertifikasi kompetensi Lisensi, rekrutmen alumni, serta pengabdian masyarakat SMKN 1 Pekalongan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Search & Filter bar inspired by sti.dinus.id portal */}
        <div className="bg-white border border-pink-100 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari dokumentasi kegiatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-medium text-gray-900 placeholder:text-gray-400 transition-all outline-none"
              />
            </div>
            
            {/* Stat Counter */}
            <div className="text-xs text-gray-500 font-semibold font-mono text-left md:text-right">
              Menampilkan <span className="text-pink-600 font-bold">{filteredDocs.length}</span> dari {docs.length} arsip kegiatan
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
            <span className="text-sm font-extrabold text-gray-400 uppercase tracking-widest mr-2">Saring Kategori:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredDocs.length === 0 && (
          <div className="bg-white border border-pink-100 rounded-[2rem] p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-gray-900 text-lg">Dokumentasi Tidak Ditemukan</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-sans font-medium">
              Kami tidak dapat menemukan dokumentasi kegiatan dengan kata kunci atau kategori terpilih. Silakan coba bersihkan pencarian Anda.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
              className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer transition-all"
            >
              Reset Pencarian
            </button>
          </div>
        )}

        {/* Rich Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDocs.map((doc) => (
            <div 
              key={doc.id}
              onClick={() => setFeaturedDoc(doc)}
              className="bg-white border border-pink-100/70 rounded-[2rem] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="h-48 overflow-hidden relative bg-gray-100">
                  <img 
                    src={doc.imageUrl} 
                    referrerPolicy="no-referrer"
                    alt={doc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-xs text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {doc.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-400 font-bold">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                      <span>{doc.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1 max-w-[120px] truncate">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{doc.location}</span>
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-pink-600 transition-colors h-[48px] overflow-hidden line-clamp-2">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed font-sans font-medium">
                    {doc.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-pink-50/50 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {doc.tags.slice(0, 2).map((tg, idx) => (
                    <span key={idx} className="text-sm bg-pink-50 text-pink-600 font-semibold px-2 py-0.5 rounded">
                      #{tg}
                    </span>
                  ))}
                </div>
                
                <span className="text-sm font-bold text-pink-600 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Lihat Rincian</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* DETAILED DIALOG MODAL Overlay */}
      {featuredDoc && (
        <div id="doc-modal-container" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-xs">
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-pink-100 flex flex-col max-h-[90vh] animate-scale-up"
          >
            {/* Modal Header bar */}
            <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
              <button
                onClick={() => setFeaturedDoc(null)}
                className="w-10 h-10 rounded-full bg-white/90 text-gray-900 shadow-md flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-0">
              {/* Image Hero Banner */}
              <div className="h-64 sm:h-80 relative bg-gray-100">
                <img 
                  src={featuredDoc.imageUrl} 
                  referrerPolicy="no-referrer"
                  alt={featuredDoc.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="bg-pink-600 text-sm font-extrabold px-3 py-1 rounded-full uppercase tracking-widest border border-pink-400">
                    {featuredDoc.category}
                  </span>
                  <h2 className="font-serif text-lg sm:text-2xl font-bold leading-tight">
                    {featuredDoc.title}
                  </h2>
                </div>
              </div>

              {/* Metadata strip */}
              <div className="bg-gray-50 border-b border-pink-100 px-6 sm:px-8 py-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-pink-500" />
                  <div>
                    <span className="text-xs text-gray-400 uppercase block">Tanggal Kegiatan</span>
                    <span className="font-bold text-gray-800">{featuredDoc.date}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  <div>
                    <span className="text-xs text-gray-400 uppercase block">Tempat Pelaksanaan</span>
                    <span className="font-bold text-gray-800 truncate block max-w-[150px]">{featuredDoc.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                  <User className="w-4 h-4 text-pink-500" />
                  <div>
                    <span className="text-xs text-gray-400 uppercase block">Penanggung Jawab / Penulis</span>
                    <span className="font-bold text-gray-800 truncate block max-w-[180px]">{featuredDoc.writer}</span>
                  </div>
                </div>
              </div>

              {/* Main Content Body */}
              <div className="px-6 sm:px-8 py-6 space-y-6">
                
                <div className="space-y-4">
                  <p className="font-serif text-sm sm:text-base text-gray-900 leading-relaxed font-semibold italic border-l-4 border-pink-500 pl-4 py-1">
                    "{featuredDoc.summary}"
                  </p>
                  
                  <div className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans space-y-4 font-normal">
                    {featuredDoc.description.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Full list of action tags */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mr-1">Topik Terkait:</span>
                  {featuredDoc.tags.map((t, idx) => (
                    <span key={idx} className="bg-pink-50 text-pink-700 text-sm font-bold px-3 py-1 rounded-lg">
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Footnote statement */}
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center space-x-3.5 text-sm text-gray-500 leading-relaxed font-sans">
                  <span className="text-lg">📢</span>
                  <p>
                    Diterbitkan oleh Portal Hubungan Industri dan Kemasyarakatan (Hubin) SMK Negeri 1 Pekalongan. Seluruh informasi data di atas adalah arsip dokumentasi nyata pembelajaran vokasional tata kecantikan kulit dan spa.
                  </p>
                </div>

              </div>

            </div>

            {/* Modal Bottom control bar */}
            <div className="bg-gray-50 px-6 py-4 border-t border-pink-100 flex items-center justify-between shrink-0">
              <span className="text-xs text-gray-400 tracking-wider uppercase font-bold font-mono">DOKUMEN ID: {featuredDoc.id}</span>
              <button
                onClick={() => setFeaturedDoc(null)}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl cursor-pointer transition-all"
              >
                Tutup Dokumen
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
