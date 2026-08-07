import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Users, Search, Upload } from 'lucide-react';
import { supabase, uploadImage } from '../../../lib/supabase';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface Teacher {
  id: string;
  name: string;
  nip: string;
  subject: string;
  position: string;
  image_url?: string;
  quote?: string;
  certifications?: string[];
}

const emptyForm = { name: '', nip: '', subject: '', position: '', image_url: '', quote: '', certifications: '' };

export default function TeacherManager() {
  const { showConfirm, showAlert } = useAdminFeedback();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      setTeachers(data || []);
    } catch (err: any) {
      console.error('Error fetching teachers:', err);
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
    setShowModal(true);
  };

  const openEdit = (t: Teacher) => {
    setEditingId(t.id);
    setFormData({ 
      name: t.name, 
      nip: t.nip || '', 
      subject: t.subject, 
      position: t.position,
      image_url: t.image_url || '',
      quote: t.quote || '',
      certifications: t.certifications ? t.certifications.join(', ') : ''
    });
    setShowModal(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showAlert('Ukuran file maksimal 2MB', 'error');
        e.target.value = '';
        return;
      }
      try {
        setUploading(true);
        const publicUrl = await uploadImage(file, 'guru');
        setFormData(prev => ({ ...prev, image_url: publicUrl }));
      } catch (err: any) {
        showAlert('Gagal mengunggah foto: ' + err.message, 'error');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        nip: formData.nip,
        subject: formData.subject,
        position: formData.position,
        image_url: formData.image_url,
        quote: formData.quote,
        certifications: formData.certifications.split(',').map(s => s.trim()).filter(s => s)
      };

      if (editingId) {
        const { error } = await supabase
          .from('teachers')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('teachers')
          .insert(payload);
        if (error) throw error;
      }
      setShowModal(false);
      fetchTeachers();
    } catch (error: any) {
      showAlert('Gagal menyimpan data guru. Pastikan Anda sudah menjalankan ALTER TABLE di database. Error: ' + error.message, 'error');
    }
  };

  const handleDelete = (id: string) => {
    showConfirm('Hapus data guru ini?', async () => {
      try {
      const { error } = await supabase
        .from('teachers')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchTeachers();
            showAlert('Data berhasil dihapus', 'success');
      } catch (error: any) {
        showAlert('Gagal menghapus data guru: ' + error.message, 'error');
      }
    });
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

        <div className="overflow-x-auto">
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
                          {t.image_url ? (
                            <img src={t.image_url} alt={t.name} className="w-9 h-9 rounded-full object-cover shadow-sm border border-pink-100" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center text-pink-700 font-bold text-sm flex-shrink-0">
                              {t.name.charAt(0)}
                            </div>
                          )}
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
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Data Guru' : 'Tambah Guru Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              
              <div className="flex items-center gap-6 pb-2">
                <div className="shrink-0">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Foto Profil</label>
                  <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-pink-200 bg-pink-50 flex flex-col items-center justify-center overflow-hidden group">
                    {formData.image_url ? (
                      <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-8 h-8 text-pink-300 mb-1" />
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="w-5 h-5 text-white" />
                      <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                  {uploading && <p className="text-sm text-pink-500 mt-1 text-center font-bold animate-pulse">Mengunggah...</p>}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap & Gelar</label>
                    <input type="text" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Contoh: Dra. Endang Sulastri, M.Pd." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">NIP</label>
                      <input type="text" value={formData.nip}
                        onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="NIP (jika ada)" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Jabatan / Posisi</label>
                      <input type="text" required value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Ketua Jurusan" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Bidang Studi yang Diajarkan</label>
                <input type="text" required value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Misal: Tata Kecantikan Kulit" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Sertifikasi & Lisensi (Pisahkan dengan koma)</label>
                <input type="text" value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Asesor BNSP, Sertifikasi Wardah MUA, ..." />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Kutipan / Moto (Quote) Guru</label>
                <textarea rows={2} value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none" placeholder="Estetika sejati lahir dari kedisiplinan..." />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" disabled={uploading} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 disabled:opacity-50"
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
