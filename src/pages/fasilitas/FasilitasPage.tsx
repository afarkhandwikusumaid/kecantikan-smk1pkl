import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  description: string;
  capacity: string;
  status: string;
  image_urls: string[];
}

interface FacilityCardProps {
  fac: Facility;
  index: number;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ fac, index }) => {
  const [activeImg, setActiveImg] = useState(0);
  const hasImages = fac.image_urls && fac.image_urls.length > 0;
  const isMultiple = fac.image_urls && fac.image_urls.length > 1;

  return (
    <div 
      className={`flex flex-col md:flex-row gap-8 items-start bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow ${
        index % 2 === 1 ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Image Column */}
      <div className="w-full md:w-1/2 shrink-0 space-y-3">
        <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 group">
          {hasImages ? (
            <img 
              src={fac.image_urls[activeImg]} 
              alt={fac.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">Belum ada foto</div>
          )}
          
          {isMultiple && (
            <>
              <button 
                onClick={() => setActiveImg(prev => (prev === 0 ? fac.image_urls.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-pink-500 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveImg(prev => (prev === fac.image_urls.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-pink-500 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
        
        {/* Thumbnails */}
        {isMultiple && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {fac.image_urls.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeImg === i ? 'border-pink-500 shadow-md ring-2 ring-pink-200 ring-offset-1' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Text Column */}
      <div className="w-full md:w-1/2 p-4 sm:px-8 py-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight">
          {fac.name}
        </h2>
        <div className="w-12 h-1 bg-secondary mb-6 rounded-full"></div>
        <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
          {fac.description}
        </p>
        {fac.capacity && (
          <div className="mt-6 inline-block bg-pink-50 border border-pink-100 px-4 py-2 rounded-lg">
            <p className="text-sm text-pink-700 font-medium">Kapasitas: {fac.capacity}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function FasilitasPage() {
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: "1",
      name: "Studio Tata Rias & Kosmetika",
      description: "Dilengkapi dengan meja rias profesional, cermin besar berlampu (vanity mirror), kosmetik standar industri, serta kursi rias hidrolik untuk praktik makeup panggung, pengantin, dan karakter.",
      capacity: "20 Orang",
      status: "Aktif",
      image_urls: ["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800"]
    },
    {
      id: "2",
      name: "Salon Tata Kecantikan Rambut",
      description: "Menyediakan peralatan lengkap seperti hair dryer, catokan, pengeriting rambut, area pencucian rambut (shampoo basin), manekin praktik, serta obat penataan rambut untuk belajar hair styling, cutting, maupun coloring.",
      capacity: "20 Orang",
      status: "Aktif",
      image_urls: ["https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800"]
    },
    {
      id: "3",
      name: "Ruang Praktik Perawatan Kulit (Skin Care Clinic)",
      description: "Area khusus bernuansa klinis yang dilengkapi tempat tidur perawatan (facial bed), alat uap wajah (facial steamer), serta perangkat perawatan wajah modern lainnya.",
      capacity: "20 Orang",
      status: "Aktif",
      image_urls: ["https://images.unsplash.com/photo-1521590832167-7bcbfeac2531?q=80&w=800"]
    },
    {
      id: "4",
      name: "Studio Perawatan Spa (Spa Room)",
      description: "Dilengkapi kasur spa, aromaterapi, perlengkapan lulur/pijat tradisional, hingga area khusus untuk praktik tren perawatan terbaru seperti Mom and Baby Treatment.",
      capacity: "20 Orang",
      status: "Aktif",
      image_urls: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800"]
    }
  ]);
  const [mainDescription, setMainDescription] = useState("Fasilitas Kecantikan di SMK Negeri 1 Pekalongan dirancang khusus untuk mendukung Program Keahlian Tata Kecantikan Kulit dan Rambut serta Layanan Spa. Sebagai salah satu SMK Pusat Keunggulan (PK), sekolah ini menyediakan ruang praktik modern yang menyerupai standar industri kecantikan profesional. Berikut adalah rincian fasilitas utama yang tersedia pada jurusan kecantikan di SMK Negeri 1 Pekalongan:");

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchFacilities() {
      try {
        const { data, error } = await supabase
          .from('facilities')
          .select('*')
          .eq('status', 'Aktif')
          .order('created_at', { ascending: false });
        
        if (data && data.length > 0) {
          setFacilities(data);
        }

        const { data: descData } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'fasilitas_description')
          .maybeSingle();

        if (descData && descData.value && typeof descData.value === 'object' && descData.value.text) {
          setMainDescription(descData.value.text);
        }
      } catch (err) {
        console.error('Error fetching facilities:', err);
      }
    }
    fetchFacilities();
  }, []);

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
          FASILITAS
        </h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Ruang praktik modern berstandar industri yang mendukung kegiatan belajar mengajar secara optimal.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-justify sm:text-center whitespace-pre-wrap">
            {mainDescription}
          </p>
        </div>
      </div>

      {/* Facilities List */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {facilities.map((fac, index) => (
          <FacilityCard key={fac.id || index} fac={fac} index={index} />
        ))}
      </div>

    </div>
  );
}
