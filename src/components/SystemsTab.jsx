import { useFirebaseData } from '../hooks/useFirebaseData';
import SystemCard from './SystemCard';

export default function SystemsTab() {
  const { data, loading } = useFirebaseData('detection_systems');

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Connecting to database...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-10 text-gray-500">
        No systems connected.
      </div>
    );
  }

  const systems = Object.entries(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {systems.map(([id, systemData]) => (
        <SystemCard key={id} id={id} data={systemData} />
      ))}
    </div>
  );
}
