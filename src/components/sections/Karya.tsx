import React, { useState } from 'react';
import { Sparkles, Eye, User, BookOpen, Heart, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { Project } from '../../types';

const defaultProjects: Project[] = [
  {
    id: "proj1",
    title: "Rias Pengantin Solo Putri Modifikasi",
    studentName: "Fara Adelia Pramesti",
    grade: "Kelas XII - Kecantikan 2",
    category: "makeup",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600",
    description: "Mahakarya tata rias pengantin dengan Paes klasik gaya Surakarta Sala Putri, diberi sentuhan modern dewy look di bagian pipi. Dilengkapi hiasan melati ronce cunduk mentul yang presisi.",
    productsUsed: ["Wardah Instaperfect Foundation", "Mustika Ratu Paes Kit", "Make Over Eyeshadow Palette"],
    achievementBadge: "Juara 1 LKS Kota Pekalongan 2025"
  },
  {
    id: "proj2",
    title: "Sanggul Fantasi Siluet Lotus Mekar",
    studentName: "Dian Wahyuni Ningtyas",
    grade: "Kelas XII - Kecantikan 1",
    category: "hair",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600",
    description: "Desain penataan rambut avant-garde bermotif bunga lotus mekar mandiri di atas sanggul Jawa klasik. Teknik sasak tinggi penahan beban tanpa jepit berlebihan.",
    productsUsed: ["Rudy Hadisuwarno Styling Spray", "Makarizo Professional Hair Wax", "L'Oreal Elnett Satin"],
    achievementBadge: "Juara Harapan 1 LKS Jawa Tengah 2025"
  },
  {
    id: "proj3",
    title: "Dermal Moisture-Lock bagi Kulit Dehidrasi",
    studentName: "Amelia Saputri Hermawan",
    grade: "Kelas XII - Kecantikan 2",
    category: "skin",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600",
    description: "Studi kasus klinis penanganan kulit wajah bersisik ekstrem akibat paparan AC berkepanjangan. Menggunakan elektroterapi Galvanic dan masker alginat peel-off teh hijau.",
    productsUsed: ["Martha Tilaar Professional Serum", "Biokos Aloe Moisture Gel", "Skin Food Alginate Powder"],
  },
  {
    id: "proj4",
    title: "Ramuan Scrub Boreh Rempah Kuning Pekalongan",
    studentName: "Ratih Sukma Ningrum",
    grade: "Kelas XI - Kecantikan 1",
    category: "spa",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600",
    description: "Formulasi scrub lulur basah organik menggabungkan rempah kencur Pekalongan, bubuk kopi Robusta, parutan kunyit, dan esens temulawak murni untuk detoksifikasi kulit sel mati.",
    productsUsed: ["Bahan Alami Curcumae Radix", "Minyak Zaitun Mustika Ratu", "Aromaterapi Esensial Serai"],
    achievementBadge: "Proyek Inovasi Ramuan Nusantara Terbaik"
  }
];

const catMap: Record<string, 'makeup' | 'hair' | 'spa' | 'skin'> = {
  'Praktik': 'skin',
  'Prestasi': 'makeup',
  'Kegiatan': 'spa',
  'Fasilitas': 'hair',
  'Wisuda': 'makeup'
};

export default function Karya() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = defaultProjects;

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);


  return (
    <section id="karya" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-[10px] tracking-[0.2em] font-extrabold text-pink-600 uppercase">
            STUDENT PORTFOLIO EXHIBITION
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
            Karya &amp; Mahakarya <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">Siswi Kecantikan</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 pt-3">
            Berikut adalah bukti nyata kompetensi siswi SMK Negeri 1 Pekalongan berupa studi kasus penanganan kulit, tata rambut kreatif, dan tata rias pengantin yang elegan.
          </p>
        </div>

        {/* Categories Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Semua Mahakarya' },
            { id: 'makeup', label: 'Face Makeup' },
            { id: 'hair', label: 'Tata Rambut' },
            { id: 'skin', label: 'Perawatan Kulit' },
            { id: 'spa', label: 'Body Spa' }
          ].map((cat) => (
            <button
              key={cat.id}
              id={`gallery-filter-${cat.id}`}
              onClick={() => { setFilter(cat.id); setSelectedProject(null); }}
              className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 border ${
                filter === cat.id
                  ? 'bg-pink-500 text-white shadow-xs border-transparent'
                  : 'bg-white text-gray-700 hover:bg-pink-50/50 hover:text-pink-600 border-pink-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="bg-white rounded-[2rem] overflow-hidden border border-pink-100 p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Image Block */}
                <div className="relative rounded-2xl overflow-hidden h-[240px] sm:h-[280px] border border-pink-50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {project.achievementBadge && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-gray-950 text-[10px] font-extrabold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                      <Award className="w-3.5 h-3.5 text-gray-950 fill-gray-500" />
                      <span>{project.achievementBadge}</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 bg-pink-500 text-white px-2.5 py-1 rounded-md text-[9px] font-bold tracking-wider uppercase shadow-sm">
                    {project.category}
                  </div>
                </div>

                {/* Info Text */}
                <div className="space-y-2.5 px-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-pink-500 shrink-0" />
                    <span className="text-xs font-bold text-gray-700">{project.studentName}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-400 font-medium">{project.grade}</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Action and Detail Drawer Trigger */}
              <div className="mt-5 pt-3.5 border-t border-pink-100 px-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Brands utilized */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-400">Kasus:</span>
                  <div className="flex flex-wrap gap-1">
                    {project.productsUsed.slice(0, 2).map((prod, i) => (
                      <span key={i} className="bg-pink-50 text-pink-750 text-pink-700 font-extrabold text-[9px] uppercase px-2 py-0.5 rounded border border-pink-100">
                        {prod.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  id={`btn-view-project-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className="bg-white border border-pink-100 hover:bg-pink-50 text-pink-600 font-bold text-[11px] px-3.5 py-2 rounded-xl transition-all flex items-center space-x-1 cursor-pointer shadow-sm"
                >
                  <span>Analisis Kasus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Overlay Detail Case Study */}
        {selectedProject && (
          <div
            id="gallery-fullscreen-modal"
            className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative border border-pink-100">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-pink-100 pb-4">
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-pink-600 font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Kajian Kompetensi Siswa SMK Negeri 1
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-gray-950 mt-1">
                    {selectedProject.title}
                  </h4>
                </div>
                <button
                  id="close-gallery-modal"
                  onClick={() => setSelectedProject(null)}
                  className="p-1 px-2.5 bg-pink-50 hover:bg-pink-100 rounded-full text-pink-600 transition"
                >
                  ✕
                </button>
              </div>

              {/* Study Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <img
                  src={selectedProject.image}
                  alt=""
                  className="rounded-2xl h-52 w-full object-cover border border-pink-50"
                />

                <div className="space-y-4 text-xs">
                  <div>
                    <h5 className="font-bold text-gray-900 uppercase">Perancang Karya</h5>
                    <p className="text-gray-700 font-medium text-sm mt-0.5">{selectedProject.studentName}</p>
                    <p className="text-gray-500">{selectedProject.grade}</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-gray-900 uppercase">Kategori & Standasi</h5>
                    <p className="text-slate-700 capitalize mt-0.5">{selectedProject.category} - Uji Keahlian III</p>
                  </div>

                  {selectedProject.achievementBadge && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-2.5 rounded-xl">
                      <span className="font-bold">Prestasi Terdaftar:</span> {selectedProject.achievementBadge}
                    </div>
                  )}
                </div>
              </div>

              {/* Case text */}
              <div className="space-y-3 font-normal text-xs leading-relaxed text-gray-600">
                <h5 className="font-bold text-gray-900 uppercase tracking-widest text-[10px] flex items-center">
                  <BookOpen className="w-3.5 h-3.5 text-pink-500 mr-1.5" />
                  Keterangan Kasus &amp; Tantangan Riasan
                </h5>
                <p>
                  Guna menyelesaikan proyek bertema ini, siswi diwajibkan melakukan riset mengenai kerangka tulang muka pelanggan, jenis pigmen kulit dasar, serta melakukan uji sensitivitas kosmetik 24 jam sebelum pelaksanaan. Kompleksitas rias pengantin dibatasi pada pakem tradisional serta perbaikan simetrisitas mata dan bibir.
                </p>
              </div>

              {/* Inventory tools list */}
              <div className="space-y-2.5">
                <h5 className="font-bold text-gray-900 text-[10px] uppercase tracking-widest">
                  Produk &amp; Alat Profesional Kosmetik:
                </h5>
                <div className="flex flex-wrap gap-2 text-xs">
                  {selectedProject.productsUsed.map((prod, idx) => (
                    <span key={idx} className="bg-pink-50 border border-pink-100/50 text-pink-700 p-1.5 px-3 rounded-lg font-medium">
                      ✓ {prod}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close footer */}
              <div className="pt-4 border-t border-pink-100 flex justify-end">
                <button
                  id="modal-cta-close"
                  onClick={() => setSelectedProject(null)}
                  className="py-2 px-6 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  Tutup Portofolio
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
