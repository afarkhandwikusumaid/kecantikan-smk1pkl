import React, { useState, useEffect } from 'react';
import {
  Compass,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Award,
  Building,
  FileSpreadsheet,
  Scale,
  ShieldCheck,
  Target,
  BookOpen,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import {
  curriculumFoundations,
  legalBases,
  curriculumSyllabus
} from '../../data';
import { supabase } from '../../lib/supabase';

export default function Akademik() {
  const [selectedClassTab, setSelectedClassTab] = useState<'all' | 'X' | 'XI' | 'XII'>('all');
  const [visiText, setVisiText] = useState("");
  const [misiList, setMisiList] = useState<string[]>([]);
  const [syllabus, setSyllabus] = useState<{ X: any[]; XI: any[]; XII: any[] }>({ X: [], XI: [], XII: [] });
  const [careerList, setCareerList] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch Career Profiles
        const { data: careerData } = await supabase.from('site_settings').select('value').eq('key', 'career_profiles').single();
        if (careerData && careerData.value) setCareerList(careerData.value as any[]);

        // 1. Fetch Visi Misi
        const { data: settingsData } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'visi_misi')
          .single();
        if (settingsData && settingsData.value) {
          if (settingsData.value.visi) setVisiText(settingsData.value.visi);
          if (Array.isArray(settingsData.value.misi)) {
            setMisiList(settingsData.value.misi.map((m: any) => {
              if (typeof m === 'string') return m;
              return m.title ? `${m.title}: ${m.desc}` : (m.desc || '');
            }));
          }
        }

        // 2. Fetch Curriculum
        const { data: currData } = await supabase
          .from('curriculum')
          .select('*')
          .order('semester', { ascending: true })
          .order('name', { ascending: true });

        if (currData && currData.length > 0) {
          const X: any[] = [];
          const XI: any[] = [];
          const XII: any[] = [];

          currData.forEach((item) => {
            const mapped = {
              name: item.name,
              hrs: item.credits || '144 JP',
              type: item.type || 'Umum',
            };

            if (item.semester === 1 || item.semester === 2 || item.semester === 10) {
              X.push(mapped);
            } else if (item.semester === 3 || item.semester === 4 || item.semester === 11) {
              XI.push(mapped);
            } else if (item.semester === 5 || item.semester === 6 || item.semester === 12) {
              XII.push(mapped);
            }
          });

          setSyllabus({ X, XI, XII });
        }
      } catch (err) {
        console.error('Error fetching academic data:', err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#fcf8fa] min-h-screen pt-0 pb-16 animate-fade-in font-sans">

      {/* Premium Academic Hero Banner */}
      <div className="bg-gradient-to-b from-pink-50 to-white text-gray-900 pt-32 pb-20 px-4 relative overflow-hidden mb-12 shadow-sm border-b border-pink-100">
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-pink-300/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-700 text-sm font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest border border-pink-200">
            <GraduationCap className="w-4 h-4 text-pink-600 animate-pulse" />
            <span>PORTAL AKADEMIK RESMI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-gray-900">
            Struktur Kurikulum &amp; Landasan Pendidikan
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed font-light">
            Sistem Informasi Layanan Kurikulum Kompetensi Keahlian Tata Kecantikan Kulit dan Spa SMK Negeri 1 Pekalongan. Diselaraskan secara utuh dengan Standar Industri Vokasi Nasional (DUDI) &amp; BNSP.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold pt-2 text-gray-500">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-pink-500" />
              <span>Sistem SKS Kurikulum Merdeka</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-pink-500" />
              <span>Terakreditasi A (Unggul)</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center space-x-1.5">
              <Building className="w-4 h-4 text-pink-500" />
              <span>Kurikulum Selaras Industri (DUDI)</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">

        {/* LANDASAN KURIKULUM */}
        <section className="bg-white border border-pink-100/70 rounded-[2.5rem] p-8 sm:p-12 shadow-xs space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 bg-pink-50 text-pink-600 w-fit px-4 py-1.5 rounded-lg text-sm font-extrabold uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Uraian Filsafat Pendidikan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-950">
              Landasan Kurikulum Kecantikan &amp; Spa
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl">
              Pedoman akademik disusun secara seimbang untuk mendidik keterampilan raga (hard skills) dan etos profesi pelayanan (soft hospitality skills).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {curriculumFoundations.map((foundation, index) => (
              <div key={foundation.id} className="flex items-start space-x-3.5 bg-gradient-to-r from-pink-50/15 to-pink-50/2 p-5 rounded-2xl border border-pink-100/30">
                <div className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs mt-0.5">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{foundation.title}</h4>
                  <p className="text-base text-gray-500 leading-normal">{foundation.desc}</p>
                  <p className="text-sm text-pink-600 font-semibold mt-1 font-mono uppercase bg-pink-50/50 px-2 py-0.5 rounded w-fit">
                    Imp: {foundation.implementationDetail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-pink-50 flex items-center justify-between text-sm text-gray-400 font-medium font-mono">
            <span>* FOKUS AKADEMIK VOKASI</span>
            <span>SMK PUSAT KEUNGGULAN (SMK-PK)</span>
          </div>
        </section>

        {/* DASAR HUKUM */}
        <section className="bg-[#faf5f7]/60 border border-pink-100/80 rounded-[2.5rem] p-8 sm:p-12 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 bg-gray-900 text-white w-fit px-4 py-1.5 rounded-lg text-sm font-extrabold uppercase tracking-widest font-mono">
              <Scale className="w-4 h-4 text-pink-400" />
              <span>LEGALITAS KURIKULUM</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-950">
              Dasar Hukum Kurikulum Merdeka
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-3xl">
              Penyelenggaraan proses belajar mengajar pada konsentrasi keahlian kecantikan didasarkan pada regulasi resmi kementerian Republik Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {legalBases.map((lb) => (
              <div key={lb.id} className="bg-white border border-pink-100/50 p-5 rounded-2xl shadow-xs hover:border-pink-300 transition-colors flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm font-bold text-pink-600 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    <span>{lb.source} ({lb.year})</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{lb.regulationNo}</h4>
                  <p className="text-base font-semibold text-gray-700 mt-0.5">{lb.title}</p>
                  <p className="text-base text-gray-500 leading-normal mt-1">{lb.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-pink-100/50 flex justify-between items-center text-sm text-gray-400">
            <span className="font-bold">Standar Pemerintah RI</span>
            <span>Dokumen Negara Resmi</span>
          </div>
        </section>

        {/* VISI MISI & KREDENSIAL MUTU ROW */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">

          {/* Visi Misi Card */}
          <div className="md:col-span-8 bg-white rounded-[2rem] border border-pink-100 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 text-pink-600 pb-3 border-b border-pink-50">
              <Compass className="w-5 h-5 shrink-0" />
              <h3 className="font-serif text-lg font-bold text-gray-900">Visi &amp; Misi</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-pink-600 uppercase tracking-widest font-mono">VISI JURUSAN</h4>
                <p className="text-xs sm:text-sm italic text-gray-700 leading-relaxed bg-pink-50/30 p-4 rounded-2xl border border-pink-100/50 font-serif">
                  "{visiText}"
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-pink-600 uppercase tracking-widest font-mono">MISI UTAMA</h4>
                <ul className="space-y-2.5 text-xs text-gray-600 pl-3 list-decimal leading-relaxed">
                  {misiList.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Accreditation details and LSP-P1 */}
          <div className="md:col-span-4 bg-gray-950 text-white rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-sm relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
            <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-pink-400 animate-pulse" />
              <span>Kredensial Mutu</span>
            </h3>

            <div className="space-y-3 text-xs font-normal text-pink-100/95">
              <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 flex items-center space-x-4">
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center font-bold text-white shadow-xs shrink-0 text-sm">A</div>
                <div>
                  <h5 className="font-extrabold text-white text-xs">AKREDITASI BAN-PDM</h5>
                  <p className="text-sm text-pink-200 mt-0.5">Predikat Unggul (Nilai 96/100) — Diperbarui 2025</p>
                </div>
              </div>

              <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 flex items-center space-x-4">
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center font-bold text-white shadow-xs shrink-0 text-xs text-center">LSP</div>
                <div>
                  <h5 className="font-extrabold text-white text-xs">LISENSI RESMI BNSP</h5>
                  <p className="text-sm text-pink-200 mt-0.5">Penyelenggara Sertifikasi Mandiri Lisensi LSP-P1</p>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* CURRICULUM TABLES AND CONTROLS */}
        <section className="space-y-8">

          {/* Filter Swiper */}
          <div className="bg-white border border-pink-100 p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <span className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center space-x-2 pl-2">
              <FileSpreadsheet className="w-4 h-4 text-pink-500" />
              <span>Daftar Mata Pelajaran Keahlian</span>
            </span>

            <div className="flex flex-wrap gap-1">
              {(['all', 'X', 'XI', 'XII'] as const).map((lvl) => (
                <button
                  key={lvl}
                  id={`table-filter-${lvl}`}
                  onClick={() => setSelectedClassTab(lvl)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedClassTab === lvl
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'bg-transparent text-gray-600 hover:bg-pink-50/40 hover:text-pink-600'
                    }`}
                >
                  {lvl === 'all' ? 'Semua Tingkat' : `Kelas ${lvl}`}
                </button>
              ))}
            </div>
          </div>

          {/* TABLES GRID LIST */}
          <div className="space-y-10">

            {/* Table X */}
            {(selectedClassTab === 'all' || selectedClassTab === 'X') && (
              <div className="bg-white rounded-3xl border border-pink-100 shadow-xs overflow-hidden animate-fade-in">
                <div className="bg-gradient-to-r from-pink-600 to-pink-700 p-5 text-white flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold tracking-tight">Kelas X (Dasar Keahlian Estetika)</h3>
                    <p className="text-sm text-pink-100 font-medium">Beban dasar pembelajaran 512 Jam Pelajaran (JP) / Tahun</p>
                  </div>
                  <span className="text-sm bg-white text-pink-700 font-extrabold px-3 py-1 rounded-full uppercase">SEMESTER 1 &amp; 2</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-pink-50/40 border-b border-pink-100 text-gray-700 text-sm font-extrabold tracking-wider uppercase">
                        <th className="px-6 py-3.5">Mata Pelajaran</th>
                        <th className="px-6 py-3.5 text-center"> JP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-50 text-xs text-gray-700 font-medium">
                      {/* Mata Pelajaran Umum */}
                      <tr className="bg-pink-50/20">
                        <td colSpan={2} className="px-6 py-2.5 font-bold text-pink-700 uppercase tracking-wide bg-pink-50/10">
                          A. Mata Pelajaran Umum
                        </td>
                      </tr>
                      {syllabus.X.filter(item => item.type === 'Umum').length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-6 py-4 text-center text-gray-400 italic">Belum ada mata pelajaran umum</td>
                        </tr>
                      ) : (
                        syllabus.X.filter(item => item.type === 'Umum').map((item, idx) => (
                          <tr key={`umum-${idx}`} className="hover:bg-pink-50/10 transition-colors">
                            <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-center font-bold text-gray-500 whitespace-nowrap">{item.hrs}</td>
                          </tr>
                        ))
                      )}

                      {/* Mata Pelajaran Kejuruan */}
                      <tr className="bg-pink-50/20">
                        <td colSpan={2} className="px-6 py-2.5 font-bold text-pink-700 uppercase tracking-wide bg-pink-50/10">
                          B. Mata Pelajaran Kejuruan
                        </td>
                      </tr>
                      {syllabus.X.filter(item => item.type === 'Kejuruan').length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-6 py-4 text-center text-gray-400 italic">Belum ada mata pelajaran kejuruan</td>
                        </tr>
                      ) : (
                        syllabus.X.filter(item => item.type === 'Kejuruan').map((item, idx) => (
                          <tr key={`kejuruan-${idx}`} className="hover:bg-pink-50/10 transition-colors">
                            <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-center font-bold text-gray-500 whitespace-nowrap">{item.hrs}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Table XI */}
            {(selectedClassTab === 'all' || selectedClassTab === 'XI') && (
              <div className="bg-white rounded-3xl border border-pink-100 shadow-xs overflow-hidden animate-fade-in">
                <div className="bg-gradient-to-r from-purple-700 to-pink-700 p-5 text-white flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold tracking-tight">Kelas XI (Konsentrasi Menengah &amp; Spa)</h3>
                    <p className="text-sm text-pink-100 font-medium">Beban kompetensi 728 Jam Pelajaran (JP) / Tahun</p>
                  </div>
                  <span className="text-sm bg-white text-purple-700 font-extrabold px-3 py-1 rounded-full uppercase">SEMESTER 3 &amp; 4</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-purple-50/20 border-b border-pink-100 text-gray-700 text-sm font-extrabold tracking-wider uppercase">
                        <th className="px-6 py-3.5">Mata Pelajaran</th>
                        <th className="px-6 py-3.5 text-center">JP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-50 text-xs text-gray-700 font-medium">
                      {/* Mata Pelajaran Umum */}
                      <tr className="bg-purple-50/10">
                        <td colSpan={2} className="px-6 py-2.5 font-bold text-purple-700 uppercase tracking-wide bg-purple-50/5">
                          A. Mata Pelajaran Umum
                        </td>
                      </tr>
                      {syllabus.XI.filter(item => item.type === 'Umum').length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-6 py-4 text-center text-gray-400 italic">Belum ada mata pelajaran umum</td>
                        </tr>
                      ) : (
                        syllabus.XI.filter(item => item.type === 'Umum').map((item, idx) => (
                          <tr key={`umum-${idx}`} className="hover:bg-purple-50/5 transition-colors">
                            <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-center font-bold text-gray-500 whitespace-nowrap">{item.hrs}</td>
                          </tr>
                        ))
                      )}

                      {/* Mata Pelajaran Kejuruan */}
                      <tr className="bg-purple-50/10">
                        <td colSpan={2} className="px-6 py-2.5 font-bold text-purple-700 uppercase tracking-wide bg-purple-50/5">
                          B. Mata Pelajaran Kejuruan
                        </td>
                      </tr>
                      {syllabus.XI.filter(item => item.type === 'Kejuruan').length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-6 py-4 text-center text-gray-400 italic">Belum ada mata pelajaran kejuruan</td>
                        </tr>
                      ) : (
                        syllabus.XI.filter(item => item.type === 'Kejuruan').map((item, idx) => (
                          <tr key={`kejuruan-${idx}`} className="hover:bg-purple-50/5 transition-colors">
                            <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-center font-bold text-gray-500 whitespace-nowrap">{item.hrs}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Table XII */}
            {(selectedClassTab === 'all' || selectedClassTab === 'XII') && (
              <div className="bg-white rounded-3xl border border-pink-100 shadow-xs overflow-hidden animate-fade-in">
                <div className="bg-gradient-to-r from-rose-700 to-orange-600 p-5 text-white flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold tracking-tight">Kelas XII (Mahir &amp; Magang Klinik Terpadu)</h3>
                    <p className="text-sm text-pink-100 font-medium">Beban kompetensi 778 Jam Pelajaran (JP) / Tahun</p>
                  </div>
                  <span className="text-sm bg-white text-rose-700 font-extrabold px-3 py-1 rounded-full uppercase">SEMESTER 5 &amp; 6</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-orange-50/15 border-b border-pink-100 text-gray-700 text-sm font-extrabold tracking-wider uppercase">
                        <th className="px-6 py-3.5">Mata Pelajaran</th>
                        <th className="px-6 py-3.5 text-center">JP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-50 text-xs text-gray-700 font-medium">
                      {/* Mata Pelajaran Umum */}
                      <tr className="bg-orange-50/10">
                        <td colSpan={2} className="px-6 py-2.5 font-bold text-rose-700 uppercase tracking-wide bg-orange-50/5">
                          A. Mata Pelajaran Umum
                        </td>
                      </tr>
                      {syllabus.XII.filter(item => item.type === 'Umum').length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-6 py-4 text-center text-gray-400 italic">Belum ada mata pelajaran umum</td>
                        </tr>
                      ) : (
                        syllabus.XII.filter(item => item.type === 'Umum').map((item, idx) => (
                          <tr key={`umum-${idx}`} className="hover:bg-rose-50/10 transition-colors">
                            <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-center font-bold text-gray-500 whitespace-nowrap">{item.hrs}</td>
                          </tr>
                        ))
                      )}

                      {/* Mata Pelajaran Kejuruan */}
                      <tr className="bg-orange-50/10">
                        <td colSpan={2} className="px-6 py-2.5 font-bold text-rose-700 uppercase tracking-wide bg-orange-50/5">
                          B. Mata Pelajaran Kejuruan
                        </td>
                      </tr>
                      {syllabus.XII.filter(item => item.type === 'Kejuruan').length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-6 py-4 text-center text-gray-400 italic">Belum ada mata pelajaran kejuruan</td>
                        </tr>
                      ) : (
                        syllabus.XII.filter(item => item.type === 'Kejuruan').map((item, idx) => (
                          <tr key={`kejuruan-${idx}`} className="hover:bg-rose-50/10 transition-colors">
                            <td className="px-6 py-4 font-semibold text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-center font-bold text-gray-500 whitespace-nowrap">{item.hrs}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </section>

        {/* Career Opportunities / Graduate Profiles (Full width) */}
        <section className="bg-white rounded-[2.5rem] border border-pink-100 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 text-pink-600 border-b border-pink-50 pb-4">
            <Briefcase className="w-5 h-5 shrink-0" />
            <div>
              <h3 className="font-serif font-bold text-gray-950 text-base sm:text-lg">Relevansi Industri &amp; Peluang Karir Lulusan</h3>
              <p className="text-base text-gray-400 font-medium">Berdasarkan data penelusuran tamatan BKK SMK Negeri 1 Pekalongan</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerList.map((car, idx) => (
              <div
                key={idx}
                className="bg-[#faf6f8]/70 border border-pink-100 p-5 rounded-2xl space-y-3 hover:border-pink-300 hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {car.tags.map((tg, tIdx) => (
                      <span key={tIdx} className="text-xs bg-pink-100/50 text-pink-600 font-bold px-2 py-0.5 rounded">
                        {tg}
                      </span>
                    ))}
                  </div>
                  <h4 className="font-serif font-bold text-gray-900 text-sm sm:text-base leading-snug">{car.title}</h4>
                  <p className="text-base text-gray-500 leading-relaxed">{car.desc}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-pink-100">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div>
                      <span className="font-bold text-gray-400 uppercase block text-sm">ESTIMASI STIPEND/GAJI AWAL</span>
                      <span className="font-extrabold text-pink-600 text-xs">{car.salary}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-400 uppercase block text-sm">PROYEKSI KEBUTUHAN</span>
                      <span className="font-extrabold text-gray-900 text-xs">{car.growth}</span>
                    </div>
                  </div>

                  <div className="pt-1.5 flex flex-wrap items-center gap-1">
                    <span className="text-sm text-gray-400 uppercase font-bold mr-1">Rujukan Penempatan:</span>
                    {car.industrialPartners.map((partner, pIdx) => (
                      <span key={pIdx} className="text-xs text-gray-700 bg-white border border-gray-100 font-bold px-1.5 py-0.5 rounded inline-flex items-center space-x-1 shadow-2xs">
                        <span>{partner}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
