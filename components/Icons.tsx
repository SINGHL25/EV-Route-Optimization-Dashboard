
import React from 'react';

// FIX: Updated component to accept all standard SVG props
export const EvCarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </svg>
);

// FIX: Updated component to accept all standard SVG props
export const ChargingStationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17 3H7V2H5v1H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 15h- эстети-3v-4H9V9h4V5l4 6H13v3z" />
    <path d="M9 9h4V5l4 6h-3v3h-2v4H9z" />
  </svg>
);

// FIX: Updated component to accept all standard SVG props
export const WarningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);

// FIX: Updated component to accept all standard SVG props
export const RouteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M19.74,6.26l-3-3a.9959.9959,0,0,0-1.41,0L13.62,5,19,10.38l1.71-1.71A.9959.9959,0,0,0,19.74,6.26ZM12.21,6.4,4,14.61V19H8.39l8.21-8.21Z"/></svg>
);

// FIX: Updated component to accept all standard SVG props
export const ChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M16,20H4V4H6V18H16Zm2-4H8V14h4V8h4Zm4-12H12V2H20Z"/></svg>
);

// FIX: Updated component to accept all standard SVG props
export const LayersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12,18.54,4.22,14.47l7.78-4.22,7.78,4.22ZM12,2,1,7.5,12,13,23,7.5Z"/></svg>
);

// FIX: Updated component to accept all standard SVG props
export const BoltIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.4-.68.66-1.02l4.02-6.03c.19-.28.53-.26.7-.02.17.24.15.55-.04.83L9.5 12H13l-1 7h1l-1-7h3.5c.58 0 .57.32.38.66-.19.34-.4.68-.66 1.02l-4.02 6.03c-.19.28-.53-.26-.7.02-.17-.24-.15.55.04.83L14.5 12H11l1 9z" />
  </svg>
);
