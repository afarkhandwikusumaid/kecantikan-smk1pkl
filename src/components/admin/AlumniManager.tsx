import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X, GraduationCap, Quote, Search } from 'lucide-react';

interface Alumni {
  id: string;
  name: string;
  graduationYear: string;
  workplace: string;
  testimonial: string;
}

const defaultData: Alumni[] = [
  { id: 'a1', name: 'Adelia Setyowati', graduationYear: '2024', workplace: 'Erha Clinic Group Pekalongan (Aesthetician)', testimonial: 'Praktik di TEFA Eduspa Salon sangat membantu saya melatih mental menghadapi konsumen riil.' },
  { id: 'a2', name: 'Putri Rahayu', graduationYear: '2023', workplace: 'Martha Tilaar Salon & Day Spa Bali (Senior Therapist)', testimonial: 'Sertifikasi LSP-P1 BNSP yang difasilitasi sekolah diakui secara nasional. Begitu lulus, saya langsung ditempatkan di resor bintang 5 di Bali.' },
];

const emptyForm = { name: '', graduationYear: '', workplace: '', testimonial: '' };

export default function AlumniManager() {
  const [items, setItems] = useState<Alumni[]>(defaultData);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState('');

  const openAdd = () => { setEditingId(null); setFormData(emptyForm); setShowModal(true); };
  const openEdit = (a: Alumni) => { setEditingId(a.id); setFormData({ name: a.name, graduationYear: a.graduationYear, workplace: a.workplace, testimonial: a.testimonial }); setShowModal(true); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setItems(prev => prev.map(i => i.id === editingId ? { ...i, ...formData } : i));
    } else {
      setItems(prev => [{ id: `a-${Date.now()}`, ...formData }, ...prev]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Hapus data alumni ini?')) return;
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.workplace.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Testimoni Alumni</h1>
          <p className="text-sm text-slate-500 mt-0.5">Cerita sukses alumni jurusan Kecantikan & SPA</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> Tambah Alumni
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Cari nama atau tempat kerja..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50" />
          </div>
        </div>

        <div className="p-5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <GraduationCap className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>Belum ada data alumni.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map(item => (
                <div key={item.id} className="relative p-5 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-pink-50/30 hover:shadow-md transition-shadow group">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-pink-100" />
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-500">Lulusan {item.graduationYear} · {item.workplace}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic line-clamp-3">"{item.testimonial}"</p>
                  <div className="flex justify-end gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Alumni' : 'Tambah Alumni Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Alumni</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Nama lengkap..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tahun Lulus</label>
                  <input type="text" required value={formData.graduationYear} onChange={e => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="2023" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tempat Bekerja / Usaha</label>
                <input type="text" required value={formData.workplace} onChange={e => setFormData({ ...formData, workplace: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Salon Kecantikan X, Kota Y" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Testimoni</label>
                <textarea rows={4} required value={formData.testimonial} onChange={e => setFormData({ ...formData, testimonial: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                  placeholder="Cerita singkat pengalaman bersekolah di sini..." />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  {editingId ? 'Simpan Perubahan' : 'Tambah Alumni'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
