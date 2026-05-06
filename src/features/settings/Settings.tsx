import { useState } from 'react';
import { clearEvents, saveSettings } from '../../store/db';
import type { Settings } from '../../store/model';
import { Clock, Floppy, PlantIndoor, PlantOutdoor, WeatherRain } from '../../pixel/icons';

interface Props {
  settings: Settings;
  refresh: () => void;
}

export default function SettingsScreen({ settings, refresh }: Props) {
  async function update(patch: Partial<Settings>) {
    await saveSettings(patch);
    refresh();
  }

  async function reset() {
    if (!confirm("Effacer tout l'historique ? Action irréversible.")) return;
    await clearEvents();
    refresh();
  }

  return (
    <div className="screen">
      <div className="greeting">Réglages</div>

      <div className="pix-frame pix-frame--indoor">
        <div className="field">
          <label className="setting-label">
            <PlantIndoor size={20} /> INTERIEUR · MAX {settings.indoorMaxDays} J
          </label>
          <input
            type="range"
            className="slider slider--indoor"
            min={1}
            max={10}
            value={settings.indoorMaxDays}
            onChange={(e) => update({ indoorMaxDays: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="pix-frame pix-frame--outdoor">
        <div className="field">
          <label className="setting-label">
            <PlantOutdoor size={20} /> EXTERIEUR · MAX {settings.outdoorMaxDays} J
          </label>
          <input
            type="range"
            className="slider slider--outdoor"
            min={1}
            max={10}
            value={settings.outdoorMaxDays}
            onChange={(e) => update({ outdoorMaxDays: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="pix-frame pix-frame--rain">
        <div className="field">
          <label className="setting-label">
            <WeatherRain size={20} /> SEUIL PLUIE · {settings.rainThresholdMm} MM
          </label>
          <input
            type="range"
            className="slider slider--rain"
            min={1}
            max={20}
            value={settings.rainThresholdMm}
            onChange={(e) => update({ rainThresholdMm: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label className="setting-label">
            <Clock size={20} /> RAPPEL
          </label>
          <TimePicker value={settings.notifTime} onChange={(v) => update({ notifTime: v })} />
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label className="setting-label">
            <Floppy size={20} /> HISTORIQUE
          </label>
          <button className="pix-btn pix-btn--danger" onClick={reset}>
            TOUT EFFACER
          </button>
        </div>
      </div>
    </div>
  );
}

function TimePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [h, m] = value.split(':').map(Number);
  const [open, setOpen] = useState(false);

  function setH(next: number) {
    const wrapped = ((next % 24) + 24) % 24;
    onChange(`${String(wrapped).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  }
  function setM(next: number) {
    const wrapped = ((next % 60) + 60) % 60;
    onChange(`${String(h).padStart(2, '0')}:${String(wrapped).padStart(2, '0')}`);
  }

  return (
    <>
      <button className="pix-btn pix-btn--ghost time-display" onClick={() => setOpen((o) => !o)}>
        {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}
      </button>
      {open && (
        <div className="time-picker">
          <div className="time-col">
            <button className="pix-btn pix-btn--ghost time-step" onClick={() => setH(h + 1)}>▲</button>
            <div className="time-val">{String(h).padStart(2, '0')}</div>
            <button className="pix-btn pix-btn--ghost time-step" onClick={() => setH(h - 1)}>▼</button>
          </div>
          <div className="time-sep">:</div>
          <div className="time-col">
            <button className="pix-btn pix-btn--ghost time-step" onClick={() => setM(m + 5)}>▲</button>
            <div className="time-val">{String(m).padStart(2, '0')}</div>
            <button className="pix-btn pix-btn--ghost time-step" onClick={() => setM(m - 5)}>▼</button>
          </div>
        </div>
      )}
    </>
  );
}
