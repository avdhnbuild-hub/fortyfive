import { getSupabaseClient } from '@/lib/supabase/client';

const SUBSCRIBERS_TABLE = 'subscribers';

export function normalizeSubscriberEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function isValidSubscriberEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeSubscriberEmail(email));
}

function isDuplicateError(error) {
  return error?.code === '23505' || error?.message?.toLowerCase().includes('duplicate');
}

function saveSubscriberFallback(email) {
  let subscribers = [];

  try {
    const existing = JSON.parse(localStorage.getItem('fortyfive_subscribers') || '[]');
    subscribers = Array.isArray(existing) ? existing : [];
  } catch {
    subscribers = [];
  }

  if (subscribers.includes(email)) {
    return { success: false, duplicate: true };
  }

  localStorage.setItem('fortyfive_subscribers', JSON.stringify([...subscribers, email]));
  return { success: true, fallback: true };
}

export async function subscribeToNewsletter(email) {
  const normalizedEmail = normalizeSubscriberEmail(email);

  if (!isValidSubscriberEmail(normalizedEmail)) {
    throw new Error('Enter a valid email');
  }

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from(SUBSCRIBERS_TABLE).insert({
      email: normalizedEmail,
      source: 'website',
      status: 'active',
    });

    if (isDuplicateError(error)) {
      return { success: false, duplicate: true };
    }

    if (error) throw error;

    return { success: true };
  } catch (error) {
    if (error.message?.includes('NEXT_PUBLIC_SUPABASE')) {
      return saveSubscriberFallback(normalizedEmail);
    }

    throw error;
  }
}

export async function getSubscribers() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from(SUBSCRIBERS_TABLE)
    .select('id,email,status,created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data || [];
}
