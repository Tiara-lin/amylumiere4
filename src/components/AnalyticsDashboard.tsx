import React from 'react';
import { BarChart3 } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="text-center text-gray-500">
        <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p className="text-lg font-semibold">Analytics Dashboard Disabled</p>
        <p className="text-sm">This module is currently disabled and not fetching data.</p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
