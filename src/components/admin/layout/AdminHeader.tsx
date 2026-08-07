import React from 'react';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getActiveLabel } from './AdminSidebar';

interface AdminHeaderProps {
  userEmail?: string;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function AdminHeader({ userEmail, setIsMobileMenuOpen }: AdminHeaderProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
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
          <span className="font-semibold text-slate-700">{getActiveLabel(currentPath)}</span>
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
  );
}
