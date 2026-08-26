import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import SEO from '../../components/seo/SEO';

interface Teacher {
  id: string;
  name: string;
  position: string;
  image_url: string;
}

export default function StrukturGuruPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchTeachers() {
      try {
        const { data } = await supabase
          .from('teachers')
          .select('*')
          .order('name', { ascending: true });
        
        if (data) {
          setTeachers(data);
        }
      } catch (err) {
        console.error('Error fetching teachers:', err);
      }
    }
    fetchTeachers();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-16">
      <SEO title="Struktur Guru" />
      {/* Page Header Outside Box */}
      <div className="text-center mb-8 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center justify-center space-x-2">
          <span className="w-8 h-px bg-secondary/50"></span>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">Struktur Guru</span>
          <span className="w-8 h-px bg-secondary/50"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">STRUKTUR GURU & STAF</h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Mengenal para tenaga pendidik dan staf ahli yang berdedikasi membimbing generasi cerdas kecantikan.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-5 sm:p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
          
          {teachers.length === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 opacity-50">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="border border-slate-100 rounded-xl p-4 sm:p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-200 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center overflow-hidden">
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-lg">Nama Guru {item}</h4>
                  <p className="text-xs text-slate-500 mt-1">Pengampu Produktif</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="border border-slate-100 rounded-xl p-4 sm:p-6 text-center hover:shadow-md transition-shadow flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
                    {teacher.image_url ? (
                      <img src={teacher.image_url} alt={teacher.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300" />
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm md:text-base leading-snug break-words hyphens-auto w-full">{teacher.name}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2">{teacher.position}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
