import { useCallback, useEffect, useState } from 'react';
import { getEvents, getSettings } from './store/db';
import type { Settings, WateringEvent } from './store/model';
import Home from './features/home/Home';
import SettingsScreen from './features/settings/Settings';
import CalendarScreen from './features/calendar/Calendar';

type Tab = 'home' | 'calendar' | 'settings';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [events, setEvents] = useState<WateringEvent[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);

  const refresh = useCallback(async () => {
    const [e, s] = await Promise.all([getEvents(), getSettings()]);
    setEvents(e);
    setSettings(s);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  if (!settings) {
    return <div className="screen"><div className="greeting">Tuy'eau</div><div className="subline">Chargement…</div></div>;
  }

  return (
    <div className="app-shell">
      {tab === 'home' && <Home events={events} settings={settings} refresh={refresh} />}
      {tab === 'calendar' && <CalendarScreen events={events} />}
      {tab === 'settings' && <SettingsScreen settings={settings} refresh={refresh} />}

      <nav className="tabbar">
        <button className={`tab ${tab === 'home' ? 'tab--active' : ''}`} onClick={() => setTab('home')}>ACCUEIL</button>
        <button className={`tab ${tab === 'calendar' ? 'tab--active' : ''}`} onClick={() => setTab('calendar')}>CALENDRIER</button>
        <button className={`tab ${tab === 'settings' ? 'tab--active' : ''}`} onClick={() => setTab('settings')}>REGLAGES</button>
      </nav>
    </div>
  );
}
