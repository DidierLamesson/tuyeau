import { APARTMENT_LAT, APARTMENT_LON } from '../store/model';
import type { WeatherKind } from '../pixel/icons';

export interface WeatherSnapshot {
  kind: WeatherKind;
  tempC: number;
  description: string;
  rainTodayMm: number;
  fetchedAt: number;
}

const CACHE_KEY = 'tuyeau:weather-cache:v2';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 min

function wmoToKind(code: number): WeatherKind {
  if (code === 0) return 'sun';
  if (code >= 1 && code <= 3) return 'cloud';
  if (code >= 45 && code <= 48) return 'cloud';
  if (code >= 51 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'rain';
  if (code >= 80 && code <= 82) return 'rain';
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

export async function fetchWeather(force = false): Promise<WeatherSnapshot> {
  if (!force) {
    const cached = readCache();
    if (cached) return cached;
  }

  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(APARTMENT_LAT));
  url.searchParams.set('longitude', String(APARTMENT_LON));
  url.searchParams.set('current', 'temperature_2m,weather_code');
  url.searchParams.set('daily', 'rain_sum,showers_sum');
  url.searchParams.set('timezone', 'auto');
  url.searchParams.set('forecast_days', '1');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('weather fetch failed');
  const data = await res.json();

  const code = data.current?.weather_code ?? 1;
  const rain = data.daily?.rain_sum?.[0] ?? 0;
  const showers = data.daily?.showers_sum?.[0] ?? 0;
  const snap: WeatherSnapshot = {
    kind: wmoToKind(code),
    tempC: Math.round(data.current?.temperature_2m ?? 0),
    description: wmoToText(code),
    rainTodayMm: rain + showers,
    fetchedAt: Date.now(),
  };
  writeCache(snap);
  return snap;
}

function readCache(): WeatherSnapshot | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const snap = JSON.parse(raw) as WeatherSnapshot;
    if (Date.now() - snap.fetchedAt > CACHE_TTL_MS) return null;
    return snap;
  } catch {
    return null;
  }
}

function writeCache(snap: WeatherSnapshot): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(snap));
  } catch {
    /* quota */
  }
}
