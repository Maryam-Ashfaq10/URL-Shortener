'use client';

import { useState } from 'react';

interface Props {
  shortUrl: string;
}

export default function ResultCard({ shortUrl }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-5 shadow-lg">
      
      <p className="text-sm text-white/60">
        Short URL Generated
      </p>

      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block break-all text-blue-300 hover:text-blue-200 transition cursor-pointer"
      >
        {shortUrl}
      </a>

      <button
        onClick={copyToClipboard}
        className="mt-4 cursor-pointer rounded-lg bg-[#0F2550] px-4 py-2 text-sm text-white transition hover:bg-[#1E3A8A] active:scale-95"
      >
        {copied ? 'Copied ✓' : 'Copy Link'}
      </button>

    </div>
  );
}