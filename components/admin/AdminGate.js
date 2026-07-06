'use client';

import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

export default function AdminGate({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allowed, setAllowed] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    let listener;
    let supabase;

    const checkAdminAccess = async (session) => {
      if (!active) return;

      setSignedIn(Boolean(session));
      setAllowed(false);

      if (!session?.user) {
        setReady(true);
        return;
      }

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!active) return;

      if (profileError) {
        setError(profileError.message);
      }

      setAllowed(data?.role === 'admin');
      setReady(true);
    };

    try {
      supabase = getSupabaseClient();
    } catch (clientError) {
      setError(clientError.message);
      setReady(true);
      return () => {
        active = false;
      };
    }

    supabase.auth.getSession().then(({ data }) => checkAdminAccess(data.session));

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAdminAccess(session);
    });
    listener = data;

    return () => {
      active = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const supabase = getSupabaseClient();
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
      }
    } catch (clientError) {
      setError(clientError.message);
    }
  };

  const logout = async () => {
    setError('');
    try {
      const supabase = getSupabaseClient();
      await supabase.auth.signOut();
      setAllowed(false);
      setSignedIn(false);
    } catch (clientError) {
      setError(clientError.message);
    }
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
          Sign in with an authorized fortyfive admin account.
        </p>
        {signedIn ? (
          <div className="mt-8 space-y-4">
            <p className="text-sm leading-6 text-[#666666]">
              You are signed in, but this account is not authorized for fortyfive admin.
            </p>
            {error && <p className="text-sm text-[#ff5a1f]">{error}</p>}
            <button
              type="button"
              onClick={logout}
              className="h-11 w-full rounded-lg bg-[#070707] px-4 text-sm font-medium text-white transition-colors hover:bg-[#ff5a1f]"
            >
              Log out
            </button>
          </div>
        ) : (
          <form onSubmit={login} className="mt-8 space-y-4">
            <label className="block text-sm font-medium">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-[#e5e1da] px-3 text-sm outline-none focus:border-[#070707]"
                placeholder="Enter admin email"
              />
            </label>
            <label className="block text-sm font-medium">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-[#e5e1da] px-3 text-sm outline-none focus:border-[#070707]"
                placeholder="Enter password"
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
        )}
      </div>
    </main>
  );
}
