import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, Award, Loader2, Image as ImageIcon } from 'lucide-react';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface AkreditasiContent {
  akreditasiText: string;
  lisensiText: string;
  sertifikatUrl: string;
}

export default function AkreditasiManager() {
  const [content, setContent] = useState<AkreditasiContent>({
    akreditasiText: 'Program keahlian Tata Kecantikan Kulit dan Rambut telah meraih akreditasi A (Unggul) dari BAN-SM, menunjukkan kualitas standar pelayanan pendidikan yang sangat baik.',
    lisensiText: 'Sekolah kami merupakan Lembaga Sertifikasi Profesi (LSP P1) yang terlisensi oleh BNSP untuk menguji dan menerbitkan sertifikat kompetensi nasional bagi lulusan.',
    sertifikatUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { showSuccess, showError } = useAdminFeedback();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'akreditasi',
          value: content
        }, { onConflict: 'key' });

      if (error) throw error;
      showSuccess('Data akreditasi berhasil disimpan');
    } catch (err: any) {
      console.error('Error saving:', err);
      showError('Gagal menyimpan data akreditasi: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: keyof AkreditasiContent, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showError('File harus berupa gambar');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showError('Ukuran gambar maksimal 2MB');
        return;
      }

      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `akreditasi/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setContent(prev => ({ ...prev, sertifikatUrl: publicUrl }));
      showSuccess('Sertifikat berhasil diunggah');
    } catch (err: any) {
      showError('Gagal mengunggah sertifikat: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
            <Award className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Akreditasi & Sertifikasi</h1>
            <p className="text-sm text-slate-500">Kelola informasi standar mutu dan lisensi</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Simpan Perubahan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
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

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Gambar Sertifikat Akreditasi</h3>
          
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center bg-slate-50 overflow-hidden relative group">
              {content.sertifikatUrl ? (
                <>
                  <img src={content.sertifikatUrl} alt="Sertifikat" className="w-full h-full object-contain p-2" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer bg-white text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Ganti Gambar
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500 mb-4">Belum ada gambar sertifikat</p>
                  <label className="cursor-pointer bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 flex items-center gap-2 mx-auto w-fit shadow-sm">
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                    {uploading ? 'Mengunggah...' : 'Pilih Gambar'}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 text-center">Format: JPG, PNG, WEBP. Maks 2MB.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
