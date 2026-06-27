import React, { useState, useEffect } from 'react';
import { Award, Calendar, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image_url: string;
  description: string;
}

export default function Prestasi() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('date', { ascending: false });
        if (data) {
          setCertificates(data);
        }
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCertificates();
  }, []);

  if (loading || certificates.length === 0) {
    return null; // Hide section if no certificates available
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-pink-100/70 p-8 sm:p-12 shadow-[0_10px_40px_rgba(251,207,232,0.1)] mb-16 w-full">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <span className="text-[10px] tracking-widest font-bold text-pink-800 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full uppercase">
          REKOGNISI &amp; PENGHARGAAN
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
          Sertifikat &amp; Prestasi Kejuaraan
        </h1>
        <p className="text-sm text-gray-600 max-w-xl mx-auto pt-1">
          Bukti nyata dedikasi, kualitas pendidikan, dan kompetensi unggul dari para siswi serta tenaga pendidik kami.
        </p>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div 
              key={cert.id} 
              className="bg-white rounded-[2rem] border border-pink-100/70 p-4 shadow-sm hover:shadow-[0_10px_30px_rgba(251,207,232,0.2)] hover:-translate-y-2 transition-all duration-300 group flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-5 bg-slate-50 border border-slate-100 shadow-inner">
                <img 
                  src={cert.image_url} 
                  alt={cert.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Date Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-pink-700 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                  {cert.date}
                </div>
              </div>

              {/* Text Content */}
              <div className="px-2 pb-2 flex-1 flex flex-col">
                <h3 className="font-serif text-lg font-bold text-gray-900 leading-tight mb-3 group-hover:text-pink-600 transition-colors">
                  {cert.title}
                </h3>
                
                <div className="flex items-start space-x-2 text-xs font-semibold text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Award className="w-4 h-4 text-pink-500 shrink-0" />
                  <span className="leading-snug">{cert.issuer}</span>
                </div>

                {cert.description && (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                    {cert.description}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-xs text-green-600 font-bold uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 mr-1.5" /> Terverifikasi
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
