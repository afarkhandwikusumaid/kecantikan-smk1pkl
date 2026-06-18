import React, { useState } from 'react';
import { Eye, ShieldCheck, Clock, Award, Star, Settings, Check, BookOpen, ExternalLink } from 'lucide-react';
import { Competence } from '../../types';

export default function Kompetensi() {
  const [activeTab, setActiveTab] = useState<string>('skin');

  const competencies: Competence[] = [
    {
      id: "skin",
      title: "Perawatan Kulit & Estetika",
      titleEn: "Skin Care & Esthetics",
      description: "Fokus pembelajaran pada diagnosis jenis kulit wajah, penanganan masalah jerawat & penuaan dini, serta penyembuhan struktural kulit wajah menggunakan perpaduan racikan lulur tradisonal Indonesia dengan generator teknologi electrotherapy modern.",
      badge: "Esthetics",
      skills: [
        "Diagnosis Kulit presisi (Wood Lamp Analysis)",
        "Deep Cleansing & Vapourisation (Ozone)",
        "Terapi Totok Wajah & Relaksasi Akupresur",
        "Dermal Rejuvenation via Ultrasound & Galvanic",
        "Pembuatan & Pengaplikasi Masker Peel-off & Herbal"
      ],
      duration: "Semester 1 - 4 (Teori & Klinik Praktik)",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
      tools: ["Wood Lamp Analyzer", "Galvanic & High Frequency Machines", "Ozon Facial Vaporizer", "Aroma Steamer", "Skin Scrubber"]
    },
    {
      id: "hair",
      title: "Tata Kecantikan Rambut",
      titleEn: "Hair Styling & Hairdressing",
      description: "Mengembangkan kompetensi pemotongan rambut pria & wanita berskala global, pewarnaan trendi (balayage, ombre), pengeritingan artistik, pelurusan (smoothing), serta penataan rambut kreatif (updo sanggul tradisional dan modern untuk pagelaran seni).",
      badge: "Hair Design",
      skills: [
        "Teknik Guntingan Pivot Point (Basic & Advance)",
        "Pewarnaan Rambut Kreatif (Bleaching & Tinting)",
        "Rebonding & Smoothing berkeamanan tinggi",
        "Sanggul Tradisional Jawa & Kreasi Modern",
        "Terapi Keratin & Spa Kulit Kepala (Hair Spa)"
      ],
      duration: "Semester 2 - 5 (Integrasi Salon Lab)",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800",
      tools: ["Professional Hair Dryer & Ironer", "Hair Steamer Ozone", "Professional Shears Set", "Mannequin Styling Head", "Color Mixing Scale"]
    },
    {
      id: "spa",
      title: "Terapi Body Spa & Kebugaran",
      titleEn: "Body Spa & Wellness",
      description: "Seni pijat warisan keraton Jawa (Javanese Massage), aromaterapi herbal, lulur rempah kuning mangir, hidroterapi, mandi uap (sauna), hingga teknik pijat refleksi kaki modern untuk memulihkan kebugaran tubuh serta kecantikan dari dalam.",
      badge: "Body Wellness",
      skills: [
        "Javanese Traditional Full-Body Massage",
        "Pijat Batu Hangat (Hot Stone Therapy)",
        "Pencampuran Scrub Organik (Boreh & Lulur rempah)",
        "Body Wrapping & Sauna Detoxification",
        "Manicure, Pedicure & Foot Reflexology"
      ],
      duration: "Semester 3 - 6 (Magang Industri & Uji BNSP)",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800",
      tools: ["Ergonomic Spa Bed", "Hot Stone Warmer", "Therapeutic Essential Oil Diffusers", "Pedicure Tub Bath", "Herbal Steam Cabin"]
    },
    {
      id: "makeup",
      title: "Tata Rias Wajah & Cosmetology",
      titleEn: "Make Up Art (MUA)",
      description: "Mengasah seni melukis wajah untuk berbagai kebutuhan: riasan sehari-hari (corrective makeup), riasan pengantin tradisional Solo/Yogya putri maupun modern barat, makeup panggung teater dramatis, hingga makeup karakter fantasi 3D.",
      badge: "Make Up Art",
      skills: [
        "Corrective & Siluet Contouring Wajah",
        "Riasan Pengantin Nusantara (Gaya Yogya & Solo)",
        "Riasan Western Bridal & Glamour Gala",
        "Special Effects (SFX) & Karakter Fantasi",
        "Airbrush Makeup Technique & Digital Photo Ready"
      ],
      duration: "Semester 3 - 5 (Portofolio Publik)",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800",
      tools: ["Airbrush Gun & Compressor", "Professional Makeup Ring Light", "Palette Cosmetics Set (120 Colors)", "Special Effects Wax Set", "High Definition Fixer"]
    }
  ];

  const activeComp = competencies.find(c => c.id === activeTab) || competencies[0];

  return (
    <section id="kompetensi" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-[10px] tracking-[0.2em] font-extrabold text-pink-600 uppercase">
            SPEKTRUM KEAHLIAN AKADEMIK
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
            Uji Kompetensi Standar <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">Industri Kecantikan</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 pt-3">
            Pembelajaran komprehensif yang memadukan warisan kecantikan tradisional Nusantara dan tren kosmetologi modern global, mencetak lulusan dengan daya serap industri tinggi.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {competencies.map((comp) => {
            const isTabActive = activeTab === comp.id;
            return (
              <button
                key={comp.id}
                id={`comp-tab-${comp.id}`}
                onClick={() => setActiveTab(comp.id)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center space-x-2 ${
                  isTabActive
                    ? 'bg-pink-500 text-white shadow-sm -translate-y-0.5'
                    : 'bg-pink-50/50 text-gray-700 hover:bg-pink-50 hover:text-pink-600 border border-pink-100'
                }`}
              >
                <span>{comp.title}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-pink-50/30 rounded-[2rem] p-6 sm:p-10 border border-pink-100 shadow-sm animate-fade-in">
          
          {/* Left Block: Image with Floating Badges */}
          <div className="lg:col-span-5 relative flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden h-[300px] lg:h-full min-h-[320px] shadow-sm border border-pink-100 bg-white">
              <img
                src={activeComp.image}
                alt={activeComp.title}
                className="w-full h-full object-cover filter brightness-95 transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-pink-500 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                FOKUS: {activeComp.badge}
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-pink-100 shadow-sm">
                <div className="flex items-center space-x-2 text-pink-600 mb-0.5">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{activeComp.duration}</span>
                </div>
                <p className="text-[10px] text-gray-500">Masa belajar intensif sebelum sertifikasi kompetensi LSP-P1/BNSP.</p>
              </div>
            </div>
          </div>

          {/* Right Block: Structured Details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                  {activeComp.titleEn}
                </span>
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                {activeComp.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {activeComp.description}
              </p>
            </div>

            {/* Sub skills achieved */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-950 flex items-center space-x-2">
                <BookOpen className="w-3.5 h-3.5 text-pink-600" />
                <span>Keterampilan Inti Siswa</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeComp.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2.5 bg-white p-3 rounded-2xl border border-pink-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="text-xs text-gray-700 leading-tight font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Machineries & Professional Tooling */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-950 flex items-center space-x-2">
                <Settings className="w-3.5 h-3.5 text-pink-600" />
                <span>Peralatan Profesional di Lab</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeComp.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="bg-white text-pink-700 text-[10px] font-bold px-2.5 py-1 rounded-md border border-pink-100 shadow-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* LSP-P1 Verification stamp */}
            <div className="pt-4 border-t border-pink-100 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 leading-none">Standar Sertifikasi Nasional</h5>
                  <p className="text-[10px] text-gray-500">Lisensi BNSP Indonesia</p>
                </div>
              </div>
              <button
                id="cta-view-facilities"
                onClick={() => {
                  const el = document.getElementById('fasilitas');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-pink-600 hover:text-pink-700 text-xs font-bold flex items-center space-x-1 hover:underline bg-white p-2.5 px-4 rounded-xl border border-pink-100 shadow-sm transition"
              >
                <span>Lihat Lab &amp; Fasilitas</span>
                <ExternalLink className="w-3" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
