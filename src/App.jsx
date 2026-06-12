import { useState } from 'react';
import Header from './components/Header';
import TabNav from './components/TabNav';
import SystemsTab from './components/SystemsTab';
import HistoryTab from './components/HistoryTab';
import HeatmapTab from './components/HeatmapTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('systems');

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Header />
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

        <main>
          {/* Systems Tab */}
          <div className={activeTab === 'systems' ? 'block' : 'hidden'}>
            <SystemsTab />
          </div>

          {/* History Tab */}
          <div className={activeTab === 'history' ? 'block' : 'hidden'}>
            <HistoryTab />
          </div>

          {/* Heatmap Tab — kept mounted so the Leaflet map retains state */}
          <div className={activeTab === 'heatmap' ? 'block' : 'hidden'}>
            <HeatmapTab isActive={activeTab === 'heatmap'} />
          </div>
        </main>
      </div>
    </div>
  );
}
