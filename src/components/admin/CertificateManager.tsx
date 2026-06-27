import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Award, Search, Upload } from 'lucide-react';
import { supabase, uploadImage } from '../../lib/supabase';
import { useAdminFeedback } from './AdminFeedbackContext';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image_url: string;
  description: string;
}

const emptyForm = { title: '', issuer: '', date: '', image_url: '', description: '' };

export default function CertificateManager() {
  const { showConfirm, showAlert } = useAdminFeedback();

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      setCertificates(data || []);
    } catch (err: any) {
      console.error('Error fetching certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEdit = (c: Certificate) => {
    setEditingId(c.id);
    setFormData({ 
      title: c.title, 
      issuer: c.issuer, 
      date: c.date, 
      image_url: c.image_url,
      description: c.description || ''
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
        const publicUrl = await uploadImage(file, 'prestasi');
        setFormData(prev => ({ ...prev, image_url: publicUrl }));
      } catch (err: any) {
        showAlert('Gagal mengunggah gambar: ' + err.message, 'error');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) {
      showAlert('Wajib mengunggah gambar/foto sertifikat', 'error');
      return;
    }
    
    try {
      const payload = {
        title: formData.title,
        issuer: formData.issuer,
        date: formData.date,
        image_url: formData.image_url,
        description: formData.description
      };

      if (editingId) {
        const { error } = await supabase
          .from('certificates')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('certificates')
          .insert(payload);
        if (error) throw error;
      }
      setShowModal(false);
      fetchCertificates();
      showAlert(editingId ? 'Sertifikat diperbarui!' : 'Sertifikat ditambahkan!', 'success');
    } catch (error: any) {
      showAlert('Gagal menyimpan sertifikat. Pastikan tabel di database sudah dibuat. Error: ' + error.message, 'error');
    }
  };

  const handleDelete = (id: string) => {
    showConfirm('Hapus sertifikat/penghargaan ini?', async () => {
      try {
        const { error } = await supabase
          .from('certificates')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchCertificates();
        showAlert('Data berhasil dihapus', 'success');
      } catch (error: any) {
        showAlert('Gagal menghapus data: ' + error.message, 'error');
      }
    });
  };

  const filtered = certificates.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.issuer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Sertifikat & Prestasi</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola galeri penghargaan, piagam juara, dan sertifikasi</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> Tambah Piagam
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Cari nama penghargaan atau instansi..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
             <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-400 border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-16 text-center text-slate-400">
            <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium text-slate-500">Belum ada data piagam/penghargaan.</p>
            <p className="text-sm mt-1">Klik "Tambah Piagam" untuk mengunggah penghargaan pertama.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-slate-50/50">
            {filtered.map((cert) => (
              <div key={cert.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden">
                  <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button onClick={() => openEdit(cert)} className="p-2.5 bg-white/90 rounded-xl text-blue-600 hover:bg-white hover:scale-110 transition-all shadow-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(cert.id)} className="p-2.5 bg-white/90 rounded-xl text-red-600 hover:bg-white hover:scale-110 transition-all shadow-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 space-y-2.5">
                  <div>
                    <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-1 rounded uppercase tracking-wider">{cert.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 line-clamp-1" title={cert.title}>{cert.title}</h3>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{cert.issuer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Piagam' : 'Tambah Piagam Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Foto / Scan Sertifikat</label>
                <div className="relative w-full h-48 rounded-xl border-2 border-dashed border-pink-200 bg-pink-50 flex flex-col items-center justify-center overflow-hidden group">
                  {formData.image_url ? (
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-pink-300 mx-auto mb-2" />
                      <p className="text-sm text-pink-600 font-medium">Klik untuk Unggah</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="bg-white px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Ganti Gambar
                    </span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
                {uploading && <p className="text-sm text-pink-500 mt-2 text-center font-bold animate-pulse">Mengunggah file ke cloud...</p>}
              </div>
                
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Judul Penghargaan</label>
                <input type="text" required value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Contoh: Juara 1 LKS Kecantikan Provinsi" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Penyelenggara / Penerbit</label>
                  <input type="text" required value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Contoh: Kemdikbudristek" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Tanggal</label>
                  <input type="date" required value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Singkat (Opsional)</label>
                <textarea rows={3} value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none" placeholder="Tuliskan keterangan tentang prestasi ini..." />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" disabled={uploading} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  {editingId ? 'Simpan Perubahan' : 'Tambah Piagam'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
