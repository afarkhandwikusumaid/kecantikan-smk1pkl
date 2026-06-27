import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Sparkles, Search } from 'lucide-react';
import { supabase, uploadImage } from '../../lib/supabase';
import { useAdminFeedback } from './AdminFeedbackContext';

interface ServiceItem {
  id: string;
  category: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  features: string;
  image: string;
}

const CATEGORIES = ['hair', 'body', 'skin', 'makeup'];
const emptyForm = { name: '', category: 'hair', description: '', duration: 60, price: 0, features: '', image: '' };

export default function ServiceManager() {
  const { showConfirm, showAlert } = useAdminFeedback();

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setServices((data || []).map((s: any) => ({
        id: s.id,
        category: s.category,
        name: s.name,
        description: s.description,
        duration: s.duration,
        price: s.price,
        features: Array.isArray(s.features) ? s.features.join(', ') : (s.features || ''),
        image: s.image_url
      })));
    } catch (err: any) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setSelectedFile(null);
    setShowModal(true);
  };

  const openEdit = (s: ServiceItem) => {
    setEditingId(s.id);
    setFormData({
      name: s.name,
      category: s.category,
      description: s.description,
      duration: s.duration,
      price: s.price,
      features: s.features,
      image: s.image
    });
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUploading(true);
      let finalImageUrl = formData.image;
      if (selectedFile) {
        finalImageUrl = await uploadImage(selectedFile, 'layanan');
      }

      const featuresArray = formData.features.split(',').map((f: string) => f.trim()).filter(Boolean);

      if (editingId) {
        const { error } = await supabase
          .from('services')
          .update({
            category: formData.category,
            name: formData.name,
            description: formData.description,
            duration: formData.duration,
            price: formData.price,
            image_url: finalImageUrl,
            features: featuresArray
          })
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('services')
          .insert({
            category: formData.category,
            name: formData.name,
            description: formData.description,
            duration: formData.duration,
            price: formData.price,
            image_url: finalImageUrl,
            features: featuresArray
          });
        if (error) throw error;
      }
      setShowModal(false);
      setSelectedFile(null);
      fetchServices();
    } catch (err: any) {
      showAlert('Gagal menyimpan layanan: ' + err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    showConfirm('Hapus layanan ini?', async () => {
      try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchServices();
            showAlert('Data berhasil dihapus', 'success');
      } catch (error: any) {
        showAlert('Gagal menghapus layanan: ' + error.message, 'error');
      }
    });
  };

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Layanan Eduspa</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola data layanan/treatment di Eduspa Salon</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> Tambah Layanan
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Cari nama layanan..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50 text-black" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Gambar</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Nama Layanan</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Kategori</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Durasi</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Harga</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent mx-auto" />
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                  <Sparkles className="w-10 h-10 mx-auto mb-2 opacity-30" /><p>Tidak ada data layanan.</p>
                </td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 w-20">
                      <img src={s.image || 'https://placehold.co/100x100?text=No+Image'} alt={s.name} className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800">{s.name}</div>
                      <div className="text-slate-400 text-xs line-clamp-1 mt-0.5">{s.description}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700 capitalize">{s.category}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 font-medium">{s.duration} Menit</td>
                    <td className="px-5 py-4 text-slate-800 font-bold">
                      {s.price === 0 ? (
                        <span className="text-green-600">Gratis/Praktik</span>
                      ) : (
                        `Rp ${s.price.toLocaleString('id-ID')}`
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(s)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Layanan</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black" placeholder="Misal: Creambath..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Kategori</label>
                  <select value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Durasi (Menit)</label>
                  <input type="number" required min={1} value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black" placeholder="Misal: 60" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Harga (Rp)</label>
                  <input type="number" required min={0} value={formData.price === 0 ? '' : formData.price}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData({ ...formData, price: val === '' ? 0 : parseInt(val) });
                    }}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black" placeholder="Misal: 35000" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Unggah Foto Layanan (Maks. 2MB)</label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
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
                      setFormData({ ...formData, image: url });
                    }
                  }}
                    className="w-full rounded-xl border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  />
                  {uploading && <span className="text-xs text-pink-500 animate-pulse">Menyimpan...</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Singkat</label>
                <textarea required rows={2} value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none bg-white text-black" placeholder="Deskripsi layanan..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Fitur/Proses (Pisahkan dengan koma)</label>
                <textarea required rows={2} value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none bg-white text-black" placeholder="Misal: Scrubbing, Massage, Steam" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" disabled={uploading} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 disabled:opacity-55"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  {editingId ? 'Simpan Perubahan' : 'Tambah Layanan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
