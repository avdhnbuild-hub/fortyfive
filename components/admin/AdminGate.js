'use client';

import { useEffect, useState } from 'react';
import { ADMIN_AUTH_KEY } from '@/lib/adminStore';

export default function AdminGate({ children }) {
  const [password, setPassword] = useState('');
  const [allowed, setAllowed] = useState(false);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAllowed(localStorage.getItem(ADMIN_AUTH_KEY) === 'true');
    setReady(true);
  }, []);

  const login = (event) => {
    event.preventDefault();

    if (password === 'fortyfive') {
      // Temporary frontend-only admin gate. This is not secure and must be replaced before production use.
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setAllowed(true);
      setError('');
      return;
    }

    setError('Incorrect password.');
  };

  if (!ready) return null;

  if (allowed) return children;

  return (
    <main className="min-h-screen bg-[#f6f6f3] px-5 py-10 text-[#070707]">
      <div className="mx-auto max-w-md rounded-xl border border-[#e5e1da] bg-white p-7">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold tracking-tight">fortyfive</span>
          <span className="h-2 w-2 rounded-full bg-[#ff5a1f]" />
        </div>
        <p className="mt-3 text-sm text-[#666666]">
          Local admin preview. This password gate is frontend-only and not secure.
        </p>
        <form onSubmit={login} className="mt-8 space-y-4">
          <label className="block text-sm font-medium">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-[#e5e1da] px-3 text-sm outline-none focus:border-[#070707]"
              placeholder="Enter admin password"
            />
          </label>
          {error && <p className="text-sm text-[#ff5a1f]">{error}</p>}
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-[#070707] px-4 text-sm font-medium text-white transition-colors hover:bg-[#ff5a1f]"
          >
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
