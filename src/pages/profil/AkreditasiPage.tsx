import React, { useEffect, useState } from 'react';
import { Award, CheckCircle, Calendar, ShieldCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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

export default function AkreditasiPage() {
  const [content, setContent] = useState<AkreditasiContent>({
    akreditasiText: '',
    lisensiText: '',
  });
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    fetchCertificates();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'akreditasi')
        .single();

      if (!error && data && data.value) {
        let parsed = data.value;
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        setContent(parsed as AkreditasiContent);
      }
    } catch (err) {
      console.error('Error fetching akreditasi:', err);
    }
  };

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setCertificates(data);
      }
    } catch (err) {
      console.error('Error fetching certificates:', err);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-16">
      {/* Page Header */}
      <div className="text-center mb-8 max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center justify-center space-x-2">
          <span className="w-8 h-px bg-secondary/50"></span>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">Profil Jurusan</span>
          <span className="w-8 h-px bg-secondary/50"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">AKREDITASI & SERTIFIKASI</h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Bukti komitmen kami dalam menjaga standar mutu pendidikan dan kualitas lulusan profesional.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">

          {/* Teks Akreditasi dan Lisensi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-start space-x-4 p-6 border border-slate-100 rounded-lg bg-slate-50">
              <div className="w-12 h-12 rounded bg-primary-100 flex items-center justify-center shrink-0 border border-primary-200">
                <Award className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Akreditasi A (Unggul)</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {content.akreditasiText || 'Program keahlian Tata Kecantikan Kulit dan Rambut telah meraih akreditasi A (Unggul) dari BAN-SM, menunjukkan kualitas standar pelayanan pendidikan yang sangat baik.'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-6 border border-slate-100 rounded-lg bg-slate-50">
              <div className="w-12 h-12 rounded bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Lisensi BNSP</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {content.lisensiText || 'Sekolah kami merupakan Lembaga Sertifikasi Profesi (LSP P1) yang terlisensi oleh BNSP untuk menguji dan menerbitkan sertifikat kompetensi nasional bagi lulusan.'}
                </p>
              </div>
            </div>
          </div>

          {/* Daftar Sertifikat */}
          <div className="border-t border-slate-200 pt-10 mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-slate-900">Daftar Sertifikat & Lisensi</h3>
              <p className="text-slate-500 mt-2 text-sm">Berbagai sertifikat kelayakan dan standar industri yang dimiliki oleh jurusan</p>
            </div>
            
            {certificates.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <ShieldCheck className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                <p className="font-medium text-slate-600">Belum ada data sertifikat</p>
                <p className="text-sm text-slate-400">Sertifikat akan ditampilkan di sini setelah ditambahkan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[4/3] p-4 bg-slate-50 flex items-center justify-center border-b border-slate-100 relative overflow-hidden">
                      <img 
                        src={cert.image_url} 
                        alt={cert.title} 
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-slate-900 text-lg mb-1 line-clamp-2">{cert.title}</h4>
                      <p className="text-primary-600 text-sm font-medium mb-3">{cert.issuer}</p>
                      {cert.date && (
                        <div className="flex items-center text-xs text-slate-500 gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(cert.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
