import React, { useState } from 'react';
import {
  LogOut, LayoutDashboard, Menu, X, ChevronDown, ChevronRight,
  Building2, Newspaper, GraduationCap, Settings, Sparkles
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface NavSubItem {
  id: string;
  label: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: NavSubItem[];
}

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  userEmail?: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    id: 'profil', label: 'Profil Jurusan', icon: Building2,
    children: [
      { id: 'visi-misi', label: 'Visi & Misi' },
      { id: 'sambutan', label: 'Sambutan Jurusan' },
      { id: 'fasilitas', label: 'Fasilitas Praktik' },
      { id: 'guru', label: 'Direktori Guru' },
      { id: 'mitra', label: 'Kemitraan Industri' },
    ],
  },
  {
    id: 'akademik', label: 'Akademik', icon: GraduationCap,
    children: [
      { id: 'curriculum', label: 'Kurikulum' },
      { id: 'karir', label: 'Peluang Karir' },
    ],
  },
  {
    id: 'unggulan', label: 'Program Unggulan', icon: Sparkles,
    children: [
      { id: 'eduspa', label: 'Layanan Eduspa' },
    ],
  },
  {
    id: 'konten', label: 'Informasi & Galeri', icon: Newspaper,
    children: [
      { id: 'berita', label: 'Berita & Pengumuman' },
      { id: 'galeri', label: 'Karya & Dokumentasi' },
      { id: 'faq', label: 'Tanya Jawab (FAQ)' },
    ],
  },
  {
    id: 'settings', label: 'Pengaturan', icon: Settings,
    children: [{ id: 'pengaturan', label: 'Pengaturan Umum' }],
  },
];

const getActiveLabel = (tab: string): string => {
  for (const item of navItems) {
    if (item.id === tab) return item.label;
    if (item.children) {
      const child = item.children.find((c) => c.id === tab);
      if (child) return child.label;
    }
  }
  return 'Dashboard';
};

const getActiveParent = (tab: string): string => {
  for (const item of navItems) {
    if (item.id === tab) return item.id;
    if (item.children?.some((c) => c.id === tab)) return item.id;
  }
  return '';
};

export default function AdminLayout({ children, activeTab, setActiveTab, onLogout, userEmail }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeParent = getActiveParent(activeTab);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    navItems.forEach((item) => {
      if (item.children) {
        init[item.id] = item.children.some((c) => c.id === activeTab) || item.id === activeParent;
      }
    });
    return init;
  });

  const handleLogout = async () => {
    try { 
      await supabase.auth.signOut(); 
      onLogout(); 
    } catch (error) { 
      console.error('Logout error:', error); 
    }
  };

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/logo-kecantikan.png" alt="Logo" className="w-10 h-10 object-contain bg-white rounded-xl shadow-lg p-1 flex-shrink-0" />
          <div>
            <p className="text-white font-bold text-sm leading-tight">Admin Portal</p>
            <p className="text-pink-300/70 text-sm leading-tight font-medium tracking-wide uppercase">Kecantikan & SPA</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isParentActive = item.id === activeParent || item.id === activeTab;
          const isOpen = openMenus[item.id] ?? false;

          if (!item.children) {
            return (
              <button key={item.id} onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/10 text-pink-300 border border-pink-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                <item.icon className={`w-4 h-4 flex-shrink-0 ${activeTab === item.id ? 'text-pink-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {activeTab === item.id && <span className="w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />}
              </button>
            );
          }

          return (
            <div key={item.id}>
              <button onClick={() => toggleMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isParentActive ? 'text-pink-300 bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                <item.icon className={`w-4 h-4 flex-shrink-0 ${isParentActive ? 'text-pink-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {isOpen
                  ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                }
              </button>
              {isOpen && (
                <div className="mt-1 ml-3 pl-4 border-l border-white/10 space-y-0.5">
                  {item.children!.map((child) => (
                    <button key={child.id} onClick={() => handleTabClick(child.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                        activeTab === child.id
                          ? 'text-pink-300 bg-pink-500/15 border border-pink-500/20'
                          : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
                      }`}>
                      {activeTab === child.id
                        ? <span className="w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
                        : <span className="w-1.5 h-1.5 rounded-full border border-slate-600 flex-shrink-0" />
                      }
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">Administrator</p>
            <p className="text-slate-500 text-sm truncate">{userEmail || 'admin@smk1pkl.sch.id'}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group">
          <LogOut className="w-4 h-4 flex-shrink-0 group-hover:text-red-400" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: '#f8f7fc' }}>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0"
        style={{ background: 'linear-gradient(180deg, #1a0e2e 0%, #16091f 60%, #120818 100%)', boxShadow: '4px 0 24px rgba(0,0,0,0.3)' }}>
        <SidebarContent />
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
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-between px-4 md:px-6 flex-shrink-0 border-b"
          style={{ background: 'white', borderColor: '#ede8f5' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400 hidden sm:block">Admin</span>
              <span className="text-slate-300 hidden sm:block">/</span>
              <span className="font-semibold text-slate-700">{getActiveLabel(activeTab)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: '#fdf2f8', color: '#be185d', border: '1px solid #fce7f3' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold">
              {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
