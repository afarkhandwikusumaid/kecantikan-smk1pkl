import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Send, CheckCircle } from 'lucide-react';

export default function PendataanAlumniPage() {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    status_detail: '',
    graduation_year: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Specific fields for "Melanjutkan"
  const [kampus, setKampus] = useState('');
  const [prodi, setProdi] = useState('');
  const [jenjang, setJenjang] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(20), (val, index) => currentYear - index);

  const toTitleCase = (str: string) => {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      let finalDetail = toTitleCase(formData.status_detail);
      if (formData.status === 'Melanjutkan') {
        const formattedProdi = toTitleCase(prodi);
        const formattedKampus = kampus.toUpperCase(); // Usually kampuses look better uppercase (e.g. ITB) or we can leave it to title case. Let's do Title Case but keep it as typed if they want, but wait, the prompt says "jangan uppercase semua". Let's apply toTitleCase. Wait, in the image it's "ITB". Let's do uppercase for Kampus if it's less than 5 chars? No, let's just use a smarter titlecase or just let's title case them all except if it's all caps acronym.
        // Simple title case for prodi and kampus
        let finalKampus = kampus;
        if (kampus === kampus.toUpperCase() && kampus.length <= 4) {
             finalKampus = kampus; // likely acronym like ITB, UGM
        } else {
             finalKampus = toTitleCase(kampus);
        }
        finalDetail = `${jenjang}-${formattedProdi}-${finalKampus}`;
      }

      const { error } = await supabase
        .from('alumni_data')
        .insert([
          {
            name: toTitleCase(formData.name),
            status: formData.status,
            status_detail: finalDetail,
            graduation_year: formData.graduation_year,
          }
        ]);

      if (error) throw error;
      setSuccess(true);
      setFormData({
        name: '',
        status: '',
        status_detail: '',
        graduation_year: currentYear,
      });
      setKampus('');
      setProdi('');
      setJenjang('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  const getDetailLabel = () => {
    switch (formData.status) {
      case 'Bekerja': return 'Bekerja di mana? (Nama Perusahaan/Instansi)';
      case 'Melanjutkan': return 'Melanjutkan studi di mana? (Nama Kampus/Universitas)';
      case 'Wirausaha': return 'Jenis Usaha apa? (Nama/Bidang Usaha)';
      default: return 'Detail Informasi';
    }
  };

  return (
    <div className="pt-10 pb-16 bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="text-center mb-8 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center justify-center space-x-2">
          <span className="w-8 h-px bg-secondary/50"></span>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">
            Jejak Alumni
          </span>
          <span className="w-8 h-px bg-secondary/50"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">
          PENDATAAN ALUMNI
        </h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Mari bantu kami mendata persebaran lulusan SMK Negeri 1 Pekalongan Program Keahlian Kecantikan & Spa.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          {success ? (
            <div className="text-center py-10">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Terima Kasih!</h3>
              <p className="text-slate-600 mb-6">Data Anda telah berhasil disimpan di sistem kami.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="px-6 py-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 font-semibold transition-colors"
              >
                Isi Data Lagi
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tahun Lulus</label>
                <select 
                  value={formData.graduation_year}
                  onChange={(e) => setFormData({...formData, graduation_year: parseInt(e.target.value)})}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status Saat Ini</label>
                <select 
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value, status_detail: ''})}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                >
                  <option value="" disabled>-- Pilih Status --</option>
                  <option value="Bekerja">Bekerja</option>
                  <option value="Melanjutkan">Melanjutkan (Kuliah)</option>
                  <option value="Wirausaha">Wirausaha</option>
                </select>
              </div>

              {formData.status === 'Melanjutkan' ? (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-4 border border-slate-200 p-4 rounded-xl bg-slate-50">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Kampus/Universitas</label>
                    <input 
                      type="text" 
                      required
                      value={kampus}
                      onChange={(e) => setKampus(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                      placeholder="Contoh: Universitas Negeri Semarang"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Program Studi</label>
                      <input 
                        type="text" 
                        required
                        value={prodi}
                        onChange={(e) => setProdi(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                        placeholder="Contoh: Pendidikan Tata Kecantikan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Jenjang Pendidikan</label>
                      <select 
                        required
                        value={jenjang}
                        onChange={(e) => setJenjang(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                      >
                        <option value="" disabled>-- Pilih Jenjang --</option>
                        <option value="D1">D1</option>
                        <option value="D2">D2</option>
                        <option value="D3">D3</option>
                        <option value="D4">D4</option>
                        <option value="S1">S1</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : formData.status ? (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {getDetailLabel()}
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.status_detail}
                    onChange={(e) => setFormData({...formData, status_detail: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
                    placeholder={`Contoh: ${
                      formData.status === 'Bekerja' ? 'PT. Mustika Ratu / Salon ABC' : 'Klinik Kecantikan Mandiri'
                    }`}
                  />
                </div>
              ) : null}

              <button 
                type="submit" 
                disabled={loading || !formData.status}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}
              >
                {loading ? 'Mengirim Data...' : (
                  <>
                    Kirim Data
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
