import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart, RefreshCw, Star, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function Konsultasi() {
  const [skinType, setSkinType] = useState<string>('dry');
  const [skinConcern, setSkinConcern] = useState<string>('dehydration');
  const [aestheticGoal, setAestheticGoal] = useState<string>('relaxation');
  const [diagnosticResult, setDiagnosticResult] = useState<any | null>(null);

  const handleRunDiagnostic = () => {
    // Generate calculated diagnostic recommendation
    let recommendedTrack = "Perawatan Kulit & Estetika (Skin Care Track)";
    let recommendedLab = "Laboratorium Skin Care Terpadu";
    let activeEduspaTreatment = "Dermal Ultra-Rejuvenation Facial";
    let estimatedHours = 120;
    let studentTeacherFocus = "Pemberian serum kelembapan mendalam via Ultrasound + masker peel-off emas bergizi tinggi.";
    let customizedRegimen = [
      "Bersihkan wajah menggunakan susu pembersih mawar non-alkohol",
      "Gunakan toner hidrasi chamomile di tepuk-tepuk perlahan",
      "Aplikasikan serum hyaluronic acid saat kulit setengah basah",
      "Kunci dengan pelembab ceramide berkekuatan tinggi",
      "Gunakan tabir surya SPF 30+ setiap pagi hari"
    ];

    if (skinType === 'oily' || skinConcern === 'acne') {
      recommendedTrack = "Estetika Medis & Cosmetology (Acne Control)";
      recommendedLab = "Laboratorium Elektroterapi Kulit";
      activeEduspaTreatment = "Ozone Cleanse & Acne Therapy";
      estimatedHours = 145;
      studentTeacherFocus = "Proses desinfeksi bakteri p.acnes dengan Sinar High Frequency dan terapi uap Ozone wajah.";
      customizedRegimen = [
        "Cuci muka dengan salicylic acid facial cleanser harian",
        "Gunakan astringent toner penyegar mentimun/tea tree",
        "Gunakan hydrating gel berbahan aloe vera (hindari krim tebal)",
        "Oleskan spot treatment gel jerawat di malam hari",
        "Gunakan tabir surya fisik ringan non-comedogenic"
      ];
    } else if (aestheticGoal === 'styling') {
      recommendedTrack = "Tata Kecantikan Rambut Kreatif (Hair Styling Track)";
      recommendedLab = "Laboratorium Hairdressing & Sanggul";
      activeEduspaTreatment = "Pivot Point Creative Haircut & Tone";
      estimatedHours = 180;
      studentTeacherFocus = "Pola potongan simetris sesuai kontur tengkorak wajah dipadukan dengan pewarnaan keratin.";
      customizedRegimen = [
        "Keramas menggunakan shampo keratin penahan rontok",
        "Wajib aplikasikan kondisioner dari batang hingga ujung rambut",
        "Semprotkan heat protectant serum sebelum pengeringan hair dryer",
        "Hair tonic akar rambut ginseng setiap malam",
        "Sisir bergigi jarang untuk mengurangi gesekan statis"
      ];
    } else if (aestheticGoal === 'relaxation') {
      recommendedTrack = "Terapi Body Spa & Nusantara Wellness (Spa Track)";
      recommendedLab = "Laboratorium Royal Javanese Spa";
      activeEduspaTreatment = "Keraton Royal Javanese Body Massage";
      estimatedHours = 210;
      studentTeacherFocus = "Pengembangan otot rileks lewat pijatan efleurage hangat didukung scrub boreh/mangir rempah kuning.";
      customizedRegimen = [
        "Rendam kaki di air hangat garam lavender mandiri di rumah",
        "Scrub tubuh seminggu sekali dengan lulur beras kencur alami",
        "Minum ramuan jamu kunyit asam hangat usai beraktivitas padat",
        "Oleskan minyak kelapa murni di kulit yang bersisik kering",
        "Gunakan teknik pernafasan dalam saat memijat area pundak"
      ];
    }

    setDiagnosticResult({
      recommendedTrack,
      recommendedLab,
      activeEduspaTreatment,
      estimatedHours,
      studentTeacherFocus,
      customizedRegimen
    });
  };

  return (
    <section id="konsultasi" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.2em] font-extrabold text-pink-600 uppercase">
            AESTHETIC DIAGNOSTIC CALCULATOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
            Konsultasi Pintar &amp; <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">Rekomendasi Terapi</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 pt-3">
            Gunakan kalkulator kecantikan pintar kami untuk mendapatkan analisis regimen dasar mandiri dan temukan hubungan materi kurikulum yang dipelajari siswi kami di laboratorium.
          </p>
        </div>

        {/* Diagnostic Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Questionnaire (5 cols) */}
          <div className="lg:col-span-5 bg-pink-50/30 border border-pink-100 p-6 sm:p-8 rounded-[2rem] flex flex-col justify-between shadow-sm animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-pink-100 pb-3">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <h4 className="font-serif text-lg font-bold text-gray-900">Kuesioner Singkat</h4>
              </div>

              {/* Skin Type selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
                  1. Bagaimana Kondisi Kulit Anda?
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 'dry', label: 'Kering & Bersisik' },
                    { val: 'oily', label: 'Berminyak & Mengilap' },
                    { val: 'combination', label: 'Kombinasi Zona T' },
                    { val: 'sensitive', label: 'Sensitif' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      id={`skin-type-${opt.val}`}
                      type="button"
                      onClick={() => { setSkinType(opt.val); setDiagnosticResult(null); }}
                      className={`p-3 text-left rounded-2xl border transition-all duration-300 font-bold ${
                        skinType === opt.val
                          ? 'border-pink-500 bg-pink-500 text-white shadow-sm'
                          : 'border-pink-100 bg-white text-gray-700 hover:bg-pink-50/50 hover:border-pink-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Concern Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
                  2. Apa Keluhan Kulit Utama Anda?
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 'dehydration', label: 'Dehidrasi / Kusam' },
                    { val: 'acne', label: 'Jerawat / Komedo' },
                    { val: 'aging', label: 'Kerutan (Aging)' },
                    { val: 'darkspots', label: 'Noda Hitam' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      id={`skin-concern-${opt.val}`}
                      type="button"
                      onClick={() => { setSkinConcern(opt.val); setDiagnosticResult(null); }}
                      className={`p-3 text-left rounded-2xl border transition-all duration-300 font-bold ${
                        skinConcern === opt.val
                          ? 'border-pink-500 bg-pink-500 text-white shadow-sm'
                          : 'border-pink-100 bg-white text-gray-700 hover:bg-pink-50/50 hover:border-pink-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair / Spa Ambition */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-800">
                  3. Apa Tujuan Perawatan Anda?
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { val: 'relaxation', label: 'Rileksasi Spa' },
                    { val: 'glowing', label: 'Cerah Glowing' },
                    { val: 'styling', label: 'Gaya Rambut' },
                    { val: 'makeup', label: 'Riasan Wajah' }
                  ].map(opt => (
                    <button
                      key={opt.val}
                      id={`aesthetic-goal-${opt.val}`}
                      type="button"
                      onClick={() => { setAestheticGoal(opt.val); setDiagnosticResult(null); }}
                      className={`p-3 text-left rounded-2xl border transition-all duration-300 font-bold ${
                        aestheticGoal === opt.val
                          ? 'border-pink-500 bg-pink-500 text-white shadow-sm'
                          : 'border-pink-100 bg-white text-gray-700 hover:bg-pink-50/50 hover:border-pink-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              id="btn-process-diagnostic"
              onClick={handleRunDiagnostic}
              className="mt-8 w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            >
              <span>Jalankan Analisis Estetika</span>
              <ArrowRight className="w-4 h-4 text-pink-400" />
            </button>
          </div>

          {/* Right Block: Dynamic Report Showcase (7 cols) */}
          <div className="lg:col-span-7">
            {!diagnosticResult ? (
              <div className="h-full min-h-[400px] border border-dashed border-pink-200 rounded-[2rem] bg-pink-50/10 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 border border-pink-100 shadow-sm">
                  <Heart className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="font-serif text-lg font-bold text-gray-900">Menunggu Input Anda</h4>
                <p className="text-xs text-gray-500 max-w-sm">
                  Silakan jawab 3 pertanyaan di samping dan klik tombol analisis untuk memperoleh panduan kecantikan yang dipelajari siswa di lab sekolah.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-pink-100 rounded-[2rem] p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
                
                {/* Result header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pink-100 pb-4">
                  <div>
                    <span className="text-[10px] tracking-widest text-pink-600 uppercase font-extrabold font-sans">ANALYSIS REPORT</span>
                    <h4 className="font-serif text-xl font-bold text-gray-900 mt-0.5">Rekomendasi Estetika Personal</h4>
                  </div>
                  <button
                    id="btn-re-diagnose"
                    onClick={() => setDiagnosticResult(null)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 border border-pink-100 hover:bg-pink-50 rounded-lg text-xs text-gray-550 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Ulangi</span>
                  </button>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-pink-50/30 p-4 rounded-2xl border border-pink-100">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">KOMPETENSI TERKAIT (SMK)</span>
                    <p className="font-serif font-bold text-xs sm:text-sm text-gray-900 mt-1">{diagnosticResult.recommendedTrack}</p>
                    <div className="flex items-center space-x-1 text-[10px] text-pink-600 mt-2">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span className="font-semibold">{diagnosticResult.recommendedLab}</span>
                    </div>
                  </div>

                  <div className="bg-pink-50/30 p-4 rounded-2xl border border-pink-100">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">PANDUAN KURIKULUM LAB</span>
                    <p className="font-serif font-bold text-xs sm:text-sm text-gray-900 mt-1">Estimasi Jam Praktik Siswa</p>
                    <div className="flex items-center space-x-1.5 text-[11px] text-pink-600 mt-2 font-mono font-bold">
                      <Star className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                      <span>{diagnosticResult.estimatedHours} Jam Kajian Kasus</span>
                    </div>
                  </div>
                </div>

                {/* Regimen tips */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-gray-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 mr-1" />
                    <span>Panduan Regimen Sehari-hari Anda</span>
                  </h5>
                  
                  <div className="space-y-2 text-xs">
                    {diagnosticResult.customizedRegimen.map((step: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2.5 p-2.5 bg-white rounded-2xl border border-pink-100 shadow-xs">
                        <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-sm">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical recommendation */}
                <div className="pt-4 border-t border-pink-100 bg-gradient-to-r from-pink-50/50 to-pink-50/10 p-4 rounded-2xl border border-pink-100">
                  <p className="text-[10px] tracking-wider uppercase text-pink-700 font-bold">Hasil Rekomendasi Terapi Belajar</p>
                  <p className="font-serif text-sm font-bold text-gray-950 mt-1">
                    Teknik Terapi Praktik Terkait: <span className="text-pink-600 underline decoration-pink-200">{diagnosticResult.activeEduspaTreatment}</span>
                  </p>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                    <span className="font-semibold text-gray-800">Fokus Pembelajaran Siswa:</span> {diagnosticResult.studentTeacherFocus}
                  </p>
                  
                  <div className="mt-4">
                    <a
                      id="btn-diagnostic-wa-consult"
                      href={`https://wa.me/6282328981111?text=Halo%20Admin%20SMK%20Negeri%201%20Pekalongan,%20saya%20tertarik%20dengan%20rekomendasi%20terapi%20${encodeURIComponent(diagnosticResult.activeEduspaTreatment)}%2520pada%2520program%2520studi%2520Kecantikan.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 px-5 py-3 rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      <span>Konsultasi Pembelajaran (WhatsApp)</span>
                      <span>&nbsp;→</span>
                    </a>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
