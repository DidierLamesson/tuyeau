import type { CSSProperties } from 'react';

const PIXEL: CSSProperties = { imageRendering: 'pixelated', shapeRendering: 'crispEdges' };

interface IconProps {
  size?: number;
}

/* Palette
   ──────────────────────────────────────────────────────────────
   ink     #1a1a1a   outline
   ink-soft #4a4a4a  secondary outline / details
   greens  #1f3a12   moss-darkest (deep shade)
            #3d6b25   moss-dark    (shade)
            #6fa342   moss         (base)
            #b5d490   moss-light   (highlight)
            #e0f0c8   moss-bright  (specular)
   browns  #4a2614   wood-darkest
            #6e3a1c   wood-dark
            #a05a30   wood
            #d09060   wood-light
            #f0c898   wood-bright
   waters  #1d4a6e   water-darkest
            #3a6f9c   water-dark
            #6fa8d6   water
            #b8d4ea   water-light
            #e0f0ff   water-bright
   sun     #c89c30   sun-dark
            #f0d264   sun
            #fce080   sun-light
            #fff4b8   sun-bright
   cloud   #6e7886   cloud-darkest
            #98a4b0   cloud-dark
            #c8d0d8   cloud
            #ffffff   cloud-light
*/

// ─── 32×32 sprites — main visuals ───────────────────────────────────────────

export function WateringCan({ size = 48 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={PIXEL}>
      {/* handle (back loop) */}
      <rect x="6" y="6" width="9" height="2" fill="#1a1a1a" />
      <rect x="5" y="8" width="2" height="6" fill="#1a1a1a" />
      <rect x="14" y="8" width="2" height="3" fill="#1a1a1a" />
      <rect x="6" y="9" width="1" height="4" fill="#3d6b25" />
      <rect x="14" y="9" width="1" height="2" fill="#3d6b25" />

      {/* lid disk (top opening) */}
      <rect x="11" y="9" width="6" height="1" fill="#1a1a1a" />
      <rect x="10" y="10" width="8" height="1" fill="#1a1a1a" />
      <rect x="11" y="10" width="6" height="1" fill="#3d6b25" />
      <rect x="11" y="11" width="6" height="1" fill="#1f3a12" />

      {/* body outline */}
      <rect x="9" y="11" width="1" height="2" fill="#1a1a1a" />
      <rect x="18" y="11" width="1" height="2" fill="#1a1a1a" />
      <rect x="8" y="13" width="1" height="11" fill="#1a1a1a" />
      <rect x="22" y="13" width="1" height="11" fill="#1a1a1a" />
      <rect x="9" y="24" width="13" height="1" fill="#1a1a1a" />
      <rect x="10" y="25" width="11" height="1" fill="#1a1a1a" />

      {/* body fill — base */}
      <rect x="9" y="13" width="13" height="11" fill="#6fa342" />

      {/* highlight (top-left lit edge) */}
      <rect x="9" y="13" width="13" height="1" fill="#b5d490" />
      <rect x="9" y="13" width="2" height="11" fill="#b5d490" />
      <rect x="11" y="14" width="1" height="6" fill="#b5d490" />

      {/* shade (bottom-right) */}
      <rect x="20" y="14" width="2" height="10" fill="#3d6b25" />
      <rect x="9" y="23" width="13" height="1" fill="#3d6b25" />
      <rect x="10" y="24" width="11" height="1" fill="#1f3a12" />
      <rect x="21" y="13" width="1" height="11" fill="#1f3a12" />

      {/* belly highlight band */}
      <rect x="12" y="15" width="1" height="2" fill="#e0f0c8" />
      <rect x="13" y="14" width="1" height="1" fill="#e0f0c8" />

      {/* spout */}
      <rect x="22" y="14" width="6" height="1" fill="#1a1a1a" />
      <rect x="22" y="18" width="6" height="1" fill="#1a1a1a" />
      <rect x="28" y="14" width="1" height="5" fill="#1a1a1a" />
      <rect x="29" y="13" width="1" height="2" fill="#1a1a1a" />
      <rect x="29" y="18" width="1" height="2" fill="#1a1a1a" />
      <rect x="22" y="15" width="6" height="3" fill="#6fa342" />
      <rect x="22" y="15" width="6" height="1" fill="#b5d490" />
      <rect x="22" y="17" width="6" height="1" fill="#3d6b25" />
      <rect x="29" y="15" width="1" height="3" fill="#6fa342" />

      {/* water stream */}
      <rect x="29" y="20" width="1" height="2" fill="#3a6f9c" />
      <rect x="28" y="21" width="1" height="2" fill="#6fa8d6" />
      <rect x="28" y="22" width="1" height="3" fill="#3a6f9c" />
      <rect x="27" y="24" width="1" height="3" fill="#6fa8d6" />
      <rect x="26" y="26" width="1" height="2" fill="#b8d4ea" />
      <rect x="27" y="27" width="1" height="2" fill="#3a6f9c" />
      <rect x="28" y="28" width="2" height="1" fill="#1d4a6e" />
    </svg>
  );
}

export function PlantIndoor({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={PIXEL}>
      {/* leaves silhouette (outline) */}
      <rect x="13" y="3" width="6" height="1" fill="#1a1a1a" />
      <rect x="11" y="4" width="2" height="2" fill="#1a1a1a" />
      <rect x="19" y="4" width="2" height="2" fill="#1a1a1a" />
      <rect x="9" y="5" width="2" height="3" fill="#1a1a1a" />
      <rect x="21" y="5" width="2" height="3" fill="#1a1a1a" />
      <rect x="8" y="7" width="1" height="3" fill="#1a1a1a" />
      <rect x="23" y="7" width="1" height="3" fill="#1a1a1a" />
      <rect x="8" y="10" width="2" height="2" fill="#1a1a1a" />
      <rect x="22" y="10" width="2" height="2" fill="#1a1a1a" />
      <rect x="10" y="12" width="2" height="1" fill="#1a1a1a" />
      <rect x="20" y="12" width="2" height="1" fill="#1a1a1a" />
      <rect x="13" y="13" width="6" height="1" fill="#1a1a1a" />
      <rect x="12" y="13" width="1" height="1" fill="#1a1a1a" />
      <rect x="19" y="13" width="1" height="1" fill="#1a1a1a" />

      {/* leaves fill — base */}
      <rect x="13" y="4" width="6" height="9" fill="#6fa342" />
      <rect x="11" y="6" width="10" height="6" fill="#6fa342" />
      <rect x="9" y="8" width="14" height="3" fill="#6fa342" />

      {/* highlights (top-left) */}
      <rect x="13" y="4" width="6" height="1" fill="#b5d490" />
      <rect x="11" y="6" width="2" height="2" fill="#b5d490" />
      <rect x="9" y="8" width="2" height="2" fill="#b5d490" />
      <rect x="13" y="5" width="1" height="3" fill="#b5d490" />

      {/* shading (bottom-right) */}
      <rect x="20" y="6" width="1" height="2" fill="#3d6b25" />
      <rect x="22" y="8" width="1" height="3" fill="#3d6b25" />
      <rect x="18" y="11" width="3" height="2" fill="#3d6b25" />
      <rect x="13" y="12" width="6" height="1" fill="#3d6b25" />
      <rect x="20" y="11" width="2" height="1" fill="#1f3a12" />
      <rect x="10" y="11" width="2" height="1" fill="#1f3a12" />

      {/* leaf veins (small specular highlight) */}
      <rect x="15" y="6" width="1" height="3" fill="#e0f0c8" />
      <rect x="11" y="9" width="2" height="1" fill="#e0f0c8" />
      <rect x="19" y="9" width="2" height="1" fill="#3d6b25" />

      {/* stem */}
      <rect x="15" y="13" width="2" height="3" fill="#6e3a1c" />
      <rect x="15" y="13" width="1" height="3" fill="#a05a30" />

      {/* pot (3/4 view: front face + top rim oval) */}
      {/* top rim ellipse */}
      <rect x="9" y="15" width="14" height="1" fill="#1a1a1a" />
      <rect x="10" y="16" width="12" height="1" fill="#a05a30" />
      <rect x="10" y="16" width="6" height="1" fill="#d09060" />
      <rect x="10" y="17" width="12" height="1" fill="#1a1a1a" />
      {/* pot body outline */}
      <rect x="10" y="18" width="1" height="6" fill="#1a1a1a" />
      <rect x="21" y="18" width="1" height="6" fill="#1a1a1a" />
      <rect x="11" y="24" width="10" height="1" fill="#1a1a1a" />
      <rect x="11" y="25" width="10" height="1" fill="#1a1a1a" />
      {/* pot fill */}
      <rect x="11" y="18" width="10" height="6" fill="#a05a30" />
      <rect x="11" y="18" width="2" height="6" fill="#d09060" />
      <rect x="11" y="18" width="10" height="1" fill="#d09060" />
      <rect x="13" y="18" width="1" height="2" fill="#f0c898" />
      <rect x="19" y="19" width="2" height="5" fill="#6e3a1c" />
      <rect x="11" y="23" width="10" height="1" fill="#6e3a1c" />
      <rect x="20" y="22" width="1" height="2" fill="#4a2614" />
    </svg>
  );
}

export function PlantOutdoor({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={PIXEL}>
      {/* foliage outline */}
      <rect x="11" y="3" width="10" height="1" fill="#1a1a1a" />
      <rect x="9" y="4" width="2" height="2" fill="#1a1a1a" />
      <rect x="21" y="4" width="2" height="2" fill="#1a1a1a" />
      <rect x="7" y="5" width="2" height="3" fill="#1a1a1a" />
      <rect x="23" y="5" width="2" height="3" fill="#1a1a1a" />
      <rect x="6" y="7" width="1" height="5" fill="#1a1a1a" />
      <rect x="25" y="7" width="1" height="5" fill="#1a1a1a" />
      <rect x="7" y="12" width="2" height="2" fill="#1a1a1a" />
      <rect x="23" y="12" width="2" height="2" fill="#1a1a1a" />
      <rect x="9" y="14" width="2" height="1" fill="#1a1a1a" />
      <rect x="21" y="14" width="2" height="1" fill="#1a1a1a" />
      <rect x="11" y="15" width="10" height="1" fill="#1a1a1a" />

      {/* foliage fill */}
      <rect x="11" y="4" width="10" height="11" fill="#3d6b25" />
      <rect x="9" y="6" width="14" height="8" fill="#3d6b25" />
      <rect x="7" y="8" width="18" height="4" fill="#3d6b25" />

      {/* foliage highlights (top-left) */}
      <rect x="11" y="4" width="6" height="1" fill="#6fa342" />
      <rect x="9" y="6" width="3" height="2" fill="#6fa342" />
      <rect x="7" y="8" width="3" height="3" fill="#6fa342" />
      <rect x="11" y="5" width="2" height="3" fill="#b5d490" />
      <rect x="13" y="5" width="1" height="1" fill="#b5d490" />
      <rect x="9" y="7" width="2" height="1" fill="#b5d490" />
      <rect x="8" y="9" width="2" height="1" fill="#b5d490" />

      {/* foliage shadows */}
      <rect x="20" y="11" width="3" height="3" fill="#1f3a12" />
      <rect x="22" y="9" width="3" height="2" fill="#1f3a12" />
      <rect x="14" y="13" width="6" height="2" fill="#1f3a12" />
      <rect x="20" y="14" width="2" height="1" fill="#1f3a12" />
      <rect x="11" y="14" width="3" height="1" fill="#264513" />

      {/* trunk */}
      <rect x="14" y="16" width="4" height="6" fill="#1a1a1a" />
      <rect x="15" y="16" width="3" height="5" fill="#6e3a1c" />
      <rect x="15" y="16" width="1" height="5" fill="#a05a30" />
      <rect x="17" y="17" width="1" height="4" fill="#4a2614" />

      {/* ground (oval) */}
      <rect x="6" y="22" width="20" height="1" fill="#1a1a1a" />
      <rect x="5" y="23" width="22" height="1" fill="#1a1a1a" />
      <rect x="4" y="24" width="24" height="2" fill="#1a1a1a" />
      <rect x="5" y="26" width="22" height="1" fill="#1a1a1a" />
      <rect x="6" y="27" width="20" height="1" fill="#1a1a1a" />
      <rect x="6" y="23" width="20" height="1" fill="#6fa342" />
      <rect x="5" y="24" width="22" height="2" fill="#6fa342" />
      <rect x="6" y="26" width="20" height="1" fill="#3d6b25" />
      <rect x="5" y="24" width="6" height="1" fill="#b5d490" />
      <rect x="20" y="25" width="6" height="1" fill="#3d6b25" />
    </svg>
  );
}

export function WeatherSun({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={PIXEL}>
      {/* rays */}
      <rect x="14" y="3" width="4" height="3" fill="#c89c30" />
      <rect x="14" y="2" width="4" height="1" fill="#1a1a1a" />
      <rect x="13" y="3" width="1" height="3" fill="#1a1a1a" />
      <rect x="18" y="3" width="1" height="3" fill="#1a1a1a" />
      <rect x="14" y="3" width="4" height="1" fill="#fce080" />

      <rect x="14" y="26" width="4" height="3" fill="#c89c30" />
      <rect x="14" y="29" width="4" height="1" fill="#1a1a1a" />
      <rect x="13" y="26" width="1" height="3" fill="#1a1a1a" />
      <rect x="18" y="26" width="1" height="3" fill="#1a1a1a" />

      <rect x="3" y="14" width="3" height="4" fill="#c89c30" />
      <rect x="2" y="14" width="1" height="4" fill="#1a1a1a" />
      <rect x="3" y="13" width="3" height="1" fill="#1a1a1a" />
      <rect x="3" y="18" width="3" height="1" fill="#1a1a1a" />
      <rect x="3" y="14" width="1" height="4" fill="#fce080" />

      <rect x="26" y="14" width="3" height="4" fill="#c89c30" />
      <rect x="29" y="14" width="1" height="4" fill="#1a1a1a" />
      <rect x="26" y="13" width="3" height="1" fill="#1a1a1a" />
      <rect x="26" y="18" width="3" height="1" fill="#1a1a1a" />

      {/* diagonal rays */}
      <rect x="6" y="6" width="2" height="2" fill="#f0d264" />
      <rect x="5" y="5" width="2" height="2" fill="#1a1a1a" />
      <rect x="24" y="6" width="2" height="2" fill="#f0d264" />
      <rect x="25" y="5" width="2" height="2" fill="#1a1a1a" />
      <rect x="6" y="24" width="2" height="2" fill="#f0d264" />
      <rect x="5" y="25" width="2" height="2" fill="#1a1a1a" />
      <rect x="24" y="24" width="2" height="2" fill="#f0d264" />
      <rect x="25" y="25" width="2" height="2" fill="#1a1a1a" />

      {/* sun disk outline */}
      <rect x="12" y="8" width="8" height="1" fill="#1a1a1a" />
      <rect x="10" y="9" width="2" height="1" fill="#1a1a1a" />
      <rect x="20" y="9" width="2" height="1" fill="#1a1a1a" />
      <rect x="9" y="10" width="1" height="2" fill="#1a1a1a" />
      <rect x="22" y="10" width="1" height="2" fill="#1a1a1a" />
      <rect x="8" y="12" width="1" height="8" fill="#1a1a1a" />
      <rect x="23" y="12" width="1" height="8" fill="#1a1a1a" />
      <rect x="9" y="20" width="1" height="2" fill="#1a1a1a" />
      <rect x="22" y="20" width="1" height="2" fill="#1a1a1a" />
      <rect x="10" y="22" width="2" height="1" fill="#1a1a1a" />
      <rect x="20" y="22" width="2" height="1" fill="#1a1a1a" />
      <rect x="12" y="23" width="8" height="1" fill="#1a1a1a" />

      {/* sun fill */}
      <rect x="12" y="9" width="8" height="14" fill="#f0d264" />
      <rect x="10" y="10" width="12" height="12" fill="#f0d264" />
      <rect x="9" y="12" width="14" height="8" fill="#f0d264" />

      {/* highlight */}
      <rect x="11" y="10" width="3" height="2" fill="#fce080" />
      <rect x="10" y="12" width="2" height="3" fill="#fce080" />
      <rect x="14" y="10" width="2" height="1" fill="#fff4b8" />
      <rect x="11" y="11" width="2" height="1" fill="#fff4b8" />

      {/* shadow */}
      <rect x="20" y="19" width="2" height="3" fill="#c89c30" />
      <rect x="18" y="21" width="3" height="1" fill="#c89c30" />
      <rect x="21" y="13" width="1" height="6" fill="#c89c30" />
    </svg>
  );
}

export function WeatherCloud({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={PIXEL}>
      {/* cloud outline */}
      <rect x="11" y="6" width="6" height="1" fill="#1a1a1a" />
      <rect x="9" y="7" width="2" height="2" fill="#1a1a1a" />
      <rect x="17" y="7" width="3" height="1" fill="#1a1a1a" />
      <rect x="20" y="8" width="2" height="1" fill="#1a1a1a" />
      <rect x="22" y="9" width="2" height="2" fill="#1a1a1a" />
      <rect x="24" y="11" width="2" height="2" fill="#1a1a1a" />
      <rect x="26" y="13" width="2" height="6" fill="#1a1a1a" />
      <rect x="24" y="19" width="2" height="2" fill="#1a1a1a" />
      <rect x="22" y="20" width="3" height="2" fill="#1a1a1a" />
      <rect x="8" y="20" width="14" height="2" fill="#1a1a1a" />
      <rect x="6" y="18" width="2" height="2" fill="#1a1a1a" />
      <rect x="5" y="14" width="1" height="4" fill="#1a1a1a" />
      <rect x="6" y="12" width="1" height="2" fill="#1a1a1a" />
      <rect x="7" y="10" width="2" height="2" fill="#1a1a1a" />
      <rect x="9" y="9" width="2" height="1" fill="#1a1a1a" />

      {/* cloud fill */}
      <rect x="11" y="7" width="6" height="1" fill="#ffffff" />
      <rect x="9" y="8" width="11" height="2" fill="#ffffff" />
      <rect x="9" y="10" width="13" height="1" fill="#ffffff" />
      <rect x="7" y="11" width="17" height="2" fill="#ffffff" />
      <rect x="6" y="13" width="20" height="3" fill="#ffffff" />
      <rect x="6" y="16" width="20" height="2" fill="#c8d0d8" />
      <rect x="8" y="18" width="16" height="2" fill="#c8d0d8" />
      <rect x="9" y="20" width="13" height="0" fill="#c8d0d8" />

      {/* highlights */}
      <rect x="11" y="8" width="4" height="1" fill="#ffffff" />
      <rect x="9" y="9" width="2" height="1" fill="#ffffff" />
      <rect x="13" y="10" width="3" height="1" fill="#ffffff" />

      {/* darker underside */}
      <rect x="6" y="19" width="20" height="1" fill="#98a4b0" />
      <rect x="8" y="20" width="14" height="1" fill="#98a4b0" />
    </svg>
  );
}

export function WeatherRain({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={PIXEL}>
      {/* cloud outline (compact, top half) */}
      <rect x="9" y="3" width="6" height="1" fill="#1a1a1a" />
      <rect x="7" y="4" width="2" height="2" fill="#1a1a1a" />
      <rect x="15" y="4" width="3" height="1" fill="#1a1a1a" />
      <rect x="18" y="5" width="2" height="1" fill="#1a1a1a" />
      <rect x="20" y="6" width="2" height="2" fill="#1a1a1a" />
      <rect x="22" y="8" width="2" height="2" fill="#1a1a1a" />
      <rect x="24" y="10" width="2" height="4" fill="#1a1a1a" />
      <rect x="22" y="14" width="3" height="2" fill="#1a1a1a" />
      <rect x="6" y="14" width="16" height="2" fill="#1a1a1a" />
      <rect x="4" y="12" width="2" height="2" fill="#1a1a1a" />
      <rect x="3" y="9" width="1" height="3" fill="#1a1a1a" />
      <rect x="4" y="8" width="1" height="1" fill="#1a1a1a" />
      <rect x="5" y="6" width="2" height="2" fill="#1a1a1a" />
      <rect x="7" y="5" width="2" height="1" fill="#1a1a1a" />

      {/* cloud fill (darker) */}
      <rect x="9" y="4" width="6" height="1" fill="#c8d0d8" />
      <rect x="7" y="5" width="11" height="1" fill="#c8d0d8" />
      <rect x="7" y="6" width="13" height="1" fill="#c8d0d8" />
      <rect x="5" y="7" width="17" height="1" fill="#c8d0d8" />
      <rect x="5" y="8" width="19" height="2" fill="#c8d0d8" />
      <rect x="4" y="10" width="20" height="2" fill="#c8d0d8" />
      <rect x="4" y="12" width="20" height="2" fill="#98a4b0" />
      <rect x="6" y="14" width="16" height="1" fill="#98a4b0" />

      {/* cloud highlights */}
      <rect x="9" y="5" width="4" height="1" fill="#ffffff" />
      <rect x="7" y="6" width="2" height="1" fill="#ffffff" />
      <rect x="13" y="7" width="3" height="1" fill="#ffffff" />

      {/* rain drops */}
      <rect x="7" y="17" width="1" height="3" fill="#3a6f9c" />
      <rect x="7" y="20" width="1" height="2" fill="#6fa8d6" />
      <rect x="11" y="18" width="1" height="3" fill="#3a6f9c" />
      <rect x="11" y="21" width="1" height="2" fill="#6fa8d6" />
      <rect x="15" y="17" width="1" height="3" fill="#3a6f9c" />
      <rect x="15" y="20" width="1" height="2" fill="#6fa8d6" />
      <rect x="19" y="18" width="1" height="3" fill="#3a6f9c" />
      <rect x="19" y="21" width="1" height="2" fill="#6fa8d6" />
      <rect x="9" y="22" width="1" height="3" fill="#3a6f9c" />
      <rect x="13" y="23" width="1" height="3" fill="#3a6f9c" />
      <rect x="17" y="23" width="1" height="3" fill="#3a6f9c" />
      <rect x="21" y="22" width="1" height="3" fill="#3a6f9c" />
      <rect x="9" y="25" width="1" height="2" fill="#1d4a6e" />
      <rect x="13" y="26" width="1" height="2" fill="#1d4a6e" />
      <rect x="17" y="26" width="1" height="2" fill="#1d4a6e" />
      <rect x="21" y="25" width="1" height="2" fill="#1d4a6e" />
    </svg>
  );
}

export function WeatherStorm({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={PIXEL}>
      {/* dark cloud outline */}
      <rect x="9" y="3" width="6" height="1" fill="#1a1a1a" />
      <rect x="7" y="4" width="2" height="2" fill="#1a1a1a" />
      <rect x="15" y="4" width="3" height="1" fill="#1a1a1a" />
      <rect x="18" y="5" width="2" height="1" fill="#1a1a1a" />
      <rect x="20" y="6" width="2" height="2" fill="#1a1a1a" />
      <rect x="22" y="8" width="2" height="2" fill="#1a1a1a" />
      <rect x="24" y="10" width="2" height="4" fill="#1a1a1a" />
      <rect x="22" y="14" width="3" height="2" fill="#1a1a1a" />
      <rect x="6" y="14" width="16" height="2" fill="#1a1a1a" />
      <rect x="4" y="12" width="2" height="2" fill="#1a1a1a" />
      <rect x="3" y="9" width="1" height="3" fill="#1a1a1a" />
      <rect x="4" y="8" width="1" height="1" fill="#1a1a1a" />
      <rect x="5" y="6" width="2" height="2" fill="#1a1a1a" />
      <rect x="7" y="5" width="2" height="1" fill="#1a1a1a" />

      {/* dark cloud fill */}
      <rect x="9" y="4" width="6" height="1" fill="#98a4b0" />
      <rect x="7" y="5" width="11" height="1" fill="#98a4b0" />
      <rect x="7" y="6" width="13" height="1" fill="#98a4b0" />
      <rect x="5" y="7" width="17" height="1" fill="#98a4b0" />
      <rect x="5" y="8" width="19" height="2" fill="#98a4b0" />
      <rect x="4" y="10" width="20" height="2" fill="#6e7886" />
      <rect x="4" y="12" width="20" height="2" fill="#6e7886" />
      <rect x="6" y="14" width="16" height="1" fill="#4a4a4a" />

      {/* highlight on top */}
      <rect x="9" y="5" width="4" height="1" fill="#c8d0d8" />
      <rect x="7" y="6" width="2" height="1" fill="#c8d0d8" />

      {/* lightning bolt */}
      <rect x="14" y="16" width="4" height="2" fill="#1a1a1a" />
      <rect x="13" y="18" width="4" height="1" fill="#1a1a1a" />
      <rect x="12" y="19" width="4" height="2" fill="#1a1a1a" />
      <rect x="14" y="21" width="4" height="1" fill="#1a1a1a" />
      <rect x="13" y="22" width="4" height="2" fill="#1a1a1a" />
      <rect x="12" y="24" width="3" height="3" fill="#1a1a1a" />
      <rect x="15" y="17" width="2" height="1" fill="#fce080" />
      <rect x="14" y="18" width="3" height="1" fill="#f0d264" />
      <rect x="13" y="19" width="3" height="2" fill="#f0d264" />
      <rect x="15" y="21" width="2" height="1" fill="#fce080" />
      <rect x="14" y="22" width="3" height="2" fill="#f0d264" />
      <rect x="13" y="24" width="2" height="2" fill="#c89c30" />
    </svg>
  );
}

// ─── 16×16 UI sprites — kept small for inline use ───────────────────────────

export function Trash({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      {/* lid */}
      <rect x="3" y="3" width="10" height="1" fill="#1a1a1a" />
      <rect x="6" y="2" width="4" height="1" fill="#1a1a1a" />
      <rect x="6" y="2" width="2" height="1" fill="#4a4a4a" />
      {/* body outline */}
      <rect x="3" y="4" width="1" height="10" fill="#1a1a1a" />
      <rect x="12" y="4" width="1" height="10" fill="#1a1a1a" />
      <rect x="4" y="14" width="8" height="1" fill="#1a1a1a" />
      {/* body fill */}
      <rect x="4" y="4" width="8" height="10" fill="#fff" />
      <rect x="4" y="4" width="8" height="1" fill="#e0e0e0" />
      <rect x="11" y="5" width="1" height="9" fill="#c0c0c0" />
      {/* slats */}
      <rect x="6" y="6" width="1" height="6" fill="#4a4a4a" />
      <rect x="9" y="6" width="1" height="6" fill="#4a4a4a" />
    </svg>
  );
}

export function Floppy({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      {/* outer frame */}
      <rect x="2" y="2" width="12" height="12" fill="#3a6f9c" />
      <rect x="2" y="2" width="12" height="1" fill="#6fa8d6" />
      <rect x="2" y="3" width="1" height="11" fill="#6fa8d6" />
      <rect x="2" y="13" width="12" height="1" fill="#1d4a6e" />
      <rect x="13" y="2" width="1" height="12" fill="#1d4a6e" />
      {/* shutter */}
      <rect x="4" y="2" width="8" height="5" fill="#2a2a2a" />
      <rect x="4" y="2" width="8" height="1" fill="#1a1a1a" />
      <rect x="9" y="3" width="2" height="3" fill="#c0c0c0" />
      <rect x="9" y="3" width="1" height="3" fill="#e0e0e0" />
      {/* label */}
      <rect x="4" y="9" width="8" height="4" fill="#fff8e8" />
      <rect x="4" y="9" width="8" height="1" fill="#fff" />
      <rect x="5" y="10" width="6" height="1" fill="#a0a0a0" />
      <rect x="5" y="11" width="6" height="1" fill="#a0a0a0" />
    </svg>
  );
}

export function Clock({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      {/* outer frame (rounded square) */}
      <rect x="4" y="1" width="8" height="1" fill="#1a1a1a" />
      <rect x="2" y="2" width="2" height="1" fill="#1a1a1a" />
      <rect x="12" y="2" width="2" height="1" fill="#1a1a1a" />
      <rect x="1" y="3" width="1" height="1" fill="#1a1a1a" />
      <rect x="14" y="3" width="1" height="1" fill="#1a1a1a" />
      <rect x="1" y="4" width="1" height="8" fill="#1a1a1a" />
      <rect x="14" y="4" width="1" height="8" fill="#1a1a1a" />
      <rect x="1" y="12" width="1" height="1" fill="#1a1a1a" />
      <rect x="14" y="12" width="1" height="1" fill="#1a1a1a" />
      <rect x="2" y="13" width="2" height="1" fill="#1a1a1a" />
      <rect x="12" y="13" width="2" height="1" fill="#1a1a1a" />
      <rect x="4" y="14" width="8" height="1" fill="#1a1a1a" />
      {/* face */}
      <rect x="4" y="2" width="8" height="12" fill="#fff8e8" />
      <rect x="2" y="3" width="12" height="10" fill="#fff8e8" />
      <rect x="3" y="4" width="10" height="8" fill="#fff8e8" />
      {/* depth shading */}
      <rect x="3" y="3" width="10" height="1" fill="#e8dcc0" />
      <rect x="2" y="4" width="1" height="8" fill="#e8dcc0" />
      <rect x="3" y="12" width="10" height="1" fill="#e8dcc0" />
      <rect x="13" y="4" width="1" height="8" fill="#c0b090" />
      {/* hour ticks */}
      <rect x="7" y="3" width="2" height="1" fill="#1a1a1a" />
      <rect x="7" y="12" width="2" height="1" fill="#1a1a1a" />
      <rect x="2" y="7" width="1" height="2" fill="#1a1a1a" />
      <rect x="13" y="7" width="1" height="2" fill="#1a1a1a" />
      {/* hands */}
      <rect x="8" y="5" width="1" height="3" fill="#1a1a1a" />
      <rect x="9" y="8" width="3" height="1" fill="#c46b4f" />
      <rect x="8" y="8" width="1" height="1" fill="#1a1a1a" />
    </svg>
  );
}

export function Refresh({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={PIXEL}>
      {/* arc — circular outline minus top-right wedge */}
      <rect x="5" y="2" width="5" height="1" fill="#1a1a1a" />
      <rect x="3" y="3" width="2" height="1" fill="#1a1a1a" />
      <rect x="2" y="4" width="1" height="2" fill="#1a1a1a" />
      <rect x="2" y="6" width="1" height="4" fill="#1a1a1a" />
      <rect x="2" y="10" width="1" height="2" fill="#1a1a1a" />
      <rect x="3" y="12" width="2" height="1" fill="#1a1a1a" />
      <rect x="5" y="13" width="6" height="1" fill="#1a1a1a" />
      <rect x="11" y="12" width="2" height="1" fill="#1a1a1a" />
      <rect x="13" y="10" width="1" height="2" fill="#1a1a1a" />
      <rect x="13" y="7" width="1" height="3" fill="#1a1a1a" />
      {/* arc fill */}
      <rect x="5" y="3" width="5" height="1" fill="#5a8a3a" />
      <rect x="3" y="4" width="2" height="2" fill="#5a8a3a" />
      <rect x="3" y="6" width="1" height="4" fill="#5a8a3a" />
      <rect x="3" y="10" width="1" height="2" fill="#5a8a3a" />
      <rect x="4" y="12" width="1" height="1" fill="#5a8a3a" />
      <rect x="5" y="12" width="6" height="1" fill="#5a8a3a" />
      <rect x="11" y="11" width="2" height="1" fill="#5a8a3a" />
      <rect x="12" y="10" width="1" height="1" fill="#5a8a3a" />
      {/* arrow head pointing into the gap (top-right) */}
      <rect x="11" y="0" width="1" height="2" fill="#3d6b25" />
      <rect x="12" y="1" width="1" height="2" fill="#3d6b25" />
      <rect x="13" y="2" width="1" height="2" fill="#3d6b25" />
      <rect x="14" y="3" width="1" height="2" fill="#3d6b25" />
      <rect x="13" y="4" width="2" height="1" fill="#3d6b25" />
      <rect x="13" y="5" width="1" height="2" fill="#3d6b25" />
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
