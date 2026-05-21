'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

type Entry = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Feed() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    const { data } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });
    setEntries(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries();
    window.addEventListener('guestbook-refresh', fetchEntries);
    return () => window.removeEventListener('guestbook-refresh', fetchEntries);
  }, [fetchEntries]);

  if (loading) {
    return <p className="text-center text-amber-400 text-sm py-8">Loading entries…</p>;
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-amber-400 text-sm">No entries yet — be the first to sign!</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-4">
        {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
      </h2>
      <ul className="space-y-4">
        {entries.map(entry => (
          <li
            key={entry.id}
            className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-amber-900 text-sm">{entry.name}</span>
              <span className="text-xs text-amber-400">{timeAgo(entry.created_at)}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{entry.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
