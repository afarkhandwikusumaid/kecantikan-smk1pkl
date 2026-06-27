import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Youtube, Sparkles, Heart } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [contact, setContact] = useState({
    address: 'Jl. Perintis Kemerdekaan No.3, Kec. Pekalongan Barat, Kota Pekalongan, Jawa Tengah 51111',
    phone: '(0285) 421553',
    email: 'kecantikan@smkn1pekl.sch.id',
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
    <footer id="kontak" className="bg-gray-950 text-gray-300 pt-16 pb-8 border-t border-pink-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-gray-800">
          
          {/* Brand block (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('beranda')}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-500 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-tight">
                  EDUSPA<span className="text-pink-500 font-sans font-light text-base ml-1">Academy</span>
                </span>
                <p className="text-xs tracking-widest text-pink-400 uppercase font-bold -mt-0.5">
                  SMK Negeri 1 Pekalongan
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Pelopor pendidikan vokasi kecantikan, esthetics, &amp; terapi spa terpercaya di Karesidenan Pekalongan. Memasangkan teknik tradisional murni warisan nusantara dengan perkembangan teknologi kosmetik &amp; salon internasional.
            </p>

            {/* Social channels */}
            <div className="flex space-x-3 pt-2">
              <a
                href={social.facebook || "https://facebook.com"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-900 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors text-gray-400"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={social.instagram || "https://instagram.com"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-900 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors text-gray-400"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={social.youtube || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-900 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors text-gray-400"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links block (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-white tracking-wide text-xs uppercase text-pink-400">Navigasi Akademik</h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'beranda', label: 'Halaman Beranda' },
                { id: 'kompetensi', label: 'Kompetensi Keahlian' },
                { id: 'akademik', label: 'Portal Akademik & Kurikulum' },
                { id: 'dokumentasi', label: 'Dokumentasi Kegiatan' },
                { id: 'konsultasi', label: 'Uji Diagnosis Kulit' },
                { id: 'karya', label: 'Portofolio Mahakarya' },
                { id: 'fasilitas', label: 'Fasilitas Lab Vokasi' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate(link.id);
                    }}
                    className="hover:text-pink-400 hover:underline transition-all text-left text-gray-400 cursor-pointer"
                  >
                    • {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact block (5 cols with real address & dynamic maps iframe) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif font-bold text-white tracking-wide text-xs uppercase text-pink-400">Hubungi Eduspa &amp; Sekolah</h4>
            
            <div className="space-y-3 text-xs text-gray-450">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 leading-relaxed font-normal">
                  {contact.address}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-pink-500 shrink-0" />
                  <span className="font-mono text-gray-400">{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-pink-500 shrink-0" />
                  <span className="text-gray-400 truncate">{contact.email}</span>
                </div>
              </div>

              {/* Lab hours */}
              <div className="flex items-start space-x-2 pt-2 border-t border-gray-900">
                <Clock className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-gray-200">Jam Operasional Kompetensi Keahlian:</h5>
                  <p className="text-base text-gray-400 mt-0.5">Senin - Jumat: Pukul 07.00 - 16.00 WIB (KBM &amp; Layanan Konsultasi)</p>
                  <p className="text-sm text-pink-400 font-medium">Sabtu &amp; Minggu: Libur (Hanya melayani event/agenda khusus PPDB)</p>
                </div>
              </div>
            </div>

            {/* Injected Gorgeous Mini maps coordinate */}
            <div className="rounded-xl overflow-hidden h-28 border border-gray-800 relative shadow-inner">
              <iframe
                title="Peta SMK Negeri 1 Pekalongan"
                className="w-full h-full grayscale opacity-70 contrast-125 filter pointer-events-none"
                src={contact.mapsUrl || "https://maps.google.com/maps?q=SMK%20Negeri%201%20Pekalongan&t=&z=14&ie=UTF8&iwloc=&output=embed"}
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
              />
              <div className="absolute inset-0 hover:bg-transparent transition-all pointer-none" />
            </div>
          </div>

        </div>

        {/* Closing Footnote info */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} Jurusan Kecantikan dan Spa — SMK Negeri 1 Pekalongan. All Rights Reserved.</p>
          <div className="flex items-center space-x-1.5 font-medium text-gray-400">
            <span>Didesain khusus selaras standar</span>
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            <span>Pendidikan Hebat Jawa Tengah</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
