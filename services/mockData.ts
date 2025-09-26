
import type { Route, Station, Alert, HeatmapData, StationStatus, TrafficSegment } from '../types';

const routeColors = {
  fastest: '#3b82f6',
  eco: '#22c55e',
  'low-congestion': '#a855f7',
};

let initialRoutes: Route[] = [
  {
    id: 'route-1',
    name: 'Route A - Fastest',
    type: 'fastest',
    path: 'M50 450 C 150 350, 250 200, 450 150 S 700 100, 850 50',
    distance: 25.4,
    duration: 35,
    energyConsumption: 6.8,
    trafficSegments: [],
    color: routeColors.fastest,
  },
  {
    id: 'route-2',
    name: 'Route B - Eco',
    type: 'eco',
    path: 'M50 450 C 100 250, 350 300, 500 250 S 750 200, 850 50',
    distance: 28.1,
    duration: 48,
    energyConsumption: 5.2,
    trafficSegments: [],
    color: routeColors.eco,
  },
  {
    id: 'route-3',
    name: 'Route C - Low Congestion',
    type: 'low-congestion',
    path: 'M50 450 S 200 500, 350 400 C 500 300, 600 200, 850 50',
    distance: 31.5,
    duration: 42,
    energyConsumption: 6.1,
    trafficSegments: [],
    color: routeColors['low-congestion'],
  },
];

// FIX: Changed from const to let to allow modification in randomizeData
let initialStations: Station[] = [
  { id: 'station-1', name: 'Central Charging Hub', position: { x: 300, y: 280 }, status: 'available', connectors: [{ type: 'Type 2', power: '22kW', available: 3, total: 4 }, { type: 'CCS', power: '150kW', available: 1, total: 2 }] },
  { id: 'station-2', name: 'Northside Supercharge', position: { x: 480, y: 120 }, status: 'occupied', connectors: [{ type: 'CCS', power: '250kW', available: 0, total: 4 }] },
  { id: 'station-3', name: 'West End Rapid Charge', position: { x: 150, y: 320 }, status: 'available', connectors: [{ type: 'CHAdeMO', power: '50kW', available: 1, total: 1 }, { type: 'Type 2', power: '22kW', available: 2, total: 2 }] },
  { id: 'station-4', name: 'Downtown Eco Charge', position: { x: 650, y: 350 }, status: 'maintenance', connectors: [{ type: 'Type 2', power: '11kW', available: 0, total: 2 }] },
  { id: 'station-5', name: 'East Park & Charge', position: { x: 800, y: 200 }, status: 'available', connectors: [{ type: 'CCS', power: '50kW', available: 2, total: 2 }] },
];

const initialAlerts: Alert[] = [
  { id: 'alert-1', position: { x: 450, y: 160 }, message: 'Heavy congestion near exit 4.', severity: 'high' },
  { id: 'alert-2', position: { x: 200, y: 400 }, message: 'Roadwork ahead, expect delays.', severity: 'medium' },
];

const generateHeatmapData = (gridSize: number, intensity: number): HeatmapData[] => {
  const data: HeatmapData[] = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Create clusters of high values
      const val1 = Math.exp(-((i - 8) ** 2 + (j - 5) ** 2) / 20) * intensity;
      const val2 = Math.exp(-((i - 18) ** 2 + (j - 15) ** 2) / 30) * intensity;
      const val3 = Math.exp(-((i - 5) ** 2 + (j - 20) ** 2) / 25) * intensity;
      data.push({ x: i, y: j, value: Math.min(1, val1 + val2 + val3 + Math.random() * 0.1) });
    }
  }
  return data;
};


const generateTrafficSegments = (): TrafficSegment[] => {
  const segments: TrafficSegment[] = [];
  let remaining = 100;
  while (remaining > 0) {
    const length = Math.random() * (Math.min(remaining, 40)) + 5;
    const type = Math.random();
    let color = 'rgba(34, 197, 94, 0.6)'; // green
    if (type > 0.7 && type <= 0.9) color = 'rgba(234, 179, 8, 0.6)'; // yellow
    if (type > 0.9) color = 'rgba(239, 68, 68, 0.7)'; // red
    segments.push({ color, lengthPercentage: Math.min(length, remaining) });
    remaining -= length;
  }
  return segments;
};

const randomizeData = () => {
    initialRoutes = initialRoutes.map(route => ({
        ...route,
        distance: parseFloat((route.distance * (0.95 + Math.random() * 0.1)).toFixed(1)),
        duration: Math.round(route.duration * (0.8 + Math.random() * 0.4)),
        energyConsumption: parseFloat((route.energyConsumption * (0.9 + Math.random() * 0.2)).toFixed(1)),
        trafficSegments: generateTrafficSegments(),
    }));

    initialStations = initialStations.map(station => {
        const randomStatus = Math.random();
        let status: StationStatus;
        if (randomStatus < 0.7) status = 'available';
        else if (randomStatus < 0.9) status = 'occupied';
        else status = 'maintenance';
        return {
            ...station,
            status,
            connectors: station.connectors.map(c => ({
                ...c,
                available: status === 'available' ? Math.floor(Math.random() * (c.total + 1)) : 0,
            }))
        }
    });
};

// Initial data generation
randomizeData();

export const congestionHeatmap = generateHeatmapData(25, 1.2);
export const demandHeatmap = generateHeatmapData(25, 1.0);


export const getDashboardData = () => {
    randomizeData();
    return {
        routes: [...initialRoutes],
        stations: [...initialStations],
        alerts: [...initialAlerts],
    }
};
