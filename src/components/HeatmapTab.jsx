import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useFirebaseData } from '../hooks/useFirebaseData';

// leaflet.heat is a side-effect plugin that attaches to L.
// It expects L on the global window object in some bundler environments.
if (typeof window !== 'undefined') {
  window.L = L;
}

const FILTER_OPTIONS = [
  { id: 'day', label: 'Today' },
  { id: 'month', label: 'This Month' },
  { id: 'year', label: 'This Year' },
];

export default function HeatmapTab({ isActive }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const heatLayerRef = useRef(null);
  const heatPluginLoaded = useRef(false);
  const initializingRef = useRef(false);
  const [activeFilter, setActiveFilter] = useState('month');
  const [mapReady, setMapReady] = useState(false);

  const { data } = useFirebaseData('detection_history');

  // Parse all detection points from Firebase data
  const allPoints = useMemo(() => {
    if (!data) return [];
    return Object.values(data)
      .filter((v) => v.latitude && v.longitude)
      .map((v) => ({
        lat: v.latitude,
        lng: v.longitude,
        timestamp: new Date(v.timestamp.replace(' ', 'T') + 'Z'),
      }));
  }, [data]);

  // Initialize Leaflet map only when the tab is first made active
  useEffect(() => {
    if (!isActive || mapRef.current || !mapContainerRef.current || initializingRef.current) return;
    initializingRef.current = true;

    const container = mapContainerRef.current;

    const initMap = async () => {
      if (!heatPluginLoaded.current) {
        await import('leaflet.heat');
        heatPluginLoaded.current = true;
      }

      // Guard: if the container was already initialized by Leaflet (StrictMode double-mount),
      // clean it up first.
      if (container._leaflet_id) {
        container._leaflet_id = undefined;
        container.innerHTML = '';
      }

      const map = L.map(container).setView([18.62, 73.81], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      // Delay adding the heat layer until after the map has valid dimensions
      setTimeout(() => {
        if (!mapRef.current) return;
        const heatLayer = L.heatLayer([], {
          radius: 25,
          maxZoom: 14,
          blur: 15,
        }).addTo(map);

        heatLayerRef.current = heatLayer;
        setMapReady(true);
      }, 400);

      mapRef.current = map;

      // Ensure map size is correct after first render
      setTimeout(() => {
        if (mapRef.current) mapRef.current.invalidateSize();
      }, 300);

      initializingRef.current = false;
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        heatLayerRef.current = null;
        initializingRef.current = false;
        setMapReady(false);
      }
    };
  }, [isActive]);

  // Invalidate map size when tab becomes visible (subsequent visits)
  useEffect(() => {
    if (isActive && mapRef.current) {
      setTimeout(() => {
        if (mapRef.current) mapRef.current.invalidateSize();
      }, 250);
    }
  }, [isActive]);

  // Apply filter whenever points or filter changes
  useEffect(() => {
    if (!heatLayerRef.current || !mapReady) return;

    const now = new Date();
    let start;
    if (activeFilter === 'day') {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (activeFilter === 'month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      start = new Date(now.getFullYear(), 0, 1);
    }

    const filtered = allPoints.filter((p) => p.timestamp >= start);
    heatLayerRef.current.setLatLngs(filtered.map((p) => [p.lat, p.lng]));
  }, [allPoints, activeFilter, mapReady]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Filter Buttons */}
      <div className="flex items-center space-x-4 mb-4">
        <label className="font-semibold">Filter:</label>
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveFilter(option.id)}
            className={`px-4 py-2 rounded-md transition ${
              activeFilter === option.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        className="heatmap-container rounded-lg border border-gray-200"
      />
    </div>
  );
}
