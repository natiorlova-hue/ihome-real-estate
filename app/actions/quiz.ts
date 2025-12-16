"use server";

import { getTranslations } from "next-intl/server";

import { escapeHtml, getResendEnv, sendResendEmail } from "@/lib/email/resend";
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

function setFieldError(
  errors: Record<string, string[]>,
  field: string,
  code: ContactFieldErrorCode
) {
  errors[field] = [code];
}

export async function submitQuizAction(
  _prevState: QuizState,
  formData: FormData
): Promise<QuizState> {
  const resendEnv = getResendEnv();
  if (!resendEnv) return { success: false, message: "unknown" };

  const localeRaw = asTrimmedString(formData.get("locale"));
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "en";
  const sourcePath = asTrimmedString(formData.get("sourcePath"));

  const rawAnswers = asTrimmedString(formData.get("answers"));
  const parsedAnswers = rawAnswers
    ? safeJsonParse<QuizAnswers>(rawAnswers)
    : null;
  const safeAnswers: QuizAnswers =
    parsedAnswers && typeof parsedAnswers === "object" ? parsedAnswers : {};

  const firstName = asTrimmedString(formData.get("firstName"));
  const lastName = asTrimmedString(formData.get("lastName"));
  const email = asTrimmedString(formData.get("email"));
  const phone = asTrimmedString(formData.get("phone"));
  const privacyAccepted = formData.get("privacy") === "on";

  // --- Validate with shared rules (same as main form) ---
  const errors: Record<string, string[]> = {};

  {
    const code = getNameErrorCode(firstName, "firstName");
    if (code) setFieldError(errors, "firstName", code);
  }

  // lastName (optional)
  if (lastName) {
    const code = getNameErrorCode(lastName, "lastName");
    if (code) setFieldError(errors, "lastName", code);
  }

  {
    const code = getEmailErrorCode(email);
    if (code) setFieldError(errors, "email", code);
  }

  // phone (optional)
  if (phone) {
    const code = getPhoneErrorCode(phone);
    if (code) setFieldError(errors, "phone", code);
  }

  if (!privacyAccepted) {
    setFieldError(errors, "privacy", "required");
  }

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

      <p style="margin:0 0 6px"><b>${escapeHtml(t("email.contact.name"))}:</b> ${escapeHtml(
        `${firstName}${lastName ? ` ${lastName}` : ""}`
      )}</p>
      <p style="margin:0 0 6px"><b>${escapeHtml(t("email.contact.email"))}:</b> ${escapeHtml(email)}</p>
      ${
        phone
          ? `<p style="margin:0 0 12px"><b>${escapeHtml(t("email.contact.phone"))}:</b> ${escapeHtml(phone)}</p>`
          : `<div style="margin:0 0 12px"></div>`
      }

      ${
        sourcePath
          ? `
            <h3 style="margin:16px 0 8px; font-size: 14px">${escapeHtml(
              t("email.source.title")
            )}</h3>
            <p style="margin:0 0 12px">${escapeHtml(sourcePath)}</p>
          `
          : ""
      }

      <h3 style="margin:16px 0 8px; font-size: 14px">${escapeHtml(
        t("email.answersTitle")
      )}</h3>
      <ul style="margin:0; padding-left: 18px">
        ${itemsHtml.join("")}
      </ul>

      <p style="margin: 12px 0 0; color: #6b7280; font-size: 12px">
        ${escapeHtml(t("email.privacyAccepted"))}: ${escapeHtml(t("email.yes"))}
      </p>
    </div>
  `;

  try {
    await sendResendEmail({
      env: resendEnv,
      subject,
      replyTo: email,
      html,
      headers: {
        "X-iHome-Label": "Leads from site iHOME",
        "X-iHome-Lead-Type": "quiz",
      },
    });

    return { success: true };
  } catch {
    return { success: false, message: "unknown" };
  }
}
