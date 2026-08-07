import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, X, HelpCircle, Save } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAdminFeedback } from '../../../components/admin/context/AdminFeedbackContext';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}



const emptyForm: FAQ = { id: '', question: '', answer: '' };

export default function FAQManager() {
  const { showConfirm, showAlert } = useAdminFeedback();

  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FAQ>(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'faqs')
        .single();
      
      if (data && data.value) {
        setFaqs(data.value as FAQ[]);
      } else { setFaqs([]); }
    } catch (err: any) {
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const saveToSupabase = async (newFaqs: FAQ[]) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'faqs', value: newFaqs });
      if (error) throw error;
      setFaqs(newFaqs);
    } catch (error: any) {
      showAlert('Gagal menyimpan FAQ: ' + error.message, 'error');
    } finally {
      setSaving(false);
      setShowModal(false);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, id: Date.now().toString() });
    setShowModal(true);
  };

  const openEdit = (f: FAQ) => {
    setEditingId(f.id);
    setFormData(f);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: FAQ[];
    if (editingId) {
      updated = faqs.map(f => f.id === editingId ? formData : f);
    } else {
      updated = [...faqs, formData];
    }
    saveToSupabase(updated);
  };

  const handleDelete = (id: string) => {
    showConfirm('Hapus FAQ ini?', () => {
      const updated = faqs.filter(f => f.id !== id);
      saveToSupabase(updated);
      showAlert('FAQ berhasil dihapus', 'success');
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tanya Jawab (FAQ)</h1>
          <p className="text-sm text-slate-500 mt-0.5">Kelola pertanyaan sering ditanyakan di halaman Beranda</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
          style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
          <Plus className="w-4 h-4" /> Tambah FAQ
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Pertanyaan</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Jawaban</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={3} className="p-8 text-center text-slate-400">Memuat...</td></tr>
              ) : faqs.length === 0 ? (
                <tr><td colSpan={3} className="p-8 text-center text-slate-400">Tidak ada FAQ.</td></tr>
              ) : (
                faqs.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-800 align-top w-1/3">{f.question}</td>
                    <td className="px-5 py-4 text-slate-500 leading-relaxed max-w-sm align-top">{f.answer}</td>
                    <td className="px-5 py-4 text-right align-top">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(f)} className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(f.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">{editingId ? 'Edit FAQ' : 'Tambah FAQ Baru'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Pertanyaan</label>
                <input type="text" required value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300" placeholder="Ketik pertanyaan klien di sini..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Jawaban</label>
                <textarea required rows={4} value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none" placeholder="Berikan jawaban yang jelas..." />
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50">Batal</button>
                <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg shadow-pink-200 disabled:opacity-50 flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
                  <Save className="w-4 h-4" /> {editingId ? 'Simpan Perubahan' : 'Tambah FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
