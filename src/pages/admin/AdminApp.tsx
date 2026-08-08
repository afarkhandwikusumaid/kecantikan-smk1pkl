import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginAdmin from '../../components/admin/auth/LoginAdmin';
import AdminLayout from '../../components/admin/layout/AdminLayout';
// Admin routing and page components
import Dashboard from './dashboard/Dashboard';
import VisiMisiManager from './profil/VisiMisiManager';
import TeacherManager from './profil/TeacherManager';
import SejarahManager from './profil/SejarahManager';
import AkreditasiManager from './profil/AkreditasiManager';

import SambutanManager from './profil/SambutanManager';
import MitraManager from './profil/MitraManager';
import FAQManager from './konten/FAQManager';

import KurikulumTextManager from './akademik/KurikulumTextManager';
import CurriculumManager from './akademik/CurriculumManager';

import FacilityManager from './profil/FacilityManager';
import AlumniManager from './alumni/AlumniManager';
import GalleryManager from './konten/GalleryManager';
import SettingsManager from './pengaturan/SettingsManager';

import { supabase } from '../../lib/supabase';
import { AdminFeedbackProvider } from '../../components/admin/context/AdminFeedbackContext';

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | undefined>("admin@smk1pkl.sch.id");

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
    <Router>
      <AdminFeedbackProvider>
        <Routes>
          <Route path="/admin" element={
            <AdminLayout
              onLogout={() => setIsAuthenticated(false)}
              userEmail={userEmail}
            />
          }>
            {/* Dashboard */}
            <Route index element={<Dashboard userEmail={userEmail} />} />

            {/* Beranda */}
            <Route path="beranda/sambutan" element={<SambutanManager />} />
            <Route path="beranda/kemitraan" element={<MitraManager />} />
            <Route path="beranda/faq" element={<FAQManager />} />

            {/* Profil Jurusan */}
            <Route path="profil/sejarah" element={<SejarahManager />} />
            <Route path="profil/visi-misi" element={<VisiMisiManager />} />
            <Route path="profil/guru" element={<TeacherManager />} />
            <Route path="profil/akreditasi" element={<AkreditasiManager />} />
            
            {/* Akademik */}
            <Route path="akademik/kurikulum" element={<KurikulumTextManager />} />
            <Route path="akademik/pembelajaran" element={<CurriculumManager />} />
            
            {/* Fasilitas & Galeri */}
            <Route path="fasilitas" element={<FacilityManager />} />
            <Route path="galeri" element={<GalleryManager />} />
            <Route path="alumni" element={<AlumniManager />} />
            
            {/* Pengaturan */}
            <Route path="pengaturan" element={<SettingsManager />} />
            
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>
        </Routes>
      </AdminFeedbackProvider>
    </Router>
  );
}
