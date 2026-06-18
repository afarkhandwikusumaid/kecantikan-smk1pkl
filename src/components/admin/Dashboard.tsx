import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Users, FileText, BookOpen, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    curriculumCount: 0,
    newsCount: 0,
    galleryCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from different collections
        // Note: For large collections, consider using aggregation queries instead
        const curriculumSnapshot = await getDocs(collection(db, 'curriculum'));
        const newsSnapshot = await getDocs(collection(db, 'news'));
        const gallerySnapshot = await getDocs(collection(db, 'gallery'));

        setStats({
          curriculumCount: curriculumSnapshot.size,
          newsCount: newsSnapshot.size,
          galleryCount: gallerySnapshot.size
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Memuat dashboard...</div>;
  }

  const statCards = [
    { name: 'Mata Pelajaran', value: stats.curriculumCount, icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { name: 'Berita & Pengumuman', value: stats.newsCount, icon: FileText, color: 'text-green-600', bgColor: 'bg-green-100' },
    { name: 'Galeri Karya', value: stats.galleryCount, icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Dashboard Overview</h1>
      </div>

      {/* Peringatan Konfigurasi Firestore */}
      {(stats.curriculumCount === 0 && stats.newsCount === 0 && stats.galleryCount === 0) && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-yellow-800">Data Kosong atau Firestore Belum Terkonfigurasi</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Sepertinya koleksi data Anda masih kosong atau Firebase Firestore belum dikonfigurasi dengan benar. Pastikan Anda telah membuat database di Firebase Console dan menerapkan aturan keamanan (Security Rules) yang mengizinkan akses tulis/baca untuk admin.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.name} className="bg-white overflow-hidden shadow rounded-xl border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-lg ${card.bgColor}`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{card.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Panduan Penggunaan</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
          <li>Gunakan tab <strong>Kurikulum</strong> untuk menambah dan mengedit daftar mata pelajaran dan silabus.</li>
          <li>Gunakan tab <strong>Konten</strong> untuk mengelola berita pengumuman dan mengunggah foto-foto galeri karya siswi.</li>
          <li>Pastikan Anda selalu <strong>Logout</strong> jika mengakses panel admin ini dari perangkat publik.</li>
        </ul>
      </div>
    </div>
  );
}
