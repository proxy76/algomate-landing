/**
 * The one backend call: POST /api/contact/ (backend/core/views.py).
 *
 * Same-origin by default — nginx proxies /api/ to Django. VITE_API_URL exists
 * for pointing a local dev server at a backend running elsewhere.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  tutoring_types: string[];
  is_robot_verified: boolean;
  /** Honeypot. Always sent, always empty for a human. */
  website: string;
}

export type ContactResult = 'ok' | 'rate-limited' | 'error';

/**
 * Never throws: a network failure, a timeout and a 5xx are all 'error', which
 * is the one thing the forms need to know to show their message.
 *
 * Plain fetch. This replaced axios, which was in the bundle for this single
 * request — roughly 35 kB of script on every page, and a dependency that has
 * needed several security releases, to do what the platform does natively.
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      // The backend's own SMTP timeout is 15 s; do not leave the button
      // spinning forever if the connection stalls.
      signal: AbortSignal.timeout(30_000),
    });
    if (response.ok) return 'ok';
    return response.status === 429 ? 'rate-limited' : 'error';
  } catch {
    return 'error';
  }
}

export default API_BASE_URL;
