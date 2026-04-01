"use client";

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gray-950 text-red-500">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
      <p className="font-semibold animate-pulse">Initializing Grid Mapping Engine...</p>
    </div>
  )
});

export default function OutageMap({ outages }: { outages: any[] }) {
  return <MapComponent outages={outages} />;
}
