import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase';
import LoginAdmin from './LoginAdmin';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import CurriculumManager from './CurriculumManager';
import PartnershipManager from './PartnershipManager';

// New Components
import NewsManager from './NewsManager';
import GalleryManager from './GalleryManager';
import FacilityManager from './FacilityManager';
import TeacherManager from './TeacherManager';
import AchievementManager from './AchievementManager';
import AlumniManager from './AlumniManager';
import JobVacancyManager from './JobVacancyManager';
import SettingsManager from './SettingsManager';
import VisiMisiManager from './VisiMisiManager';

// Placeholder for Pengumuman (reuses NewsManager with filter)
const PengumumanManager = () => (
  <div className="space-y-4">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Pengumuman</h1>
      <p className="text-sm text-slate-500 mt-0.5">Kelola pengumuman resmi jurusan</p>
    </div>
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-amber-100">
      <p className="text-sm text-amber-700 font-medium">
        💡 Fitur pengumuman menggunakan sistem yang sama dengan <strong>Berita & Kegiatan</strong>.
        Gunakan kategori <strong>"Pengumuman"</strong> saat menambahkan berita untuk membedakannya.
      </p>
    </div>
    <NewsManager />
  </div>
);

const renderContent = (tab: string, userEmail: string | undefined, setActiveTab: (t: string) => void) => {
  switch (tab) {
    case 'dashboard':      return <Dashboard userEmail={userEmail} setActiveTab={setActiveTab} />;
    case 'visi-misi':      return <VisiMisiManager />;
    case 'fasilitas':      return <FacilityManager />;
    case 'guru':           return <TeacherManager />;
    case 'berita':         return <NewsManager />;
    case 'pengumuman':     return <PengumumanManager />;
    case 'galeri':         return <GalleryManager />;
    case 'curriculum':     return <CurriculumManager />;
    case 'prestasi':       return <AchievementManager />;
    case 'alumni':         return <AlumniManager />;
    case 'partnership':    return <PartnershipManager />;
    case 'lowongan':       return <JobVacancyManager />;
    case 'pengaturan':     return <SettingsManager />;
    default:               return <Dashboard userEmail={userEmail} setActiveTab={setActiveTab} />;
  }
};

export default function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1a0e2e 0%, #2d1154 100%)' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center mx-auto mb-4 animate-pulse shadow-2xl shadow-pink-900/50">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-400 border-t-transparent mx-auto" />
          <p className="text-pink-300 text-sm mt-3">Memuat Admin Portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginAdmin onLoginSuccess={() => {}} />;
  }

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={() => setUser(null)}
      userEmail={user.email ?? undefined}
    >
      {renderContent(activeTab, user.email ?? undefined, setActiveTab)}
    </AdminLayout>
  );
}
