import { clearEvents, saveSettings } from '../../store/db';
import type { Settings } from '../../store/model';

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

      <div className="pix-frame">
        <div className="field">
          <label>INTERIEUR · MAX {settings.indoorMaxDays} J</label>
          <input
            type="range"
            min={1}
            max={10}
            value={settings.indoorMaxDays}
            onChange={(e) => update({ indoorMaxDays: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label>EXTERIEUR · MAX {settings.outdoorMaxDays} J</label>
          <input
            type="range"
            min={1}
            max={10}
            value={settings.outdoorMaxDays}
            onChange={(e) => update({ outdoorMaxDays: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label>SEUIL PLUIE · {settings.rainThresholdMm} MM</label>
          <input
            type="range"
            min={1}
            max={20}
            value={settings.rainThresholdMm}
            onChange={(e) => update({ rainThresholdMm: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label>HEURE DU RAPPEL</label>
          <input
            type="time"
            value={settings.notifTime}
            onChange={(e) => update({ notifTime: e.target.value })}
          />
        </div>
      </div>

      <div className="pix-frame">
        <div className="field">
          <label>HISTORIQUE</label>
          <button className="pix-btn pix-btn--danger" onClick={reset}>
            TOUT EFFACER
          </button>
        </div>
      </div>
    </div>
  );
}
