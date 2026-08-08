import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface Curriculum {
  id: string;
  name: string;
  credits: string;
  semester: number;
  type: string;
}

const getKelasLabel = (s: number) => {
  if (s === 1 || s === 2 || s === 10) return 'Kelas X';
  if (s === 3 || s === 4 || s === 11) return 'Kelas XI';
  if (s === 5 || s === 6 || s === 12) return 'Kelas XII';
  return `Kelas ${s}`;
};

export default function CurriculumManager() {
  const { showConfirm, showAlert } = useAdminFeedback();

  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    credits: '',
    semester: 10,
    type: 'Umum'
  });

  const fetchCurriculum = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('curriculum')
        .select('*')
        .order('semester', { ascending: true })
        .order('created_at', { ascending: true });
      if (error) throw error;
      setCurriculums(data || []);
    } catch (err: any) {
      console.error('Error fetching curriculum:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurriculum();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('curriculum')
        .insert({
          name: formData.name,
          credits: formData.credits,
          semester: formData.semester,
          type: formData.type
        });
      if (error) throw error;
      setFormData({ name: '', credits: '', semester: 10, type: 'Umum' });
      setIsAdding(false);
      fetchCurriculum();
    } catch (err: any) {
      showAlert('Gagal menambahkan pelajaran: ' + err.message, 'error');
    }
  };

  const handleDelete = (id: string) => {
    showConfirm('Apakah Anda yakin ingin menghapus mata pelajaran ini?', async () => {
      try {
        const { error } = await supabase
          .from('curriculum')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchCurriculum();
        showAlert('Mata pelajaran berhasil dihapus', 'success');
      } catch (err: any) {
        showAlert('Gagal menghapus pelajaran: ' + err.message, 'error');
      }
    });
  };

  const startEdit = (curriculum: Curriculum) => {
    setEditingId(curriculum.id);
    setFormData({
      name: curriculum.name,
      credits: curriculum.credits || '',
      semester: curriculum.semester,
      type: curriculum.type || 'Umum'
    });
    setIsAdding(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      const { error } = await supabase
        .from('curriculum')
        .update({
          name: formData.name,
          credits: formData.credits,
          semester: formData.semester,
          type: formData.type
        })
        .eq('id', editingId);
      if (error) throw error;
      setEditingId(null);
      setFormData({ name: '', credits: '', semester: 10, type: 'Umum' });
      setIsAdding(false);
      fetchCurriculum();
    } catch (err: any) {
      showAlert('Gagal menyimpan perubahan: ' + err.message, 'error');
    }
  };

  const kelasX = curriculums.filter(c => c.semester === 1 || c.semester === 2 || c.semester === 10);
  const kelasXI = curriculums.filter(c => c.semester === 3 || c.semester === 4 || c.semester === 11);
  const kelasXII = curriculums.filter(c => c.semester === 5 || c.semester === 6 || c.semester === 12);
  const otherKelas = curriculums.filter(c => 
    ![1, 2, 10, 3, 4, 11, 5, 6, 12].includes(c.semester)
  );

  const renderItem = (curriculum: Curriculum) => (
    <li key={curriculum.id}>
      <div className="px-4 py-4 flex items-center sm:px-6">
        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="truncate">
            <div className="flex text-sm items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                curriculum.type === 'Kejuruan' 
                  ? 'bg-blue-50 text-blue-700 border border-blue-150' 
                  : 'bg-pink-50 text-pink-700 border border-pink-150'
              }`}>
                {curriculum.type === 'Kejuruan' ? 'Kejuruan' : 'Umum'}
              </span>
              <p className="font-medium text-pink-600 truncate">{curriculum.name}</p>
              <p className="ml-2 flex-shrink-0 font-normal text-gray-500 text-xs border-l border-gray-300 pl-2">
                {curriculum.credits || '-'}
              </p>
            </div>
          </div>
        </div>
        <div className="ml-5 flex-shrink-0 flex space-x-2">
          <button onClick={() => startEdit(curriculum)} className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
            <Edit2 className="h-5 w-5" />
          </button>
          <button onClick={() => handleDelete(curriculum.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </li>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Manajemen Mata Pelajaran</h1>
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
            setFormData({ name: '', credits: '', semester: 10, type: 'Umum' });
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
        >
          {isAdding ? <X className="-ml-1 mr-2 h-5 w-5" /> : <Plus className="-ml-1 mr-2 h-5 w-5" />}
          {isAdding && !editingId ? 'Batal' : 'Tambah Mapel'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingId ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
          </h3>
          <form onSubmit={editingId ? handleUpdate : handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Mata Pelajaran</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                  placeholder="Misal: Perawatan Kulit Wajah"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kategori Pelajaran</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                >
                  <option value="Umum">Mata Pelajaran Umum</option>
                  <option value="Kejuruan">Mata Pelajaran Kejuruan</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tingkat Kelas</label>
                <select
                  required
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                >
                  <option value={10}>Kelas X (10)</option>
                  <option value={11}>Kelas XI (11)</option>
                  <option value={12}>Kelas XII (12)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Beban / SKS / JP</label>
                <input
                  type="text"
                  required
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                  placeholder="Misal: 4 SKS / 144 JP"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
              >
                {editingId ? 'Simpan Perubahan' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Memuat data kurikulum...</div>
      ) : curriculums.length === 0 ? (
        <div className="bg-white shadow p-6 rounded-xl border border-gray-200 text-center text-gray-500">
          Belum ada data mata pelajaran.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Section Kelas X */}
          {kelasX.length > 0 && (
            <div className="bg-white shadow overflow-hidden sm:rounded-xl border border-gray-200">
              <div className="bg-pink-50/40 px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-bold text-pink-700">Kelas X</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {kelasX.map((curriculum) => renderItem(curriculum))}
              </ul>
            </div>
          )}

          {/* Section Kelas XI */}
          {kelasXI.length > 0 && (
            <div className="bg-white shadow overflow-hidden sm:rounded-xl border border-gray-200">
              <div className="bg-purple-50/20 px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-bold text-purple-700">Kelas XI</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {kelasXI.map((curriculum) => renderItem(curriculum))}
              </ul>
            </div>
          )}

          {/* Section Kelas XII */}
          {kelasXII.length > 0 && (
            <div className="bg-white shadow overflow-hidden sm:rounded-xl border border-gray-200">
              <div className="bg-orange-50/15 px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-bold text-rose-700">Kelas XII</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {kelasXII.map((curriculum) => renderItem(curriculum))}
              </ul>
            </div>
          )}

          {/* Section Other/Uncategorized */}
          {otherKelas.length > 0 && (
            <div className="bg-white shadow overflow-hidden sm:rounded-xl border border-gray-200">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-700">Kelas Lainnya</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {otherKelas.map((curriculum) => renderItem(curriculum))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
