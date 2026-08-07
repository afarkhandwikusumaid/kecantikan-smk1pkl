import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const SejarahPage = lazy(() => import('./pages/profil/SejarahPage'));
const VisiMisiPage = lazy(() => import('./pages/profil/VisiMisiPage'));
const StrukturGuruPage = lazy(() => import('./pages/profil/StrukturGuruPage'));
const AkreditasiPage = lazy(() => import('./pages/profil/AkreditasiPage'));
const KurikulumPage = lazy(() => import('./pages/akademik/KurikulumPage'));
const PembelajaranPage = lazy(() => import('./pages/akademik/PembelajaranPage'));
const FasilitasPage = lazy(() => import('./pages/fasilitas/FasilitasPage'));
const GaleriPage = lazy(() => import('./pages/GaleriPage'));
const AdminApp = lazy(() => import('./pages/admin/AdminApp'));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-20 space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-secondary-200 border-t-secondary animate-spin" />
      <p className="text-sm font-medium text-secondary/70 animate-pulse font-sans">Memuat halaman...</p>
    </div>
  );
}

export default function App() {
  // If we are in admin route, we shouldn't render the main Router with layout since AdminApp might have its own routing
  const isAdminRoute = window.location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <AdminApp />
      </Suspense>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div id="beauty-spa-app-root" className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-secondary-200 selection:text-secondary-900 font-sans flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profil" element={<Navigate to="/profil/sejarah" replace />} />
              <Route path="/profil/sejarah" element={<SejarahPage />} />
              <Route path="/profil/visi-misi" element={<VisiMisiPage />} />
              <Route path="/profil/struktur" element={<StrukturGuruPage />} />
              <Route path="/profil/akreditasi" element={<AkreditasiPage />} />
              <Route path="/akademik" element={<Navigate to="/akademik/kurikulum" replace />} />
              <Route path="/akademik/kurikulum" element={<KurikulumPage />} />
              <Route path="/akademik/pembelajaran" element={<PembelajaranPage />} />
              <Route path="/fasilitas" element={<FasilitasPage />} />
              <Route path="/galeri" element={<GaleriPage />} />
              {/* Catch all route - can redirect to home or a 404 page */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
