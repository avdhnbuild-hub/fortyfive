'use client';

import { useEffect, useState } from 'react';
import { getSubscribers } from '@/lib/newsletterClient';

function formatDate(value) {
  if (!value) return 'Not recorded';

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

export default function SubscribersTable() {
  const [subscribers, setSubscribers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubscribers()
      .then(setSubscribers)
      .catch((subscriberError) => setError(subscriberError.message || 'Could not load subscribers.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff5a1f]">Subscribers</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Newsletter subscribers</h1>
      </div>

      {error && <p className="text-sm text-[#ff5a1f]">{error}</p>}

      <div className="overflow-hidden rounded-xl border border-[#e5e1da] bg-white">
        <div className="grid grid-cols-12 border-b border-[#e5e1da] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#666666]">
          <span className="col-span-6">Email</span>
          <span className="col-span-3">Status</span>
          <span className="col-span-3 text-right">Created</span>
        </div>
        {loading ? (
          <p className="px-4 py-8 text-sm text-[#666666]">Loading subscribers...</p>
        ) : subscribers.length === 0 ? (
          <p className="px-4 py-8 text-sm text-[#666666]">No subscribers found.</p>
        ) : (
          subscribers.map((subscriber) => (
            <div key={subscriber.id || subscriber.email} className="grid grid-cols-12 items-center gap-3 border-b border-[#e5e1da] px-4 py-4 last:border-b-0">
              <p className="col-span-6 font-medium">{subscriber.email}</p>
              <div className="col-span-3">
                <span className="rounded-full border border-[#e5e1da] px-2.5 py-1 text-xs text-[#666666]">
                  {subscriber.status || 'active'}
                </span>
              </div>
              <p className="col-span-3 text-right text-sm text-[#666666]">{formatDate(subscriber.created_at)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
