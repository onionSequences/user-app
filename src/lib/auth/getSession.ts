import { cookies } from 'next/headers';
import { verifySessionCookie, SESSION_COOKIE_NAME } from '@/lib/firebase/session';

export type SessionUser = {
  uid: string;
  email: string | undefined;
  name: string | undefined;
};

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decoded = await verifySessionCookie(sessionCookie);

    return {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
    };
  } catch {
    return null;
  }
}
