'use client';

import { useState } from 'react';
import ResultCard from './ResultCard';

export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setShortUrl('');
    setLoading(true);

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed');
      }

      setShortUrl(data.shortUrl);
      setUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 cursor-text"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-[#1E3A8A] px-4 py-3 font-medium text-white transition duration-200 hover:bg-[#2A4FB3] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Shorten URL'}
        </button>

      </form>

      {error && (
        <p className="mt-4 text-sm text-red-400">
          {error}
        </p>
      )}

      {shortUrl && (
        <ResultCard shortUrl={shortUrl} />
      )}
    </>
  );
}