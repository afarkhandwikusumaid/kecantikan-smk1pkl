import React, { useState, useEffect } from 'react';
import { Save, UserCheck } from 'lucide-react';
import { supabase, uploadImage } from '../../../lib/supabase';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface KaprodiSettings { name: string; photoUrl: string; title: string; greetingText: string; }

export default function SambutanManager() {
  const { showConfirm, showAlert } = useAdminFeedback();

  const [kaprodi, setKaprodi] = useState<KaprodiSettings>({ name: '', photoUrl: '', title: '', greetingText: '' });
  const [savedKaprodi, setSavedKaprodi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchSambutan() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'sambutan')
          .single();
        if (data && data.value) {
          setKaprodi(data.value);
        }
      } catch (err) {
        console.error('Error fetching Sambutan:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSambutan();
  }, []);

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
        const publicUrl = await uploadImage(file, 'profil');
        setKaprodi(prev => ({ ...prev, photoUrl: publicUrl }));
      } catch (err: any) {
        showAlert('Gagal mengunggah foto: ' + err.message, 'error');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSaveKaprodi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'sambutan',
          value: kaprodi
        });
      if (error) throw error;
      setSavedKaprodi(true);
      setTimeout(() => setSavedKaprodi(false), 2500);
    } catch (error: any) {
      showAlert('Gagal menyimpan Sambutan: ' + error.message, 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Sambutan Ketua Jurusan</h1>
        <p className="text-sm text-slate-500 mt-0.5">Kelola foto dan teks profil untuk sambutan ketua jurusan di Beranda</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fce7f3, #fdf2f8)' }}>
            <UserCheck className="w-4 h-4 text-pink-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Profil Sambutan</h2>
            <p className="text-xs text-slate-500">Tampil di bagian awal halaman website</p>
          </div>
        </div>
        <form onSubmit={handleSaveKaprodi} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                Nama Lengkap &amp; Gelar
              </label>
              <input type="text" value={kaprodi.name} onChange={e => setKaprodi({ ...kaprodi, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                placeholder="Nama Kaprodi..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                Jabatan Singkat
              </label>
              <input type="text" value={kaprodi.title} onChange={e => setKaprodi({ ...kaprodi, title: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                placeholder="Misal: Kakomli" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              Unggah Foto Profil (Maks. 2MB)
            </label>
            <div className="flex items-center gap-4">
              {kaprodi.photoUrl && (
                <img src={kaprodi.photoUrl} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
              )}
              <input type="file" accept="image/*" onChange={handleFileChange}
                className="w-full rounded-xl border border-slate-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
              />
              {uploading && <span className="text-xs text-pink-500 animate-pulse">Mengunggah...</span>}
            </div>
            <p className="text-xs text-slate-400 mt-2">Format yang didukung: JPG, PNG. (Disarankan potrait 3:4).</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
              Teks Sambutan Singkat
            </label>
            <textarea rows={4} value={kaprodi.greetingText} onChange={e => setKaprodi({ ...kaprodi, greetingText: e.target.value })}
              className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none bg-white text-black"
              placeholder="Tulis ringkasan sambutan..." />
          </div>
          
          <div className="flex justify-end pt-2">
            <button type="submit" disabled={uploading}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all ${savedKaprodi ? 'bg-green-500 shadow-green-200' : 'shadow-pink-200 hover:scale-105 active:scale-95'} disabled:opacity-55`}
              style={!savedKaprodi ? { background: 'linear-gradient(135deg, #ec4899, #be185d)' } : {}}>
              <Save className="w-4 h-4" />
              {savedKaprodi ? 'Tersimpan!' : 'Simpan Sambutan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
