import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [contact, setContact] = useState({
    address: 'Jl. Merak No. 1, Kec. Pekalongan Barat, Kota Pekalongan, Jawa Tengah',
    phone: '(0285) 421553',
    email: 'info@smkn1pkl.sch.id',
    mapsUrl: ''
  });
  const [social, setSocial] = useState({
    instagram: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    website: ''
  });

  useEffect(() => {
    async function fetchFooterSettings() {
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
        console.error('Error fetching footer settings:', err);
      }
    }
    fetchFooterSettings();
  }, []);

  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-primary-800">
          
          {/* Brand block */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/logo-kecantikan.png" alt="Logo" className="w-12 h-12 bg-white rounded-full p-1" />
              <div>
                <span className="font-serif text-lg font-bold tracking-tight block">
                  SMKN 1 Pekalongan
                </span>
              </div>
            </div>
            <p className="text-sm text-primary-100 leading-relaxed font-normal">
              Mencetak generasi yang unggul dalam IPTEK dan IMTAQ, berwawasan lingkungan, serta mampu bersaing di era global melalui pendidikan vokasi.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href={social.facebook || "#"} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-primary-800 hover:bg-accent hover:text-primary-900 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={social.instagram || "#"} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-primary-800 hover:bg-accent hover:text-primary-900 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={social.youtube || "#"} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-primary-800 hover:bg-accent hover:text-primary-900 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links block */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-lg tracking-wide border-b border-primary-700 pb-2 inline-block">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm text-primary-100">
              <li><Link to="/profil" className="hover:text-accent transition-colors flex items-center before:content-['›'] before:mr-2 before:text-accent">Profil Sekolah</Link></li>
              <li><Link to="/akademik" className="hover:text-accent transition-colors flex items-center before:content-['›'] before:mr-2 before:text-accent">Akademik & Kurikulum</Link></li>
              <li><Link to="/fasilitas" className="hover:text-accent transition-colors flex items-center before:content-['›'] before:mr-2 before:text-accent">Fasilitas (TEFA)</Link></li>
              <li><Link to="/pendaftaran" className="hover:text-accent transition-colors flex items-center before:content-['›'] before:mr-2 before:text-accent">Informasi SPMB</Link></li>
            </ul>
          </div>

          {/* Layanan Akademik */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-lg tracking-wide border-b border-primary-700 pb-2 inline-block">Layanan Akademik</h4>
            <ul className="space-y-2 text-sm text-primary-100">
              <li><a href="#" className="hover:text-accent transition-colors flex items-center before:content-['›'] before:mr-2 before:text-accent">Informasi Kelulusan</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center before:content-['›'] before:mr-2 before:text-accent">Daftar Ulang SPMB</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center before:content-['›'] before:mr-2 before:text-accent">Portal e-Rapor</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center before:content-['›'] before:mr-2 before:text-accent">Perpustakaan Digital</a></li>
            </ul>
          </div>

          {/* Contact block */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-lg tracking-wide border-b border-primary-700 pb-2 inline-block">Kontak Kami</h4>
            <div className="space-y-4 text-sm text-primary-100">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {contact.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>{contact.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Closing Footnote info */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-200">
          <p>© {currentYear} SMK Negeri 1 Pekalongan. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
