//components/contact/EmailLeadForm.tsx

"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FieldErrorCode =
  | "required"
  | "emailInvalid"
  | "emailTooShort"
  | "emailTooLong";

type FormValues = {
  email: string;
};

type ApiResponse =
  | { ok: true }
  | { ok: false; error?: "invalidEmail" | "rateLimited" | "unknown" };

function getEmailErrorCode(v: string): FieldErrorCode | undefined {
  const value = v.trim();

  if (!value) return "required";
  if (value.length < 6) return "emailTooShort";
  if (value.length > 55) return "emailTooLong";

  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!ok) return "emailInvalid";

  return undefined;
}

export type EmailLeadFormProps = {
  // UI copy comes from CTA (common.json), not from forms namespace
  emailPlaceholder: string;
  buttonLabel: string;
  privacyPrefix: string;
  privacyLink: string;
  privacyHref: string;

  // For API payload
  locale: string;

  variant?: "brand" | "default";
  className?: string;
  defaultEmail?: string;
};

export default function EmailLeadForm({
  emailPlaceholder,
  buttonLabel,
  privacyPrefix,
  privacyLink,
  privacyHref,
  locale,
  variant = "brand",
  className,
  defaultEmail,
}: EmailLeadFormProps) {
  const t = useTranslations("forms.contact");
  const pathname = usePathname();
  const isBrand = variant === "brand";

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<FormValues>({
    defaultValues: { email: defaultEmail ?? "" },
    mode: "onChange",
  });

  const [status, setStatus] = React.useState<"idle" | "success" | "error">(
    "idle"
  );

  const email = watch("email") ?? "";
  const emailCode = getEmailErrorCode(email);
  const emailTrimmed = email.trim();
  const emailDirty = Boolean(dirtyFields.email);

  // pristine = ще не чіпали поле або воно пусте
  const isPristine = !emailDirty && emailTrimmed.length === 0;

  // invalid while typing = вже ввели щось, але є помилка
  const isInvalidWhileTyping =
    emailDirty && emailTrimmed.length > 0 && Boolean(emailCode);

  const canSubmit = !emailCode && !isSubmitting;

  const onSubmit = handleSubmit(async values => {
    setStatus("idle");

    const code = getEmailErrorCode(values.email);
    if (code) {
      setError("email", { type: "validate", message: code });
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email.trim(),
          locale,
          sourcePath: pathname,
        }),
      });

      const data = (await res.json().catch(() => null)) as ApiResponse | null;

      if (!res.ok || !data) {
        setStatus("error");
        return;
      }

      if (!data.ok) {
        if (data.error === "invalidEmail") {
          setError("email", { type: "server", message: "emailInvalid" });
          setStatus("idle");
          return;
        }

        setStatus("error");
        return;
      }

      setStatus("success");
      reset({ email: "" });
    } catch {
      setStatus("error");
    }
  });
  const errorCode = touchedFields.email
    ? (errors.email?.message as FieldErrorCode | undefined)
    : undefined;

  const errorText = errorCode ? t(`errors.${errorCode}` as const) : null;

  return (
    <div className={cn("w-full max-w-[520px]", className)}>
      <form onSubmit={onSubmit} noValidate className="space-y-2">
        <div className="flex flex-col gap-3 md:flex-row">
          <Input
            inputMode="email"
            autoComplete="email"
            placeholder={emailPlaceholder}
            aria-invalid={Boolean(errors.email)}
            className={cn("h-12", isBrand && "bg-white")}
            {...register("email", {
              onBlur: e => {
                const v = String(e.target.value ?? "");
                const c = getEmailErrorCode(v);
                if (c) setError("email", { type: "validate", message: c });
                else clearErrors("email");
              },
              onChange: e => {
                // до першого blur — не показуємо нічого
                if (!touchedFields.email) return;

                const v = String(e.target.value ?? "");
                const c = getEmailErrorCode(v);
                if (c) setError("email", { type: "validate", message: c });
                else clearErrors("email");
              },
            })}
          />
          <Button
            type="submit"
            size="xl"
            disabled={!canSubmit}
            className={cn(
              "h-12 md:min-w-[180px] border border-gray-200",
              // ✅ 1) pristine: disabled, але вигляд як active (white)
              isPristine && "bg-white text-gray-900",
              // ✅ 2) typing invalid: disabled look (наприклад gray-100 + gray-500)
              isInvalidWhileTyping && "bg-gray-100 text-gray-500",
              // ✅ 3) valid: active look (white)
              canSubmit &&
                "bg-white text-gray-900 hover:bg-white hover:text-gray-900",
              // прибираємо стандартну opacity від shadcn, бо вона ламає дизайн
              "disabled:opacity-100"
            )}
          >
            {buttonLabel}
          </Button>
        </div>

        <p
          className={cn(
            "text-sm font-sans",
            isBrand ? "text-white/90" : "text-tertiary-600"
          )}
        >
          {privacyPrefix}{" "}
          <Link
            href={privacyHref}
            className={cn(
              "underline underline-offset-4",
              isBrand ? "text-white" : "text-terracotta-600"
            )}
          >
            {privacyLink}
          </Link>
          .
        </p>
        <div className="min-h-5">
          {errorText ? (
            <p
              role="alert"
              className={cn(
                "text-sm",
                isBrand ? "text-white" : "text-error-700"
              )}
            >
              {errorText}
            </p>
          ) : null}
        </div>

        <div className="min-h-6 text-sm">
          {status === "success" ? (
            <p
              role="status"
              className={cn(
                "font-medium",
                isBrand ? "text-white" : "text-success-700"
              )}
            >
              {t("submit.success")}
            </p>
          ) : status === "error" ? (
            <p
              role="alert"
              className={cn(
                "font-medium",
                isBrand ? "text-white" : "text-error-700"
              )}
            >
              {t("submit.error")}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
