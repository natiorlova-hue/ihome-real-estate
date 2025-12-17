export type ContactFieldErrorCode =
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

export type ContactFormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  message?: string;
  privacy?: boolean;
  company?: string; // honeypot
};

// IMPORTANT:
// Client ContactForm дозволяє кирилицю, сервер /api/contact — ні.
// Робимо узгоджено: дозволяємо латиницю + кирилицю + пробіли + дефіс + апостроф.
const NAME_ALLOWED = /^[a-zA-ZÀ-ÿ\u0400-\u04FF\s'-]+$/;
const PHONE_ALLOWED = /^[0-9+\s()\-]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function asTrimmedString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function getNameErrorCode(
  v: string,
  field: "firstName" | "lastName"
): ContactFieldErrorCode | undefined {
  const value = v.trim();

  if (!value) return field === "firstName" ? "required" : undefined;

  if (!NAME_ALLOWED.test(value)) return "firstNameLettersOnly";

  if (value.length < 4)
    return field === "firstName" ? "firstNameTooShort" : "lastNameTooShort";

  if (value.length > 20)
    return field === "firstName" ? "firstNameTooLong" : "lastNameTooLong";

  return undefined;
}

export function getEmailErrorCode(
  v: string
): ContactFieldErrorCode | undefined {
  const value = v.trim();

  if (!value) return "required";
  if (value.length < 6) return "emailTooShort";
  if (value.length > 55) return "emailTooLong";
  if (!EMAIL_REGEX.test(value)) return "emailInvalid";

  return undefined;
}

export function getPhoneErrorCode(
  v: string
): ContactFieldErrorCode | undefined {
  const value = v.trim();
  if (!value) return undefined;

  if (!PHONE_ALLOWED.test(value)) return "phoneDigitsOnly";
  if (value.length < 6) return "phoneTooShort";
  if (value.length > 25) return "phoneTooLong";

  return undefined;
}

export function isHoneypotTripped(company?: string): boolean {
  return asTrimmedString(company).length > 0;
}
