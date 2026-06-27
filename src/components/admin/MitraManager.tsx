import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Briefcase, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminFeedback } from './AdminFeedbackContext';

interface Partner {
  id: string;
  name: string;
  subtitle: string;
  isPink: boolean;
}



const emptyForm: Partner = { id: '', name: '', subtitle: '', isPink: false };

export default function MitraManager() {
  const { showConfirm, showAlert } = useAdminFeedback();

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partner>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'mitra_industri')
        .single();
      
      if (data && data.value) {
        setPartners(data.value as Partner[]);
      } else { setPartners([]); }
    } catch (err: any) {
      console.error('Error fetching partners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const saveToSupabase = async (newPartners: Partner[]) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'mitra_industri', value: newPartners });
      if (error) throw error;
      setPartners(newPartners);
    } catch (error: any) {
      showAlert('Gagal menyimpan mitra: ' + error.message, 'error');
    } finally {
      setSaving(false);
      setShowModal(false);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, id: Date.now().toString() });
    setShowModal(true);
  };

  const openEdit = (p: Partner) => {
    setEditingId(p.id);
    setFormData(p);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Partner[];
    if (editingId) {
      updated = partners.map(p => p.id === editingId ? formData : p);
    } else {
      updated = [...partners, formData];
    }
    saveToSupabase(updated);
  };

  const handleDelete = (id: string) => {
    showConfirm('Hapus mitra ini?', () => {
      const updated = partners.filter(p => p.id !== id);
      saveToSupabase(updated);
      showAlert('Mitra berhasil dihapus', 'success');
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Kemitraan Industri</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola logo teks mitra yang tampil di halaman Beranda</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> Tambah Mitra
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Nama Mitra</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Subtitle / Kategori</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tema Warna</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-400">Memuat...</td></tr>
              ) : partners.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-400">Tidak ada data mitra.</td></tr>
              ) : (
                partners.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-800">{p.name}</td>
                    <td className="px-5 py-4 text-pink-600 font-mono text-xs">{p.subtitle || '-'}</td>
                    <td className="px-5 py-4">
                      {p.isPink ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700">Warna Pink</span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">Warna Abu-abu</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(p)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Mitra' : 'Tambah Mitra Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Mitra Indutri</label>
                <input type="text" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Wardah, Mustika Ratu..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subtitle / Kategori (Opsional)</label>
                <input type="text" value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Cosmetics, Group..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Pilihan Warna Teks (di Beranda)</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={formData.isPink} onChange={() => setFormData({ ...formData, isPink: true })} className="text-pink-600 focus:ring-pink-500" />
                    <span className="text-sm font-semibold text-pink-700">Aksen Pink</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={!formData.isPink} onChange={() => setFormData({ ...formData, isPink: false })} className="text-slate-600 focus:ring-slate-500" />
                    <span className="text-sm font-semibold text-slate-700">Aksen Gelap/Abu-abu</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 disabled:opacity-50 flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  <Save className="w-4 h-4" /> {editingId ? 'Simpan Perubahan' : 'Tambah Mitra'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
