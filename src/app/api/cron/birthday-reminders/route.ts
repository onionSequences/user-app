import { NextRequest, NextResponse } from 'next/server';
import { processBirthdayReminders } from '@/lib/notifications/processBirthdayReminders';

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return false;
  }

  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await processBirthdayReminders();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Cron job failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
