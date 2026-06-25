import React, { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, deleteDoc, doc, updateDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, X, Users, Search } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  nip: string;
  subject: string;
  position: string;
}

const emptyForm = { name: '', nip: '', subject: '', position: '' };

export default function TeacherManager() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchTeachers = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const snapshot = await getDocs(collection(db, 'teachers'));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Teacher));
      setTeachers(data);
    } catch (e) {
      console.error('Error fetching teachers:', e);
      setErrorMsg('Gagal memuat data guru dari database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setErrorMsg('');
    setShowModal(true);
  };

  const openEdit = (t: Teacher) => {
    setEditingId(t.id);
    setFormData({ name: t.name, nip: t.nip, subject: t.subject, position: t.position });
    setErrorMsg('');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (editingId) {
        await updateDoc(doc(db, 'teachers', editingId), formData);
      } else {
        await addDoc(collection(db, 'teachers'), formData);
      }
      setShowModal(false);
      fetchTeachers();
    } catch (err) {
      console.error('Error saving teacher:', err);
      setErrorMsg('Gagal menyimpan data guru. Periksa rules Firestore.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Hapus data guru ini?')) return;
    try {
      await deleteDoc(doc(db, 'teachers', id));
      fetchTeachers();
    } catch (e) {
      console.error('Error deleting teacher:', e);
      alert('Gagal menghapus data guru.');
    }
  };

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Direktori Guru</h1>
          <p className="text-sm text-slate-500 mt-0.5">Data pengajar jurusan Kecantikan & SPA</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> Tambah Guru
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Cari nama atau mata pelajaran..." value={search}
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
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Nama Guru</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">NIP</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Bidang Studi</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Jabatan</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto mb-2 opacity-30" /><p>Tidak ada data guru.</p>
                  </td></tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center text-pink-700 font-bold text-sm flex-shrink-0">
                            {t.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-800">{t.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-500 font-mono text-xs">{t.nip || '-'}</td>
                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{t.subject}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-sm">{t.position}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(t)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Data Guru' : 'Tambah Guru Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {errorMsg && <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">{errorMsg}</div>}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
                <input type="text" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Nama beserta gelar..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">NIP</label>
                  <input type="text" value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="NIP (jika ada)" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Jabatan</label>
                  <input type="text" required value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Guru Kejuruan / Ka. Jurusan" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Bidang Studi</label>
                <input type="text" required value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Tata Kecantikan Kulit" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  {editingId ? 'Simpan Perubahan' : 'Tambah Guru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
