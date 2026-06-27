import React, { useState, useEffect } from 'react';
import { Save, Phone, Mail, MapPin, Instagram, Facebook, Youtube, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ContactSettings { address: string; phone: string; email: string; mapsUrl: string; }
interface SocialSettings { instagram: string; facebook: string; youtube: string; tiktok: string; website: string; }

export default function SettingsManager() {
  const [contact, setContact] = useState<ContactSettings>({ address: '', phone: '', email: '', mapsUrl: '' });
  const [social, setSocial] = useState<SocialSettings>({ instagram: '', facebook: '', youtube: '', tiktok: '', website: '' });
  
  const [loading, setLoading] = useState(true);
  const [savedContact, setSavedContact] = useState(false);
  const [savedSocial, setSavedSocial] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data: contactData } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'contact')
          .single();
        if (contactData && contactData.value) {
          setContact(contactData.value);
        }

        const { data: socialData } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'social')
          .single();
        if (socialData && socialData.value) {
          setSocial(socialData.value);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'contact',
          value: contact
        });
      if (error) throw error;
      setSavedContact(true);
      setTimeout(() => setSavedContact(false), 2500);
    } catch (err: any) {
      alert('Gagal menyimpan kontak: ' + err.message);
    }
  };

  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'social',
          value: social
        });
      if (error) throw error;
      setSavedSocial(true);
      setTimeout(() => setSavedSocial(false), 2500);
    } catch (err: any) {
      alert('Gagal menyimpan media sosial: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Pengaturan Web</h1>
        <p className="text-sm text-slate-500 mt-0.5">Kelola informasi umum yang tampil di website (Dinamis Supabase)</p>
      </div>

      <div className="space-y-6">
        {/* Kontak Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fce7f3, #fdf2f8)' }}>
              <Phone className="w-4 h-4 text-pink-600" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">Informasi Kontak</h2>
              <p className="text-xs text-slate-500">Tampil di footer dan halaman kontak website</p>
            </div>
          </div>
          <form onSubmit={handleSaveContact} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" /> Alamat Sekolah
              </label>
              <textarea rows={2} value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none bg-white text-slate-700"
                placeholder="Alamat lengkap sekolah..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" /> Nomor Telepon / WA
                </label>
                <input type="text" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                  placeholder="+62 xxx-xxxx-xxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" /> Email Jurusan
                </label>
                <input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                  placeholder="email@sekolah.sch.id" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" /> URL Google Maps Embed
              </label>
              <input type="text" value={contact.mapsUrl} onChange={e => setContact({ ...contact, mapsUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                placeholder="https://maps.google.com/embed?..." />
            </div>
            <div className="flex justify-end">
              <button type="submit"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all ${savedContact ? 'bg-green-500 shadow-green-200' : 'shadow-pink-200 hover:scale-105 active:scale-95'}`}
                style={!savedContact ? { background: 'linear-gradient(135deg, #ec4899, #be185d)' } : {}}>
                <Save className="w-4 h-4" />
                {savedContact ? 'Tersimpan!' : 'Simpan Kontak'}
              </button>
            </div>
          </form>
        </div>

        {/* Sosial Media Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #fce7f3, #fdf2f8)' }}>
              <Instagram className="w-4 h-4 text-pink-600" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">Media Sosial</h2>
              <p className="text-xs text-slate-500">Tautan sosmed yang ditampilkan di website</p>
            </div>
          </div>
          <form onSubmit={handleSaveSocial} className="p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-rose-500" /> Instagram
                </label>
                <input type="text" value={social.instagram} onChange={e => setSocial({ ...social, instagram: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                  placeholder="@username_instagram" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-600" /> Facebook
                </label>
                <input type="text" value={social.facebook} onChange={e => setSocial({ ...social, facebook: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                  placeholder="Nama halaman Facebook" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-red-600" /> YouTube
                </label>
                <input type="text" value={social.youtube} onChange={e => setSocial({ ...social, youtube: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                  placeholder="URL Channel YouTube" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <span className="w-4 h-4 text-slate-700 font-bold text-xs flex items-center justify-center">TT</span> TikTok
                </label>
                <input type="text" value={social.tiktok} onChange={e => setSocial({ ...social, tiktok: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                  placeholder="@username_tiktok" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-500" /> Website Sekolah
                </label>
                <input type="url" value={social.website} onChange={e => setSocial({ ...social, website: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-black"
                  placeholder="https://smkn1pekalongan.sch.id" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all ${savedSocial ? 'bg-green-500 shadow-green-200' : 'shadow-pink-200 hover:scale-105 active:scale-95'}`}
                style={!savedSocial ? { background: 'linear-gradient(135deg, #ec4899, #be185d)' } : {}}>
                <Save className="w-4 h-4" />
                {savedSocial ? 'Tersimpan!' : 'Simpan Sosmed'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
