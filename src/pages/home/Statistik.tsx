import React, { useState, useEffect } from 'react';
import { Clock, Calendar, BarChart3 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Helper component for animated counting
const AnimatedCounter = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString('id-ID')}</span>;
};

export default function Statistik() {
  const [stats, setStats] = useState({
    hariIni: 0,
    bulanIni: 0,
    tahunIni: 0
  });

  useEffect(() => {
    async function trackVisit() {
      // Use sessionStorage to prevent incrementing multiple times per session
      if (sessionStorage.getItem('hasVisited')) {
        // Just fetch and display
        const { data } = await supabase.from('site_settings').select('value').eq('key', 'visitor_stats').single();
        if (data && data.value) setStats(data.value);
        return;
      }

      try {
        const today = new Date();
        // Use local timezone (Asia/Jakarta) so it resets exactly at 00:00 WIB
        const currentDate = today.toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' }); // YYYY-MM-DD
        const currentMonth = currentDate.substring(0, 7); // YYYY-MM
        const currentYear = currentDate.substring(0, 4); // YYYY

        let currentStats = {
          hariIni: 0,
          bulanIni: 0,
          tahunIni: 0,
          lastDate: currentDate,
          lastMonth: currentMonth,
          lastYear: currentYear
        };

        // Fetch existing stats
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'visitor_stats')
          .single();

        if (data && data.value) {
          currentStats = { ...currentStats, ...data.value };
        }

        // Reset logic
        if (currentStats.lastDate !== currentDate) {
          currentStats.hariIni = 0;
          currentStats.lastDate = currentDate;
        }
        if (currentStats.lastMonth !== currentMonth) {
          currentStats.bulanIni = 0;
          currentStats.lastMonth = currentMonth;
        }
        if (currentStats.lastYear !== currentYear) {
          currentStats.tahunIni = 0;
          currentStats.lastYear = currentYear;
        }

        // Increment
        currentStats.hariIni += 1;
        currentStats.bulanIni += 1;
        currentStats.tahunIni += 1;

        // Save back
        if (!data) {
          await supabase.from('site_settings').insert([{ key: 'visitor_stats', value: currentStats }]);
        } else {
          await supabase.from('site_settings').update({ value: currentStats }).eq('key', 'visitor_stats');
        }

        setStats(currentStats);
        sessionStorage.setItem('hasVisited', 'true');
      } catch (err) {
        console.error('Error tracking visitor:', err);
      }
    }
    
    trackVisit();
  }, []);

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2">
            <span className="w-8 h-px bg-secondary/50"></span>
            <span className="text-xs font-bold text-secondary tracking-widest uppercase">Statistik</span>
            <span className="w-8 h-px bg-secondary/50"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-black text-slate-900 mt-3 tracking-tight">PENGUNJUNG WEBSITE</h2>
          <div className="w-20 h-1.5 bg-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          
          {/* Card 1 */}
          <div className="bg-white border border-slate-100 p-2 sm:p-4 md:p-8 rounded-xl shadow-sm text-center flex flex-col items-center justify-center transition-shadow hover:shadow-md">
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-blue-50 flex items-center justify-center mb-2 sm:mb-4 md:mb-6">
              <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <p className="text-slate-400 font-bold tracking-wider text-[10px] sm:text-xs uppercase mb-1 sm:mb-2 truncate w-full">Hari Ini</p>
            <h3 className="text-lg sm:text-3xl md:text-4xl font-bold text-slate-900 truncate w-full">
              <AnimatedCounter end={stats.hariIni} />
            </h3>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-100 p-2 sm:p-4 md:p-8 rounded-xl shadow-sm text-center flex flex-col items-center justify-center transition-shadow hover:shadow-md">
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-purple-50 flex items-center justify-center mb-2 sm:mb-4 md:mb-6">
              <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-purple-500" />
            </div>
            <p className="text-slate-400 font-bold tracking-wider text-[10px] sm:text-xs uppercase mb-1 sm:mb-2 truncate w-full">Bulan Ini</p>
            <h3 className="text-lg sm:text-3xl md:text-4xl font-bold text-slate-900 truncate w-full">
              <AnimatedCounter end={stats.bulanIni} />
            </h3>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-100 p-2 sm:p-4 md:p-8 rounded-xl shadow-sm text-center flex flex-col items-center justify-center transition-shadow hover:shadow-md">
            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-green-50 flex items-center justify-center mb-2 sm:mb-4 md:mb-6">
              <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-green-500" />
            </div>
            <p className="text-slate-400 font-bold tracking-wider text-[10px] sm:text-xs uppercase mb-1 sm:mb-2 truncate w-full">Tahun Ini</p>
            <h3 className="text-lg sm:text-3xl md:text-4xl font-bold text-slate-900 truncate w-full">
              <AnimatedCounter end={stats.tahunIni} />
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
}
