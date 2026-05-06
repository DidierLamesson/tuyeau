export type Group = 'indoor' | 'outdoor';
export type EventGroup = Group | 'both';
export type EventSource = 'manual' | 'rain';

export interface WateringEvent {
  id: string;
  date: string; // ISO timestamp
  group: EventGroup;
  source: EventSource;
}

export interface Settings {
  indoorMaxDays: number;
  outdoorMaxDays: number;
  rainThresholdMm: number;
  notifTime: string; // "HH:mm"
  lat: number | null;
  lon: number | null;
}

export const DEFAULT_SETTINGS: Settings = {
  indoorMaxDays: 7,
  outdoorMaxDays: 3,
  rainThresholdMm: 5,
  notifTime: '09:00',
  lat: null,
  lon: null,
};

export type Status = 'ok' | 'due' | 'late';

export function statusFromDays(daysSince: number, max: number): Status {
  if (daysSince >= max) return 'late';
  if (daysSince >= max - 1) return 'due';
  return 'ok';
}

export function daysBetween(fromIso: string, to: Date = new Date()): number {
  const from = new Date(fromIso);
  const ms = to.getTime() - from.getTime();
  return Math.floor(ms / 86_400_000);
}

export function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
