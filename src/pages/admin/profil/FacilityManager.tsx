import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, Building2, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface Facility {
  id: string;
  name: string;
  description: string;
  capacity: string;
  status: 'Aktif' | 'Perbaikan' | 'Tidak Aktif';
  image_urls: string[];
}

const emptyForm = {
  name: '',
  description: '',
  capacity: '',
  status: 'Aktif' as 'Aktif' | 'Perbaikan' | 'Tidak Aktif',
  image_urls: [] as string[],
};

export default function FacilityManager() {
  const { showConfirm, showAlert } = useAdminFeedback();

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setFacilities(data || []);
    } catch (err: any) {
      console.error('Error fetching facilities:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setImageFiles([]);
    setExistingImages([]);
    setShowModal(true);
  };

  const openEdit = (item: Facility) => {
    setEditingId(item.id);
    setFormData({ name: item.name, description: item.description || '', capacity: item.capacity || '', status: item.status, image_urls: item.image_urls || [] });
    setImageFiles([]);
    setExistingImages(item.image_urls || []);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Upload new images first
      const uploadedUrls: string[] = [];
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `facilities/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('asset-saya')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage
          .from('asset-saya')
          .getPublicUrl(filePath);
          
        uploadedUrls.push(publicUrlData.publicUrl);
      }
      
      const finalImageUrls = [...existingImages, ...uploadedUrls];

      if (editingId) {
        const { error } = await supabase
          .from('facilities')
          .update({
            name: formData.name,
            description: formData.description,
            capacity: formData.capacity,
            status: formData.status,
            image_urls: finalImageUrls
          })
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('facilities')
          .insert({
            name: formData.name,
            description: formData.description,
            capacity: formData.capacity,
            status: formData.status,
            image_urls: finalImageUrls
          });
        if (error) throw error;
      }
      setShowModal(false);
      fetchFacilities();
      showAlert('Fasilitas berhasil disimpan!', 'success');
    } catch (error: any) {
      showAlert('Gagal menyimpan fasilitas: ' + error.message, 'error');
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    showConfirm('Hapus fasilitas ini?', async () => {
      try {
      const { error } = await supabase
        .from('facilities')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchFacilities();
            showAlert('Data berhasil dihapus', 'success');
      } catch (error: any) {
        showAlert('Gagal menghapus fasilitas: ' + error.message, 'error');
      }
    });
  };

  const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    'Aktif': { color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-3 h-3" /> },
    'Perbaikan': { color: 'bg-yellow-100 text-yellow-700', icon: <AlertCircle className="w-3 h-3" /> },
    'Tidak Aktif': { color: 'bg-red-100 text-red-700', icon: <X className="w-3 h-3" /> },
  };

  const filtered = facilities.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fasilitas Praktik</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola data fasilitas laboratorium</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 transition-all hover:shadow-pink-300 hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}
        >
          <Plus className="w-4 h-4" /> Tambah Fasilitas
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text" placeholder="Cari fasilitas..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50 text-black"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Nama Fasilitas</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Kapasitas</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                      <Building2 className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="mb-4">Belum ada data fasilitas.</p>
                      {search === '' && (
                        <button
                          onClick={async () => {
                            try {
                              setLoading(true);
                              const defaultFacilities = [
                                {
                                  name: "Studio Tata Rias & Kosmetika",
                                  description: "Dilengkapi dengan meja rias profesional, cermin besar berlampu (vanity mirror), kosmetik standar industri, serta kursi rias hidrolik untuk praktik makeup panggung, pengantin, dan karakter.",
                                  capacity: "20 Orang",
                                  status: "Aktif",
                                  image_urls: ["https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800"]
                                },
                                {
                                  name: "Salon Tata Kecantikan Rambut",
                                  description: "Menyediakan peralatan lengkap seperti hair dryer, catokan, pengeriting rambut, area pencucian rambut (shampoo basin), manekin praktik, serta obat penataan rambut untuk belajar hair styling, cutting, maupun coloring.",
                                  capacity: "20 Orang",
                                  status: "Aktif",
                                  image_urls: ["https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800"]
                                },
                                {
                                  name: "Ruang Praktik Perawatan Kulit (Skin Care Clinic)",
                                  description: "Area khusus bernuansa klinis yang dilengkapi tempat tidur perawatan (facial bed), alat uap wajah (facial steamer), serta perangkat perawatan wajah modern lainnya.",
                                  capacity: "20 Orang",
                                  status: "Aktif",
                                  image_urls: ["https://images.unsplash.com/photo-1521590832167-7bcbfeac2531?q=80&w=800"]
                                },
                                {
                                  name: "Studio Perawatan Spa (Spa Room)",
                                  description: "Dilengkapi kasur spa, aromaterapi, perlengkapan lulur/pijat tradisional, hingga area khusus untuk praktik tren perawatan terbaru seperti Mom and Baby Treatment.",
                                  capacity: "20 Orang",
                                  status: "Aktif",
                                  image_urls: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800"]
                                }
                              ];
                              const { error } = await supabase.from('facilities').insert(defaultFacilities);
                              if (error) throw error;
                              showAlert('Fasilitas bawaan berhasil dimuat!', 'success');
                              fetchFacilities();
                            } catch (err: any) {
                              setLoading(false);
                              showAlert('Gagal memuat: ' + err.message, 'error');
                            }
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-pink-600 bg-pink-50 hover:bg-pink-100 transition-colors"
                        >
                          <Building2 className="w-4 h-4" />
                          Muat Data Fasilitas Bawaan (Default)
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">{item.name}</p>
                        <p className="text-slate-400 text-xs line-clamp-1 mt-0.5">{item.description}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{item.capacity || '-'}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[item.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                          {statusConfig[item.status]?.icon}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
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
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit Fasilitas' : 'Tambah Fasilitas Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Fasilitas</label>
                <input type="text" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                  placeholder="Misal: Lab Kecantikan Kulit" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Kapasitas</label>
                  <input type="text" value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                    placeholder="Misal: 20 Orang" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                  <select value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black">
                    <option>Aktif</option>
                    <option>Perbaikan</option>
                    <option>Tidak Aktif</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Foto Fasilitas</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      const newFiles = Array.from(e.target.files);
                      setImageFiles(prev => [...prev, ...newFiles]);
                    }
                    e.target.value = ''; // Reset input to allow selecting the same file again if removed
                  }}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                />
                
                {/* Previews */}
                {(existingImages.length > 0 || imageFiles.length > 0) && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {/* Existing Images */}
                    {existingImages.map((url, idx) => (
                      <div key={`existing-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 group">
                        <img src={url} alt="Fasilitas" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => setExistingImages(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    {/* New Uploading Files */}
                    {imageFiles.map((file, idx) => (
                      <div key={`new-${idx}`} className="relative aspect-square rounded-lg overflow-hidden border border-green-200 group">
                        <img src={URL.createObjectURL(file)} alt="Preview Baru" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => setImageFiles(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute bottom-0 inset-x-0 bg-green-500/80 text-[10px] text-white text-center font-bold py-0.5">
                          BARU
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi</label>
                <textarea rows={3} value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none bg-white text-black"
                  placeholder="Deskripsi singkat fasilitas..." />
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50"
                  disabled={loading}>Batal</button>
                <button type="submit" disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  {loading ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Tambah Fasilitas')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
