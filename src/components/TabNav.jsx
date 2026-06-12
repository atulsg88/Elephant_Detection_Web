const TABS = [
  { id: 'systems', label: 'Systems' },
  { id: 'history', label: 'History' },
  { id: 'heatmap', label: 'Heatmap' },
];

export default function TabNav({ activeTab, onTabChange }) {
  return (
    <div className="mb-6 border-b border-gray-200">
      <nav className="flex space-x-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
