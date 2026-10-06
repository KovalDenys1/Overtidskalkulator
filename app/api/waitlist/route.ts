const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WAITLIST_KEY = "overtidskalkulator:waitlist";

export async function POST(request: Request) {
  const url = process.env.WAITLIST_KV_REST_API_URL;
  const token = process.env.WAITLIST_KV_REST_API_TOKEN;
  if (!url || !token) {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }

  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(["HSETNX", WAITLIST_KEY, email, new Date().toISOString()]),
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || "error" in data) {
      return Response.json({ error: "store_failed" }, { status: 502 });
    }
  } catch {
    return Response.json({ error: "store_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
