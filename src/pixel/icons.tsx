import type { CSSProperties } from 'react';

const PIXEL: CSSProperties = { imageRendering: 'pixelated', shapeRendering: 'crispEdges' };

interface IconProps {
  size?: number;
}

// Tilted watering can pouring water — pixel-style SVG
export function WateringCan({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      {/* body */}
      <rect x="3" y="6" width="7" height="6" fill="#5a8a3a" />
      <rect x="3" y="6" width="7" height="1" fill="#9bbf6f" />
      <rect x="3" y="11" width="7" height="1" fill="#3d6b25" />
      {/* spout */}
      <rect x="10" y="7" width="3" height="2" fill="#5a8a3a" />
      <rect x="13" y="7" width="1" height="3" fill="#5a8a3a" />
      {/* handle */}
      <rect x="2" y="5" width="1" height="3" fill="#3d6b25" />
      <rect x="2" y="4" width="3" height="1" fill="#3d6b25" />
      {/* lid */}
      <rect x="5" y="5" width="3" height="1" fill="#3d6b25" />
      {/* water */}
      <rect x="13" y="10" width="1" height="2" fill="#6fa8d6" />
      <rect x="13" y="13" width="1" height="1" fill="#6fa8d6" />
    </svg>
  );
}

export function PlantIndoor({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      {/* pot */}
      <rect x="4" y="11" width="8" height="4" fill="#c46b4f" />
      <rect x="4" y="11" width="8" height="1" fill="#8a4a35" />
      <rect x="3" y="10" width="10" height="1" fill="#8a4a35" />
      {/* leaves */}
      <rect x="7" y="3" width="2" height="7" fill="#3d6b25" />
      <rect x="5" y="5" width="2" height="2" fill="#5a8a3a" />
      <rect x="9" y="5" width="2" height="2" fill="#5a8a3a" />
      <rect x="4" y="7" width="2" height="2" fill="#5a8a3a" />
      <rect x="10" y="7" width="2" height="2" fill="#5a8a3a" />
      <rect x="6" y="2" width="1" height="2" fill="#5a8a3a" />
      <rect x="9" y="2" width="1" height="2" fill="#5a8a3a" />
    </svg>
  );
}

export function PlantOutdoor({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      {/* grass */}
      <rect x="0" y="14" width="16" height="2" fill="#5a8a3a" />
      {/* tree */}
      <rect x="7" y="8" width="2" height="6" fill="#8a4a35" />
      <rect x="5" y="3" width="6" height="6" fill="#3d6b25" />
      <rect x="4" y="4" width="1" height="4" fill="#3d6b25" />
      <rect x="11" y="4" width="1" height="4" fill="#3d6b25" />
      <rect x="6" y="2" width="4" height="1" fill="#5a8a3a" />
      <rect x="6" y="5" width="1" height="1" fill="#9bbf6f" />
      <rect x="9" y="6" width="1" height="1" fill="#9bbf6f" />
    </svg>
  );
}

export function WeatherSun({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      <rect x="6" y="6" width="4" height="4" fill="#f0d264" />
      <rect x="5" y="5" width="6" height="6" fill="#f0d264" />
      <rect x="7" y="2" width="2" height="2" fill="#f0d264" />
      <rect x="7" y="12" width="2" height="2" fill="#f0d264" />
      <rect x="2" y="7" width="2" height="2" fill="#f0d264" />
      <rect x="12" y="7" width="2" height="2" fill="#f0d264" />
      <rect x="3" y="3" width="1" height="1" fill="#f0d264" />
      <rect x="12" y="3" width="1" height="1" fill="#f0d264" />
      <rect x="3" y="12" width="1" height="1" fill="#f0d264" />
      <rect x="12" y="12" width="1" height="1" fill="#f0d264" />
    </svg>
  );
}

export function WeatherCloud({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      <rect x="3" y="8" width="10" height="3" fill="#d0d8e0" />
      <rect x="4" y="7" width="3" height="1" fill="#d0d8e0" />
      <rect x="9" y="6" width="4" height="2" fill="#d0d8e0" />
      <rect x="2" y="9" width="1" height="1" fill="#a8b0b8" />
      <rect x="13" y="9" width="1" height="1" fill="#a8b0b8" />
      <rect x="3" y="11" width="10" height="1" fill="#a8b0b8" />
    </svg>
  );
}

export function WeatherRain({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      <rect x="3" y="4" width="10" height="3" fill="#88a8c4" />
      <rect x="4" y="3" width="3" height="1" fill="#88a8c4" />
      <rect x="9" y="2" width="4" height="2" fill="#88a8c4" />
      <rect x="3" y="7" width="10" height="1" fill="#6a8aa6" />
      <rect x="4" y="9" width="1" height="2" fill="#6fa8d6" />
      <rect x="7" y="9" width="1" height="2" fill="#6fa8d6" />
      <rect x="10" y="9" width="1" height="2" fill="#6fa8d6" />
      <rect x="5" y="12" width="1" height="2" fill="#6fa8d6" />
      <rect x="8" y="12" width="1" height="2" fill="#6fa8d6" />
      <rect x="11" y="12" width="1" height="2" fill="#6fa8d6" />
    </svg>
  );
}

export function WeatherStorm({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      <rect x="3" y="3" width="10" height="3" fill="#6a6e78" />
      <rect x="4" y="2" width="3" height="1" fill="#6a6e78" />
      <rect x="9" y="1" width="4" height="2" fill="#6a6e78" />
      <rect x="3" y="6" width="10" height="1" fill="#4a4e58" />
      <rect x="7" y="8" width="2" height="2" fill="#f0d264" />
      <rect x="6" y="10" width="2" height="2" fill="#f0d264" />
      <rect x="8" y="12" width="1" height="2" fill="#f0d264" />
    </svg>
  );
}

export type WeatherKind = 'sun' | 'cloud' | 'rain' | 'storm';

export function WeatherIcon({ kind, size = 40 }: { kind: WeatherKind; size?: number }) {
  if (kind === 'sun') return <WeatherSun size={size} />;
  if (kind === 'cloud') return <WeatherCloud size={size} />;
  if (kind === 'rain') return <WeatherRain size={size} />;
  return <WeatherStorm size={size} />;
}
