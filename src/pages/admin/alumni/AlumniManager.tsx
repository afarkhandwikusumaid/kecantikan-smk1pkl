import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Search, Download, Trash2, GraduationCap } from 'lucide-react';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface AlumniData {
  id: string;
  name: string;
  status: string;
  status_detail: string;
  graduation_year: number;
  created_at: string;
}

export default function AlumniManager() {
  const { showConfirm, showAlert } = useAdminFeedback();
  const [data, setData] = useState<AlumniData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterYear, setFilterYear] = useState('All');

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase
        .from('alumni_data')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setData(result || []);
    } catch (err: any) {
      showAlert('Gagal mengambil data: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    showConfirm('Hapus data alumni ini?', async () => {
      try {
        const { error } = await supabase
          .from('alumni_data')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchData();
        showAlert('Data berhasil dihapus', 'success');
      } catch (err: any) {
        showAlert('Gagal menghapus data: ' + err.message, 'error');
      }
    });
  };

  const handleExportExcel = () => {
    const dataToExport = filtered.length > 0 ? filtered : data;
    
    if (dataToExport.length === 0) {
      showAlert('Tidak ada data untuk diexport', 'error');
      return;
    }

    const tableHTML = `
      <html xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <table>
            <tr>
              <th colspan="6" style="font-size: 16px; font-weight: bold; text-align: center; padding: 10px;">DATA PENDATAAN ALUMNI SMK NEGERI 1 PEKALONGAN</th>
            </tr>
            <tr>
              <th colspan="6" style="text-align: center; padding-bottom: 10px;">${filterYear === 'All' ? 'Semua Tahun Lulus' : `Tahun Lulus: ${filterYear}`}</th>
            </tr>
          </table>
          <table border="1" style="border-collapse: collapse;">
            <thead>
              <tr>
                <th style="background-color: #fce7f3; font-weight: bold; padding: 8px;">No</th>
                <th style="background-color: #fce7f3; font-weight: bold; padding: 8px;">Nama Lengkap</th>
                <th style="background-color: #fce7f3; font-weight: bold; padding: 8px;">Tahun Lulus</th>
                <th style="background-color: #fce7f3; font-weight: bold; padding: 8px;">Status Karir</th>
                <th style="background-color: #fce7f3; font-weight: bold; padding: 8px;">Detail Informasi</th>
                <th style="background-color: #fce7f3; font-weight: bold; padding: 8px;">Tanggal Input</th>
              </tr>
            </thead>
            <tbody>
              ${dataToExport.map((row, i) => `
                <tr>
                  <td style="padding: 5px; text-align: center;">${i + 1}</td>
                  <td style="padding: 5px;">${row.name}</td>
                  <td style="padding: 5px; text-align: center;">${row.graduation_year}</td>
                  <td style="padding: 5px; text-align: center;">${row.status}</td>
                  <td style="padding: 5px;">${row.status_detail}</td>
                  <td style="padding: 5px; text-align: center;">${new Date(row.created_at).toLocaleDateString('id-ID')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([tableHTML], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Data_Alumni_${new Date().toISOString().split('T')[0]}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = data.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                        item.status.toLowerCase().includes(search.toLowerCase());
    const matchYear = filterYear === 'All' || item.graduation_year.toString() === filterYear;
    return matchSearch && matchYear;
  });

  // Extract unique years for the filter dropdown
  const uniqueYears = Array.from(new Set(data.map(item => item.graduation_year))).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Data Alumni</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola data pendaftaran jejak alumni</p>
        </div>
        <button
          onClick={handleExportExcel}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-500 transition-none"
        >
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text" 
              placeholder="Cari nama atau status..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50 text-black"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm text-slate-600 whitespace-nowrap font-medium">Tahun Lulus:</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-slate-200 py-2.5 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50 text-black"
            >
              <option value="All">Semua Tahun</option>
              {uniqueYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Nama Lengkap</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tahun Lulus</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status Karir</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Detail Informasi</th>
                  <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                      <GraduationCap className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p>Belum ada data alumni.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">{item.name}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {item.graduation_year}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'Bekerja' ? 'bg-blue-100 text-blue-700' :
                          item.status === 'Melanjutkan' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {item.status_detail}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
