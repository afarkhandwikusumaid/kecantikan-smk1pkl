import React, { useState } from 'react';
import { Sparkles, Clock, Calendar, Check, Tag, ShieldAlert, FileText, UserPlus, FileCheck, RefreshCw, Smartphone, Palette, Scroll } from 'lucide-react';
import { Service, Booking } from '../../types';

export default function EduspaSalon() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('skin1');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('2026-06-18');
  const [bookingTime, setBookingTime] = useState<string>('10:00');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [bookingVoucher, setBookingVoucher] = useState<Booking | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const services: Service[] = [
    {
      id: "skin1",
      category: "skincare",
      name: "Ozone Cleanse & Acne Therapy",
      duration: 45,
      price: 75000,
      description: "Pembersihan pori mendalam menggunakan uap Ozone, ditutup dengan High Frequency electrotherapy untuk membunuh bakteri jerawat.",
      features: ["Pembersihan ganda", "Ozone Vapourisation", "Sinar High-Frequency", "Masker Tea Tree", "Dermal Hydrating Serum"],
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=400"
    },
    {
      id: "skin2",
      category: "skincare",
      name: "Dermal Ultra-Rejuvenation Facial",
      duration: 60,
      price: 120000,
      description: "Perawatan anti-aging premium menggunakan mesin Ultrasound. Memasukkan serum kolagen hingga ke dermis kulit agar kenyal.",
      features: ["Mikroeksfoliasi Scrubber", "Transmisi Gel Kolagen", "Ultrasound Sonophoresis", "Peel-off Gold Mask", "Ice Globe massage"],
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400"
    },
    {
      id: "hair1",
      category: "hair",
      name: "Botanical Hair Spa & Blow Styling",
      duration: 60,
      price: 65000,
      description: "Terapi nutrisi rambut kering & rontok menggunakan ekstrak aloe vera/ginseng alami, dipadu dengan pijat rileksasi pundak.",
      features: ["Scalp Scrubbing", "Creambath Massage (20 m)", "Ozone Hair Steam", "Keratin Coat Serum", "Sleek Standard Blow Dry"],
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=400"
    },
    {
      id: "hair2",
      category: "hair",
      name: "Pivot Point Creative Haircut & Tone",
      duration: 50,
      price: 55000,
      description: "Potong rambut presisi mengikuti geometri wajah, ditambah dengan pewarnaan penutup uban atau fashion tint basic.",
      features: ["Wood Hair Diagnosis", "Symmetric Sectioning Cut", "Wash & Scalp Stimulator", "Basic Fashion Tinting", "Blow Styling"],
      image: "https://images.unsplash.com/photo-1521590832167-7bcbfeac2531?q=80&w=400"
    },
    {
      id: "body1",
      category: "body",
      name: "Keraton Royal Javanese Body Massage",
      duration: 80,
      price: 95000,
      description: "Seni pijat warisan keraton Jawa menggunakan minyak melati hangat, melancarkan peredaran darah, disusul scrub lulur rempah kuning.",
      features: ["Foot Bath Aromatherapy", "Signature Javanese Stroke Pijat", "Lulur Kuning Mangir Organik", "Traditional Body Warming Tea", "Hot Herbal Towel Wipe"],
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400"
    },
    {
      id: "body2",
      category: "body",
      name: "Mineral Hot Stone Reliever Therapy",
      duration: 90,
      price: 135000,
      description: "Perawatan spa holistik menggunakan batu basal vulkanik hangat untuk melemaskan otot tegang dan membuang racun tubuh.",
      features: ["Aromatic Foot Wash", "Basalt Hot Stone Placement", "Effleurage Spa Strokes", "Thermal Acupressure Stimulation", "Ginger Spice Drink"],
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=400"
    },
    {
      id: "makeup1",
      category: "makeup",
      name: "Youthful Graduate Corrective Makeup",
      duration: 50,
      price: 85000,
      description: "Riasan wajah segar, tahan lama, dan berdimensi natural untuk upacara wisuda, syukuran, atau acara pesta formal siang hari.",
      features: ["Skin Preparation", "Satin-finish Foundation Blend", "Corrective Nose & Face Shading", "Elegant Eyebrow Framing", "Dewy Mist Settler"],
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400"
    },
    {
      id: "makeup2",
      category: "makeup",
      name: "Prada Traditional Bridal Makeup Art",
      duration: 120,
      price: 350000,
      description: "Mahakarya tata rias pengantin adat Jawa (Solo Putri/Jogja Paes Ageng) lengkap dengan penataan sanggul, prada, & hiasan melati sintetik.",
      features: ["Advanced Paes Drawing", "High Definition 12H Foundation", "Intricate Sanggul Traditional", "Ronce Melati & Cunduk Mentul Setup", "Aksesoris Pengantin Komplet"],
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=400"
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  const activeService = services.find(s => s.id === selectedServiceId) || services[0];

  const handleSimulateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSaved(false);

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMsg("Mohon isi nama lengkap dan nomor WhatsApp!");
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `EDUSPA-${randomNum}`;

    const newBooking: Booking = {
      customerName,
      email: customerEmail || "guest@pekalongan.school",
      phone: customerPhone,
      serviceId: selectedServiceId,
      date: bookingDate,
      timeSlot: bookingTime,
      notes: customNotes,
      totalPrice: activeService.price,
      bookingCode: code,
      status: 'Simulated'
    };

    setBookingVoucher(newBooking);
  };

  const resetSimulator = () => {
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomNotes('');
    setBookingVoucher(null);
    setErrorMsg('');
    setIsSaved(false);
  };

  return (
    <section id="eduspa" className="py-20 md:py-28 bg-pink-50/20 border-y border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] tracking-[0.2em] font-extrabold text-pink-600 uppercase">
            UNIT BISNIS JURUSAN &amp; TRAINING FACTORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
            Eduspa Living Salon: <span className="text-pink-500 underline decoration-pink-200 underline-offset-8">Layanan Publik oleh Siswa</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-550 pt-3">
            Sebuah konsep <span className="font-semibold text-gray-800">Teaching Factory</span> di mana para siswa tingkat akhir mempraktikkan keterampilan mereka secara langsung kepada masyarakat umum di bawah bimbingan dan pengawasan ketat Guru Instruktur bersertifikasi asesor nasional.
          </p>
        </div>

        {/* Warning Indicator */}
        <div className="bg-yellow-50/60 border border-yellow-200 rounded-3xl p-5 mb-10 flex items-start space-x-3 text-sm text-yellow-800 shadow-sm">
          <ShieldAlert className="w-5 h-5 shrink-0 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-bold text-gray-900">Info Simulasi Interaktif &amp; Non-Satelit</p>
            <p className="text-xs text-yaml-700 text-gray-600 mt-1">
              Semua layanan di bawah ini sepenuhnya nyata diadakan di Eduspa Salon SMK Negeri 1 Pekalongan. Form pemesanan di bawah berfungsi sebagai <strong>simulasi digital</strong> untuk menghitung estimasi biaya dan memvisualisasikan voucher tiket kelas industri Anda.
            </p>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Menu Catalog (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-pink-100 pb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-500" />
                Menu Layanan Eduspa
              </h3>

              {/* Filter Toggles */}
              <div className="flex gap-1 bg-pink-100/50 p-1 rounded-xl border border-pink-100/30">
                {['all', 'skincare', 'hair', 'body', 'makeup'].map(cat => (
                  <button
                    key={cat}
                    id={`cat-filter-${cat}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold tracking-wider transition-all uppercase ${
                      selectedCategory === cat
                        ? 'bg-pink-500 text-white shadow-sm'
                        : 'text-gray-500 hover:text-pink-600'
                    }`}
                  >
                    {cat === 'all' ? 'Semua' : cat === 'skincare' ? 'Kulit' : cat === 'hair' ? 'Rambut' : cat === 'body' ? 'Spa' : 'Rias'}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredServices.map((service) => {
                const isSelected = selectedServiceId === service.id;
                return (
                  <div
                    key={service.id}
                    id={`service-card-${service.id}`}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`group cursor-pointer rounded-3xl overflow-hidden bg-white border transition-all duration-300 relative hover:-translate-y-0.5 hover:shadow-md ${
                      isSelected
                        ? 'border-pink-500 ring-2 ring-pink-500/20 shadow-sm'
                        : 'border-pink-100'
                    }`}
                  >
                    <div className="h-40 relative overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 bg-pink-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest shadow-sm">
                        {service.category}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-gray-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-white flex items-center gap-1 shadow-sm">
                        <Clock className="w-3 h-3 text-pink-400" />
                        {service.duration} Menit
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="font-serif text-base font-bold text-gray-900 leading-tight">
                        {service.name}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-pink-50">
                        <span className="text-pink-600 font-sans font-black text-sm">
                          Rp {service.price.toLocaleString('id-ID')}
                        </span>
                        
                        <div className="flex items-center space-x-1.5">
                          <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">Siswi Lab</span>
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 left-2 bg-pink-500 text-white rounded-full p-1.5 shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interaction Planner / Booking simulated voucher (5 cols) */}
          <div className="lg:col-span-5">
            {!bookingVoucher ? (
              <form
                id="booking-simulation-form"
                onSubmit={handleSimulateBooking}
                className="bg-white rounded-[2rem] p-6 sm:p-8 border border-pink-100 shadow-sm space-y-5"
              >
                <div className="border-b border-pink-100 pb-3">
                  <h3 className="font-serif text-lg font-bold text-gray-900">
                    Simulator Pemesanan Eduspa
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Hitung biaya &amp; persiapkan voucher digital langsung di bawah ini.
                  </p>
                </div>

                {/* Selected service preview */}
                <div className="bg-pink-50/50 border border-pink-100 p-4 rounded-2xl flex items-center space-x-3 shadow-inner">
                  <img
                    src={activeService.image}
                    alt=""
                    className="w-12 h-12 object-cover rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] tracking-wider uppercase text-pink-600 font-extrabold">Layanan Terpilih</p>
                    <h5 className="font-serif text-sm font-bold text-gray-900 truncate">{activeService.name}</h5>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{activeService.duration} Menit</span>
                      <span className="text-xs font-bold text-pink-600">Rp {activeService.price.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                {/* Step fields */}
                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-gray-800 font-bold uppercase tracking-widest text-[9px] mb-1.5">
                      Nama Pelanggan (Untuk Tiket) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ibu Rina Amalia, M.Pd."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-pink-50/20 border border-pink-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-pink-500 focus:bg-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-800 font-bold uppercase tracking-widest text-[9px] mb-1.5">
                        WhatsApp (Wajib) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="0812xxxxxx"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-pink-50/20 border border-pink-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-pink-500 focus:bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-800 font-bold uppercase tracking-widest text-[9px] mb-1.5">
                        Email Pelanggan
                      </label>
                      <input
                        type="email"
                        placeholder="custom@mail.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-pink-50/20 border border-pink-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-pink-500 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-800 font-bold uppercase tracking-widest text-[9px] mb-1.5">
                        Tanggal Perawatan
                      </label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-pink-50/20 border border-pink-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-pink-500 focus:bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-800 font-bold uppercase tracking-widest text-[9px] mb-1.5">
                        Jam Kedatangan
                      </label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-pink-50/20 border border-pink-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-pink-500 focus:bg-white text-sm"
                      >
                        <option value="09:00">09:00 WIB (Sesi Pagi)</option>
                        <option value="10:00">10:00 WIB (Sesi Menengah)</option>
                        <option value="11:00">11:00 WIB</option>
                        <option value="13:00">13:00 WIB (Sesi Siang)</option>
                        <option value="14:00">14:00 WIB</option>
                        <option value="15:00">15:00 WIB (Sesi Sore)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-800 font-bold uppercase tracking-widest text-[9px] mb-1.5">
                      Catatan Tambahan (Alergi / Kondisi Khusus)
                    </label>
                    <textarea
                      placeholder="Misal: Tidak mau pakai scrub terlalu panas, tipe kulit sangat kering"
                      rows={2}
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      className="w-full bg-pink-50/20 border border-pink-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-pink-500 focus:bg-white text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl p-3 text-center font-semibold animate-fade-in">
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <button
                    id="submit-simulate-booking"
                    type="submit"
                    className="w-full py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm transition-all duration-300 cursor-pointer"
                  >
                    Proses Slip Simulasi
                  </button>
                </div>
              </form>
            ) : (
              /* Beautiful Simulated Ticket / Voucher UI block */
              <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-pink-900/40">
                {/* Visual tickets notches */}
                <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#faf5f5] -translate-y-1/2" />
                <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#faf5f5] -translate-y-1/2" />
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-pink-500/10 blur-xl pointer-events-none" />

                {/* Header Ticket */}
                <div className="border-b border-dashed border-gray-700 pb-5 text-center space-y-1.5">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-pink-500/20 rounded-full text-pink-400 text-[10px] font-bold uppercase tracking-widest border border-pink-500/30">
                    <Sparkles className="w-3 h-3" />
                    <span>EDUSPA VOUCHER</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold tracking-tight">Kecantikan &amp; Spa SMK 1</h4>
                  <p className="text-[10px] tracking-widest text-gray-400 uppercase">SMK NEGERI 1 PEKALONGAN</p>
                </div>

                {/* Booking Code Dynamic Row */}
                <div className="py-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-gray-500 tracking-wider font-bold">KODE BOOKING (SIMULATED)</p>
                    <p className="text-lg font-mono font-bold text-pink-400">{bookingVoucher.bookingCode}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-gray-500 tracking-wider font-bold">STATUS</p>
                    <span className="inline-block bg-green-500/20 border border-green-500/50 text-green-400 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase animate-pulse">
                      READY TO VISIT
                    </span>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="space-y-3.5 border-t border-gray-800/80 pt-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 font-medium">Layanan Perawatan</p>
                      <p className="font-serif font-bold text-sm text-pink-100">{activeService.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium">Kategori</p>
                      <p className="font-bold uppercase tracking-wider text-pink-300">{activeService.category}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 font-medium">Nama Tamu</p>
                      <p className="font-semibold text-gray-100">{bookingVoucher.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium">No. Telepon / WA</p>
                      <p className="font-mono text-gray-200">{bookingVoucher.phone}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 font-medium">Hari &amp; Tanggal</p>
                      <p className="font-semibold text-gray-100">
                        {new Date(bookingVoucher.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium">Jam Booking &amp; Durasi</p>
                      <p className="font-semibold text-gray-100">{bookingVoucher.timeSlot} WIB ({activeService.duration}m)</p>
                    </div>
                  </div>

                  {/* Educational Staff Assigned */}
                  <div className="bg-gray-900 border border-gray-850 p-3 rounded-2xl grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-gray-500">Student Therapist</p>
                      <p className="font-medium text-pink-200 text-[11px] truncate">
                        Siswa Tingkat III (Asisten {activeService.category})
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500">Instruktur Supervisi</p>
                      <p className="font-medium text-pink-200 text-[11px] truncate">
                        Dra. Endang Sulastri (Asesor)
                      </p>
                    </div>
                  </div>

                  {bookingVoucher.notes && (
                    <div className="border-t border-gray-850/50 pt-2 text-[10px] text-gray-400">
                      <span className="font-bold text-gray-300">Catatan Khusus:</span> {bookingVoucher.notes}
                    </div>
                  )}

                  {/* Pricing Total Row */}
                  <div className="border-t border-dashed border-gray-800 pt-4 flex items-center justify-between">
                    <span className="text-gray-400 font-semibold text-xs">Total Kontribusi Bahan:</span>
                    <span className="text-lg font-serif font-black text-pink-400">
                      Rp {bookingVoucher.totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex gap-2">
                    <button
                      id="print-download-voucher"
                      onClick={() => {
                        setIsSaved(true);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      Unduh Slip / Simpan
                    </button>
                    <button
                      id="reset-booking-sim"
                      onClick={resetSimulator}
                      className="p-3 bg-gray-800 text-gray-400 hover:text-white rounded-xl transition-all"
                      title="Simulasi Baru"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  {isSaved && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 text-center text-green-300 text-[11px] font-medium leading-relaxed animate-fade-in">
                      ✓ Slip <strong>{bookingVoucher.bookingCode}</strong> tersimpan! Silakan screenshot layar ini &amp; tunjukkan ke resepsionis Eduspa saat kunjungan Anda.
                    </div>
                  )}
                </div>

                {/* Footnote inside ticket */}
                <div className="mt-4 text-center">
                  <p className="text-[8px] text-gray-600">
                    Sembari berkunjung, Anda berkontribusi langsung pada ujian praktik kerja nyata siswi kami.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
