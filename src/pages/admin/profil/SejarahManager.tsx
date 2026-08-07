import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, History, Loader2 } from 'lucide-react';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface SejarahContent {
  paragraphs: string[];
}

export default function SejarahManager() {
  const [content, setContent] = useState<SejarahContent>({
    paragraphs: [
      'SMK Negeri 1 Pekalongan merupakan salah satu sekolah vokasi unggulan di Kota Pekalongan yang berdedikasi tinggi dalam mencetak lulusan kompeten. Sejak didirikan, sekolah ini terus berkembang dalam menyediakan fasilitas pendidikan terbaik untuk mendukung kompetensi keahlian siswanya.',
      'Program Keahlian Tata Kecantikan & Spa menjadi salah satu pilar utama yang telah terakreditasi dan memiliki Teaching Factory (Eduspa Salon) yang berstandar industri, memberikan pengalaman praktik nyata bagi siswa. Seiring berkembangnya industri kecantikan, jurusan ini selalu menyesuaikan kurikulumnya agar relevan dengan tuntutan zaman.'
    ]
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showSuccess, showError } = useAdminFeedback();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'sejarah')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data && data.value) {
        let parsed = data.value;
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        setContent(parsed as SejarahContent);
      }
    } catch (err: any) {
      console.error('Error fetching sejarah:', err);
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
          key: 'sejarah',
          value: content
        }, { onConflict: 'key' });

      if (error) throw error;
      showSuccess('Data sejarah berhasil disimpan');
    } catch (err: any) {
      console.error('Error saving:', err);
      showError('Gagal menyimpan data sejarah: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...content.paragraphs];
    newParagraphs[index] = value;
    setContent({ paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    setContent({ paragraphs: [...content.paragraphs, ''] });
  };

  const removeParagraph = (index: number) => {
    const newParagraphs = content.paragraphs.filter((_, i) => i !== index);
    setContent({ paragraphs: newParagraphs });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
            <History className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Sejarah Singkat</h1>
            <p className="text-sm text-slate-500">Kelola teks sejarah jurusan kecantikan</p>
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

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Paragraf Sejarah</h3>
        
        <div className="space-y-4">
          {content.paragraphs.map((p, idx) => (
            <div key={idx} className="relative group">
              <textarea
                value={p}
                onChange={(e) => handleParagraphChange(idx, e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none h-32"
                placeholder={`Teks paragraf ke-${idx + 1}...`}
              />
              <button 
                onClick={() => removeParagraph(idx)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-600 bg-white rounded-md p-1 shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Hapus Paragraf"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
        
        <button 
          onClick={addParagraph}
          className="mt-4 text-sm font-semibold text-pink-500 hover:text-pink-600 hover:underline"
        >
          + Tambah Paragraf
        </button>
      </div>
    </div>
  );
}
