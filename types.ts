
export type RouteType = 'fastest' | 'eco' | 'low-congestion';

export interface TrafficSegment {
  color: string;
  lengthPercentage: number;
}

export interface Route {
  id: string;
  name: string;
  type: RouteType;
  path: string;
  distance: number;
  duration: number;
  energyConsumption: number;
  trafficSegments: TrafficSegment[];
  color: string;
}

export type StationStatus = 'available' | 'occupied' | 'maintenance';

export interface Connector {
  type: string;
  power: string;
  available: number;
  total: number;
}

export interface Station {
  id: string;
  name: string;
  position: { x: number; y: number };
  status: StationStatus;
  connectors: Connector[];
}

export interface Alert {
  id: string;
  position: { x: number; y: number };
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface HeatmapData {
  x: number;
  y: number;
  value: number;
}
