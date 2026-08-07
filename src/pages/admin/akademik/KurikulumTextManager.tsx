import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Save, BookOpen, Loader2 } from 'lucide-react';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface KurikulumContent {
  paragraphs: string[];
  focusPoints: string[];
}

export default function KurikulumTextManager() {
  const [content, setContent] = useState<KurikulumContent>({
    paragraphs: [
      'Kurikulum Operasional Satuan Pendidikan (KOSP) pada Program Keahlian Tata Kecantikan & Spa merupakan pola dan susunan mata pelajaran yang harus ditempuh oleh peserta didik dalam kegiatan pembelajaran. Kedalaman muatan kurikulum pada setiap mata pelajaran pada setiap satuan pendidikan dituangkan dalam kompetensi yang harus dikuasai peserta didik sesuai dengan beban belajar yang tercantum dalam struktur kurikulum.',
      'Pengembangan kurikulum di program keahlian ini selalu diselaraskan dengan kebutuhan Dunia Usaha dan Dunia Industri (DUDI), khususnya di bidang estetika, tata rias, dan spa. Dinamika ini terjadi untuk menyesuaikan arah pendidikan dengan kebutuhan zaman, kemajuan teknologi alat kecantikan, dan tuntutan pelayanan jasa global.'
    ],
    focusPoints: [
      '**Pendidikan Karakter & Etika Profesi :** Mengembangkan sikap (attitude) pelayanan pelanggan (hospitality) yang merupakan standar utama di industri jasa kecantikan.',
      '**Keterampilan Praktik (Hard Skills) :** Proporsi pembelajaran praktik mencapai lebih dari 60%, dilakukan di laboratorium dan Teaching Factory (Eduspa Klinik) yang sesuai dengan standar industri.',
      '**Sertifikasi Kompetensi :** Kurikulum dirancang agar di akhir masa studi, siswa siap mengikuti uji kompetensi oleh LSP (Lembaga Sertifikasi Profesi) P1 berlisensi BNSP.'
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
        .eq('key', 'kurikulum_text')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data && data.value) {
        let parsed = data.value;
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        setContent(parsed as KurikulumContent);
      }
    } catch (err: any) {
      console.error('Error fetching kurikulum text:', err);
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
          key: 'kurikulum_text',
          value: content
        }, { onConflict: 'key' });

      if (error) throw error;
      showSuccess('Data teks kurikulum berhasil disimpan');
    } catch (err: any) {
      console.error('Error saving:', err);
      showError('Gagal menyimpan teks kurikulum: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...content.paragraphs];
    newParagraphs[index] = value;
    setContent({ ...content, paragraphs: newParagraphs });
  };

  const handleFocusChange = (index: number, value: string) => {
    const newFocus = [...content.focusPoints];
    newFocus[index] = value;
    setContent({ ...content, focusPoints: newFocus });
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
            <BookOpen className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Teks Kurikulum</h1>
            <p className="text-sm text-slate-500">Kelola narasi dan fokus pembelajaran kurikulum</p>
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
        <h3 className="font-semibold text-slate-800 mb-4">Pengantar Kurikulum</h3>
        <div className="space-y-4">
          {content.paragraphs.map((p, idx) => (
            <textarea
              key={idx}
              value={p}
              onChange={(e) => handleParagraphChange(idx, e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none h-32"
              placeholder={`Paragraf pengantar ke-${idx + 1}...`}
            />
          ))}
          <button 
            onClick={() => setContent({ ...content, paragraphs: [...content.paragraphs, ''] })}
            className="text-sm font-semibold text-pink-500 hover:text-pink-600 hover:underline"
          >
            + Tambah Paragraf
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-800 mb-4">Fokus Pembelajaran Vokasi</h3>
        <div className="space-y-4">
          {content.focusPoints.map((p, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500 flex-shrink-0 mt-2">
                {idx + 1}
              </span>
              <textarea
                value={p}
                onChange={(e) => handleFocusChange(idx, e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none h-24"
                placeholder={`Format: **Judul Fokus :** Penjelasan fokus pembelajaran...`}
              />
            </div>
          ))}
          <button 
            onClick={() => setContent({ ...content, focusPoints: [...content.focusPoints, ''] })}
            className="text-sm font-semibold text-pink-500 hover:text-pink-600 hover:underline ml-9"
          >
            + Tambah Fokus
          </button>
        </div>
      </div>
    </div>
  );
}
