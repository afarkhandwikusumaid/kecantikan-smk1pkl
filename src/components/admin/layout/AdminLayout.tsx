import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  onLogout: () => void;
  userEmail?: string;
}

export default function AdminLayout({ onLogout, userEmail }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ background: '#f8f7fc' }}>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0"
        style={{ background: 'linear-gradient(180deg, #1a0e2e 0%, #16091f 60%, #120818 100%)', boxShadow: '4px 0 24px rgba(0,0,0,0.3)' }}>
        <AdminSidebar 
          onLogout={onLogout} 
          userEmail={userEmail} 
          showLogo={true} 
        />
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col md:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: 'linear-gradient(180deg, #1a0e2e 0%, #16091f 60%, #120818 100%)', boxShadow: '4px 0 24px rgba(0,0,0,0.4)' }}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo-kecantikan.png" alt="Logo" className="w-10 h-10 object-contain bg-white rounded-xl shadow-lg p-1" />
            <div>
              <p className="text-white font-bold text-sm">Admin Portal</p>
              <p className="text-pink-300/70 text-sm font-medium tracking-wide uppercase">Kecantikan & SPA</p>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <AdminSidebar 
            onLogout={onLogout} 
            userEmail={userEmail} 
            showLogo={false} 
            onMenuClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader 
          userEmail={userEmail}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
