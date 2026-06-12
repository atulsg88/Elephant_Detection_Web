import { useMemo } from 'react';
import { useFirebaseData } from '../hooks/useFirebaseData';

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

export default function HistoryTab() {
  const { data, loading } = useFirebaseData('detection_history');

  // Sort events by timestamp descending
  const events = useMemo(() => {
    if (!data) return [];
    return Object.values(data).sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Detection History</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Timestamp
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              System ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Location (Lat, Lon)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Capture
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading && (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-sm text-gray-500 text-center">
                Loading history...
              </td>
            </tr>
          )}
          {!loading && events.length === 0 && (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-sm text-gray-500 text-center">
                No detection events found.
              </td>
            </tr>
          )}
          {events.map((event, index) => {
            const lat = event.latitude ? event.latitude.toFixed(4) : 'N/A';
            const lon = event.longitude ? event.longitude.toFixed(4) : 'N/A';
            const imgLink = event.last_image_data || event.image_data || '';

            return (
              <tr key={index}>
                <td className="px-6 py-4 text-sm">{event.timestamp}</td>
                <td className="px-6 py-4 text-sm">{event.system_id}</td>
                <td className="px-6 py-4 text-sm">
                  {lat}, {lon}
                </td>
                <td className="px-6 py-4 text-sm">
                  {imgLink ? (
                    <button
                      onClick={() =>
                        downloadImage(imgLink, `history_${event.timestamp}.jpg`)
                      }
                      className="text-indigo-600 hover:underline"
                    >
                      Download
                    </button>
                  ) : (
                    'None'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
