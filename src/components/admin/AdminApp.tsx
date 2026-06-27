import React, { useState, useEffect } from 'react';
import LoginAdmin from './LoginAdmin';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import CurriculumManager from './CurriculumManager';

// New Components
import NewsManager from './NewsManager';
import GalleryManager from './GalleryManager';
import FacilityManager from './FacilityManager';
import TeacherManager from './TeacherManager';
import MitraManager from './MitraManager';
import FAQManager from './FAQManager';
import KarirManager from './KarirManager';
import SettingsManager from './SettingsManager';
import VisiMisiManager from './VisiMisiManager';
import ServiceManager from './ServiceManager';
import SambutanManager from './SambutanManager';

const renderContent = (tab: string, userEmail: string | undefined, setActiveTab: (t: string) => void) => {
  switch (tab) {
    case 'dashboard':      return <Dashboard userEmail={userEmail} setActiveTab={setActiveTab} />;
    case 'visi-misi':      return <VisiMisiManager />;
    case 'sambutan':       return <SambutanManager />;
    case 'fasilitas':      return <FacilityManager />;
    case 'guru':           return <TeacherManager />;
    case 'mitra':          return <MitraManager />;
    case 'curriculum':     return <CurriculumManager />;
    case 'karir':          return <KarirManager />;
    case 'eduspa':         return <ServiceManager />;
    case 'berita':         return <NewsManager />;
    case 'galeri':         return <GalleryManager />;
    case 'faq':            return <FAQManager />;
    case 'pengaturan':     return <SettingsManager />;
    default:               return <Dashboard userEmail={userEmail} setActiveTab={setActiveTab} />;
  }
};

import { supabase } from '../../lib/supabase';
import { AdminFeedbackProvider } from './AdminFeedbackContext';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('adminActiveTab') || 'dashboard';
  });
  const [userEmail, setUserEmail] = useState<string | undefined>("admin@smk1pkl.sch.id");

  useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Auth session error:', err);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email);
      } else {
        setIsAuthenticated(false);
        setUserEmail(undefined);
      }
    });

    return () => subscription.unsubscribe();
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

  if (!isAuthenticated) {
    return <LoginAdmin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminFeedbackProvider>
      <AdminLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => setIsAuthenticated(false)}
        userEmail={userEmail}
      >
        {renderContent(activeTab, userEmail, setActiveTab)}
      </AdminLayout>
    </AdminFeedbackProvider>
  );
}
