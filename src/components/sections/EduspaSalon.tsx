import React, { useState, useEffect } from 'react';
import { Clock, Palette } from 'lucide-react';
import { Service } from '../../types';
import { supabase } from '../../lib/supabase';

export default function EduspaSalon() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('name', { ascending: true });
        
        if (data && data.length > 0) {
          const mapped = data.map((item: any) => ({
            id: item.id,
            category: item.category,
            name: item.name,
            duration: item.duration,
            price: item.price,
            description: item.description,
            features: item.features || [],
            image: item.image_url || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400'
          }));
          setServices(mapped);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    }
    fetchServices();
  }, []);

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <section id="eduspa" className="py-20 md:py-28 bg-pink-50/20 border-y border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <span className="text-sm tracking-[0.2em] font-extrabold text-pink-600 uppercase">
            UNIT BISNIS JURUSAN &amp; TRAINING FACTORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
            Eduspa Living Salon: <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">Layanan Publik oleh Siswa</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 pt-3">
            Sebuah konsep <span className="font-semibold text-gray-800">Teaching Factory</span> di mana para siswa tingkat akhir mempraktikkan keterampilan mereka secara langsung kepada masyarakat umum di bawah bimbingan dan pengawasan ketat Guru Instruktur bersertifikasi asesor nasional.
          </p>
        </div>

        {/* Catalog Section */}
        <div className="space-y-12">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-pink-100 pb-6 gap-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Palette className="w-5 h-5 text-pink-500" />
              Katalog Layanan Eduspa
            </h3>

            {/* Filter Toggles */}
            <div className="flex flex-wrap gap-1 bg-pink-100/50 p-1 rounded-xl border border-pink-100/30">
              {['all', 'skincare', 'hair', 'body', 'makeup'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all uppercase ${
                    selectedCategory === cat
                      ? 'bg-pink-500 text-white shadow-sm'
                      : 'text-gray-500 hover:text-pink-600'
                  }`}
                >
                  {cat === 'all' ? 'Semua Layanan' : cat === 'skincare' ? 'Kulit' : cat === 'hair' ? 'Rambut' : cat === 'body' ? 'Spa' : 'Rias'}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid (Full Width) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group rounded-3xl overflow-hidden bg-white border border-pink-100 transition-all duration-300 relative hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-pink-500 text-white text-sm font-bold px-2.5 py-1 rounded uppercase tracking-widest shadow-sm">
                    {service.category}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-pink-400" />
                    {service.duration} Menit
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-serif text-lg font-bold text-gray-900 leading-tight">
                      {service.name}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed font-medium mt-2">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-pink-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Harga</span>
                      <span className="text-sm font-bold text-pink-600">
                        {service.price === 0 ? 'Gratis/Praktik' : `Rp ${service.price.toLocaleString('id-ID')}`}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/6281229516969?text=${encodeURIComponent(
                        `Halo Admin Eduspa SMKN 1 Pekalongan, saya ingin memesan layanan "${service.name}" (${service.duration} menit) dengan harga ${
                          service.price === 0 ? 'Gratis/Praktik' : `Rp ${service.price.toLocaleString('id-ID')}`
                        }. Mohon informasi jadwal ketersediaan praktik siswa.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-md shadow-pink-100 hover:shadow-pink-200 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider"
                      style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.116-2.905-6.993-1.876-1.879-4.36-2.914-7.01-2.914-5.441 0-9.866 4.426-9.869 9.87-.001 1.796.468 3.548 1.362 5.095L.893 22.005l6.09-1.599c-1.552.83-2.502.267-2.502.267zm12.234-7.658c-.329-.165-1.948-.963-2.247-1.073-.299-.11-.517-.165-.736.165-.219.329-.848 1.073-1.039 1.293-.191.22-.383.247-.712.082-1.341-.67-2.345-1.173-3.21-2.67-.228-.396.228-.367.652-1.214.1-.2.05-.375-.025-.539-.075-.165-.736-1.77-.999-2.428-.27-.647-.542-.55-.736-.56-.19-.01-.41-.01-.629-.01-.219 0-.575.082-.876.411-.3.329-1.148 1.123-1.148 2.738 0 1.615 1.176 3.178 1.34 3.397.164.22 2.313 3.53 5.6 4.95 2.734 1.182 3.313.948 4.5.836 1.19-.112 2.248-.714 2.562-1.484.314-.769.314-1.429.219-1.566-.094-.137-.329-.22-.657-.385z"/>
                      </svg>
                      Booking via WA
                    </a>
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
