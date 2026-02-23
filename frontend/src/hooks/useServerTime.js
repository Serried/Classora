import { useState, useEffect } from 'react';

export function useServerTime() {
  const [clientTime, setClientTime] = useState(() => new Date());
  const [serverTime, setServerTime] = useState(null);
  const [atFetch, setAtFetch] = useState(null);

  useEffect(() => { const t = setInterval(() => setClientTime(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => {
    const load = () => {
      const now = new Date();
      fetch('/api/time').then(r => r.json()).then(({ serverTime: s }) => s && (setServerTime(new Date(s)), setAtFetch(now))).catch(() => {});
    };
    load();
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (d) => d ? d.toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'medium' }) : '—';
  const running = serverTime && atFetch ? new Date(serverTime.getTime() + clientTime.getTime() - atFetch.getTime()) : serverTime;
  return { clientTime, serverTime: running, formatTime };
}
