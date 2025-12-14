import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6),
  message: z.string().trim().min(10),
  privacy: z.boolean(),
  company: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // bot trap
    if (parsed.data.company && parsed.data.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const resend = new Resend(apiKey);

    const subject = `iHome lead: ${parsed.data.firstName} ${parsed.data.lastName}`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5">
        <h2 style="margin: 0 0 12px">New lead from iHome</h2>
        <p style="margin: 0 0 6px"><b>Name:</b> ${escapeHtml(
          `${parsed.data.firstName} ${parsed.data.lastName}`
        )}</p>
        <p style="margin: 0 0 6px"><b>Email:</b> ${escapeHtml(parsed.data.email)}</p>
        <p style="margin: 0 0 6px"><b>Phone:</b> ${escapeHtml(parsed.data.phone)}</p>
        <p style="margin: 12px 0 6px"><b>Message:</b></p>
        <p style="margin: 0; white-space: pre-wrap">${escapeHtml(
          parsed.data.message
        )}</p>
      </div>
    `;

    await resend.emails.send({
      from,
      to,
      subject,
      replyTo: parsed.data.email,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
