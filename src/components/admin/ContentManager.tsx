import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, FileText, Image as ImageIcon } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  date: string;
}

export default function ContentManager() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    category: '',
    date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
  });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const data: NewsItem[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as NewsItem);
      });
      setNews(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const [errorMsg, setErrorMsg] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await addDoc(collection(db, 'news'), formData);
      setFormData({ title: '', desc: '', category: '', date: new Date().toISOString().split('T')[0] });
      setIsAdding(false);
      fetchNews();
    } catch (error: any) {
      console.error("Error adding news: ", error);
      setErrorMsg('Gagal menyimpan berita: Pastikan Firestore rules Anda mengizinkan akses write.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus berita ini?')) {
      setErrorMsg('');
      try {
        await deleteDoc(doc(db, 'news', id));
        fetchNews();
      } catch (error: any) {
        console.error("Error deleting news: ", error);
        setErrorMsg('Gagal menghapus berita: Periksa Firestore rules.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Manajemen Konten</h1>
      </div>

      {/* Tabs / Sections */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-pink-600" />
            <h2 className="text-xl font-semibold text-gray-900">Berita & Pengumuman</h2>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-pink-700 bg-pink-100 hover:bg-pink-200"
          >
            <Plus className="h-4 w-4 mr-1" /> Tambah Berita
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAdd} className="mb-8 space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {errorMsg}
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Judul Berita</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Misal: Akademik, Prestasi"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Deskripsi/Isi Ringkas</label>
                <textarea
                  required
                  rows={3}
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
              >
                Simpan Berita
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="text-gray-500">Memuat berita...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berita</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {news.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">Belum ada berita.</td></tr>
                ) : (
                  news.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{item.desc}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-5 w-5 inline" />
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

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <ImageIcon className="h-6 w-6 text-pink-600" />
          <h2 className="text-xl font-semibold text-gray-900">Galeri & Media (Storage)</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Integrasi Storage (Unggah Foto Karya/Fasilitas) dapat ditambahkan di sini dengan Firebase Storage SDK. Saat ini Anda bisa mengelola metadata galeri di Firestore.
        </p>
      </div>
    </div>
  );
}
