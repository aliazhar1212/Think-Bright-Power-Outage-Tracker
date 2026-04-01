"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapComponent({ outages }: { outages: any[] }) {
  // Phase 8: Using Zip Code Centroids handled by the backend pgeocode engine.
  // We completely bypass forcing the browser to download massive GeoJSON borders!
  
  return (
    <MapContainer center={[38.0, -97.0]} zoom={5} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      {outages.map((outage) => (
        // Only trigger rendering if the Python backend successfully calculated the Zip Centroid
        outage.lat && outage.lon ? (
          <CircleMarker
            key={outage.zip_code || `${outage.lat}-${outage.lon}`}
            center={[outage.lat, outage.lon]}
            radius={10 + Math.min(outage.customers_out / 800, 25)}
            pathOptions={{
              fillColor: '#ef4444', 
              color: '#7f1d1d',     
              weight: 2,
              fillOpacity: 0.5 + Math.min(outage.customers_out / 15000, 0.4)
            }}
          >
            <Tooltip 
              direction="top"
              className="custom-tooltip"
            >
               <div style={{ fontFamily: 'sans-serif', padding: '4px' }}>
                 <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#111827' }}>
                   ZIP Code: {outage.zip_code}
                 </span><br/>
                 <span style={{ color: '#4B5563', fontSize: '13px' }}>
                   {outage.utility_name} ({outage.state})
                 </span><br/>
                 <div style={{ 
                   marginTop: '6px', 
                   backgroundColor: '#FEE2E2', 
                   color: '#B91C1C', 
                   padding: '4px 8px', 
                   borderRadius: '4px', 
                   fontWeight: 'bold', 
                   display: 'inline-block' 
                 }}>
                   {outage.customers_out.toLocaleString()} Customers Out
                 </div>
               </div>
            </Tooltip>
          </CircleMarker>
        ) : null
      ))}
    </MapContainer>
  );
}
