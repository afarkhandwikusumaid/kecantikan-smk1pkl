import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, BookOpen } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Curriculum {
  id: string;
  name: string;
  description: string;
  semester: number;
}

export default function CurriculumManager() {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    semester: 1
  });

  const fetchCurriculum = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('curriculum')
        .select('*')
        .order('semester', { ascending: true })
        .order('name', { ascending: true });
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
          description: formData.description,
          semester: formData.semester
        });
      if (error) throw error;
      setFormData({ name: '', description: '', semester: 1 });
      setIsAdding(false);
      fetchCurriculum();
    } catch (err: any) {
      alert('Gagal menambahkan pelajaran: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus mata pelajaran ini?')) {
      try {
        const { error } = await supabase
          .from('curriculum')
          .delete()
          .eq('id', id);
        if (error) throw error;
        fetchCurriculum();
      } catch (err: any) {
        alert('Gagal menghapus pelajaran: ' + err.message);
      }
    }
  };

  const startEdit = (curriculum: Curriculum) => {
    setEditingId(curriculum.id);
    setFormData({
      name: curriculum.name,
      description: curriculum.description,
      semester: curriculum.semester
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
          description: formData.description,
          semester: formData.semester
        })
        .eq('id', editingId);
      if (error) throw error;
      setEditingId(null);
      setFormData({ name: '', description: '', semester: 1 });
      setIsAdding(false);
      fetchCurriculum();
    } catch (err: any) {
      alert('Gagal menyimpan perubahan: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Manajemen Kurikulum</h1>
        <button
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingId(null);
            setFormData({ name: '', description: '', semester: 1 });
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
              <label className="block text-sm font-medium text-gray-700">Semester</label>
              <input
                type="number"
                min="1"
                max="6"
                required
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi Silabus</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm border p-2 bg-white text-black"
                placeholder="Deskripsi materi yang diajarkan..."
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700"
              >
                {editingId ? 'Simpan Perubahan' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-gray-500">Memuat data kurikulum...</div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {curriculums.length === 0 ? (
              <li className="p-6 text-center text-gray-500">Belum ada data mata pelajaran.</li>
            ) : (
              curriculums.map((curriculum) => (
                <li key={curriculum.id}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-pink-600 truncate">{curriculum.name}</p>
                          <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                            (Semester {curriculum.semester})
                          </p>
                        </div>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <BookOpen className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <p className="truncate max-w-md">{curriculum.description}</p>
                          </div>
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
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
