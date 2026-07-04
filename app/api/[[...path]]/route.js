import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, service: 'fortyfive', message: 'No backend needed for MVP.' });
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ ok: true, received: body });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
