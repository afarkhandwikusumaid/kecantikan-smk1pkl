import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Building2, BookOpen, Handshake, Users,
  Image, TrendingUp, ArrowRight, Sparkles, Star
} from 'lucide-react';

interface StatCard {
  label: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  iconColor: string;
}

interface RecentNews {
  id: string;
  title: string;
  category: string;
  date: string;
}

interface DashboardProps {
  userEmail?: string;
}

export default function Dashboard({ userEmail }: DashboardProps) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    news: 0, gallery: 0, curriculum: 0, partnerships: 5, facilities: 0,
  });
  const [recentNews, setRecentNews] = useState<RecentNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [newsRes, galleryRes, currRes, facRes] = await Promise.all([
          supabase.from('news').select('*', { count: 'exact', head: true }),
          supabase.from('galleries').select('*', { count: 'exact', head: true }),
          supabase.from('curriculum').select('*', { count: 'exact', head: true }),
          supabase.from('facilities').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          news: newsRes.count || 0,
          gallery: galleryRes.count || 0,
          curriculum: currRes.count || 0,
          partnerships: 5,
          facilities: facRes.count || 0,
        });

        // Recent news -> now mapped to galleries
        const { data: galleryData, error: galleryError } = await supabase
          .from('galleries')
          .select('id, title, date, image_url')
          .order('date', { ascending: false })
          .limit(5);

        if (galleryError) throw galleryError;

        if (galleryData) {
          setRecentNews(galleryData.map((n: any) => ({
            id: n.id,
            title: n.title,
            category: 'Galeri',
            date: new Date(n.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
          })));
        }
      } catch (e) {
        console.error('Dashboard fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const statCards: StatCard[] = [
    { label: 'Berita & Kegiatan', value: stats.news, icon: FileText, gradient: 'from-rose-500 to-pink-600', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
    { label: 'Galeri Foto', value: stats.gallery, icon: Image, gradient: 'from-violet-500 to-purple-600', iconBg: 'bg-violet-100', iconColor: 'text-violet-600' },
    { label: 'Mata Pelajaran', value: stats.curriculum, icon: BookOpen, gradient: 'from-blue-500 to-indigo-600', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Mitra Industri', value: stats.partnerships, icon: Handshake, gradient: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
    { label: 'Fasilitas Praktik', value: stats.facilities, icon: Building2, gradient: 'from-emerald-500 to-teal-600', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  ];

  const categoryColor: Record<string, string> = {
    Akademik: 'bg-blue-100 text-blue-700',
    Prestasi: 'bg-yellow-100 text-yellow-700',
    Kegiatan: 'bg-green-100 text-green-700',
    Pengumuman: 'bg-orange-100 text-orange-700',
    Informasi: 'bg-purple-100 text-purple-700',
  };

  const firstName = userEmail?.split('@')[0] || 'Admin';

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden p-6 md:p-8"
        style={{ background: 'linear-gradient(135deg, #1a0e2e 0%, #2d1154 50%, #3d1a6e 100%)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10"
          style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-32 w-40 h-40 opacity-10"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span className="text-pink-300 text-sm font-medium">Selamat datang kembali</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white capitalize">{firstName} 👋</h1>
            <p className="text-slate-400 text-sm mt-1">Kelola konten website jurusan Kecantikan & SPA dari sini.</p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 animate-pulse border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-200 mb-3" />
              <div className="h-6 w-12 bg-slate-200 rounded mb-1" />
              <div className="h-3 w-20 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-5 border border-slate-100 hover:-translate-y-0.5 transition-all duration-200 group cursor-default">
              <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <p className="text-2xl font-bold text-slate-800">{card.value}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-tight">{card.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Galleries */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image className="w-4 h-4 text-pink-500" />
              <h2 className="font-bold text-slate-800 text-sm">Galeri Terbaru</h2>
            </div>
            <button onClick={() => navigate('/admin/galeri')} className="text-xs text-pink-500 hover:text-pink-700 font-medium flex items-center gap-1 transition-colors">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {recentNews.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Image className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Belum ada foto yang diunggah.</p>
                <button onClick={() => navigate('/admin/galeri')}
                  className="mt-3 text-xs font-semibold text-pink-500 hover:underline">
                  + Unggah Foto Pertama
                </button>
              </div>
            ) : (
              recentNews.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <h2 className="font-bold text-slate-800 text-sm">Akses Cepat</h2>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {[
              { label: 'Sambutan', path: '/admin/beranda/sambutan', icon: FileText, color: 'from-rose-400 to-pink-500' },
              { label: 'Upload Galeri', path: '/admin/galeri', icon: Image, color: 'from-violet-400 to-purple-500' },
              { label: 'Data Fasilitas', path: '/admin/fasilitas', icon: Building2, color: 'from-emerald-400 to-teal-500' },
              { label: 'Kelola Mitra', path: '/admin/beranda/kemitraan', icon: Handshake, color: 'from-amber-400 to-orange-500' },
              { label: 'Data Pembelajaran', path: '/admin/akademik/pembelajaran', icon: BookOpen, color: 'from-blue-400 to-indigo-500' },
              { label: 'Sejarah Singkat', path: '/admin/profil/sejarah', icon: Sparkles, color: 'from-pink-400 to-rose-500' },
            ].map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className={`flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-br ${action.color} text-white hover:-translate-y-0.5 transition-all duration-200 text-left group`}
              >
                <action.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Panduan */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-100">
        <h3 className="font-bold text-slate-700 mb-3 text-sm">📌 Panduan Singkat</h3>
        <ul className="space-y-1.5 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-pink-400 font-bold flex-shrink-0">→</span>
            Gunakan menu <strong>Konten & Info</strong> untuk posting berita dan mengelola galeri foto kegiatan.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-400 font-bold flex-shrink-0">→</span>
            Kelola data DUDI (mitra PKL) dan lowongan kerja di menu <strong>Kemitraan & BKK</strong>.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-400 font-bold flex-shrink-0">→</span>
            Pastikan selalu <strong>Logout</strong> jika menggunakan perangkat umum/bersama.
          </li>
        </ul>
      </div>
    </div>
  );
}
