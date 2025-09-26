
import React from 'react';
import type { Station } from '../types';
import { ChargingStationIcon, BoltIcon } from './Icons';

interface StationPopupProps {
  station: Station;
  onClose: () => void;
}

const statusClasses: { [key in Station['status']]: { bg: string; text: string } } = {
  available: { bg: 'bg-green-500', text: 'text-green-500' },
  occupied: { bg: 'bg-red-500', text: 'text-red-500' },
  maintenance: { bg: 'bg-yellow-500', text: 'text-yellow-500' },
};

const StationPopup: React.FC<StationPopupProps> = ({ station, onClose }) => {
  const statusInfo = statusClasses[station.status];

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-6 w-full max-w-sm text-gray-200"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">&times;</button>
        
        <div className="flex items-center mb-4">
          <ChargingStationIcon className="w-8 h-8 mr-3 text-blue-400" />
          <div>
            <h2 className="text-xl font-bold">{station.name}</h2>
            <div className="flex items-center mt-1">
              <span className={`w-3 h-3 rounded-full mr-2 ${statusInfo.bg}`}></span>
              <span className={`capitalize font-semibold ${statusInfo.text}`}>{station.status}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-1">Connectors</h3>
            {station.connectors.map((connector, index) => (
                <div key={index} className="bg-gray-700/50 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                        <span className="font-bold">{connector.type}</span>
                        <span className="text-gray-400 flex items-center"><BoltIcon className="w-4 h-4 mr-1 text-yellow-400"/> {connector.power}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-sm">
                        <span>Availability</span>
                        <span className="font-mono bg-gray-900 px-2 py-0.5 rounded">{connector.available} / {connector.total}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StationPopup;
