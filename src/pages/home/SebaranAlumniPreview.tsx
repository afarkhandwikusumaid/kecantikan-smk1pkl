import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Briefcase, GraduationCap, Store, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface AlumniStats {
  Bekerja: number;
  Melanjutkan: number;
  Wirausaha: number;
  Total: number;
}

export default function SebaranAlumniPreview() {
  const [stats, setStats] = useState<AlumniStats>({ Bekerja: 0, Melanjutkan: 0, Wirausaha: 0, Total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.from('alumni_data').select('status');
        if (error) throw error;

        if (data) {
          const counts = { Bekerja: 0, Melanjutkan: 0, Wirausaha: 0, Total: data.length };
          data.forEach((row) => {
            if (counts[row.status as keyof typeof counts] !== undefined) {
              counts[row.status as 'Bekerja' | 'Melanjutkan' | 'Wirausaha']++;
            }
          });
          setStats(counts);
        }
      } catch (error) {
        console.error('Error fetching alumni stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getPercentage = (count: number) => {
    if (stats.Total === 0) return 0;
    return Math.round((count / stats.Total) * 100);
  };

  if (loading) return null; // Don't show anything while loading on home page

  // Only show if there's data, or just show empty state
  if (stats.Total === 0) return null;

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content - Info Menarik */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
              Lulusan Siap Kerja & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Berdaya Saing</span>
            </h2>
            
            <p className="text-slate-300 text-lg leading-relaxed">
              Tahukah kamu? Berkat kurikulum berbasis industri dan Teaching Factory yang diterapkan, sebagian besar lulusan Kecantikan & Spa SMK Negeri 1 Pekalongan langsung terserap ke dunia kerja maupun merintis usaha salon dan klinik kecantikan sendiri.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link 
                to="/alumni/statistik"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-all active:scale-95"
              >
                Lihat Detail Statistik
              </Link>
              <Link 
                to="/alumni/pendataan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all backdrop-blur-sm"
              >
                Isi Data Alumni
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Stats Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Card 1: Bekerja (Spans 2 columns on small, 1 on larger if we want, but let's do 2 columns grid) */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-300 mb-3 border border-blue-500/30">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-4xl font-black text-white mb-1">{getPercentage(stats.Bekerja)}%</h3>
              <p className="font-bold text-slate-300 text-sm">Bekerja</p>
            </div>

            {/* Card 2: Melanjutkan */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-300 mb-3 border border-emerald-500/30">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-4xl font-black text-white mb-1">{getPercentage(stats.Melanjutkan)}%</h3>
              <p className="font-bold text-slate-300 text-sm">Melanjutkan</p>
            </div>

            {/* Card 3: Wirausaha (Spans 2 columns) */}
            <div className="sm:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-300 mb-3 border border-yellow-500/30">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="text-4xl font-black text-white mb-1">{getPercentage(stats.Wirausaha)}%</h3>
              <p className="font-bold text-slate-300 text-sm">Wirausaha</p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
