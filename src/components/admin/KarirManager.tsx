import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, TrendingUp, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAdminFeedback } from './AdminFeedbackContext';

interface CareerProfile {
  id?: string;
  title: string;
  salary: string;
  growth: string;
  desc: string;
  tags: string[];
  industrialPartners: string[];
}



const emptyForm: CareerProfile = { id: '', title: '', salary: '', growth: '', desc: '', tags: [], industrialPartners: [] };

export default function KarirManager() {
  const { showConfirm, showAlert } = useAdminFeedback();

  const [careers, setCareers] = useState<CareerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CareerProfile>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'career_profiles')
        .single();
      
      if (data && data.value) {
        setCareers(data.value as CareerProfile[]);
      } else { setCareers([]); }
    } catch (err: any) {
      console.error('Error fetching careers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const saveToSupabase = async (newCareers: CareerProfile[]) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'career_profiles', value: newCareers });
      if (error) throw error;
      setCareers(newCareers);
    } catch (error: any) {
      showAlert('Gagal menyimpan karir: ' + error.message, 'error');
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

  const openEdit = (c: CareerProfile) => {
    setEditingId(c.id || c.title);
    setFormData(c);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: CareerProfile[];
    if (editingId) {
      updated = careers.map(c => (c.id === editingId || c.title === editingId) ? formData : c);
    } else {
      updated = [...careers, formData];
    }
    saveToSupabase(updated);
  };

  const handleDelete = (id: string) => {
    showConfirm('Hapus profil karir ini?', () => {
      const updated = careers.filter(c => c.id !== id && c.title !== id);
      saveToSupabase(updated);
      showAlert('Profil karir berhasil dihapus', 'success');
    });
  };

  const handleArrayChange = (field: 'tags' | 'industrialPartners', value: string) => {
    const arr = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({ ...formData, [field]: arr });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Peluang Karir Lulusan</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola informasi prospek profesi untuk ditampilkan di halaman Akademik</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> Tambah Profesi
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Profesi</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Gaji / Prospek</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Penempatan</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-400">Memuat...</td></tr>
              ) : careers.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-400">Tidak ada data karir.</td></tr>
              ) : (
                careers.map((c, i) => (
                  <tr key={c.id || i} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 align-top">
                      <div className="font-bold text-slate-800">{c.title}</div>
                      <div className="text-xs text-slate-500 mt-1 line-clamp-2">{c.desc}</div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="font-semibold text-pink-600 text-xs">{c.salary}</div>
                      <div className="text-xs text-slate-500 mt-1">{c.growth}</div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex flex-wrap gap-1">
                        {c.industrialPartners.slice(0,2).map((p, pIdx) => (
                          <span key={pIdx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{p}</span>
                        ))}
                        {c.industrialPartners.length > 2 && <span className="text-[10px] text-slate-400">+{c.industrialPartners.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right align-top">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(c)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(c.id || c.title)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Karir' : 'Tambah Karir Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Profesi / Jabatan</label>
                  <input type="text" required value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Medical Aesthetician" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Estimasi Gaji / Pendapatan</label>
                  <input type="text" required value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Rp 5 Juta - Rp 10 Juta" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Prospek / Kebutuhan Industri</label>
                <input type="text" required value={formData.growth}
                  onChange={(e) => setFormData({ ...formData, growth: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Sangat Tinggi (Lulusan Selalu Terserap)" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Profesi</label>
                <textarea required rows={3} value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none" placeholder="Jelaskan peran pekerjaan tersebut..." />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Keahlian (Pisahkan dengan koma)</label>
                  <input type="text" value={formData.tags?.join(', ') || ''}
                    onChange={(e) => handleArrayChange('tags', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Makeup, Spa, Aesthetic" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Mitra Industri (Pisahkan koma)</label>
                  <input type="text" value={formData.industrialPartners?.join(', ') || ''}
                    onChange={(e) => handleArrayChange('industrialPartners', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Wardah, Erha Clinic" />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 disabled:opacity-50 flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  <Save className="w-4 h-4" /> {editingId ? 'Simpan Perubahan' : 'Tambah Profesi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
