'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function EntryForm() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setStatus('loading');

    const { error } = await supabase.from('entries').insert({ name: name.trim(), message: message.trim() });

    if (error) {
      setStatus('error');
    } else {
      setName('');
      setMessage('');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
      window.dispatchEvent(new Event('guestbook-refresh'));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 mb-8"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-amber-900 mb-1">Your name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Sarah & Tom"
          maxLength={80}
          required
          className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50 placeholder-amber-300"
        />
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium text-amber-900 mb-1">Your message</label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="What a lovely home..."
          rows={3}
          maxLength={500}
          required
          className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50 placeholder-amber-300 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold rounded-lg py-2 text-sm transition-colors"
      >
        {status === 'loading' ? 'Signing…' : 'Sign the Guestbook'}
      </button>
      {status === 'success' && (
        <p className="text-center text-green-600 text-sm mt-3">✓ Thanks for signing!</p>
      )}
      {status === 'error' && (
        <p className="text-center text-red-500 text-sm mt-3">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
