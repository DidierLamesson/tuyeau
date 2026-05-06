import { useMemo, useState } from 'react';
import { eventsByDay } from '../../store/db';
import { ymd, type WateringEvent } from '../../store/model';

const MONTHS = ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
const DOW = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

interface Props {
  events: WateringEvent[];
}

export default function CalendarScreen({ events }: Props) {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [openDay, setOpenDay] = useState<string | null>(null);

  const byDay = useMemo(() => eventsByDay(events), [events]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // L=0..D=6
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: ({ day: number; date: Date } | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, date: new Date(year, month, d) });
  while (cells.length % 7 !== 0) cells.push(null);

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
          if (!c) return <div key={i} style={{ visibility: 'hidden' }} />;
          const key = ymd(c.date);
          const info = byDay.get(key);
          const cls =
            info?.indoor && info?.outdoor ? 'cal-day--both' :
            info?.indoor ? 'cal-day--indoor' :
            info?.outdoor ? 'cal-day--outdoor' : '';
          const isToday = key === todayKey;
          return (
            <button
              key={i}
              className={`cal-day ${cls} ${isToday ? 'cal-day--today' : ''}`}
              onClick={() => setOpenDay(key)}
            >
              {c.day}
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
                {openInfo.indoor && <div className="meta" style={{ fontSize: 9 }}>· Intérieur arrosé</div>}
                {openInfo.outdoor && <div className="meta" style={{ fontSize: 9 }}>· Extérieur arrosé</div>}
                {openEvents.some((e) => e.source === 'rain') && (
                  <div className="meta" style={{ fontSize: 9 }}>· Pluie</div>
                )}
              </>
            ) : (
              <div className="meta" style={{ fontSize: 9 }}>Rien ce jour-là</div>
            )}
            <button className="pix-btn pix-btn--ghost" onClick={() => setOpenDay(null)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Legend() {
  return (
    <div className="pix-frame">
      <div className="h-stack" style={{ gap: 6 }}>
        <div className="meta" style={{ fontSize: 9, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 12, height: 12, background: 'var(--mint)', border: '2px solid var(--ink)' }} /> Intérieur
        </div>
        <div className="meta" style={{ fontSize: 9, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 12, height: 12, background: 'var(--sage)', border: '2px solid var(--ink)' }} /> Extérieur
        </div>
        <div className="meta" style={{ fontSize: 9, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 12, height: 12, background: 'linear-gradient(135deg, var(--mint) 50%, var(--sage) 50%)', border: '2px solid var(--ink)' }} /> Les deux
        </div>
      </div>
    </div>
  );
}
