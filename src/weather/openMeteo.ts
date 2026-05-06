import type { WeatherKind } from '../pixel/icons';

export interface WeatherSnapshot {
  kind: WeatherKind;
  tempC: number;
  description: string;
  rainTodayMm: number;
  fetchedAt: number; // ms timestamp
}

const CACHE_KEY = 'tuyeau:weather-cache';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1h

function wmoToKind(code: number): WeatherKind {
  if (code === 0) return 'sun';
  if (code >= 1 && code <= 3) return 'cloud';
  if (code >= 45 && code <= 48) return 'cloud'; // brouillard
  if (code >= 51 && code <= 67) return 'rain'; // bruine + pluie verglaçante
  if (code >= 71 && code <= 77) return 'rain'; // neige (réutilise pluie pour v1)
  if (code >= 80 && code <= 82) return 'rain'; // averses
  if (code >= 85 && code <= 86) return 'rain';
  if (code >= 95) return 'storm';
  return 'cloud';
}

function wmoToText(code: number): string {
  if (code === 0) return 'Ciel dégagé';
  if (code <= 2) return 'Peu nuageux';
  if (code === 3) return 'Couvert';
  if (code <= 48) return 'Brouillard';
  if (code <= 57) return 'Bruine';
  if (code <= 67) return 'Pluie';
  if (code <= 77) return 'Neige';
  if (code <= 82) return 'Averses';
  if (code <= 86) return 'Neige';
  return 'Orage';
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherSnapshot> {
  const cached = readCache(lat, lon);
  if (cached) return cached;

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set('current', 'temperature_2m,weather_code');
  url.searchParams.set('daily', 'precipitation_sum');
  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('forecast_days', '1');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('weather fetch failed');
  const data = await res.json();

  const code = data.current?.weather_code ?? 1;
  const snap: WeatherSnapshot = {
    kind: wmoToKind(code),
    tempC: Math.round(data.current?.temperature_2m ?? 0),
    description: wmoToText(code),
    rainTodayMm: data.daily?.precipitation_sum?.[0] ?? 0,
    fetchedAt: Date.now(),
  };
  writeCache(lat, lon, snap);
  return snap;
}

function readCache(lat: number, lon: number): WeatherSnapshot | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (obj.lat !== lat || obj.lon !== lon) return null;
    if (Date.now() - obj.snap.fetchedAt > CACHE_TTL_MS) return null;
    return obj.snap;
  } catch {
    return null;
  }
}

function writeCache(lat: number, lon: number, snap: WeatherSnapshot): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ lat, lon, snap }));
  } catch {
    /* quota */
  }
}

export function requestLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('geo unsupported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { maximumAge: 60 * 60 * 1000, timeout: 10000 }
    );
  });
}
