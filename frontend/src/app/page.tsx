"use client";

import { useEffect, useState } from 'react';
import OutageMap from '@/components/OutageMap';

export default function Home() {
  const [outages, setOutages] = useState([]);

  useEffect(() => {
    // Fetch data from local backend MVP API
    fetch('http://localhost:8000/api/outages')
      .then(res => res.json())
      .then(data => setOutages(data))
      .catch(err => console.error("Failed to fetch outages:", err));
  }, []);

  // Calculate generic severity
  const totalOut = outages.reduce((acc: number, curr: any) => acc + curr.customers_out, 0);

  return (
    <main className="flex h-screen flex-col bg-gray-950 text-white font-sans overflow-hidden">
      <header className="px-6 py-4 bg-gray-900 border-b border-gray-800 shadow-xl flex justify-between items-center z-50">
        <div>
            <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 flex items-center gap-3">
            <span className="text-red-500 animate-pulse">⚡</span> GRIDWATCH <span className="text-gray-600 font-light text-xl">| Outage Aggregator</span>
            </h1>
        </div>
        <div className="flex items-center gap-4">
            <div className="bg-red-950/50 border border-red-900 px-4 py-1.5 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                <span className="text-red-400 text-sm font-bold tracking-wide">{totalOut.toLocaleString()} IMPACTED</span>
            </div>
            <div className="text-xs text-gray-500">Zero-Cost Local MVP</div>
        </div>
      </header>
      
      <div className="flex-1 relative z-0">
        <OutageMap outages={outages} />
      </div>

      <div className="absolute top-24 right-6 bg-gray-900/80 p-5 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-lg z-[1000] w-80">
        <h2 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 text-gray-200">Active Monitored Grids</h2>
        {outages.length === 0 ? (
          <div className="text-gray-400 text-sm flex gap-2 items-center"><div className="animate-spin w-4 h-4 border-b-2 border-red-500 rounded-full"></div>Syncing with utility feeds...</div>
        ) : (
          <ul className="space-y-3">
            {outages.map((o: any) => (
              <li key={o.id} className="flex flex-col gap-1 bg-gray-950/50 rounded-lg p-3 border border-gray-800/50 hover:border-gray-700 transition duration-300">
                <span className="text-sm font-bold text-gray-300 truncate" title={o.utility_name}>{o.utility_name}</span>
                <div className="flex justify-between items-end">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{o.state}</span>
                    <span className="text-xs font-black text-red-500">{o.customers_out.toLocaleString()} OUT</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
