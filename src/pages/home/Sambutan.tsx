import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface KaprodiSettings { name: string; photoUrl: string; title: string; greetingText: string; }

export default function Sambutan() {
  const [kaprodi, setKaprodi] = useState<KaprodiSettings>({
    name: '',
    photoUrl: '',
    title: '',
    greetingText: ''
  });

  useEffect(() => {
    async function fetchSambutan() {
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'sambutan')
          .single();
        if (data && data.value) {
          setKaprodi(data.value);
        }
      } catch (err) {
        console.error('Error fetching Kaprodi setting on public page:', err);
      }
    }
    fetchSambutan();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section Header — consistent with other sections */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center justify-center space-x-2 mb-3">
          <span className="w-8 h-px bg-secondary/50"></span>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">Sambutan</span>
          <span className="w-8 h-px bg-secondary/50"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 tracking-tight">
          SAMBUTAN KETUA JURUSAN
        </h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-2 rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        {/* Photo Column */}
        <div className="w-10/12 sm:w-2/3 md:w-1/3 shrink-0 relative mt-4 mb-16 md:mb-8 mx-auto md:mx-0">
          {/* Decorative Offset Background */}
          <div className="absolute inset-0 bg-secondary translate-x-4 md:translate-x-6 translate-y-6 md:translate-y-8"></div>
          
          <img
            src={kaprodi.photoUrl || "/images/photo-1573496359142-b8d87734a5a2.jpg"}
            alt={kaprodi.name || 'Kepala Jurusan'}
            className="relative w-full h-[380px] sm:h-[420px] md:h-[470px] object-cover object-top shadow-md z-10"
          />
          
          {/* Floating Name Card */}
          <div className="absolute -bottom-8 md:-bottom-6 left-1/2 -translate-x-1/2 w-11/12 bg-white text-center py-3 md:py-4 px-2 shadow-xl z-20 rounded-sm">
            <h3 className="font-bold text-base md:text-lg text-slate-900 line-clamp-1">{kaprodi.name || 'Dra. Endang Sulastri, M.Pd.'}</h3>
            <p className="text-xs md:text-sm font-bold text-secondary mt-1">{kaprodi.title || 'Kepala Jurusan'}</p>
          </div>
        </div>

        {/* Text Column */}
        <div className="w-full md:w-2/3 md:pl-8 mt-4 md:mt-0">
          <div className="mb-5">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-snug mb-1">
              Mewujudkan Generasi Emas
            </h3>
            <p className="text-lg sm:text-xl font-serif text-secondary font-bold">SMK Negeri 1 Pekalongan</p>
          </div>
          
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-left sm:text-justify text-sm sm:text-base">
            {kaprodi.greetingText ? (
              kaprodi.greetingText.split('\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))
            ) : (
              <>
                <p className="mb-4">
                  Selamat datang di platform digital resmi Konsentrasi Keahlian Kecantikan dan Spa SMK Negeri 1 Pekalongan. Kami sangat bersyukur dapat menyediakan wadah informasi dan komunikasi ini untuk menjangkau seluruh siswa, orang tua, alumni, maupun dunia industri.
                </p>
                <p className="mb-4">
                  Sebagai program keahlian vokasi unggulan yang telah terakreditasi A (Unggul), kami terus berkomitmen untuk memberikan pendidikan yang berkualitas, seimbang antara teori dan praktik, serta selalu update dengan perkembangan tren estetika, kosmetologi, dan industri spa secara global. Dengan adanya fasilitas Teaching Factory Eduspa Klinik, kami berharap para lulusan kami kelak menjadi tenaga ahli yang profesional, berkarakter mulia, dan siap bersaing di pasar kerja maupun berwirausaha mandiri.
                </p>
              </>
            )}
            <p className="font-medium text-slate-900 text-base mt-6 border-t border-slate-100 pt-4">
              Wassalamu'alaikum Warahmatullahi Wabarakatuh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
