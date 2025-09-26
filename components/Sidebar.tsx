
import React from 'react';
import type { Route, Alert } from '../types';
import RouteDetails from './RouteDetails';
import { EvCarIcon, WarningIcon, RouteIcon, LayersIcon } from './Icons';

interface SidebarProps {
  routes: Route[];
  alerts: Alert[];
  selectedRouteId: string | null;
  onSelectRoute: (id: string) => void;
  onRecalculate: () => void;
  showCongestion: boolean;
  setShowCongestion: (show: boolean) => void;
  showDemand: boolean;
  setShowDemand: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  routes,
  alerts,
  selectedRouteId,
  onSelectRoute,
  onRecalculate,
  showCongestion,
  setShowCongestion,
  showDemand,
  setShowDemand,
}) => {
  const selectedRoute = routes.find(r => r.id === selectedRouteId);

  return (
    <div className="w-96 bg-gray-900/80 backdrop-blur-xl border-r border-gray-700/50 h-full flex flex-col p-4 text-gray-200 shadow-2xl">
      <div className="flex items-center mb-6">
        <EvCarIcon className="w-10 h-10 text-blue-400" />
        <h1 className="text-2xl font-bold ml-3">EV Route Planner</h1>
      </div>

      <div className="flex-grow overflow-y-auto pr-2">
        {/* Route Selection */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center"><RouteIcon className="w-5 h-5 mr-2" />Optimized Routes</h2>
          <div className="space-y-2">
            {routes.map(route => (
              <button
                key={route.id}
                onClick={() => onSelectRoute(route.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedRouteId === route.id ? 'bg-blue-500/20 border-blue-500' : 'bg-gray-800/50 border-gray-700 hover:border-blue-600'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">{route.name}</span>
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: route.color }}></span>
                </div>
                <div className="text-xs text-gray-400 mt-1 flex justify-between">
                  <span>{route.distance} km</span>
                  <span>{route.duration} min</span>
                  <span>{route.energyConsumption} kWh</span>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={onRecalculate}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Recalculate Routes
          </button>
        </div>

        {/* Layer Toggles */}
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center"><LayersIcon className="w-5 h-5 mr-2"/>Map Layers</h2>
            <div className="space-y-2 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-300">Congestion Heatmap</span>
                    <div className="relative">
                        <input type="checkbox" className="sr-only" checked={showCongestion} onChange={() => setShowCongestion(!showCongestion)} />
                        <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showCongestion ? 'transform translate-x-full bg-green-400' : ''}`}></div>
                    </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-gray-300">EV Demand Heatmap</span>
                    <div className="relative">
                        <input type="checkbox" className="sr-only" checked={showDemand} onChange={() => setShowDemand(!showDemand)} />
                        <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showDemand ? 'transform translate-x-full bg-green-400' : ''}`}></div>
                    </div>
                </label>
            </div>
        </div>


        {/* Traffic Alerts */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center"><WarningIcon className="w-5 h-5 mr-2 text-yellow-400" />Predictive Alerts</h2>
          <div className="space-y-2">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-2 rounded-lg text-sm flex items-start ${
                alert.severity === 'high' ? 'bg-red-500/20' : 
                alert.severity === 'medium' ? 'bg-yellow-500/20' : 'bg-gray-500/20'
              }`}>
                <WarningIcon className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${
                    alert.severity === 'high' ? 'text-red-400' : 
                    alert.severity === 'medium' ? 'text-yellow-400' : 'text-gray-400'
                }`} />
                <span>{alert.message}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedRoute && <RouteDetails selectedRoute={selectedRoute} allRoutes={routes} />}

      </div>
    </div>
  );
};

export default Sidebar;
