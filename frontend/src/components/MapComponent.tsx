"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapComponent({ outages }: { outages: any[] }) {
  return (
    <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: '100%', width: '100%' }}>
      {/* Premium dark mode tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {outages.map((outage) => (
        <CircleMarker
          key={outage.id}
          center={
            outage.lat && outage.lon 
              ? [outage.lat, outage.lon] 
              // Fallback mockup coordinates for our seeded DB items
              : outage.utility_name.includes('FirstEnergy') ? [40.4406, -79.9959] : [29.7604, -95.3698]
          }
          pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.6, weight: 2 }}
          radius={Math.max(12, Math.min(outage.customers_out / 500, 45))}
        >
          <Popup>
            <div className="text-gray-900 font-sans p-1">
              <h3 className="font-bold text-lg mb-1 leading-tight">{outage.utility_name}</h3>
              <p className="text-xs text-gray-500 mb-2">State: {outage.state}</p>
              <div className="bg-red-100 text-red-700 px-3 py-1 rounded-md inline-block font-bold">
                {outage.customers_out.toLocaleString()} Customers Out
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
