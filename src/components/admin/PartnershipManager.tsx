import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Plus, Trash2, Edit2, Handshake, Check, X } from 'lucide-react';

interface Partnership {
  id: string;
  name: string;
  subtitle: string;
  isPink: boolean;
}

export default function PartnershipManager() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    isPink: false
  });

  const fetchPartnerships = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'partnerships'));
      const data: Partnership[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Partnership);
      });
      setPartnerships(data);
    } catch (error) {
      console.error("Error fetching partnerships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerships();
  }, []);

  const [errorMsg, setErrorMsg] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await addDoc(collection(db, 'partnerships'), formData);
      setFormData({ name: '', subtitle: '', isPink: false });
      setIsAdding(false);
      fetchPartnerships();
    } catch (error: any) {
      console.error("Error adding document: ", error);
      setErrorMsg('Gagal menyimpan: Pastikan Firestore rules Anda mengizinkan write (Test Mode), atau cek console log untuk detail.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Hapus kemitraan industri ini?')) {
      setErrorMsg('');
      try {
        await deleteDoc(doc(db, 'partnerships', id));
        fetchPartnerships();
      } catch (error: any) {
        console.error("Error deleting document: ", error);
        setErrorMsg('Gagal menghapus: Periksa Firestore rules.');
      }
    }
  };

  const startEdit = (partner: Partnership) => {
    setEditingId(partner.id);
    setFormData({
      name: partner.name,
      subtitle: partner.subtitle || '',
      isPink: partner.isPink || false
    });
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setErrorMsg('');
    try {
      await updateDoc(doc(db, 'partnerships', editingId), formData);
      setEditingId(null);
      setFormData({ name: '', subtitle: '', isPink: false });
      fetchPartnerships();
    } catch (error: any) {
      console.error("Error updating document: ", error);
      setErrorMsg('Gagal mengubah data: Periksa Firestore rules.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Kemitraan Industri</h1>
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
            setFormData({ name: '', subtitle: '', isPink: false });
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
        >
          {isAdding ? <X className="-ml-1 mr-2 h-5 w-5" /> : <Plus className="-ml-1 mr-2 h-5 w-5" />}
          {isAdding ? 'Batal' : 'Tambah Mitra'}
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingId ? 'Edit Mitra Industri' : 'Tambah Mitra Industri Baru'}
          </h3>
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {errorMsg}
            </div>
          )}
          <form onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(); } : handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Mitra Terpenting (Huruf Tebal)</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                  placeholder="Misal: Martha Tilaar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subteks / Pelengkap (Opsional)</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                  placeholder="Misal: GROUP, Cosmetics"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="isPink"
                type="checkbox"
                checked={formData.isPink}
                onChange={(e) => setFormData({ ...formData, isPink: e.target.checked })}
                className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="isPink" className="ml-2 block text-sm text-gray-900">
                Gunakan Warna Pink pada Nama Mitra (sebagai Aksen Utama)
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
              >
                {editingId ? 'Simpan Perubahan' : 'Simpan Mitra'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Memuat data kemitraan...</div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {partnerships.length === 0 ? (
              <li className="p-6 text-center text-gray-500">Belum ada data kemitraan industri.</li>
            ) : (
              partnerships.map((partner) => (
                <li key={partner.id}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-lg items-center space-x-2">
                          <Handshake className="h-5 w-5 text-gray-400 mr-2" />
                          <span className={`font-serif font-bold ${partner.isPink ? 'text-pink-700' : 'text-gray-700'}`}>
                            {partner.name}
                          </span>
                          {partner.subtitle && (
                            <span className="text-xs text-pink-400 font-sans tracking-widest uppercase mt-1">
                              {partner.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0 flex space-x-2">
                      <button onClick={() => startEdit(partner)} className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDelete(partner.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
