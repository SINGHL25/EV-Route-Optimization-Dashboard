
import React, { useMemo } from 'react';
import type { Route, Station, Alert, HeatmapData } from '../types';
import { ChargingStationIcon, WarningIcon } from './Icons';

interface MapProps {
  routes: Route[];
  stations: Station[];
  alerts: Alert[];
  selectedRouteId: string | null;
  onSelectRoute: (id: string) => void;
  onSelectStation: (station: Station) => void;
  zoom: number;
  showCongestion: boolean;
  congestionHeatmap: HeatmapData[];
  showDemand: boolean;
  demandHeatmap: HeatmapData[];
}

const statusColors: { [key in Station['status']]: string } = {
  available: 'text-green-400',
  occupied: 'text-red-400',
  maintenance: 'text-yellow-400',
};

const alertColors: { [key in Alert['severity']]: string } = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-gray-500',
}

const HeatmapLayer: React.FC<{ data: HeatmapData[], color: string, mapSize: { width: number; height: number; gridSize: number } }> = ({ data, color, mapSize }) => {
    const { width, height, gridSize } = mapSize;
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;

    return (
        <g>
            {data.map((point, index) => (
                <rect
                    key={index}
                    x={point.x * cellWidth}
                    y={point.y * cellHeight}
                    width={cellWidth}
                    height={cellHeight}
                    fill={color}
                    opacity={point.value}
                    style={{ pointerEvents: 'none' }}
                />
            ))}
        </g>
    );
};

const Map: React.FC<MapProps> = ({
  routes,
  stations,
  alerts,
  selectedRouteId,
  onSelectRoute,
  onSelectStation,
  zoom,
  showCongestion,
  congestionHeatmap,
  showDemand,
  demandHeatmap
}) => {
    const MAP_WIDTH = 900;
    const MAP_HEIGHT = 500;
    const HEATMAP_GRID_SIZE = 25;

    const mapSize = useMemo(() => ({ width: MAP_WIDTH, height: MAP_HEIGHT, gridSize: HEATMAP_GRID_SIZE }), []);

  return (
    <div className="flex-grow p-4 bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="w-full h-full"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Map Background Grid */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(107, 114, 128, 0.2)" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Heatmap Layers */}
        {showCongestion && <HeatmapLayer data={congestionHeatmap} color="#ef4444" mapSize={mapSize} />}
        {showDemand && <HeatmapLayer data={demandHeatmap} color="#3b82f6" mapSize={mapSize} />}

        {/* Routes */}
        {routes.map(route => {
          const isSelected = route.id === selectedRouteId;
          const strokeWidth = isSelected ? 8 : 4;
          const totalLength = 100; // Assuming total length is 100 for percentage calculation
          let accumulatedLength = 0;

          return (
            <g key={route.id} onClick={() => onSelectRoute(route.id)} className="cursor-pointer">
              {/* Base route path for interaction and shadow */}
              <path
                d={route.path}
                fill="none"
                stroke={route.color}
                strokeWidth={strokeWidth + 4}
                strokeOpacity={0.1}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={route.path}
                fill="none"
                stroke={route.color}
                strokeWidth={strokeWidth}
                strokeOpacity={isSelected ? 1 : 0.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: isSelected ? 'url(#glow)' : 'none', transition: 'all 0.3s ease' }}
              />
              {/* Traffic Segments */}
              <g>
                {route.trafficSegments.map((segment, index) => {
                  const offset = accumulatedLength;
                  accumulatedLength += segment.lengthPercentage;
                  return (
                    <path
                      key={index}
                      d={route.path}
                      fill="none"
                      stroke={segment.color}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={`${totalLength}`}
                      strokeDashoffset={-offset}
                      pathLength={totalLength}
                      style={{
                        strokeDasharray: `${segment.lengthPercentage} ${totalLength - segment.lengthPercentage}`
                      }}
                    />
                  );
                })}
              </g>
            </g>
          );
        })}

        {/* Stations */}
        {stations.map(station => (
          <g
            key={station.id}
            transform={`translate(${station.position.x}, ${station.position.y})`}
            onClick={() => onSelectStation(station)}
            className="cursor-pointer"
          >
            <ChargingStationIcon className={`w-8 h-8 ${statusColors[station.status]}`} style={{transform: 'translate(-16px, -16px)'}} />
          </g>
        ))}

        {/* Alerts */}
        {alerts.map(alert => (
          <g
            key={alert.id}
            transform={`translate(${alert.position.x}, ${alert.position.y})`}
            className="cursor-pointer"
            >
             <title>{alert.message}</title>
             <WarningIcon className={`w-6 h-6 ${alertColors[alert.severity]}`} style={{transform: 'translate(-12px, -12px)'}}/>
            </g>
        ))}
      </svg>
    </div>
  );
};

export default Map;
