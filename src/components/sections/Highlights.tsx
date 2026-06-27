import React from 'react';
import { Trophy, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Highlights() {
  return (
    <div className="bg-white py-12 border-b border-pink-100 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1 space-y-1"
          >
            <span className="text-sm tracking-widest font-extrabold text-pink-600 uppercase">PEKALONGAN PRIDE</span>
            <h3 className="font-serif text-xl font-bold text-gray-900 leading-tight">Prestasi &amp; Kualitas</h3>
            <p className="text-xs text-gray-400 font-medium">Standar Keunggulan Nasional</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/40 backdrop-blur-md border border-pink-100/60 p-5 rounded-3xl flex items-center space-x-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-50 to-pink-100 border border-pink-200/50 flex items-center justify-center text-pink-500 shrink-0 shadow-sm">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-gray-900">Juara LKS Provinsi</h4>
              <p className="text-sm text-gray-500 mt-0.5 font-medium">Medali Emas 3 Tahun Beruntun</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/40 backdrop-blur-md border border-pink-100/60 p-5 rounded-3xl flex items-center space-x-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-50 to-pink-100 border border-pink-200/50 flex items-center justify-center text-pink-500 shrink-0 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-gray-900">Sertifikasi BNSP</h4>
              <p className="text-sm text-gray-500 mt-0.5 font-medium">100% Kelulusan Kualifikasi Lisensi</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/40 backdrop-blur-md border border-pink-100/60 p-5 rounded-3xl flex items-center space-x-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-50 to-pink-100 border border-pink-200/50 flex items-center justify-center text-pink-500 shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-gray-900">Bursa Kerja Khusus</h4>
              <p className="text-sm text-gray-500 mt-0.5 font-medium font-sans">Kemitraan Klinik &amp; Spa Terbesar</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
