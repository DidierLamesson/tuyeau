import { useMemo, useState } from 'react';
import { ymd, type WateringEvent } from '../../store/model';

const MONTHS = ['JANV.', 'FEVR.', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUIL.', 'AOUT', 'SEPT.', 'OCT.', 'NOV.', 'DEC.'];
const DOW = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

interface DayInfo {
  indoor: boolean;
  outdoor: boolean;
  rain: boolean; // outdoor watered by rain
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

interface Props {
  events: WateringEvent[];
}

export default function CalendarScreen({ events }: Props) {
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
  // leading days from previous month
  for (let i = firstDow - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    cells.push({ date: d, inMonth: false });
  }
  // current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  // trailing to fill last week
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false });
  }

  function prev() { setCursor(new Date(year, month - 1, 1)); }
  function next() { setCursor(new Date(year, month + 1, 1)); }

  const todayKey = ymd(today);
  const openInfo = openDay ? byDay.get(openDay) : undefined;
  const openEvents = openDay ? events.filter((e) => ymd(new Date(e.date)) === openDay) : [];

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
          const outCls = c.inMonth ? '' : 'cal-day--out';
          return (
            <button
              key={i}
              className={`cal-day ${colorCls} ${outCls} ${isToday ? 'cal-day--today' : ''}`}
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
          <div className="h-stack">
            <div style={{ fontSize: 10 }}>{openDay}</div>
            {openInfo ? (
              <>
                {openInfo.indoor && <div className="meta" style={{ fontSize: 9 }}>· Interieur arrose</div>}
                {openInfo.outdoor && <div className="meta" style={{ fontSize: 9 }}>· Exterieur arrose</div>}
                {openInfo.rain && <div className="meta" style={{ fontSize: 9 }}>· Pluie</div>}
                {openEvents.length === 0 && <div className="meta" style={{ fontSize: 9 }}>Rien ce jour-la</div>}
              </>
            ) : (
              <div className="meta" style={{ fontSize: 9 }}>Rien ce jour-la</div>
            )}
            <button className="pix-btn pix-btn--ghost" onClick={() => setOpenDay(null)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Legend() {
  const sw = (bg: string) => ({
    width: 12,
    height: 12,
    background: bg,
    border: '2px solid var(--ink)',
    flexShrink: 0,
  });
  const row = { fontSize: 9, display: 'flex', alignItems: 'center', gap: 8 } as const;
  return (
    <div className="pix-frame">
      <div className="h-stack" style={{ gap: 6 }}>
        <div className="meta" style={row}><span style={sw('var(--terracotta-soft)')} /> Interieur</div>
        <div className="meta" style={row}><span style={sw('var(--sage)')} /> Exterieur</div>
        <div className="meta" style={row}><span style={sw('var(--water-soft)')} /> Pluie</div>
        <div className="meta" style={row}><span style={sw('linear-gradient(135deg, var(--terracotta-soft) 50%, var(--sage) 50%)')} /> Interieur + exterieur</div>
      </div>
    </div>
  );
}
