import React, { useEffect } from 'react';

export default function KurikulumPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-16">
      {/* Page Header Outside Box */}
      <div className="text-center mb-8 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center justify-center space-x-2">
          <span className="w-8 h-px bg-secondary/50"></span>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">Akademik Jurusan</span>
          <span className="w-8 h-px bg-secondary/50"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">KURIKULUM KAMI</h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Struktur pembelajaran komprehensif yang memadukan teori estetika dengan keterampilan praktik industri.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">
          
          <div className="prose prose-slate max-w-none text-slate-600 text-justify">
            <p>
              Kurikulum Operasional Satuan Pendidikan (KOSP) pada Program Keahlian Tata Kecantikan & Spa merupakan pola dan susunan mata pelajaran yang harus ditempuh oleh peserta didik dalam kegiatan pembelajaran. Kedalaman muatan kurikulum pada setiap mata pelajaran pada setiap satuan pendidikan dituangkan dalam kompetensi yang harus dikuasai peserta didik sesuai dengan beban belajar yang tercantum dalam struktur kurikulum.
            </p>
            <p className="mt-4">
              Pengembangan kurikulum di program keahlian ini selalu diselaraskan dengan kebutuhan Dunia Usaha dan Dunia Industri (DUDI), khususnya di bidang estetika, tata rias, dan spa. Dinamika ini terjadi untuk menyesuaikan arah pendidikan dengan kebutuhan zaman, kemajuan teknologi alat kecantikan, dan tuntutan pelayanan jasa global.
            </p>

            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">Fokus Pembelajaran Vokasi</h3>
            <ul className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Pendidikan Karakter & Etika Profesi :</strong> Mengembangkan sikap (attitude) pelayanan pelanggan (hospitality) yang merupakan standar utama di industri jasa kecantikan.
              </li>
              <li>
                <strong>Keterampilan Praktik (Hard Skills) :</strong> Proporsi pembelajaran praktik mencapai lebih dari 60%, dilakukan di laboratorium dan Teaching Factory (Eduspa Klinik) yang sesuai dengan standar industri.
              </li>
              <li>
                <strong>Sertifikasi Kompetensi :</strong> Kurikulum dirancang agar di akhir masa studi, siswa siap mengikuti uji kompetensi oleh LSP (Lembaga Sertifikasi Profesi) P1 berlisensi BNSP.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
