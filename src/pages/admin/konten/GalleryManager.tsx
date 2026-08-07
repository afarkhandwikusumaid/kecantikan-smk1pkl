import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Image as ImageIcon, Search } from 'lucide-react';
import { supabase, uploadImage } from '../../../lib/supabase';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface GalleryItem { id: string; title: string; imageUrl: string; category: string; date: string; }

interface GalleryManagerProps {
  mode?: 'karya' | 'dokumentasi' | 'all';
}

export default function GalleryManager({ mode = 'all' }: GalleryManagerProps) {
  const categories = mode === 'karya'
    ? ['Praktik', 'Prestasi', 'Wisuda']
    : mode === 'dokumentasi'
    ? ['Kegiatan', 'Fasilitas']
    : ['Praktik', 'Prestasi', 'Wisuda', 'Kegiatan', 'Fasilitas'];

  const getEmptyForm = () => ({
    title: '',
    imageUrl: '',
    category: categories[0],
    date: new Date().toISOString().split('T')[0]
  });

  const { showConfirm, showAlert } = useAdminFeedback();

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState(getEmptyForm());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const query = supabase.from('galleries').select('*');
      if (mode === 'karya') {
        query.in('category', ['Praktik', 'Prestasi', 'Wisuda']);
      } else {
        query.in('category', ['Kegiatan', 'Fasilitas']);
      }
      const { data, error } = await query.order('date', { ascending: false });
      if (error) throw error;
      setItems((data || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        imageUrl: item.image_url,
        category: item.category,
        date: item.date
      })));
    } catch (err: any) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [mode]);

  const openAdd = () => { 
    setEditingId(null); 
    setFormData(getEmptyForm()); 
    setSelectedFile(null); 
    setShowModal(true); 
  };
  
  const openEdit = (item: GalleryItem) => { 
    setEditingId(item.id); 
    setFormData({ title: item.title, imageUrl: item.imageUrl, category: item.category, date: item.date }); 
    setSelectedFile(null); 
    setShowModal(true); 
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUploading(true);
      let finalImageUrl = formData.imageUrl;
      if (selectedFile) {
        finalImageUrl = await uploadImage(selectedFile, 'dokumentasi');
      }

      if (!finalImageUrl) {
        showAlert('Wajib mengunggah foto', 'error');
        return;
      }

      const payload = {
        title: formData.title,
        image_url: finalImageUrl,
        category: formData.category,
        date: formData.date
      };

      if (editingId) {
        const { error } = await supabase
          .from('galleries')
          .update(payload)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('galleries')
          .insert(payload);
        if (error) throw error;
      }
      setShowModal(false);
      setSelectedFile(null);
      fetchGallery();
      showAlert(editingId ? 'Foto berhasil diperbarui' : 'Foto berhasil ditambahkan', 'success');
    } catch (err: any) {
      showAlert('Gagal menyimpan foto: ' + err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    showConfirm('Hapus foto ini?', async () => {
      try {
        const { error } = await supabase
          .from('galleries')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchGallery();
        showAlert('Data berhasil dihapus', 'success');
      } catch (error: any) {
        showAlert('Gagal menghapus foto: ' + error.message, 'error');
      }
    });
  };

  const filtered = items.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {mode === 'karya' ? 'Karya Siswa (Portofolio)' : 'Dokumentasi Kegiatan & Lab'}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {mode === 'karya' ? 'Kelola portofolio praktik, prestasi, dan kelulusan siswa' : 'Kelola dokumentasi kegiatan sekolah dan fasilitas praktik'}
          </p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all" style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> 
          {mode === 'karya' ? 'Tambah Karya' : 'Tambah Dokumentasi'}
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder={`Cari foto ${mode === 'karya' ? 'karya' : 'kegiatan'}...`} value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50 text-black" /></div>
        </div>
        <div className="p-5">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400"><ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" /><p>Belum ada foto.</p></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(item => (
                <div key={item.id} className="group relative rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow bg-slate-50">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-36 object-cover" onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x200/f1f5f9/94a3b8?text=No+Image'; }} />
                  <div className="p-2.5 bg-white">
                    <p className="text-xs font-semibold text-slate-700 line-clamp-1">{item.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-medium">{item.category}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(item)} className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
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
              <h3 className="font-bold text-slate-800">
                {editingId 
                  ? (mode === 'karya' ? 'Edit Karya Siswa' : 'Edit Dokumentasi') 
                  : (mode === 'karya' ? 'Tambah Karya Baru' : 'Tambah Dokumentasi Baru')
                }
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Judul Foto</label><input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black" placeholder="Judul deskriptif foto..." /></div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Unggah Foto (Maks. 2MB)</label>
                <div className="flex items-center gap-4">
                  {formData.imageUrl && (
                    <img src={formData.imageUrl} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 2 * 1024 * 1024) {
                        showAlert('Ukuran file maksimal 2MB', 'error');
                        e.target.value = '';
                        return;
                      }
                      setSelectedFile(file);
                      const url = URL.createObjectURL(file);
                      setFormData({ ...formData, imageUrl: url });
                    }
                  }}
                    className="w-full rounded-xl border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  />
                  {uploading && <span className="text-xs text-pink-500 animate-pulse">Menyimpan...</span>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Kategori</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black">
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1.5">Tanggal</label><input type="date" required value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black" /></div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" disabled={uploading} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 disabled:opacity-55" style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  {editingId ? 'Simpan Perubahan' : (mode === 'karya' ? 'Simpan Karya' : 'Simpan Dokumentasi')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
