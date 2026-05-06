import { useMemo, useState } from 'react';
import { addEventOnDate, removeEvent } from '../../store/db';
import { ymd, type EventGroup, type EventSource, type WateringEvent } from '../../store/model';
import { Trash } from '../../pixel/icons';

const MONTHS = ['JANV.', 'FEVR.', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUIL.', 'AOUT', 'SEPT.', 'OCT.', 'NOV.', 'DEC.'];
const DOW = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const DOW_SHORT = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
const MONTHS_SHORT = ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

interface DayInfo {
  indoor: boolean;
  outdoor: boolean;
  rain: boolean;
}

function buildIndex(events: WateringEvent[]): Map<string, DayInfo> {
  const map = new Map<string, DayInfo>();
  for (const e of events) {
    const key = ymd(new Date(e.date));
    const cur = map.get(key) ?? { indoor: false, outdoor: false, rain: false };
    if (e.group === 'indoor' || e.group === 'both') cur.indoor = true;
    if (e.group === 'outdoor' || e.group === 'both') {
      if (e.source === 'rain') cur.rain = true;
      else cur.outdoor = true;
    }
    map.set(key, cur);
  }
  return map;
}

function classFor(info: DayInfo | undefined): string {
  if (!info) return '';
  const { indoor, outdoor, rain } = info;
  if (indoor && rain && !outdoor) return 'cal-day--rain-indoor';
  if (indoor && (outdoor || rain)) return 'cal-day--both';
  if (rain && !outdoor) return 'cal-day--rain';
  if (outdoor) return 'cal-day--outdoor';
  if (indoor) return 'cal-day--indoor';
  return '';
}

function eventLabel(e: WateringEvent): string {
  if (e.source === 'rain') return 'Pluie';
  if (e.group === 'indoor') return 'Intérieur';
  if (e.group === 'outdoor') return 'Extérieur';
  return 'Tout';
}

function formatDayLabel(key: string): string {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const dow = DOW_SHORT[date.getDay()];
  const dd = String(d).padStart(2, '0');
  const mn = MONTHS_SHORT[m - 1];
  const yy = String(y).slice(-2);
  return `${dow} ${dd} ${mn} ${yy}`;
}

interface Props {
  events: WateringEvent[];
  refresh: () => void;
}

export default function CalendarScreen({ events, refresh }: Props) {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [openDay, setOpenDay] = useState<string | null>(null);

  const byDay = useMemo(() => buildIndex(events), [events]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  type Cell = { date: Date; inMonth: boolean };
  const cells: Cell[] = [];
  for (let i = firstDow - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month, -i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false });
  }

  function prev() { setCursor(new Date(year, month - 1, 1)); }
  function next() { setCursor(new Date(year, month + 1, 1)); }

  const todayKey = ymd(today);
  const openEvents = openDay ? events.filter((e) => ymd(new Date(e.date)) === openDay) : [];
  const isFuture = openDay ? openDay > todayKey : false;

  async function addOnOpenDay(group: EventGroup, source: EventSource) {
    if (!openDay) return;
    const [y, m, d] = openDay.split('-').map(Number);
    const iso = new Date(y, m - 1, d, 12, 0, 0).toISOString();
    await addEventOnDate(group, source, iso);
    refresh();
  }

  async function deleteEvent(id: string) {
    await removeEvent(id);
    refresh();
  }

  return (
    <div className="screen">
      <div className="h-row" style={{ justifyContent: 'space-between' }}>
        <button className="pix-btn pix-btn--ghost" onClick={prev}>{'<'}</button>
        <div style={{ fontSize: 12 }}>{MONTHS[month]} {year}</div>
        <button className="pix-btn pix-btn--ghost" onClick={next}>{'>'}</button>
      </div>

      <div className="cal-dow">
        {DOW.map((d, i) => <div key={i}>{d}</div>)}
      </div>

      <div className="cal-grid">
        {cells.map((c, i) => {
          const key = ymd(c.date);
          const info = byDay.get(key);
          const colorCls = classFor(info);
          const isToday = key === todayKey;
          const isSelected = key === openDay;
          const outCls = c.inMonth ? '' : 'cal-day--out';
          return (
            <button
              key={i}
              className={`cal-day ${colorCls} ${outCls} ${isToday ? 'cal-day--today' : ''} ${isSelected ? 'cal-day--selected' : ''}`}
              onClick={() => setOpenDay(key)}
            >
              {c.date.getDate()}
            </button>
          );
        })}
      </div>

      <Legend />

      {openDay && (
        <div className="pix-frame">
          <div className="h-stack" style={{ gap: 10 }}>
            <div className="h-row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 10 }}>{formatDayLabel(openDay)}</div>
              <button className="pix-btn pix-btn--ghost" onClick={() => setOpenDay(null)}>FERMER</button>
            </div>

            {openEvents.length > 0 ? (
              <div className="h-stack" style={{ gap: 6 }}>
                {openEvents.map((e) => (
                  <div key={e.id} className="h-row" style={{ justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <span className="meta" style={{ fontSize: 9 }}>· {eventLabel(e)}</span>
                    <button className="pix-btn pix-btn--icon pix-btn--danger" onClick={() => deleteEvent(e.id)} aria-label="Supprimer">
                      <Trash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="meta" style={{ fontSize: 9 }}>Rien ce jour-là</div>
            )}

            {!isFuture && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                <button className="pix-btn pix-btn--indoor" onClick={() => addOnOpenDay('indoor', 'manual')}>Int.</button>
                <button className="pix-btn pix-btn--outdoor" onClick={() => addOnOpenDay('outdoor', 'manual')}>Ext.</button>
                <button className="pix-btn pix-btn--rain" onClick={() => addOnOpenDay('outdoor', 'rain')}>Pluie</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Legend() {
  const sw = (bg: string) => ({
    width: 10,
    height: 10,
    background: bg,
    border: '2px solid var(--ink)',
    flexShrink: 0,
  });
  const item = { fontSize: 9, display: 'flex', alignItems: 'center', gap: 6 } as const;
  return (
    <div className="pix-frame">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <div className="meta" style={item}><span style={sw('var(--terracotta-soft)')} /> Intérieur</div>
        <div className="meta" style={item}><span style={sw('var(--sage)')} /> Extérieur</div>
        <div className="meta" style={item}><span style={sw('linear-gradient(135deg, var(--terracotta-soft) 50%, var(--sage) 50%)')} /> Int. + ext.</div>
        <div className="meta" style={item}><span style={sw('var(--water-soft)')} /> Pluie</div>
      </div>
    </div>
  );
}
