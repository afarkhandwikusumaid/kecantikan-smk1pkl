import React from 'react';
import Hero from './Hero';
import Sambutan from './Sambutan';
import AktivitasSiswa from './AktivitasSiswa';
import FAQ from './FAQ';
import Statistik from './Statistik';
import Kemitraan from './Kemitraan';

export default function HomePage() {

  return (
    <div className="bg-slate-50 min-h-screen">
      <Hero />
      
      {/* Profil Singkat & Sambutan Kepala Sekolah */}
      <section className="py-16 bg-white">
        <Sambutan />
      </section>
      
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
