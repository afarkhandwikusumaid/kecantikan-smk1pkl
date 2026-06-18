import React, { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, deleteDoc, doc, updateDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, X, Newspaper, Search, Tag, Calendar } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  date: string;
}

const CATEGORIES = ['Akademik', 'Prestasi', 'Kegiatan', 'Pengumuman', 'Informasi'];

const emptyForm = {
  title: '',
  desc: '',
  category: 'Akademik',
  date: new Date().toISOString().split('T')[0],
};

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [errorMsg, setErrorMsg] = useState('');
  const [search, setSearch] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'news'));
      const data: NewsItem[] = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as NewsItem));
      data.sort((a, b) => b.date.localeCompare(a.date));
      setNews(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setErrorMsg('');
    setShowModal(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setFormData({ title: item.title, desc: item.desc, category: item.category, date: item.date });
    setErrorMsg('');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (editingId) {
        await updateDoc(doc(db, 'news', editingId), formData);
      } else {
        await addDoc(collection(db, 'news'), formData);
      }
      setShowModal(false);
      fetchNews();
    } catch (err: any) {
      setErrorMsg('Gagal menyimpan. Periksa Firestore rules.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Hapus berita ini?')) return;
    try {
      await deleteDoc(doc(db, 'news', id));
      fetchNews();
    } catch (e) {
      console.error(e);
    }
  };

  const categoryColor: Record<string, string> = {
    Akademik: 'bg-blue-100 text-blue-700',
    Prestasi: 'bg-yellow-100 text-yellow-700',
    Kegiatan: 'bg-green-100 text-green-700',
    Pengumuman: 'bg-orange-100 text-orange-700',
    Informasi: 'bg-purple-100 text-purple-700',
  };

  const filtered = news.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Berita & Kegiatan</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola artikel berita dan kegiatan jurusan</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 transition-all hover:shadow-pink-300 hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}
        >
          <Plus className="w-4 h-4" />
          Tambah Berita
        </button>
      </div>

      {/* Search & Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul atau kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 bg-slate-50"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Judul Berita</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Kategori</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tanggal</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                      <Newspaper className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p>Belum ada berita.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800 line-clamp-1">{item.title}</p>
                        <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">{item.desc}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColor[item.category] || 'bg-slate-100 text-slate-600'}`}>
                          <Tag className="w-3 h-3" />
                          {item.category}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.date}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
            Menampilkan {filtered.length} dari {news.length} berita
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Berita' : 'Tambah Berita Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">{errorMsg}</div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Judul Berita</label>
                <input
                  type="text" required value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  placeholder="Masukkan judul berita..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tanggal</label>
                  <input
                    type="date" required value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi / Isi Singkat</label>
                <textarea
                  required rows={4} value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 resize-none"
                  placeholder="Tulis ringkasan berita..."
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
                  Batal
                </button>
                <button type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 transition-all hover:shadow-pink-300"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  {editingId ? 'Simpan Perubahan' : 'Simpan Berita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
