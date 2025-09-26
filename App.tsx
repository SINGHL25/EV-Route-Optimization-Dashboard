
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import StationPopup from './components/StationPopup';
import type { Route, Station, Alert } from './types';
import { getDashboardData, congestionHeatmap, demandHeatmap } from './services/mockData';

const App: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCongestion, setShowCongestion] = useState(false);
  const [showDemand, setShowDemand] = useState(false);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    const data = getDashboardData();
    setRoutes(data.routes);
    setStations(data.stations);
    setAlerts(data.alerts);
    if (data.routes.length > 0 && !selectedRouteId) {
      setSelectedRouteId(data.routes[0].id);
    }
    setIsLoading(false);
  }, [selectedRouteId]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRecalculate = () => {
    fetchData();
  };
  
  const handleSelectStation = (station: Station) => {
    setSelectedStation(station);
  };

  const handleClosePopup = () => {
    setSelectedStation(null);
  };

  if (isLoading && routes.length === 0) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gray-900 text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-900 flex font-sans">
      <Sidebar
        routes={routes}
        alerts={alerts}
        selectedRouteId={selectedRouteId}
        onSelectRoute={setSelectedRouteId}
        onRecalculate={handleRecalculate}
        showCongestion={showCongestion}
        setShowCongestion={setShowCongestion}
        showDemand={showDemand}
        setShowDemand={setShowDemand}
      />
      <main className="flex-1 flex flex-col p-4 relative">
        <Map
          routes={routes}
          stations={stations}
          alerts={alerts}
          selectedRouteId={selectedRouteId}
          onSelectRoute={setSelectedRouteId}
          onSelectStation={handleSelectStation}
          zoom={1}
          showCongestion={showCongestion}
          congestionHeatmap={congestionHeatmap}
          showDemand={showDemand}
          demandHeatmap={demandHeatmap}
        />
      </main>
      {selectedStation && <StationPopup station={selectedStation} onClose={handleClosePopup} />}
    </div>
  );
};

export default App;
