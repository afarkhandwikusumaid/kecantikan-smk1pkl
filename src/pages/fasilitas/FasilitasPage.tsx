import React from 'react';

export default function FasilitasPage() {
  const facilities = [
    {
      title: "Studio Tata Rias & Kosmetika",
      description: "Dilengkapi dengan meja rias profesional, cermin besar berlampu (vanity mirror), kosmetik standar industri, serta kursi rias hidrolik untuk praktik makeup panggung, pengantin, dan karakter.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800"
    },
    {
      title: "Salon Tata Kecantikan Rambut",
      description: "Menyediakan peralatan lengkap seperti hair dryer, catokan, pengeriting rambut, area pencucian rambut (shampoo basin), manekin praktik, serta obat penataan rambut untuk belajar hair styling, cutting, maupun coloring.",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800"
    },
    {
      title: "Ruang Praktik Perawatan Kulit (Skin Care Clinic)",
      description: "Area khusus bernuansa klinis yang dilengkapi tempat tidur perawatan (facial bed), alat uap wajah (facial steamer), serta perangkat perawatan wajah modern lainnya.",
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfeac2531?q=80&w=800"
    },
    {
      title: "Studio Perawatan Spa (Spa Room)",
      description: "Dilengkapi kasur spa, aromaterapi, perlengkapan lulur/pijat tradisional, hingga area khusus untuk praktik tren perawatan terbaru seperti Mom and Baby Treatment.",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800"
    }
  ];

  return (
    <div className="pt-10 pb-16 bg-slate-50 min-h-screen">
      
      {/* Banner / Intro Outside Box */}
      <div className="text-center mb-8 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center justify-center space-x-2">
          <span className="w-8 h-px bg-secondary/50"></span>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">
            Laboratorium Praktik & Ruang Perawatan
          </span>
          <span className="w-8 h-px bg-secondary/50"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">
          SARANA DAN PRASARANA
        </h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Ruang praktik modern berstandar industri yang mendukung kegiatan belajar mengajar secara optimal.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-justify sm:text-center">
            Fasilitas Kecantikan di SMK Negeri 1 Pekalongan dirancang khusus untuk mendukung Program Keahlian Tata Kecantikan Kulit dan Rambut serta Layanan Spa. Sebagai salah satu SMK Pusat Keungulan (PK), sekolah ini menyediakan ruang praktik modern yang menyerupai standar industri kecantikan profesional. Berikut adalah rincian fasilitas utama yang tersedia pada jurusan kecantikan di SMK Negeri 1 Pekalongan:
          </p>
        </div>
      </div>

      {/* Facilities List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {facilities.map((fac, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:flex-row gap-8 items-center bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Image Column */}
            <div className="w-full md:w-1/2 shrink-0">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
                <img 
                  src={fac.image} 
                  alt={fac.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {/* Text Column */}
            <div className="w-full md:w-1/2 p-4 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight">
                {fac.title}
              </h2>
              <div className="w-12 h-1 bg-secondary mb-6 rounded-full"></div>
              <p className="text-slate-600 leading-relaxed text-lg">
                {fac.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
