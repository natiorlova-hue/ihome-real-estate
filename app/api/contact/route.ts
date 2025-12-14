// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type FieldErrorCode =
  | "required"
  | "firstNameLettersOnly"
  | "emailInvalid"
  | "phoneDigitsOnly"
  | "firstNameTooShort"
  | "firstNameTooLong"
  | "lastNameTooShort"
  | "lastNameTooLong"
  | "emailTooShort"
  | "emailTooLong"
  | "phoneTooShort"
  | "phoneTooLong";

type FormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  message?: string;
  privacy?: boolean;
  company?: string; // honeypot
};

type FieldErrors = Partial<Record<keyof FormValues, FieldErrorCode>>;

const NAME_ALLOWED = /^[a-zA-ZÀ-ÿ\s'-]+$/;
const PHONE_ALLOWED = /^[0-9+\s()\-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(fieldErrors: FieldErrors) {
  return NextResponse.json(
    { ok: false, fieldErrors },
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

function asTrimmedString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
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
      .catch(() => null)) as Partial<FormValues> | null;
    if (!body) return NextResponse.json({ ok: false }, { status: 400 });

    const firstName = asTrimmedString(body.firstName);
    const lastName = asTrimmedString(body.lastName);
    const email = asTrimmedString(body.email);
    const phone = asTrimmedString(body.phone);
    const message = asTrimmedString(body.message);
    const privacy = Boolean(body.privacy);
    const company = asTrimmedString(body.company);

    // bot trap
    if (company.length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const fieldErrors: FieldErrors = {};

    // firstName (required)
    if (!firstName) fieldErrors.firstName = "required";
    else if (!NAME_ALLOWED.test(firstName))
      fieldErrors.firstName = "firstNameLettersOnly";
    else if (firstName.length < 4) fieldErrors.firstName = "firstNameTooShort";
    else if (firstName.length > 20) fieldErrors.firstName = "firstNameTooLong";

    // lastName (optional)
    if (lastName) {
      if (!NAME_ALLOWED.test(lastName))
        fieldErrors.lastName = "firstNameLettersOnly";
      else if (lastName.length < 4) fieldErrors.lastName = "lastNameTooShort";
      else if (lastName.length > 20) fieldErrors.lastName = "lastNameTooLong";
    }

    // email (required)
    if (!email) fieldErrors.email = "required";
    else if (email.length < 6) fieldErrors.email = "emailTooShort";
    else if (email.length > 55) fieldErrors.email = "emailTooLong";
    else if (!EMAIL_REGEX.test(email)) fieldErrors.email = "emailInvalid";

    // phone (optional)
    if (phone) {
      if (!PHONE_ALLOWED.test(phone)) fieldErrors.phone = "phoneDigitsOnly";
      else if (phone.length < 6) fieldErrors.phone = "phoneTooShort";
      else if (phone.length > 25) fieldErrors.phone = "phoneTooLong";
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
