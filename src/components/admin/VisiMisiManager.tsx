import React, { useState } from 'react';
import { Save, Eye, FileText } from 'lucide-react';

const defaultVisi = 'Menjadi jurusan kecantikan unggulan yang menghasilkan tenaga ahli kecantikan dan spa yang profesional, berkarakter, dan berjiwa wirausaha, serta mampu bersaing di tingkat nasional maupun internasional.';
const defaultMisi = [
  'Menyelenggarakan pembelajaran kecantikan dan spa yang inovatif, kreatif, dan berbasis industri.',
  'Membentuk peserta didik yang berkarakter, berakhlak mulia, dan memiliki etos kerja tinggi.',
  'Mengembangkan kompetensi keahlian melalui kemitraan aktif dengan dunia usaha dan industri (DUDI).',
  'Menumbuhkan jiwa wirausaha dan kemandirian pada peserta didik.',
  'Mewujudkan lulusan yang siap kerja, cerdas, dan kompetitif di era global.',
];

export default function VisiMisiManager() {
  const [visi, setVisi] = useState(defaultVisi);
  const [misi, setMisi] = useState<string[]>(defaultMisi);
  const [newMisi, setNewMisi] = useState('');
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addMisi = () => {
    if (!newMisi.trim()) return;
    setMisi((prev) => [...prev, newMisi.trim()]);
    setNewMisi('');
  };

  const removeMisi = (idx: number) => {
    setMisi((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Visi & Misi</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola visi dan misi jurusan yang tampil di website</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setPreview(!preview)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
            <Eye className="w-4 h-4" /> {preview ? 'Edit' : 'Preview'}
          </button>
          <button onClick={handleSave}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all ${saved ? 'bg-green-500 shadow-green-200' : 'shadow-pink-200 hover:scale-105 active:scale-95'}`}
            style={!saved ? { background: 'linear-gradient(135deg, #ec4899, #be185d)' } : {}}>
            <Save className="w-4 h-4" /> {saved ? 'Tersimpan!' : 'Simpan'}
          </button>
        </div>
      </div>

      <div>
          
          {preview ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-pink-600 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-pink-500 inline-block" /> VISI
                </h2>
                <p className="text-slate-700 leading-relaxed italic">"{visi}"</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-pink-600 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-pink-500 inline-block" /> MISI
                </h2>
                <ol className="space-y-2">
                  {misi.map((m, i) => (
                    <li key={i} className="flex gap-3 text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center">
                    <FileText className="w-4.5 h-4.5 text-pink-600" />
                  </div>
                  <h2 className="font-bold text-slate-800">Visi Jurusan</h2>
                </div>
                <div className="p-6">
                  <textarea rows={4} value={visi} onChange={(e) => setVisi(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none text-slate-700"
                    placeholder="Tulis visi jurusan..." />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center">
                    <FileText className="w-4.5 h-4.5 text-pink-600" />
                  </div>
                  <h2 className="font-bold text-slate-800">Misi Jurusan</h2>
                </div>
                <div className="p-6 space-y-3">
                  {misi.map((m, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2">{i + 1}</span>
                      <input type="text" value={m}
                        onChange={(e) => setMisi((prev) => prev.map((mi, idx) => idx === i ? e.target.value : mi))}
                        className="flex-1 rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" />
                      <button onClick={() => removeMisi(i)}
                        className="mt-2 text-slate-300 hover:text-red-500 transition-colors text-lg font-bold flex-shrink-0">×</button>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                    <input type="text" value={newMisi} onChange={(e) => setNewMisi(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMisi(); } }}
                      className="flex-1 rounded-xl border border-dashed border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50"
                      placeholder="Tambah poin misi baru (Enter untuk tambah)..." />
                    <button onClick={addMisi}
                      className="px-4 py-3 rounded-xl text-sm font-semibold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                      + Tambah
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
