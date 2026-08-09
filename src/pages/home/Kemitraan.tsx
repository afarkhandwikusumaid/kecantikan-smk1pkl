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

        {/* Partners Table */}
        <div className="max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-secondary text-white">
                  <th className="py-3 px-5 text-left text-xs font-bold uppercase tracking-wider w-12">No</th>
                  <th className="py-3 px-5 text-left text-xs font-bold uppercase tracking-wider">Nama Mitra</th>
                  <th className="py-3 px-5 text-left text-xs font-bold uppercase tracking-wider">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner, index) => (
                  <tr
                    key={partner.id || index}
                    className={`border-t border-slate-100 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                    } hover:bg-pink-50/50`}
                  >
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                        partner.isPink
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm font-semibold text-slate-800">{partner.name}</span>
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-sm text-slate-500">{partner.subtitle || '—'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Kemitraan */}
          <div className="mt-4 flex items-center justify-end gap-3">
            <span className="text-sm text-slate-500">Total Kemitraan:</span>
            <span className="inline-flex items-center gap-1.5 bg-secondary text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {partners.length} Mitra
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
