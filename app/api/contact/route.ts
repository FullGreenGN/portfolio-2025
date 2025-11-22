import { sendContact } from '@/lib/contact';
import { contactSchema } from '@/lib/validation/contact.schema';

// Simple in-memory rate limiter (expires entries after window)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 6;
const ipRequestMap = new Map<string, { count: number; firstSeen: number }>();

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Rate limiting
    const now = Date.now();
    const entry = ipRequestMap.get(ip);
    if (!entry) {
      ipRequestMap.set(ip, { count: 1, firstSeen: now });
    } else {
      if (now - entry.firstSeen > RATE_LIMIT_WINDOW_MS) {
        ipRequestMap.set(ip, { count: 1, firstSeen: now });
      } else {
        entry.count += 1;
        if (entry.count > MAX_REQUESTS_PER_WINDOW) {
          return new Response(JSON.stringify({ error: 'Too many requests' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        ipRequestMap.set(ip, entry);
      }
    }

    const body = await request.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input', issues: parsed.error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, email, message } = parsed.data;

    // Send contact (email or fallback log)
    await sendContact({ name, email, message });

    return new Response(JSON.stringify({ message: 'Message sent' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact API error', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}