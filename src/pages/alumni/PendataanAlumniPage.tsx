import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Send, CheckCircle, ChevronDown } from 'lucide-react';

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
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isJenjangOpen, setIsJenjangOpen] = useState(false);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const jenjangDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
      if (jenjangDropdownRef.current && !jenjangDropdownRef.current.contains(event.target as Node)) {
        setIsJenjangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const startYear = 1996;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);

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
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary bg-white"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div className="relative" ref={yearDropdownRef}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Tahun Lulus</label>
                <div 
                  onClick={() => setIsYearOpen(!isYearOpen)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary bg-white cursor-pointer flex justify-between items-center"
                >
                  <span>{formData.graduation_year || '-- Pilih Tahun Lulus --'}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isYearOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isYearOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {years.map(year => (
                      <div 
                        key={year} 
                        onClick={() => {
                          setFormData({...formData, graduation_year: year});
                          setIsYearOpen(false);
                        }}
                        className={`p-3 text-sm cursor-pointer hover:bg-slate-50 transition-colors ${formData.graduation_year === year ? 'bg-secondary/10 text-secondary font-medium' : 'text-slate-700'}`}
                      >
                        {year}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={statusDropdownRef}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status Saat Ini</label>
                <div 
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary bg-white cursor-pointer flex justify-between items-center"
                >
                  <span className={formData.status ? 'text-slate-900' : 'text-slate-500'}>
                    {formData.status === 'Melanjutkan' ? 'Melanjutkan (Kuliah)' : (formData.status || '-- Pilih Status --')}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isStatusOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {[
                      { value: 'Bekerja', label: 'Bekerja' },
                      { value: 'Melanjutkan', label: 'Melanjutkan (Kuliah)' },
                      { value: 'Wirausaha', label: 'Wirausaha' }
                    ].map(option => (
                      <div 
                        key={option.value} 
                        onClick={() => {
                          setFormData({...formData, status: option.value, status_detail: ''});
                          setIsStatusOpen(false);
                        }}
                        className={`p-3 text-sm cursor-pointer hover:bg-slate-50 transition-colors ${formData.status === option.value ? 'bg-secondary/10 text-secondary font-medium' : 'text-slate-700'}`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
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
                      className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary bg-white"
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
                        className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary bg-white"
                        placeholder="Contoh: Pendidikan Tata Kecantikan"
                      />
                    </div>
                    <div className="relative" ref={jenjangDropdownRef}>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Jenjang Pendidikan</label>
                      <div 
                        onClick={() => setIsJenjangOpen(!isJenjangOpen)}
                        className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary bg-white cursor-pointer flex justify-between items-center"
                      >
                        <span className={jenjang ? 'text-slate-900' : 'text-slate-500'}>
                          {jenjang || '-- Pilih Jenjang --'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isJenjangOpen ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {isJenjangOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                          {['D1', 'D2', 'D3', 'D4', 'S1', 'S2', 'S3'].map(opt => (
                            <div 
                              key={opt} 
                              onClick={() => {
                                setJenjang(opt);
                                setIsJenjangOpen(false);
                              }}
                              className={`p-3 text-sm cursor-pointer hover:bg-slate-50 transition-colors ${jenjang === opt ? 'bg-secondary/10 text-secondary font-medium' : 'text-slate-700'}`}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
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
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary bg-white"
                    placeholder={`Contoh: ${
                      formData.status === 'Bekerja' ? 'PT. Mustika Ratu / Salon ABC' : 'Klinik Kecantikan Mandiri'
                    }`}
                  />
                </div>
              ) : null}

              <button 
                type="submit" 
                disabled={loading || !formData.status}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-secondary"
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
