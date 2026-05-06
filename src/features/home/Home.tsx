import { useEffect, useState } from 'react';
import { addEvent, getGroupState, getStreak, lastEventForGroup, removeEvent, saveSettings } from '../../store/db';
import type { Group, Settings, WateringEvent } from '../../store/model';
import { PlantIndoor, PlantOutdoor, WateringCan, WeatherIcon } from '../../pixel/icons';
import { fetchWeather, fetchWeatherByIp, requestLocation, type WeatherSnapshot } from '../../weather/openMeteo';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 6) return 'Bonne nuit';
  if (h < 12) return 'Bonjour';
  if (h < 18) return 'Bon après-midi';
  if (h < 22) return 'Bonsoir';
  return 'Bonne nuit';
}

function contextLine(indoorLate: boolean, outdoorLate: boolean): string {
  if (indoorLate && outdoorLate) return "Tes plantes ont soif.";
  if (indoorLate) return "Pense à arroser l'intérieur.";
  if (outdoorLate) return "Pense à arroser l'extérieur.";
  return "Tout est en ordre. Bravo.";
}

function formatLast(iso: string | null): string {
  if (!iso) return 'Jamais';
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const days = Math.floor(diffMs / 86_400_000);
  if (days === 0) return "AUJOURD'HUI";
  if (days === 1) return 'HIER';
  return `IL Y A ${days} J`;
}

interface HomeProps {
  events: WateringEvent[];
  settings: Settings;
  refresh: () => void;
}

export default function Home({ events, settings, refresh }: HomeProps) {
  const [snack, setSnack] = useState<{ msg: string; undoId: string } | null>(null);
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [weatherErr, setWeatherErr] = useState<string | null>(null);
  const [enabling, setEnabling] = useState(false);

  const indoor = getGroupState(events, 'indoor', settings.indoorMaxDays);
  const outdoor = getGroupState(events, 'outdoor', settings.outdoorMaxDays);
  const streak = getStreak(events);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (settings.lat == null || settings.lon == null) {
        if (!cancelled) setWeatherErr('no-location');
        return;
      }
      try {
        const snap = await fetchWeather(settings.lat, settings.lon);
        if (!cancelled) setWeather(snap);
      } catch (e) {
        if (!cancelled) setWeatherErr((e as Error).message);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [settings.lat, settings.lon]);

  async function enableLocation() {
    setEnabling(true);
    setWeatherErr(null);
    try {
      let loc: { lat: number; lon: number };
      try {
        loc = await requestLocation();
      } catch {
        loc = await fetchWeatherByIp();
      }
      await saveSettings({ lat: loc.lat, lon: loc.lon });
      refresh();
    } catch (e) {
      setWeatherErr((e as Error).message || 'no-location');
    } finally {
      setEnabling(false);
    }
  }

  const showRainCard = !!weather && weather.rainTodayMm >= settings.rainThresholdMm;
  const outdoorAlreadyToday = (() => {
    const last = lastEventForGroup(events, 'outdoor');
    if (!last) return false;
    return new Date(last.date).toDateString() === new Date().toDateString();
  })();

  async function water(g: Group | 'both', source: 'manual' | 'rain' = 'manual') {
    const e = await addEvent(g, source);
    setSnack({
      msg: g === 'both' ? 'Tout arrosé' : g === 'indoor' ? 'Intérieur arrosé' : 'Extérieur arrosé',
      undoId: e.id,
    });
    refresh();
    setTimeout(() => setSnack((s) => (s?.undoId === e.id ? null : s)), 5000);
  }

  async function undo() {
    if (!snack) return;
    await removeEvent(snack.undoId);
    setSnack(null);
    refresh();
  }

  return (
    <div className="screen">
      <div>
        <div className="greeting">{greeting()}.</div>
        <div className="subline">{contextLine(indoor.status === 'late', outdoor.status === 'late')}</div>
      </div>

      <WeatherCard weather={weather} error={weatherErr} onEnable={enableLocation} enabling={enabling} />

      {showRainCard && !outdoorAlreadyToday && (
        <RainCard mm={weather!.rainTodayMm} onConfirm={() => water('outdoor', 'rain')} />
      )}

      <GroupCard
        title="INTERIEUR"
        icon={<PlantIndoor />}
        last={formatLast(indoor.lastWateredAt)}
        days={indoor.daysSince}
        max={settings.indoorMaxDays}
        status={indoor.status}
        onWater={() => water('indoor')}
      />

      <GroupCard
        title="EXTERIEUR"
        icon={<PlantOutdoor />}
        last={formatLast(outdoor.lastWateredAt)}
        days={outdoor.daysSince}
        max={settings.outdoorMaxDays}
        status={outdoor.status}
        onWater={() => water('outdoor')}
      />

      <div className="spacer" />
      <div className="streak">
        {streak > 0 ? `SERIE · ${streak} JOUR${streak > 1 ? 'S' : ''}` : 'AUCUNE SERIE EN COURS'}
      </div>

      {snack && (
        <div className="snackbar">
          <span>{snack.msg}</span>
          <button onClick={undo}>ANNULER</button>
        </div>
      )}
    </div>
  );
}

function WeatherCard({ weather, error, onEnable, enabling }: { weather: WeatherSnapshot | null; error: string | null; onEnable: () => void; enabling: boolean }) {
  if (error === 'no-location' || (error && !weather)) {
    return (
      <div className="pix-frame">
        <div className="weather">
          <WeatherIcon kind="cloud" />
          <div className="h-stack" style={{ flex: 1 }}>
            <div className="desc">{error === 'no-location' ? 'Météo désactivée' : 'Météo indisponible'}</div>
            <button className="pix-btn pix-btn--ghost" onClick={onEnable} disabled={enabling}>
              {enabling ? 'PATIENTE…' : 'ACTIVER'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (!weather) {
    return (
      <div className="pix-frame">
        <div className="weather">
          <WeatherIcon kind="cloud" />
          <div className="h-stack">
            <div className="temp">…</div>
            <div className="desc">Chargement…</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="pix-frame">
      <div className="weather">
        <WeatherIcon kind={weather.kind} />
        <div className="h-stack">
          <div className="temp">{weather.tempC}°</div>
          <div className="desc">{weather.description} · {weather.rainTodayMm.toFixed(1)} mm pluie</div>
        </div>
      </div>
    </div>
  );
}

function RainCard({ mm, onConfirm }: { mm: number; onConfirm: () => void }) {
  return (
    <div className="pix-frame pix-frame--sage">
      <div className="h-stack" style={{ gap: 10 }}>
        <div style={{ fontSize: 10, lineHeight: 1.5 }}>
          Il a plu {mm.toFixed(1)} mm. Marquer l'extérieur comme arrosé ?
        </div>
        <button className="pix-btn pix-btn--terracotta" onClick={onConfirm}>
          CONFIRMER
        </button>
      </div>
    </div>
  );
}

interface GroupCardProps {
  title: string;
  icon: React.ReactNode;
  last: string;
  days: number | null;
  max: number;
  status: 'ok' | 'due' | 'late';
  onWater: () => void;
}

function GroupCard({ title, icon, last, days, max, status, onWater }: GroupCardProps) {
  const statusLabel = status === 'late' ? `RETARD ${days != null ? `· ${days - max + 1} J` : ''}` : status === 'due' ? 'A ARROSER' : 'OK';
  const cls = status === 'late' ? 'status--late' : status === 'due' ? 'status--due' : '';
  return (
    <div className={`pix-frame ${status === 'late' ? 'pix-frame--danger' : ''}`}>
      <div className="group-card">
        <div className="h-row">
          <div>{icon}</div>
          <div className="h-stack" style={{ flex: 1 }}>
            <div className="label">{title}</div>
            <div className="meta">ARROSE · {last}</div>
            <div className="meta">SEUIL · {max} J</div>
          </div>
          <span className={`status ${cls}`}>{statusLabel}</span>
        </div>
        <button className="pix-btn" onClick={onWater}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <WateringCan size={16} /> ARROSER
          </span>
        </button>
      </div>
    </div>
  );
}
