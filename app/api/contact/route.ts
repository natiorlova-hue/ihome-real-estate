import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  asTrimmedString,
  getEmailErrorCode,
  getNameErrorCode,
  getPhoneErrorCode,
  isHoneypotTripped,
  type ContactFieldErrorCode,
  type ContactFormValues,
} from "@/lib/validation/contact";

export const runtime = "nodejs";

type FieldErrors = Partial<
  Record<keyof ContactFormValues, ContactFieldErrorCode>
>;

function badRequest(fieldErrors: FieldErrors) {
  return NextResponse.json(
    { ok: false, fieldErrors },
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const body = (await req
      .json()
      .catch(() => null)) as Partial<ContactFormValues> | null;
    if (!body) return NextResponse.json({ ok: false }, { status: 400 });

    const firstName = asTrimmedString(body.firstName);
    const lastName = asTrimmedString(body.lastName);
    const email = asTrimmedString(body.email);
    const phone = asTrimmedString(body.phone);
    const message = asTrimmedString(body.message);
    const privacy = Boolean(body.privacy);
    const company = asTrimmedString(body.company);

    // bot trap
    if (isHoneypotTripped(company)) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const fieldErrors: FieldErrors = {};

    // firstName (required)
    {
      const code = getNameErrorCode(firstName, "firstName");
      if (code) fieldErrors.firstName = code;
    }

    // lastName (optional)
    if (lastName) {
      const code = getNameErrorCode(lastName, "lastName");
      if (code) fieldErrors.lastName = code;
    }

    // email (required)
    {
      const code = getEmailErrorCode(email);
      if (code) fieldErrors.email = code;
    }

    // phone (optional)
    if (phone) {
      const code = getPhoneErrorCode(phone);
      if (code) fieldErrors.phone = code;
    }

    if (Object.keys(fieldErrors).length > 0) return badRequest(fieldErrors);

    const resend = new Resend(apiKey);

    const subject = `iHome lead: ${firstName}${lastName ? ` ${lastName}` : ""}`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5">
        <h2 style="margin: 0 0 12px">New lead from iHome</h2>
        <p style="margin: 0 0 6px"><b>Name:</b> ${escapeHtml(
          `${firstName}${lastName ? ` ${lastName}` : ""}`
        )}</p>
        <p style="margin: 0 0 6px"><b>Email:</b> ${escapeHtml(email)}</p>
        ${
          phone
            ? `<p style="margin: 0 0 6px"><b>Phone:</b> ${escapeHtml(phone)}</p>`
            : ""
        }
        ${
          message
            ? `
              <p style="margin: 12px 0 6px"><b>Message:</b></p>
              <p style="margin: 0; white-space: pre-wrap">${escapeHtml(message)}</p>
            `
            : ""
        }
        <p style="margin: 12px 0 0; color: #6b7280; font-size: 12px">
          Privacy accepted: ${privacy ? "yes" : "no"}
        </p>
      </div>
    `;

    await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email,
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
