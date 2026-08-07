import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function PembelajaranPage() {
  const [syllabus, setSyllabus] = useState<{ X: any[]; XI: any[]; XII: any[] }>({ X: [], XI: [], XII: [] });
  const [selectedClassTab, setSelectedClassTab] = useState<'X' | 'XI' | 'XII'>('X');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    async function fetchData() {
      try {
        const { data: currData } = await supabase
          .from('curriculum')
          .select('*')
          .order('semester', { ascending: true })
          .order('name', { ascending: true });

        if (currData && currData.length > 0) {
          const X: any[] = [];
          const XI: any[] = [];
          const XII: any[] = [];

          currData.forEach((item) => {
            const mapped = {
              name: item.name,
              hrs: item.credits || '144 JP',
              type: item.type || 'Umum',
            };

            if (item.semester === 1 || item.semester === 2 || item.semester === 10) {
              X.push(mapped);
            } else if (item.semester === 3 || item.semester === 4 || item.semester === 11) {
              XI.push(mapped);
            } else if (item.semester === 5 || item.semester === 6 || item.semester === 12) {
              XII.push(mapped);
            }
          });

          setSyllabus({ X, XI, XII });
        }
      } catch (err) {
        console.error('Error fetching academic data:', err);
      }
    }
    fetchData();
  }, []);

  const renderTable = (data: any[], title: string) => {
    const umum = data.filter(item => item.type === 'Umum');
    const kejuruan = data.filter(item => item.type === 'Kejuruan');

    return (
      <div className="mt-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
        <div className="overflow-x-auto border border-slate-200 rounded">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 text-sm font-bold">
                <th className="px-6 py-4 border-r border-slate-200 w-16 text-center">No</th>
                <th className="px-6 py-4 border-r border-slate-200">Mata Pelajaran</th>
                <th className="px-6 py-4 text-center w-32">Total JP</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              
              {/* Umum Section */}
              <tr className="bg-slate-50 border-b border-slate-200">
                <td colSpan={3} className="px-6 py-3 font-bold text-slate-900 uppercase">A. Mata Pelajaran Umum</td>
              </tr>
              {umum.length === 0 ? (
                <tr className="border-b border-slate-200"><td colSpan={3} className="px-6 py-3 text-center text-slate-400 italic">Belum ada data</td></tr>
              ) : (
                umum.map((item, idx) => (
                  <tr key={`umum-${idx}`} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-3 border-r border-slate-200 text-center">{idx + 1}</td>
                    <td className="px-6 py-3 border-r border-slate-200">{item.name}</td>
                    <td className="px-6 py-3 text-center">{item.hrs}</td>
                  </tr>
                ))
              )}

              {/* Kejuruan Section */}
              <tr className="bg-slate-50 border-b border-slate-200">
                <td colSpan={3} className="px-6 py-3 font-bold text-slate-900 uppercase">B. Mata Pelajaran Kejuruan</td>
              </tr>
              {kejuruan.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-3 text-center text-slate-400 italic">Belum ada data</td></tr>
              ) : (
                kejuruan.map((item, idx) => (
                  <tr key={`kejuruan-${idx}`} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                    <td className="px-6 py-3 border-r border-slate-200 text-center">{idx + 1}</td>
                    <td className="px-6 py-3 border-r border-slate-200">{item.name}</td>
                    <td className="px-6 py-3 text-center">{item.hrs}</td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-16">
      {/* Page Header Outside Box */}
      <div className="text-center mb-8 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center justify-center space-x-2">
          <span className="w-8 h-px bg-secondary/50"></span>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">Akademik Jurusan</span>
          <span className="w-8 h-px bg-secondary/50"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">MATA PELAJARAN</h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Daftar mata pelajaran produktif dan kompetensi yang dipelajari siswa selama masa pendidikan.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">
          
          <div className="prose prose-slate max-w-none text-slate-600 mb-10">
            <p>
              Struktur Kurikulum pada Program Keahlian Kecantikan & Spa disusun dengan mengacu pada Permendikbudristek tentang penjabaran Kurikulum Merdeka, secara rinci dapat dilihat pada tabel di bawah ini.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-4">
            {(['X', 'XI', 'XII'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedClassTab(lvl)}
                className={`px-6 py-2.5 rounded text-sm font-bold transition-colors ${
                  selectedClassTab === lvl
                    ? 'bg-secondary text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Kelas {lvl}
              </button>
            ))}
          </div>

          {selectedClassTab === 'X' && renderTable(syllabus.X, 'Struktur Kurikulum Kelas X')}
          {selectedClassTab === 'XI' && renderTable(syllabus.XI, 'Struktur Kurikulum Kelas XI')}
          {selectedClassTab === 'XII' && renderTable(syllabus.XII, 'Struktur Kurikulum Kelas XII')}

        </div>
      </div>
    </div>
  );
}
