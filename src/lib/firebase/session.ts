import {
  getAdminAuth,
  SESSION_COOKIE_NAME,
  SESSION_EXPIRY_MS,
} from './admin';

export async function createSessionCookie(idToken: string): Promise<string> {
  return getAdminAuth().createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRY_MS,
  });
}

export async function verifySessionCookie(sessionCookie: string) {
  return getAdminAuth().verifySessionCookie(sessionCookie, true);
}

export { SESSION_COOKIE_NAME, SESSION_EXPIRY_MS };
