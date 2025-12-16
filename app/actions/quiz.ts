"use server";

import { getTranslations } from "next-intl/server";
import { Resend } from "resend";

import { QUIZ_STEPS } from "@/lib/quiz";
import {
  asTrimmedString,
  getEmailErrorCode,
  getNameErrorCode,
  getPhoneErrorCode,
  type ContactFieldErrorCode,
} from "@/lib/validation/contact";

type Locale = "en" | "es" | "ru";

type QuizAnswers = Record<string, string>;

export type QuizState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

function isLocale(v: string): v is Locale {
  return v === "en" || v === "es" || v === "ru";
}

function safeJsonParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
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

function setFieldError(
  errors: Record<string, string[]>,
  field: string,
  code: ContactFieldErrorCode
) {
  errors[field] = [code];
}

export async function submitQuizAction(
  prevState: QuizState,
  formData: FormData
): Promise<QuizState> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return { success: false, message: "unknown" };
  }

  const localeRaw = asTrimmedString(formData.get("locale"));
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "en";

  const rawAnswers = asTrimmedString(formData.get("answers"));
  const answers = rawAnswers ? safeJsonParse<QuizAnswers>(rawAnswers) : {};
  const safeAnswers: QuizAnswers =
    answers && typeof answers === "object" ? answers : {};

  const firstName = asTrimmedString(formData.get("firstName"));
  const lastName = asTrimmedString(formData.get("lastName"));
  const email = asTrimmedString(formData.get("email"));
  const phone = asTrimmedString(formData.get("phone"));
  const privacy = formData.get("privacy") === "on";

  // --- Validate with shared rules (same as main form) ---
  const errors: Record<string, string[]> = {};

  {
    const code = getNameErrorCode(firstName, "firstName");
    if (code) setFieldError(errors, "firstName", code);
  }

  // NOTE: main form treats lastName as optional, we keep same rule:
  if (lastName) {
    const code = getNameErrorCode(lastName, "lastName");
    if (code) setFieldError(errors, "lastName", code);
  }

  {
    const code = getEmailErrorCode(email);
    if (code) setFieldError(errors, "email", code);
  }

  // NOTE: quiz UI currently requires phone, but we validate using the same rules;
  // requiredness is enforced here:
  if (!phone) setFieldError(errors, "phone", "required");
  else {
    const code = getPhoneErrorCode(phone);
    if (code) setFieldError(errors, "phone", code);
  }

  if (!privacy) setFieldError(errors, "privacy", "required");

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "validationFailed" };
  }

  const t = await getTranslations({ locale, namespace: "quiz" });

  // --- Format email ---
  const itemsHtml: string[] = [];

  for (const step of QUIZ_STEPS) {
    if (step.type !== "single") continue;

    const selectedId = safeAnswers[step.id];
    const label = t(`steps.${step.id}.emailLabel` as const);

    const option = step.options.find(o => o.id === selectedId);
    const value = option ? t(option.labelKey as never) : t("email.notAnswered");

    itemsHtml.push(
      `<li style="margin:0 0 6px"><b>${escapeHtml(label)}:</b> ${escapeHtml(value)}</li>`
    );
  }

  const subject = "iHome - Property Finder Quiz";

  const html = `
    <div style="font-family: ui-sans-serif, system-ui; line-height: 1.5">
      <h2 style="margin:0 0 12px">${escapeHtml(subject)}</h2>

      <p style="margin:0 0 6px"><b>Name:</b> ${escapeHtml(
        `${firstName}${lastName ? ` ${lastName}` : ""}`
      )}</p>
      <p style="margin:0 0 6px"><b>Email:</b> ${escapeHtml(email)}</p>
      <p style="margin:0 0 12px"><b>Phone:</b> ${escapeHtml(phone)}</p>

      <h3 style="margin:16px 0 8px; font-size: 14px">Quiz answers</h3>
      <ul style="margin:0; padding-left: 18px">
        ${itemsHtml.join("")}
      </ul>

      <p style="margin: 12px 0 0; color: #6b7280; font-size: 12px">
        Privacy accepted: yes
      </p>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email,
      html,
      headers: {
        "X-iHome-Lead-Type": "quiz",
      },
    });

    return { success: true };
  } catch {
    return { success: false, message: "unknown" };
  }
}
