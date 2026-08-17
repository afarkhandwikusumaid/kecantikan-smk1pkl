import React from 'react';
import SEO from '../../components/seo/SEO';
import Hero from './Hero';
import Sambutan from './Sambutan';
import AktivitasSiswa from './AktivitasSiswa';
import FAQ from './FAQ';
import Statistik from './Statistik';
import Kemitraan from './Kemitraan';
import SebaranAlumniPreview from './SebaranAlumniPreview';

export default function HomePage() {

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="Beranda" 
        description="Website Resmi Jurusan Kecantikan dan Spa SMK Negeri 1 Pekalongan. Pusat keunggulan pendidikan vokasi kecantikan, salon eduspa, dan tata rias." 
      />
      <Hero />
      
      {/* Profil Singkat & Sambutan Kepala Sekolah */}
      <section className="py-16 bg-white">
        <Sambutan />
      </section>

      {/* Preview Sebaran Alumni */}
      <SebaranAlumniPreview />
      
      {/* Aktivitas Siswa / Dokumentasi */}
      <AktivitasSiswa />

      {/* Statistik */}
      <Statistik />

      {/* Kemitraan */}
      <Kemitraan />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
