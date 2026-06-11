export async function establishSession(idToken: string): Promise<boolean> {
  const response = await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });

  return response.ok;
}

export async function logoutSession(): Promise<void> {
  await fetch('/api/auth/logout', { method: 'POST' });
}
