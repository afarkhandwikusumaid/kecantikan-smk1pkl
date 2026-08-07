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
          <div className="absolute -bottom-8 md:-bottom-6 left-1/2 -translate-x-1/2 w-11/12 bg-white text-center py-3 md:py-4 px-2 shadow-xl z-20">
            <h3 className="font-bold text-base md:text-lg text-slate-900 line-clamp-1">{kaprodi.name || 'Dra. Endang Sulastri, M.Pd.'}</h3>
            <p className="text-xs md:text-sm font-bold text-secondary mt-1">{kaprodi.title || 'Kepala Jurusan'}</p>
          </div>
        </div>

        {/* Text Column */}
        <div className="w-full md:w-2/3 md:pl-8 mt-4 md:mt-0">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-1 h-6 bg-secondary"></div>
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Sambutan Ketua Jurusan</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
              Mewujudkan Generasi Emas <br/>
              <span className="text-secondary">SMK Negeri 1 Pekalongan</span>
            </h2>
          </div>
          
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-justify">
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
            <p className="font-medium text-slate-900 text-lg mt-6">
              Wassalamu’alaikum Warahmatullahi Wabarakatuh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
