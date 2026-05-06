import { useState } from 'react';
import { clearEvents, saveSettings } from '../../store/db';
import type { Settings } from '../../store/model';
import { requestLocation } from '../../weather/openMeteo';

interface Props {
  settings: Settings;
  refresh: () => void;
}

export default function SettingsScreen({ settings, refresh }: Props) {
  const [busy, setBusy] = useState(false);

  async function update(patch: Partial<Settings>) {
    await saveSettings(patch);
    refresh();
  }

  async function relocate() {
    setBusy(true);
    try {
      const loc = await requestLocation();
      await saveSettings({ lat: loc.lat, lon: loc.lon });
      refresh();
    } catch (e) {
      alert('Impossible de récupérer la position : ' + (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!confirm('Effacer tout l\'historique ? Action irréversible.')) return;
    await clearEvents();
    refresh();
  }

  return (
    <div className="screen">
      <div className="greeting">Réglages</div>

      <div className="pix-frame">
        <div className="field">
          <label>Intérieur · max {settings.indoorMaxDays} j</label>
          <input
            type="range"
            min={1}
            max={30}
            value={settings.indoorMaxDays}
            onChange={(e) => update({ indoorMaxDays: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label>Extérieur · max {settings.outdoorMaxDays} j</label>
          <input
            type="range"
            min={1}
            max={30}
            value={settings.outdoorMaxDays}
            onChange={(e) => update({ outdoorMaxDays: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label>Seuil pluie · {settings.rainThresholdMm} mm</label>
          <input
            type="range"
            min={1}
            max={30}
            value={settings.rainThresholdMm}
            onChange={(e) => update({ rainThresholdMm: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label>Heure du rappel</label>
          <input
            type="time"
            value={settings.notifTime}
            onChange={(e) => update({ notifTime: e.target.value })}
          />
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label>Localisation</label>
          <div className="meta" style={{ fontSize: 9 }}>
            {settings.lat != null && settings.lon != null
              ? `${settings.lat.toFixed(2)} · ${settings.lon.toFixed(2)}`
              : 'Aucune position'}
          </div>
          <button className="pix-btn pix-btn--ghost" onClick={relocate} disabled={busy}>
            {busy ? '…' : 'Mettre à jour'}
          </button>
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label>Historique</label>
          <button className="pix-btn pix-btn--danger" onClick={reset}>
            Tout effacer
          </button>
        </div>
      </div>
    </div>
  );
}
