import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { X } from 'lucide-react';

export default function GaleriPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<{url: string, title: string} | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchDocs() {
      try {
        const { data } = await supabase
          .from('galleries')
          .select('*')
          .order('date', { ascending: false });

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

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-16">
      {/* Page Header Outside Box */}
      <div className="text-center mb-8 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center justify-center space-x-2">
          <span className="w-8 h-px bg-secondary/50"></span>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">Dokumentasi</span>
          <span className="w-8 h-px bg-secondary/50"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">AKTIVITAS SISWA</h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Dokumentasi kegiatan, karya nyata, dan momen berharga sivitas akademika jurusan kecantikan.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {activities.map((item) => (
              <div key={item.id} className="relative group overflow-hidden cursor-pointer border border-slate-100 rounded-xl pb-5 shadow-sm hover:shadow-md transition-shadow" onClick={() => setSelectedImage({ url: item.imageUrl, title: item.title })}>
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 rounded-t-xl">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-3 px-3 sm:px-5">
                  <p className="text-[10px] sm:text-xs text-secondary font-bold mb-1">
                    {item.date}
                  </p>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-base md:text-lg leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 flex-col" onClick={() => setSelectedImage(null)}>
          <button 
            className="absolute top-6 right-6 text-white hover:text-secondary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage.url} 
            alt="Expanded view" 
            className="max-w-full max-h-[80vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="text-white text-center mt-6 text-lg max-w-3xl font-medium">
            {selectedImage.title}
          </p>
        </div>
      )}
    </div>
  );
}
