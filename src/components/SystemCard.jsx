import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

/**
 * Downloads a Base64 image as a file.
 */
function downloadImage(base64Data, fileName) {
  if (!base64Data) return;
  const link = document.createElement('a');
  link.href = base64Data;
  link.download = fileName;
  link.click();
}

export default function SystemCard({ id, data }) {
  const status = data.detection_status || 'Unknown';
  const isAlert = status === 'Elephant Detected';
  const statusColor = isAlert
    ? 'bg-red-500 status-pulse-red'
    : status === 'All Clear'
    ? 'bg-green-500 status-pulse-green'
    : 'bg-gray-500';

  const liveImg = data.live_footage || '';
  const detectionImg = data.last_image_data || '';

  const [lat, setLat] = useState(data.location?.latitude || '');
  const [lon, setLon] = useState(data.location?.longitude || '');

  const handleUpdateLocation = () => {
    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);

    if (isNaN(parsedLat) || isNaN(parsedLon)) {
      alert('Please enter valid coordinates.');
      return;
    }

    set(ref(db, `detection_systems/${id}/location`), {
      latitude: parsedLat,
      longitude: parsedLon,
    })
      .then(() => alert('Location updated successfully.'))
      .catch((e) => alert('Error: ' + e.message));
  };

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md border-t-4 ${
        isAlert ? 'border-red-500' : 'border-indigo-500'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-gray-800 truncate pr-2" title={id}>
          {id}
        </h3>
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${statusColor} mr-2`}></div>
          <span className="text-xs font-bold">{status}</span>
        </div>
      </div>

      {/* Live Monitoring */}
      <div className="mb-4">
        <p className="text-[10px] font-bold text-red-600 mb-1 flex items-center">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-1"></span>
          LIVE MONITORING
        </p>
        <div className="w-full h-44 bg-black rounded overflow-hidden flex items-center justify-center border-2 border-gray-800">
          {liveImg ? (
            <img
              src={liveImg}
              alt={`Live feed from ${id}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <p className="text-gray-500 text-xs">Offline</p>
          )}
        </div>
      </div>

      {/* Last Detection */}
      <div className="mb-4">
        <p className="text-[10px] font-bold text-gray-500 mb-1 uppercase">
          Last Detection
        </p>
        <div className="w-full h-32 bg-gray-100 rounded overflow-hidden flex items-center justify-center border">
          {detectionImg ? (
            <img
              src={detectionImg}
              alt={`Last detection from ${id}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-[10px]">No Detection</span>
          )}
        </div>
      </div>

      {/* Last Updated */}
      <p className="text-[10px] text-gray-400 mb-4">
        Updated: {data.last_updated || 'N/A'}
      </p>

      {/* GPS Inputs */}
      <div className="flex space-x-2 mb-3">
        <input
          type="number"
          step="any"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Lat"
          className="w-1/2 p-2 border text-[10px] rounded"
        />
        <input
          type="number"
          step="any"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="Lon"
          className="w-1/2 p-2 border text-[10px] rounded"
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleUpdateLocation}
          className="bg-indigo-600 text-white text-[10px] py-2 rounded hover:bg-indigo-700 transition"
        >
          Set GPS
        </button>
        <button
          onClick={() =>
            downloadImage(detectionImg || liveImg, `${id}_capture.jpg`)
          }
          className="bg-gray-800 text-white text-[10px] py-2 rounded hover:bg-black transition"
        >
          Save Image
        </button>
      </div>
    </div>
  );
}
