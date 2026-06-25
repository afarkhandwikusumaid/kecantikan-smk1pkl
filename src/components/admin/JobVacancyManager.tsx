import React, { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, deleteDoc, doc, updateDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, X, Briefcase, Search, MapPin, Calendar } from 'lucide-react';

interface JobVacancy {
  id: string;
  position: string;
  company: string;
  location: string;
  deadline: string;
  description: string;
  status: 'Buka' | 'Tutup';
}

const emptyForm = {
  position: '',
  company: '',
  location: '',
  deadline: '',
  description: '',
  status: 'Buka' as 'Buka' | 'Tutup'
};

export default function JobVacancyManager() {
  const [items, setItems] = useState<JobVacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const snapshot = await getDocs(collection(db, 'jobVacancies'));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as JobVacancy));
      // Sort: Open jobs first, then by deadline
      data.sort((a, b) => {
        if (a.status !== b.status) {
          return a.status === 'Buka' ? -1 : 1;
        }
        return a.deadline.localeCompare(b.deadline);
      });
      setItems(data);
    } catch (e) {
      console.error('Error fetching jobs:', e);
      setErrorMsg('Gagal memuat lowongan dari database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setErrorMsg('');
    setShowModal(true);
  };

  const openEdit = (j: JobVacancy) => {
    setEditingId(j.id);
    setFormData({ position: j.position, company: j.company, location: j.location, deadline: j.deadline, description: j.description, status: j.status });
    setErrorMsg('');
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (editingId) {
        await updateDoc(doc(db, 'jobVacancies', editingId), formData);
      } else {
        await addDoc(collection(db, 'jobVacancies'), formData);
      }
      setShowModal(false);
      fetchJobs();
    } catch (err) {
      console.error('Error saving vacancy:', err);
      setErrorMsg('Gagal menyimpan lowongan. Periksa rules Firestore.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Hapus lowongan ini?')) return;
    try {
      await deleteDoc(doc(db, 'jobVacancies', id));
      fetchJobs();
    } catch (e) {
      console.error('Error deleting vacancy:', e);
      alert('Gagal menghapus lowongan.');
    }
  };

  const filtered = items.filter((i) =>
    i.position.toLowerCase().includes(search.toLowerCase()) ||
    i.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Lowongan Kerja BKK</h1>
          <p className="text-sm text-slate-500 mt-0.5">Informasi lowongan kerja dari mitra industri</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> Tambah Lowongan
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Cari posisi atau perusahaan..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent" />
          </div>
        ) : (
          <div className="p-5">
            {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">{errorMsg}</div>}
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Briefcase className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p>Belum ada lowongan kerja.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 hover:border-pink-100 hover:bg-pink-50/20 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-200 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-slate-800">{item.position}</p>
                          <p className="text-sm text-slate-600 font-medium">{item.company}</p>
                        </div>
                        <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'Buka' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                        {item.deadline && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Deadline: {item.deadline}</span>}
                      </div>
                      {item.description && <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{item.description}</p>}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {errorMsg && <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">{errorMsg}</div>}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Posisi / Jabatan</label>
                <input type="text" required value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Beauty Therapist" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Perusahaan</label>
                <input type="text" required value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Nama industri/salon..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Lokasi</label>
                  <input type="text" value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Kota, Provinsi" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Deadline</label>
                  <input type="date" value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <select value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Buka' | 'Tutup' })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300">
                  <option>Buka</option><option>Tutup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Singkat</label>
                <textarea rows={3} value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                  placeholder="Informasi singkat tentang lowongan..." />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  {editingId ? 'Simpan Perubahan' : 'Posting Lowongan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
