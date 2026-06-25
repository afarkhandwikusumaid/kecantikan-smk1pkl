import React, { useState } from 'react';
import { Save, Phone, Mail, MapPin, Instagram, Facebook, Youtube, Globe } from 'lucide-react';

interface ContactSettings { address: string; phone: string; email: string; mapsUrl: string; }
interface SocialSettings { instagram: string; facebook: string; youtube: string; tiktok: string; website: string; }

const defaultContact: ContactSettings = {
  address: 'Jl. Landungsari No. 2, Pekalongan, Jawa Tengah',
  phone: '+62 823-2898-1111',
  email: 'kecantikan@smkn1pekalongan.sch.id',
  mapsUrl: '',
};

const defaultSocial: SocialSettings = {
  instagram: '@kecantikan_smk1pkl',
  facebook: 'Kecantikan SMKN 1 Pekalongan',
  youtube: 'Kecantikan SMKN 1 Pekalongan Official',
  tiktok: '@kecantikan_smk1pkl',
  website: 'https://smkn1pekalongan.sch.id',
};

export default function SettingsManager() {
  const [contact, setContact] = useState<ContactSettings>(defaultContact);
  const [social, setSocial] = useState<SocialSettings>(defaultSocial);
  const [savedContact, setSavedContact] = useState(false);
  const [savedSocial, setSavedSocial] = useState(false);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedContact(true);
    setTimeout(() => setSavedContact(false), 2500);
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSocial(true);
    setTimeout(() => setSavedSocial(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Pengaturan Web</h1>
        <p className="text-sm text-slate-500 mt-0.5">Kelola informasi kontak dan tautan media sosial yang tampil di website</p>
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
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                placeholder="Alamat lengkap sekolah..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" /> Nomor Telepon
                </label>
                <input type="text" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="+62 xxx-xxxx-xxxx" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" /> Email Jurusan
                </label>
                <input type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="email@sekolah.sch.id" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" /> URL Google Maps Embed
              </label>
              <input type="text" value={contact.mapsUrl} onChange={e => setContact({ ...contact, mapsUrl: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="https://maps.google.com/embed?..." />
            </div>
            <div className="flex justify-end">
              <button type="submit"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all ${savedContact ? 'bg-green-500 shadow-green-200' : 'shadow-pink-200 hover:scale-105'}`}
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
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="@username_instagram" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-600" /> Facebook
                </label>
                <input type="text" value={social.facebook} onChange={e => setSocial({ ...social, facebook: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="Nama halaman Facebook" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-red-600" /> YouTube
                </label>
                <input type="text" value={social.youtube} onChange={e => setSocial({ ...social, youtube: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="URL Channel YouTube" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <span className="w-4 h-4 text-slate-700 font-bold text-xs flex items-center justify-center">TT</span> TikTok
                </label>
                <input type="text" value={social.tiktok} onChange={e => setSocial({ ...social, tiktok: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="@username_tiktok" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-500" /> Website Sekolah
                </label>
                <input type="url" value={social.website} onChange={e => setSocial({ ...social, website: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="https://smkn1pekalongan.sch.id" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg transition-all ${savedSocial ? 'bg-green-500 shadow-green-200' : 'shadow-pink-200 hover:scale-105'}`}
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
