import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase';
import LoginAdmin from './LoginAdmin';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard.tsx';
import CurriculumManager from './CurriculumManager.tsx';
import ContentManager from './ContentManager.tsx';
import PartnershipManager from './PartnershipManager.tsx';

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginAdmin onLoginSuccess={() => {}} />;
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setUser(null)}>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'curriculum' && <CurriculumManager />}
      {activeTab === 'content' && <ContentManager />}
      {activeTab === 'partnership' && <PartnershipManager />}
    </AdminLayout>
  );
}
