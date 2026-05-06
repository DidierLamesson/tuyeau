import { get, set, update } from 'idb-keyval';
import {
  DEFAULT_SETTINGS,
  daysBetween,
  statusFromDays,
  ymd,
  type EventGroup,
  type EventSource,
  type Group,
  type Settings,
  type Status,
  type WateringEvent,
} from './model';

const KEY_EVENTS = 'tuyeau:events';
const KEY_SETTINGS = 'tuyeau:settings';

function uid(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function getEvents(): Promise<WateringEvent[]> {
  return (await get<WateringEvent[]>(KEY_EVENTS)) ?? [];
}

export async function addEvent(group: EventGroup, source: EventSource = 'manual'): Promise<WateringEvent> {
  const e: WateringEvent = { id: uid(), date: new Date().toISOString(), group, source };
  await update<WateringEvent[]>(KEY_EVENTS, (cur) => [...(cur ?? []), e]);
  return e;
}

export async function removeEvent(id: string): Promise<void> {
  await update<WateringEvent[]>(KEY_EVENTS, (cur) => (cur ?? []).filter((e) => e.id !== id));
}

export async function clearEvents(): Promise<void> {
  await set(KEY_EVENTS, []);
}

export async function getSettings(): Promise<Settings> {
  const stored = await get<Partial<Settings>>(KEY_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...(stored ?? {}) };
}

export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const cur = await getSettings();
  const next = { ...cur, ...patch };
  await set(KEY_SETTINGS, next);
  return next;
}

export interface GroupState {
  lastWateredAt: string | null;
  daysSince: number | null;
  status: Status;
}

export function lastEventForGroup(events: WateringEvent[], g: Group): WateringEvent | null {
  const matches = events.filter((e) => e.group === g || e.group === 'both');
  if (!matches.length) return null;
  return matches.reduce((a, b) => (a.date > b.date ? a : b));
}

export function getGroupState(events: WateringEvent[], g: Group, max: number): GroupState {
  const last = lastEventForGroup(events, g);
  if (!last) return { lastWateredAt: null, daysSince: null, status: 'late' };
  const days = daysBetween(last.date);
  return { lastWateredAt: last.date, daysSince: days, status: statusFromDays(days, max) };
}

export function getStreak(events: WateringEvent[]): number {
  if (!events.length) return 0;
  const days = new Set(events.map((e) => ymd(new Date(e.date))));
  let n = 0;
  const cursor = new Date();
  while (days.has(ymd(cursor))) {
    n += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

export function eventsByDay(events: WateringEvent[]): Map<string, { indoor: boolean; outdoor: boolean }> {
  const map = new Map<string, { indoor: boolean; outdoor: boolean }>();
  for (const e of events) {
    const key = ymd(new Date(e.date));
    const cur = map.get(key) ?? { indoor: false, outdoor: false };
    if (e.group === 'indoor' || e.group === 'both') cur.indoor = true;
    if (e.group === 'outdoor' || e.group === 'both') cur.outdoor = true;
    map.set(key, cur);
  }
  return map;
}
