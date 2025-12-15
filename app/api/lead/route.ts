import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type LeadPayload = {
  email: string;
  locale?: string;
  sourcePath?: string;
};

type ApiResponse =
  | { ok: true }
  | { ok: false; message: "invalidEmail" | "rateLimited" | "unknown" };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort in-memory rate limit (works well in dev / single runtime; on serverless it's still a useful soft guard)
const rateBucket = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 min
const MAX_PER_WINDOW = 10;

function json<T>(data: T, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function asTrimmedString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function isEmailValid(email: string): boolean {
  if (!email) return false;
  if (email.length < 6) return false;
  if (email.length > 55) return false;
  return EMAIL_REGEX.test(email);
}

function getClientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  const xr = req.headers.get("x-real-ip");
  return xr?.trim() || "unknown";
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const existing = rateBucket.get(key);

  if (!existing || existing.resetAt <= now) {
    rateBucket.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (existing.count >= MAX_PER_WINDOW) return false;

  existing.count += 1;
  rateBucket.set(key, existing);
  return true;
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return json<ApiResponse>({ ok: false, message: "unknown" }, 500);
    }

    const body = (await req
      .json()
      .catch(() => null)) as Partial<LeadPayload> | null;

    const email = asTrimmedString(body?.email);
    const locale = asTrimmedString(body?.locale);
    const sourcePath = asTrimmedString(body?.sourcePath);

    if (!isEmailValid(email)) {
      return json<ApiResponse>({ ok: false, message: "invalidEmail" }, 400);
    }

    const ip = getClientIp(req);
    const rlKey = `lead:${ip}`;

    if (!checkRateLimit(rlKey)) {
      return json<ApiResponse>({ ok: false, message: "rateLimited" }, 429);
    }

    const subject = "iHome — Request for sale";

    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5">
        <h2 style="margin: 0 0 12px">Request for sale</h2>
        <p style="margin: 0 0 6px"><b>Email:</b> ${escapeHtml(email)}</p>
        ${
          locale
            ? `<p style="margin: 0 0 6px"><b>Locale:</b> ${escapeHtml(locale)}</p>`
            : ""
        }
        ${
          sourcePath
            ? `<p style="margin: 0 0 6px"><b>Source:</b> ${escapeHtml(sourcePath)}</p>`
            : ""
        }
        <p style="margin: 12px 0 0; color: #6b7280; font-size: 12px">
          Gmail label hint: Leads from site iHOME
        </p>
      </div>
    `;

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email,
      html,
      // Gmail can't be labeled directly via SMTP, but you can filter on Subject or custom headers.
      headers: {
        "X-iHome-Label": "Leads from site iHOME",
        "X-iHome-Lead-Type": "sale",
      },
    });

    return json<ApiResponse>({ ok: true }, 200);
  } catch {
    return json<ApiResponse>({ ok: false, message: "unknown" }, 500);
  }
}
