
import React from 'react';
import type { Route } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartIcon } from './Icons';

interface RouteDetailsProps {
  selectedRoute: Route;
  allRoutes: Route[];
}

const RouteDetails: React.FC<RouteDetailsProps> = ({ selectedRoute, allRoutes }) => {
  const chartData = allRoutes.map(route => ({
    name: route.name.split(' - ')[1],
    distance: route.distance,
    energy: route.energyConsumption,
    fill: route.color,
  }));

  return (
    <div className="p-4 bg-gray-800/50 rounded-lg mt-4 border border-gray-700">
      <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center">
        <ChartIcon className="w-5 h-5 mr-2" />
        Route Analytics
      </h3>
      <div className="mb-4">
          <p className="text-sm text-gray-400">Comparing key metrics across all available routes.</p>
      </div>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
            <XAxis dataKey="name" stroke="#a0aec0" fontSize={12} />
            <YAxis yAxisId="left" orientation="left" stroke="#a0aec0" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="#a0aec0" fontSize={12} />
            <Tooltip
                contentStyle={{ 
                    backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                    borderColor: '#4a5568',
                    borderRadius: '0.5rem',
                }}
                labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend wrapperStyle={{fontSize: '12px'}}/>
            <Bar yAxisId="left" dataKey="distance" fill="#3b82f6" name="Distance (km)" />
            <Bar yAxisId="right" dataKey="energy" fill="#22c55e" name="Energy (kWh)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RouteDetails;
