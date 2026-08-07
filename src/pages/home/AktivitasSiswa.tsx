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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-1 h-6 bg-secondary"></div>
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Budaya & Tradisi</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-4">
              Aktivitas Siswa
            </h2>
            <p className="text-slate-600">
              Membangun karakter unggul melalui pelestarian budaya, tradisi positif, dan penanaman nilai-nilai moral di lingkungan sekolah.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link 
              to="/galeri" 
              className="text-secondary font-bold flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <span>Jelajahi Aktivitas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((item) => (
            <Link to="/galeri" key={item.id} className="relative group overflow-hidden cursor-pointer bg-slate-100 aspect-[4/3] block">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-secondary text-white text-xs font-bold px-2 py-1 uppercase tracking-wider mb-3 inline-block">
                  Galeri
                </span>
                <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {item.date}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
