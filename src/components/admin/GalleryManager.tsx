import React, { useState } from 'react';
import { Plus, Trash2, Edit2, X, Image, Search, Link } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  date: string;
}

const CATEGORIES = ['Kegiatan', 'Praktik', 'Prestasi', 'Fasilitas', 'Wisuda'];

let nextId = 1;
const initialData: GalleryItem[] = [
  { id: String(nextId++), title: 'Praktik Perawatan Wajah', imageUrl: 'https://placehold.co/300x200/fce7f3/be185d?text=Galeri', category: 'Praktik', date: '2025-05-10' },
  { id: String(nextId++), title: 'Lomba Tata Rias Daerah', imageUrl: 'https://placehold.co/300x200/fce7f3/be185d?text=Galeri', category: 'Prestasi', date: '2025-04-20' },
];

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>(initialData);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    title: '', imageUrl: '', category: 'Kegiatan', date: new Date().toISOString().split('T')[0],
  });

  const openAdd = () => {
    setEditingId(null);
    setFormData({ title: '', imageUrl: '', category: 'Kegiatan', date: new Date().toISOString().split('T')[0] });
    setShowModal(true);
  };

  const openEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setFormData({ title: item.title, imageUrl: item.imageUrl, category: item.category, date: item.date });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setItems((prev) => prev.map((i) => i.id === editingId ? { ...i, ...formData } : i));
    } else {
      setItems((prev) => [...prev, { id: String(nextId++), ...formData }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Hapus foto ini?')) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Galeri Foto</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola foto kegiatan dan karya siswa</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> Tambah Foto
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Cari foto atau kategori..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50" />
          </div>
        </div>

        <div className="p-5">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Image className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>Belum ada foto.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((item) => (
                <div key={item.id} className="group relative rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x200/f1f5f9/94a3b8?text=No+Image'; }} />
                  <div className="p-2.5">
                    <p className="text-xs font-semibold text-slate-700 line-clamp-1">{item.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-medium">{item.category}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(item)} className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Foto' : 'Tambah Foto Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Judul Foto</label>
                <input type="text" required value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Judul deskriptif foto..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1"><Link className="w-3.5 h-3.5" /> URL Gambar</span>
                </label>
                <input type="url" value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="https://..." />
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="preview" className="mt-2 rounded-lg h-24 w-full object-cover border border-slate-200" onError={(e) => { (e.target as HTMLImageElement).hidden = true; }} />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Kategori</label>
                  <select value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tanggal</label>
                  <input type="date" required value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  {editingId ? 'Simpan Perubahan' : 'Tambah Foto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
