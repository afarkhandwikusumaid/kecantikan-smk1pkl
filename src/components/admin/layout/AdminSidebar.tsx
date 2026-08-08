import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LogOut, LayoutDashboard, ChevronDown, ChevronRight,
  Building2, Newspaper, GraduationCap, Settings, Sparkles, Image
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface NavSubItem {
  path: string;
  label: string;
}

interface NavItem {
  id: string; // Used for accordion open/close logic
  label: string;
  icon: React.ElementType;
  path?: string; // For parent items that don't have children
  children?: NavSubItem[];
}

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  {
    id: 'beranda', label: 'Beranda', icon: Sparkles,
    children: [
      { path: '/admin/beranda/sambutan', label: 'Sambutan Jurusan' },
      { path: '/admin/beranda/kemitraan', label: 'Kemitraan Industri' },
      { path: '/admin/beranda/faq', label: 'Tanya Jawab (FAQ)' },
    ],
  },
  {
    id: 'profil', label: 'Profil Jurusan', icon: Building2,
    children: [
      { path: '/admin/profil/sejarah', label: 'Sejarah Singkat' },
      { path: '/admin/profil/visi-misi', label: 'Visi Misi' },
      { path: '/admin/profil/guru', label: 'Struktur Guru' },
      { path: '/admin/profil/akreditasi', label: 'Akreditasi & Sertifikasi' },
    ],
  },
  {
    id: 'akademik', label: 'Akademik', icon: GraduationCap,
    children: [
      { path: '/admin/akademik/kurikulum', label: 'Kurikulum Kami' },
      { path: '/admin/akademik/pembelajaran', label: 'Mata Pelajaran' },
    ],
  },
  { id: 'fasilitas', label: 'Fasilitas', icon: Building2, path: '/admin/fasilitas' },
  { id: 'galeri', label: 'Dokumentasi', icon: Image, path: '/admin/galeri' },
  { id: 'alumni', label: 'Data Alumni', icon: GraduationCap, path: '/admin/alumni' },
  {
    id: 'settings', label: 'Pengaturan', icon: Settings,
    children: [{ path: '/admin/pengaturan', label: 'Pengaturan Umum' }],
  },
];

export const getActiveParent = (pathname: string): string => {
  for (const item of navItems) {
    if (item.path && pathname === item.path) return item.id;
    if (item.children?.some((c) => c.path === pathname || pathname.startsWith(c.path))) return item.id;
  }
  return '';
};

export const getActiveLabel = (pathname: string): string => {
  for (const item of navItems) {
    if (item.path && pathname === item.path) return item.label;
    if (item.children) {
      const child = item.children.find((c) => c.path === pathname || pathname.startsWith(c.path));
      if (child) return child.label;
    }
  }
  return 'Dashboard';
};

interface AdminSidebarProps {
  onLogout: () => void;
  userEmail?: string;
  showLogo?: boolean;
  onMenuClick?: () => void;
}

export default function AdminSidebar({ onLogout, userEmail, showLogo = true, onMenuClick }: AdminSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const activeParent = getActiveParent(currentPath);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    navItems.forEach((item) => {
      if (item.children) {
        init[item.id] = item.children.some((c) => c.path === currentPath || currentPath.startsWith(c.path)) || item.id === activeParent;
      }
    });
    return init;
  });

  useEffect(() => {
    // Keep menus open if we navigate to a child
    if (activeParent) {
      setOpenMenus(prev => ({ ...prev, [activeParent]: true }));
    }
  }, [activeParent]);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = async () => {
    try { 
      await supabase.auth.signOut(); 
      onLogout(); 
    } catch (error) { 
      console.error('Logout error:', error); 
    }
  };

  return (
    <div className="flex flex-col h-full">
      {showLogo && (
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/logo-kecantikan.png" alt="Logo" className="w-10 h-10 object-contain bg-white rounded-xl shadow-lg p-1 flex-shrink-0" />
            <div>
              <p className="text-white font-bold text-sm leading-tight">Admin Portal</p>
              <p className="text-pink-300/70 text-sm leading-tight font-medium tracking-wide uppercase">Kecantikan & SPA</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isParentActive = item.id === activeParent || currentPath === item.path;
          const isOpen = openMenus[item.id] ?? false;

          if (!item.children && item.path) {
            const isExactActive = currentPath === item.path;
            return (
              <Link key={item.id} to={item.path} onClick={() => onMenuClick?.()}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group border ${
                  isExactActive
                    ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/10 text-pink-300 border-pink-500/30'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                <item.icon className={`w-4 h-4 flex-shrink-0 ${isExactActive ? 'text-pink-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {isExactActive && <span className="w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />}
              </Link>
            );
          }

          return (
            <div key={item.id}>
              <button onClick={() => toggleMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group border ${
                  isParentActive ? 'text-pink-300 bg-white/5 border-transparent' : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                }`}>
                <item.icon className={`w-4 h-4 flex-shrink-0 ${isParentActive ? 'text-pink-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {isOpen
                  ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                }
              </button>
              {isOpen && item.children && (
                <div className="mt-1 ml-3 pl-4 border-l border-white/10 space-y-0.5">
                  {item.children.map((child) => {
                    const isChildActive = currentPath === child.path || currentPath.startsWith(child.path + '/');
                    return (
                      <Link key={child.path} to={child.path} onClick={() => onMenuClick?.()}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 border ${
                          isChildActive
                            ? 'text-pink-300 bg-pink-500/15 border-pink-500/20'
                            : 'border-transparent text-slate-500 hover:text-slate-200 hover:bg-white/5'
                        }`}>
                        {isChildActive
                          ? <span className="w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
                          : <span className="w-1.5 h-1.5 rounded-full border border-slate-600 flex-shrink-0" />
                        }
                        {child.label}
                      </Link>
                    );
                  })}
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
}
