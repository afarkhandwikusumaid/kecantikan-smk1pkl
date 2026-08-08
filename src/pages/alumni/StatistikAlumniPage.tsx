import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PieChart, Briefcase, GraduationCap, Store } from 'lucide-react';

interface AlumniStats {
  Bekerja: number;
  Melanjutkan: number;
  Wirausaha: number;
  Total: number;
}

export default function StatistikAlumniPage() {
  const [stats, setStats] = useState<AlumniStats>({ Bekerja: 0, Melanjutkan: 0, Wirausaha: 0, Total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('alumni_data')
        .select('status');
      
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

  const getPercentage = (count: number) => {
    if (stats.Total === 0) return 0;
    return Math.round((count / stats.Total) * 100);
  };

  return (
    <div className="pt-10 pb-16 bg-slate-50 min-h-[calc(100vh-80px)]">
      <div className="text-center mb-8 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center justify-center space-x-2">
          <span className="w-8 h-px bg-secondary/50"></span>
          <span className="text-xs font-bold text-secondary tracking-widest uppercase">
            Data Sebaran
          </span>
          <span className="w-8 h-px bg-secondary/50"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">
          STATISTIK ALUMNI
        </h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 mb-4 rounded-full"></div>
        <p className="text-slate-600 text-sm md:text-base">
          Persentase sebaran karir alumni SMK Negeri 1 Pekalongan Program Keahlian Kecantikan & Spa.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-400 border-t-transparent"></div>
          </div>
        ) : (
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              
              {/* Card Bekerja */}
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-black text-blue-900 mb-1">{getPercentage(stats.Bekerja)}%</h3>
                <p className="font-bold text-blue-700">Bekerja</p>
                <p className="text-sm text-blue-600/80 mt-2">{stats.Bekerja} Alumni</p>
              </div>

              {/* Card Melanjutkan */}
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-black text-emerald-900 mb-1">{getPercentage(stats.Melanjutkan)}%</h3>
                <p className="font-bold text-emerald-700">Melanjutkan (Kuliah)</p>
                <p className="text-sm text-emerald-600/80 mt-2">{stats.Melanjutkan} Alumni</p>
              </div>

              {/* Card Wirausaha */}
              <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-4xl font-black text-amber-900 mb-1">{getPercentage(stats.Wirausaha)}%</h3>
                <p className="font-bold text-amber-700">Wirausaha</p>
                <p className="text-sm text-amber-600/80 mt-2">{stats.Wirausaha} Alumni</p>
              </div>

            </div>

            <div className="border-t border-slate-100 pt-8">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
                <PieChart className="w-5 h-5 text-pink-500" /> Visualisasi Proporsi
              </h3>
              
              <div className="w-full h-8 flex rounded-full overflow-hidden shadow-inner">
                {stats.Total > 0 ? (
                  <>
                    <div 
                      className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                      style={{ width: `${getPercentage(stats.Bekerja)}%` }}
                      title="Bekerja"
                    ></div>
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
                      style={{ width: `${getPercentage(stats.Melanjutkan)}%` }}
                      title="Melanjutkan"
                    ></div>
                    <div 
                      className="h-full bg-amber-500 transition-all duration-1000 ease-out"
                      style={{ width: `${getPercentage(stats.Wirausaha)}%` }}
                      title="Wirausaha"
                    ></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-slate-200"></div>
                )}
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div> Bekerja
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Melanjutkan
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div> Wirausaha
                </div>
              </div>

              <div className="mt-10 text-center">
                <p className="text-slate-500 font-medium">
                  Total Data Alumni Terhimpun: <span className="font-bold text-slate-800">{stats.Total} Orang</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
