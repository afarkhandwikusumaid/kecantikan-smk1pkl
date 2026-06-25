import React, { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, deleteDoc, doc, updateDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, X, Trophy, Search } from 'lucide-react';

interface Achievement {
  id: string;
  studentName: string;
  type: string;
  level: 'Kota/Kab' | 'Provinsi' | 'Nasional' | 'Internasional';
  year: string;
  description: string;
}

const emptyForm = {
  studentName: '',
  type: '',
  level: 'Kota/Kab' as Achievement['level'],
  year: new Date().getFullYear().toString(),
  description: ''
};

const levelColor: Record<string, string> = {
  'Kota/Kab': 'bg-green-100 text-green-700',
  'Provinsi': 'bg-blue-100 text-blue-700',
  'Nasional': 'bg-orange-100 text-orange-700',
  'Internasional': 'bg-purple-100 text-purple-700',
};

export default function AchievementManager() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchAchievements = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const snapshot = await getDocs(collection(db, 'achievements'));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Achievement));
      // Sort by year descending
      data.sort((a, b) => b.year.localeCompare(a.year));
      setItems(data);
    } catch (e) {
      console.error('Error fetching achievements:', e);
      setErrorMsg('Gagal mengambil data prestasi dari database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setErrorMsg('');
    setShowModal(true);
  };

  const openEdit = (a: Achievement) => {
    setEditingId(a.id);
    setFormData({ studentName: a.studentName, type: a.type, level: a.level, year: a.year, description: a.description });
    setErrorMsg('');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (editingId) {
        await updateDoc(doc(db, 'achievements', editingId), formData);
      } else {
        await addDoc(collection(db, 'achievements'), formData);
      }
      setShowModal(false);
      fetchAchievements();
    } catch (err) {
      console.error('Error saving achievement:', err);
      setErrorMsg('Gagal menyimpan data prestasi. Periksa rules Firestore.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Hapus data prestasi ini?')) return;
    try {
      await deleteDoc(doc(db, 'achievements', id));
      fetchAchievements();
    } catch (e) {
      console.error('Error deleting achievement:', e);
      alert('Gagal menghapus data prestasi.');
    }
  };

  const filtered = items.filter((i) =>
    i.studentName.toLowerCase().includes(search.toLowerCase()) ||
    i.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Prestasi Siswa</h1>
          <p className="text-sm text-slate-500 mt-0.5">Data pencapaian dan penghargaan siswa</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> Tambah Prestasi
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Cari nama siswa atau jenis prestasi..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            {errorMsg && <div className="p-4 bg-red-50 text-red-700 text-sm border-b border-red-100">{errorMsg}</div>}
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Nama Siswa</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Jenis Prestasi</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tingkat</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tahun</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                    <Trophy className="w-10 h-10 mx-auto mb-2 opacity-30" /><p>Belum ada data prestasi.</p>
                  </td></tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">{item.studentName}</p>
                        <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">{item.description}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{item.type}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${levelColor[item.level]}`}>
                          <Trophy className="w-3 h-3" /> {item.level}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600 font-medium">{item.year}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {errorMsg && <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">{errorMsg}</div>}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Siswa</label>
                <input type="text" required value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Nama lengkap siswa..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Jenis Prestasi / Lomba</label>
                <input type="text" required value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Lomba LKS Tata Kecantikan" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tingkat</label>
                  <select value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as Achievement['level'] })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300">
                    <option>Kota/Kab</option><option>Provinsi</option><option>Nasional</option><option>Internasional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tahun</label>
                  <input type="text" required value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="2024" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Keterangan</label>
                <textarea rows={2} value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                  placeholder="Deskripsi singkat pencapaian..." />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  {editingId ? 'Simpan Perubahan' : 'Tambah Prestasi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
