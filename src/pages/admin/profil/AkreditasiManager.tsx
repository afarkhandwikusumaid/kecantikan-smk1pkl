import React, { useState, useEffect } from 'react';
import { supabase, uploadImage } from '../../../lib/supabase';
import { Save, Award, Loader2, Image as ImageIcon, Plus, Trash2, Edit2, X } from 'lucide-react';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface AkreditasiContent {
  akreditasiText: string;
  lisensiText: string;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image_url: string;
}

const emptyCertForm = {
  title: '',
  issuer: '',
  date: '',
  image_url: ''
};

export default function AkreditasiManager() {
  const [content, setContent] = useState<AkreditasiContent>({
    akreditasiText: '',
    lisensiText: '',
  });
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const { showSuccess, showError, showConfirm } = useAdminFeedback();

  // Modal states for Certificates
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [certForm, setCertForm] = useState(emptyCertForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingCert, setUploadingCert] = useState(false);

  useEffect(() => {
    fetchData();
    fetchCertificates();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'akreditasi')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data && data.value) {
        let parsed = data.value;
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        setContent(parsed as AkreditasiContent);
      }
    } catch (err: any) {
      console.error('Error fetching akreditasi:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setCertificates(data || []);
    } catch (err: any) {
      console.error('Error fetching certificates:', err);
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      // We keep the old shape in DB but only care about the text fields now
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'akreditasi',
          value: content
        }, { onConflict: 'key' });

      if (error) throw error;
      showSuccess('Teks akreditasi & lisensi berhasil disimpan');
    } catch (err: any) {
      console.error('Error saving:', err);
      showError('Gagal menyimpan teks: ' + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChange = (key: keyof AkreditasiContent, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const openAdd = () => {
    setEditingId(null);
    setCertForm(emptyCertForm);
    setSelectedFile(null);
    setShowModal(true);
  };

  const openEdit = (cert: Certificate) => {
    setEditingId(cert.id);
    setCertForm({
      title: cert.title,
      issuer: cert.issuer || '',
      date: cert.date || '',
      image_url: cert.image_url
    });
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUploadingCert(true);
      let finalImageUrl = certForm.image_url;
      
      if (selectedFile) {
        finalImageUrl = await uploadImage(selectedFile, 'akreditasi');
      }

      if (!finalImageUrl) {
        showError('Wajib mengunggah gambar sertifikat');
        return;
      }

      const payload = {
        title: certForm.title,
        issuer: certForm.issuer,
        date: certForm.date || null,
        image_url: finalImageUrl
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
      setSelectedFile(null);
      fetchCertificates();
      showSuccess(editingId ? 'Sertifikat diperbarui' : 'Sertifikat ditambahkan');
    } catch (err: any) {
      showError('Gagal menyimpan sertifikat: ' + err.message);
    } finally {
      setUploadingCert(false);
    }
  };

  const handleDeleteCert = (id: string) => {
    showConfirm('Hapus sertifikat ini?', async () => {
      try {
        const { error } = await supabase
          .from('certificates')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchCertificates();
        showSuccess('Sertifikat berhasil dihapus');
      } catch (err: any) {
        showError('Gagal menghapus sertifikat: ' + err.message);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
            <Award className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Akreditasi & Sertifikasi</h1>
            <p className="text-sm text-slate-500">Kelola informasi standar mutu dan daftar sertifikat</p>
          </div>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={savingSettings}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Simpan Teks
        </button>
      </div>

      {/* TEXT SETTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Teks Akreditasi A (Unggul)</h3>
          <textarea
            value={content.akreditasiText}
            onChange={(e) => handleChange('akreditasiText', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none h-32"
            placeholder="Deskripsi tentang akreditasi sekolah..."
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Teks Lisensi BNSP</h3>
          <textarea
            value={content.lisensiText}
            onChange={(e) => handleChange('lisensiText', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none h-32"
            placeholder="Deskripsi tentang lisensi BNSP..."
          />
        </div>
      </div>

      {/* CERTIFICATES CRUD */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Daftar Sertifikat</h3>
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 transition-colors">
            <Plus className="w-4 h-4" /> Tambah Sertifikat
          </button>
        </div>
        <div className="p-6">
          {certificates.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>Belum ada sertifikat ditambahkan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {certificates.map(cert => (
                <div key={cert.id} className="group relative rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-slate-50">
                  <div className="aspect-[4/3] w-full p-2 bg-white flex items-center justify-center">
                    <img src={cert.image_url} alt={cert.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="p-3 border-t border-slate-100">
                    <p className="text-sm font-semibold text-slate-800 line-clamp-1">{cert.title}</p>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{cert.issuer}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => openEdit(cert)} className="flex-1 px-2 py-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium flex items-center justify-center gap-1 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button onClick={() => handleDeleteCert(cert.id)} className="flex-1 px-2 py-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium flex items-center justify-center gap-1 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" /> Hapus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL FORM */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveCert} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Judul Sertifikat</label>
                <input type="text" required value={certForm.title} onChange={e => setCertForm({ ...certForm, title: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black" placeholder="Misal: Sertifikat Akreditasi A" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Penerbit / Lembaga</label>
                <input type="text" required value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black" placeholder="Misal: BAN-SM / BNSP" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tanggal / Tahun</label>
                <input type="date" value={certForm.date} onChange={e => setCertForm({ ...certForm, date: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">File Gambar Sertifikat (Maks. 2MB)</label>
                <div className="flex items-center gap-4">
                  {certForm.image_url && !selectedFile && (
                    <img src={certForm.image_url} alt="Preview" className="w-16 h-16 rounded-xl object-contain border border-slate-200 bg-slate-50" />
                  )}
                  {selectedFile && (
                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-16 h-16 rounded-xl object-contain border border-slate-200 bg-slate-50" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        showError('Ukuran file maksimal 2MB');
                        e.target.value = '';
                        return;
                      }
                      setSelectedFile(file);
                    }
                  }} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" disabled={uploadingCert} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 disabled:opacity-55">
                  {uploadingCert ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Simpan Sertifikat')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
