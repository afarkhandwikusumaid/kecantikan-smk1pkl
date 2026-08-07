import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Partner {
  id: string;
  name: string;
  subtitle: string;
  isPink: boolean;
}

export default function Kemitraan() {
  const [partners, setPartners] = useState<Partner[]>([
    { id: '1', name: 'Kementerian Pendidikan', subtitle: '', isPink: false },
    { id: '2', name: 'Industri Kosmetik Nasional', subtitle: '', isPink: true },
    { id: '3', name: 'Asosiasi Spa Indonesia', subtitle: '', isPink: false },
    { id: '4', name: 'LSP Kecantikan', subtitle: '', isPink: true },
    { id: '5', name: 'Dinas Pariwisata', subtitle: '', isPink: false },
  ]);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const { data } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'mitra_industri')
          .single();
        if (data && data.value) {
          setPartners(data.value as Partner[]);
        }
      } catch (err) {
        console.error('Error fetching partners:', err);
      }
    }
    fetchPartners();
  }, []);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2">
            <span className="w-8 h-px bg-secondary/50"></span>
            <span className="text-xs font-bold text-secondary tracking-widest uppercase">Kolaborasi</span>
            <span className="w-8 h-px bg-secondary/50"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">MITRA INDUSTRI &amp; KERJASAMA</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-6 rounded-full"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Kami menjalin kerjasama dengan berbagai institusi dan dunia industri untuk memastikan kualitas pendidikan dan lulusan yang siap kerja.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-70">
          {partners.map((partner, index) => (
            <div key={partner.id || index} className="flex flex-col items-center space-y-3 grayscale hover:grayscale-0 transition-all duration-300">
              <div className={`w-16 h-16 bg-white shadow-sm border ${partner.isPink ? 'border-pink-200' : 'border-slate-200'} rounded-full flex items-center justify-center`}>
                <span className={`text-2xl font-bold ${partner.isPink ? 'text-pink-400' : 'text-slate-400'}`}>
                  {partner.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-slate-500 block">{partner.name}</span>
                {partner.subtitle && <span className="text-xs text-slate-400">{partner.subtitle}</span>}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
