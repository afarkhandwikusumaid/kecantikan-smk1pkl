import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Building, 
  Quote, 
  Award, 
  ShieldCheck, 
  QrCode, 
  BookOpen, 
  Sparkles, 
  MapPin, 
  CheckCircle,
  HelpCircle,
  Clock,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Facility, Teacher } from '../../types';
import Prestasi from './Prestasi';

const defaultFacilities: Facility[] = [
  {
    id: "lab1",
    name: "Laboratorium Skin Care Terpadu",
    description: "Ruang praktik modern steril dengan AC penuh, dilengkapi 12 ranjang perawatan klinis (treatment beds), lampu Wood Analyzer untuk diagnosis kulit presisi, serta perangkat terapi ozon & sonoforesis ultrasound standar klinik kecantikan ternama.",
    capacity: "Kapasitas 16 Siswi simultan",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfeac2531?q=80&w=800",
    equipment: ["Wood Lamp Diagnosis Kit", "Ultrasonic Face Scrubbers", "High-Frequency Glass Electrodes", "Skin Moisture Analyzers"]
  },
  {
    id: "lab2",
    name: "Studio Tata Rias & Paes Pengantin",
    description: "Dilengkapi dengan meja rias kaca cermin keliling berlampu LED High Definition (HD Ring Lights), bar kosmetik lengkap dari brand mustika ratu & wardah, serta jajaran gaun pengantin adat lengkap untuk simulasi pagelaran MUA.",
    capacity: "Kapasitas 20 Siswi simultan",
    image: "/images/photo-1487412720507-e7ab37603c6f.jpg",
    equipment: ["Dimmable Makeup Ring Lights", "Airbrush Compressor Kits", "Advanced Paes Paes Stencils", "Mannequin Face Planners"]
  },
  {
    id: "lab3",
    name: "Salon Hairdressing & Sanggul Lab",
    description: "Didominasi stasiun keramas keramik mewah standar internasional, mesin pencuci rambut, hair steaming ozone otomatis, set gunting pivot point, serta jajaran wig dan manekin rambut untuk penguasaan guntingan & pewarnaan.",
    capacity: "Kapasitas 24 Siswi simultan",
    image: "/images/photo-1562322140-8baeececf3df.jpg",
    equipment: ["Ceramic Wash Stations", "Ozone Hair Steamer Machines", "Symmetric Shears & Blowers", "Keratin Coating Steam Irons"]
  },
  {
    id: "lab4",
    name: "Laboratorium Royal Javanese Spa",
    description: "Menghadirkan suasana relaksasi tradisional berpencahayaan hangat temaram yang menyegarkan. Dilengkapi kasur spa aromatik kayu jati asli Pekalongan, kabin timbang sauna uap herbal, bath tub hidromassage, dan set hot stones.",
    capacity: "Kapasitas 8 Siswi simultan",
    image: "/images/photo-1608571423902-eed4a5ad8108.jpg",
    equipment: ["Teakwood Spa Massage Beds", "Herbal Steam Wood Cabins", "Thermal Stone Warmer Ovens", "Pedicure Hydro Foot Tubs"]
  }
];

const defaultTeachers: Teacher[] = [
  {
    id: "t1",
    name: "DRA. ENDANG SULASTRI, M.PD.",
    role: "Ketua Komite Keahlian (K3)",
    image: "/images/photo-1573496359142-b8d87734a5a2.jpg",
    certifications: ["Sertifikasi Asesor LSP Kecantikan", "Kualifikasi Martha Tilaar Advanced", "Uji Kompetensi Nasional Level IV"],
    quote: "Estetika sejati lahir dari kedisiplinan tangan, presisi teknik, serta kelembutan hati melayani pelanggan."
  },
  {
    id: "t2",
    name: "SRI WAHYUNINGSIH, S.PD.",
    role: "Sekretaris Komite Keahlian",
    image: "/images/photo-1580489944761-15a19d654956.jpg",
    certifications: ["Sertifikat Pivot Point Internasional", "Trainer Hair-Design Mustika Ratu", "Lisensi Asesor LSP-P1"],
    quote: "Rambut adalah mahkota. Di tangan siswi kami, mahkota tersebut dibentuk secara geometrik, presisi, dan sehat."
  },
  {
    id: "t3",
    name: "RIANA KARTIKA, S.ST.",
    role: "Koordinator Unit TEFA (Eduspa)",
    image: "/images/photo-1567532939604-b6b5b0db2604.jpg",
    certifications: ["Juara 1 Paes Pengantin Jawa Tengah", "Sertifikasi Wardah Professional MUA", "Asesor Tata Rias Wajah"],
    quote: "Setiap riasan adalah kanvas kepribadian. Kami melatih presisi sapuan kuas untuk merayakan kecantikan unik nusantara."
  },
  {
    id: "t4",
    name: "AYU LESTARI, S.PD.",
    role: "Koordinator Hubungan Industri (Prakerin)",
    image: "/images/photo-1534528741775-53994a69daeb.jpg",
    certifications: ["Asesor LSP-P1 Kecantikan", "Sertifikasi Keratase Hairdresser", "Uji Kompetensi Nasional Level III"],
    quote: "Keterampilan adalah paspor masa depan. Kemitraan industri global menjamin karier bersinar bagi lulusan unggul."
  },
  {
    id: "t5",
    name: "BUDI PRATAMA, M.SN.",
    role: "Koordinator Sarana & Seni Rias Prada",
    image: "/images/photo-1507003211169-0a1dd7228f2d.jpg",
    certifications: ["Sertifikasi MUA Senior BNSP", "Seni Rupa Universitas Negeri Semarang", "Trainer Karakter Rias Panggung"],
    quote: "Kreativitas panggung memperkaya khazanah tata rias modern melalui sentuhan kreasi lokal berdaya saing internasional."
  }
];

export default function Fasilitas() {
  const [activeLabTab, setActiveLabTab] = useState<string>('lab1');
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    async function fetchFasilitasAndGuru() {
      try {
        // Fetch facilities
        const { data: facData } = await supabase
          .from('facilities')
          .select('*')
          .order('name', { ascending: true });
        
        if (facData && facData.length > 0) {
          const mappedFac = facData.map((f: any, idx: number) => ({
            id: f.id,
            name: f.name,
            description: f.description || '',
            capacity: f.capacity || '',
            image: f.image_urls && f.image_urls.length > 0 ? f.image_urls[0] : (f.image_url || defaultFacilities[idx % defaultFacilities.length].image),
            images: f.image_urls || [],
            equipment: f.tools && f.tools.length > 0 ? f.tools : ['Standard Lab Equipment']
          }));
          setFacilities(mappedFac);
          if (mappedFac.length > 0) {
            setActiveLabTab(mappedFac[0].id);
          }
        }

        // Fetch teachers
        const { data: teachData } = await supabase
          .from('teachers')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (teachData && teachData.length > 0) {
          const mappedTeach = teachData.map((t: any, idx: number) => ({
            id: t.id,
            name: t.name,
            role: t.position || t.subject,
            image: t.image_url || defaultTeachers[idx % defaultTeachers.length].image,
            certifications: t.certifications && t.certifications.length > 0 ? t.certifications : ['Sertifikasi Kompetensi Guru'],
            quote: t.quote || 'Pendidikan vokasi berkualitas mempersiapkan generasi profesional masa depan.'
          }));
          setTeachers(mappedTeach);
        }
      } catch (err) {
        console.error('Error fetching facilities/teachers:', err);
      }
    }
    fetchFasilitasAndGuru();
  }, []);

  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Reset slider when tab changes
  useEffect(() => {
    setCurrentImageIdx(0);
  }, [activeLabTab]);

  const activeLab = facilities.find(f => f.id === activeLabTab) || facilities[0];

  const handlePrevImage = () => {
    if (!activeLab || !activeLab.images || activeLab.images.length === 0) return;
    setCurrentImageIdx(prev => (prev === 0 ? activeLab.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!activeLab || !activeLab.images || activeLab.images.length === 0) return;
    setCurrentImageIdx(prev => (prev === activeLab.images.length - 1 ? 0 : prev + 1));
  };
  
  const displayImage = activeLab?.images && activeLab.images.length > 0 
    ? activeLab.images[currentImageIdx] 
    : activeLab?.image;


  return (
    <section id="profil-dan-fasilitas" className="bg-[#fafafa] py-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            SECTION 1: PENGERTIAN JURUSAN (DEFINITION)
            ========================================================================= */}
        <div className="bg-white rounded-[2.5rem] border border-pink-100/70 p-8 sm:p-12 shadow-[0_10px_40px_rgba(251,207,232,0.1)] mb-16 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Side: Editorial Typography description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-pink-50 border border-pink-100 rounded-full px-4 py-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                <span className="text-sm tracking-widest font-extrabold text-pink-600 uppercase">
                  PENGERTIAN PROGRAM KEAHLIAN
                </span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-950 leading-tight">
                Pusat Pembelajaran Estetika <br />
                <span className="text-pink-500">Tata Kecantikan &amp; Spa</span>
              </h2>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                <strong>Tata Kecantikan Kulit dan Rambut</strong> di SMK Negeri 1 Pekalongan adalah program keahlian vokasi unggulan berstatus <strong>Pusat Keunggulan (PK)</strong> yang melatih siswi menguasai keterampilan penataan rambut, perawatan kulit wajah &amp; terapi tubuh (spa), kosmetologi medis dasar, hingga keahlian penata rias pengantin (MUA) profesional.
              </p>
              
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Kami mensinergikan resep kecantikan tradisional leluhur Nusantara bersertifikasi Mustika Ratu &amp; Martha Tilaar dengan jajaran mesin terapi klinis modern berskala global. Kurikulum kami diselaraskan total dengan Standar Kompetensi Kerja Nasional Indonesia (SKKNI) guna mencetak formulator &amp; pemilik usaha (beautypreneur) tangguh masa depan.
              </p>

              {/* Bullet Quick Specs */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-pink-100/50">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">Kurikulum Dual System</h5>
                    <p className="text-sm text-gray-500">Kerja sama industri bersertifikasi</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">Living Lab (TEFA)</h5>
                    <p className="text-sm text-gray-500">Praktik layanan rias &amp; spa berbayar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Key Metadata Numbers Grid */}
            <div className="lg:col-span-5 bg-pink-50/20 border border-pink-100/80 rounded-3xl p-6 sm:p-8 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 text-center pb-2 border-b border-pink-100/50">
                Statistik &amp; Informasi Utama
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-pink-100/50 text-center shadow-xs">
                  <span className="block text-3xl font-serif font-black text-pink-600">A</span>
                  <span className="text-sm uppercase font-extrabold tracking-widest text-gray-500 mt-1 block">Akreditasi BAN-PDM</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-pink-100/50 text-center shadow-xs">
                  <span className="block text-2xl font-serif font-black text-pink-600">PK</span>
                  <span className="text-sm uppercase font-extrabold tracking-widest text-gray-500 mt-1 block">Pusat Keunggulan</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-pink-100/50 text-center shadow-xs">
                  <span className="block text-xl font-sans font-black text-pink-600">100%</span>
                  <span className="text-sm uppercase font-extrabold tracking-widest text-gray-500 mt-1 block">Lulus Uji BNSP</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-pink-100/50 text-center shadow-xs">
                  <span className="block text-xl font-sans font-black text-pink-600">92%</span>
                  <span className="text-sm uppercase font-extrabold tracking-widest text-gray-500 mt-1 block">Keterserapan Kerja</span>
                </div>
              </div>
              <div className="text-sm text-center text-gray-400 font-medium">Data di atas terverifikasi resmi oleh Kemendikbudristek RI</div>
            </div>

          </div>
        </div>


        {/* =========================================================================
            SECTION 3: FASILITAS STUDIO & LAB TOUR (EXISTING)
            ========================================================================= */}
        <div className="bg-white rounded-[2.5rem] border border-pink-100/70 p-8 sm:p-12 shadow-[0_10px_40px_rgba(251,207,232,0.1)] mb-16">
          
          {/* Top Intro Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-sm tracking-[0.2em] font-extrabold text-pink-600 uppercase">
              STATE-OF-THE-ART LAB TOUR
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              Fasilitas Laboratorium Pembelajaran Mandiri
            </h3>
            <p className="text-sm text-gray-500 pt-1">
              Komersial &amp; steril: Jaringan studio beroperasi layaknya industri nyata guna mempersiapkan siswi terbiasa mengoperasikan instrumen kecantikan modern.
            </p>
          </div>

          {/* Tabbed Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Area: Vertical Labs navigator (4 col) */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
              {facilities.map((fac) => {
                const isActive = activeLabTab === fac.id;
                return (
                  <button
                    key={fac.id}
                    id={`fac-tab-${fac.id}`}
                    onClick={() => setActiveLabTab(fac.id)}
                    className={`p-5 text-left rounded-3xl border transition-all duration-300 flex items-center space-x-4 cursor-pointer ${
                      isActive
                        ? 'border-pink-500 bg-pink-500 text-white shadow-sm font-bold'
                        : 'border-pink-100 bg-white hover:bg-pink-50/20 text-gray-700'
                    }`}
                  >
                    <Building className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                    <div>
                      <h4 className="text-sm font-bold tracking-tight">{fac.name}</h4>
                      <p className={`text-sm mt-0.5 font-normal ${isActive ? 'text-pink-100' : 'text-gray-400'}`}>{fac.capacity}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Area: Illustrated Lab details (8 col) */}
            <div className="lg:col-span-8 bg-pink-50/30 rounded-[2rem] p-6 sm:p-10 border border-pink-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
              <div className="space-y-5">
                <span className="text-xs font-bold tracking-widest text-pink-600 bg-white border border-pink-100 px-3 py-1 rounded-full uppercase shadow-xs">
                  LABORATORIUM AKTIF JURUSAN
                </span>
                
                {activeLab ? (
                  <>
                    <h3 className="font-serif text-2xl font-bold text-gray-950">
                      {activeLab.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                      {activeLab.description}
                    </p>

                    <div>
                      <h5 className="text-sm font-bold tracking-wider text-gray-900 uppercase mb-2">Instalasi Alat Sedia:</h5>
                      <div className="grid grid-cols-2 gap-2 text-base text-gray-600">
                        {activeLab.equipment.map((eq, i) => (
                          <div key={i} className="flex items-center space-x-1.5 bg-white p-2 rounded-xl border border-pink-100 shadow-xs">
                            <span className="w-1.5 h-1.5 bg-pink-500 rounded-full shrink-0" />
                            <span className="truncate font-semibold text-gray-700">{eq}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-10 text-center text-gray-500 font-medium">Belum ada data laboratorium fasilitas.</div>
                )}
              </div>

              {/* Photo Showcase (Slider) */}
              {activeLab && (
                <div className="relative rounded-2xl overflow-hidden h-[260px] md:h-full min-h-[250px] shadow-sm border border-pink-100 bg-white group">
                  <img
                    src={displayImage}
                    alt={activeLab.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent pointer-none" />
                  
                  {/* Slider Controls */}
                  {activeLab.images && activeLab.images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white/50 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white/50 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      
                      {/* Dots */}
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                        {activeLab.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIdx(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIdx ? 'bg-white w-3' : 'bg-white/50'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  <span className="absolute bottom-4 left-4 text-xs font-extrabold uppercase tracking-widest text-white bg-pink-500 px-3 py-1.5 rounded-full shadow-sm z-10">
                    Standar Industri Vokasi
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* =========================================================================
            SECTION 3.5: SERTIFIKAT & PRESTASI
            ========================================================================= */}
        <div className="mb-16">
          <Prestasi />
        </div>

        {/* =========================================================================
            SECTION 4: TIM DEWAN GURU & ASESOR KEAHLIAN (UDINUS PORTRAIT FORMAT)
            ========================================================================= */}
        <div className="bg-white rounded-[2.5rem] border border-pink-100/70 p-8 sm:p-12 shadow-[0_10px_40px_rgba(251,207,232,0.1)] mb-6">
          
          {/* Header styled exactly like reference */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
              Struktur Organisasi dan Dewan Guru
            </h2>
            <p className="text-sm font-medium text-gray-500 mt-2">
              Konsentrasi Keahlian Tata Kecantikan Kulit dan Rambut
            </p>
            
            {/* Center pink double dot + line indicator from reference */}
            <div className="flex justify-center items-center mt-4">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              <div className="w-16 h-[2px] bg-pink-500 mx-2" />
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            </div>
          </div>

          {/* Teacher List - UDINUS Formal Passport Pink/Rose Background Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teachers.map((teach) => (
              <div
                key={teach.id}
                id={`teacher-card-${teach.id}`}
                className="bg-white rounded-lg border border-gray-150 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  {/* Formal Academic Passport Photo Frame with Elegant Pink/Rose Gradient Background */}
                  <div className="relative w-full aspect-[3/4] bg-pink-400 bg-gradient-to-b from-pink-300 to-rose-600 overflow-hidden flex items-end justify-center border-b border-gray-100">
                    <img
                      src={teach.image}
                      alt={teach.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top filter brightness-105 contrast-[1.02] transition-all duration-300 group-hover:scale-105"
                    />
                    
                    {/* Tiny Cert Badge floating on image for extra detail */}
                    <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-sm font-extrabold uppercase tracking-widest text-[#be185d] px-2 py-1 rounded shadow-xs border border-pink-100/50">
                      Asesor BNSP
                    </span>
                  </div>

                  {/* Text Container from reference layout */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-sans text-xs sm:text-[13px] font-extrabold text-gray-950 uppercase tracking-tight leading-snug min-h-[42px] flex items-start">
                      {teach.name}
                    </h4>
                  </div>
                </div>

                {/* Bottom Role bar with a border separator */}
                <div className="px-4 pb-4">
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-base sm:text-xs text-gray-500 leading-normal font-medium">
                      {teach.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
