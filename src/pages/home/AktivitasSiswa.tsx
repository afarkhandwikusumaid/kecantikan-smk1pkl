import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AktivitasSiswa() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const { data } = await supabase
          .from('galleries')
          .select('*')
          .order('date', { ascending: false })
          .limit(3);

        if (data && data.length > 0) {
          const mapped = data.map((item: any) => {
            const dateObj = new Date(item.date);
            const formattedDate = `${dateObj.getDate()} ${dateObj.toLocaleString('id-ID', { month: 'short' }).toUpperCase()} ${dateObj.getFullYear()}`;
            
            return {
              id: item.id,
              title: item.title,
              date: formattedDate,
              imageUrl: item.image_url,
            };
          });
          setActivities(mapped);
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
      }
    }
    fetchDocs();
  }, []);

  if (activities.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header — same style as Kemitraan/FAQ/Statistik */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center space-x-2 mb-3">
            <span className="w-8 h-px bg-secondary/50"></span>
            <span className="text-xs font-bold text-secondary tracking-widest uppercase">Budaya & Tradisi</span>
            <span className="w-8 h-px bg-secondary/50"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 tracking-tight">
            AKTIVITAS SISWA
          </h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-5 rounded-full"></div>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Membangun karakter unggul melalui pelestarian budaya, tradisi positif, dan penanaman nilai-nilai moral di lingkungan sekolah.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {activities.map((item) => (
            <Link to="/galeri" key={item.id} className="relative group overflow-hidden cursor-pointer bg-slate-100 aspect-[4/3] block rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="bg-secondary text-white text-xs font-bold px-2 py-1 uppercase tracking-wider mb-2 inline-block rounded-sm">
                  Galeri
                </span>
                <h3 className="font-bold text-base sm:text-lg leading-tight mb-1 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {item.date}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Link */}
        <div className="text-center mt-8">
          <Link
            to="/galeri"
            className="inline-flex items-center space-x-2 text-secondary font-bold hover:text-primary transition-colors text-sm"
          >
            <span>Lihat Semua Aktivitas</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
