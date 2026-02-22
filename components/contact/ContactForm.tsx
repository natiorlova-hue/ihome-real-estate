"use client";

import { Link } from "@/i18n/routing";
import { Mail, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";

import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
  company?: string;
};

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

type ApiBadRequest = {
  ok: false;
  fieldErrors?: Partial<Record<keyof FormValues, FieldErrorCode>>;
};

const NAME_ALLOWED = /^[a-zA-ZÀ-ÿ\u0400-\u04FF\s'-]*$/;
const PHONE_ALLOWED = /^[0-9+\s()\-]*$/;

function getNameErrorCode(
  v: string,
  field: "firstName" | "lastName"
): FieldErrorCode | undefined {
  const value = v.trim();
  if (!value) return field === "firstName" ? "required" : undefined;

  if (!NAME_ALLOWED.test(value)) return "firstNameLettersOnly";

  if (value.length < 4)
    return field === "firstName" ? "firstNameTooShort" : "lastNameTooShort";
  if (value.length > 20)
    return field === "firstName" ? "firstNameTooLong" : "lastNameTooLong";

  return undefined;
}

function getEmailErrorCode(v: string): FieldErrorCode | undefined {
  const value = v.trim();

  if (!value) return "required";
  if (value.length < 6) return "emailTooShort";
  if (value.length > 55) return "emailTooLong";

  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!ok) return "emailInvalid";

  return undefined;
}

function getPhoneErrorCode(v: string): FieldErrorCode | undefined {
  const value = v.trim();
  if (!value) return undefined;

  if (!PHONE_ALLOWED.test(value)) return "phoneDigitsOnly";
  if (value.length < 6) return "phoneTooShort";
  if (value.length > 25) return "phoneTooLong";

  return undefined;
}

export default function ContactForm() {
  const t = useTranslations("forms.contact");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const firstNameRef = React.useRef<HTMLInputElement | null>(null);

  const focusFirstName = React.useCallback(() => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.setTimeout(() => {
      firstNameRef.current?.focus();
    }, 50);
  }, []);

  React.useEffect(() => {
    const shouldOpen = searchParams.get("contact") === "open";
    if (!shouldOpen) return;

    focusFirstName();

    if (pathname) {
      router.replace(pathname, { scroll: false });
    }
  }, [focusFirstName, pathname, router, searchParams]);

  React.useEffect(() => {
    const handler = () => focusFirstName();
    window.addEventListener("contact:open", handler as EventListener);
    return () =>
      window.removeEventListener("contact:open", handler as EventListener);
  }, [focusFirstName]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      privacy: false,
      company: "",
    },
    mode: "onChange",
  });

  const firstNameRegister = register("firstName", {
    onChange: e => {
      const v = String(e.target.value ?? "");
      const code = getNameErrorCode(v, "firstName");
      if (code) setError("firstName", { type: "validate", message: code });
      else clearErrors("firstName");
    },
  });

  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const firstName = watch("firstName");
  const email = watch("email");
  const privacy = watch("privacy");

  const firstNameOk = !getNameErrorCode(firstName ?? "", "firstName");
  const emailOk = !getEmailErrorCode(email ?? "");
  const privacyOk = privacy === true;

  const canSubmit = firstNameOk && emailOk && privacyOk && !isSubmitting;

  const onSubmit = handleSubmit(async values => {
    setStatus("idle");

    if (!values.privacy) {
      setError("privacy", { type: "validate", message: "required" });
      return;
    }

    if (values.company && values.company.trim().length > 0) {
      setStatus("success");
      reset();
      return;
    }

    try {
      setStatus("submitting");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.status === 400) {
        const data = (await res
          .json()
          .catch(() => null)) as ApiBadRequest | null;

        if (data?.fieldErrors) {
          for (const [field, code] of Object.entries(data.fieldErrors)) {
            if (!code) continue;
            setError(field as keyof FormValues, {
              type: "server",
              message: code,
            });
          }
          setStatus("idle");
          return;
        }
      }

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  const submitLabel =
    status === "submitting"
      ? t("submit.sending")
      : status === "success"
        ? t("submit.success")
        : t("submit.default");

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("company")}
      />

      {/* Optional: fade-in for the first row group (safe, minimal) */}
      <Reveal animation="fadeIn" delay="delay-100">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field
            label={t("labels.firstName")}
            required
            errorCode={getErrorCode(errors.firstName)}
            hintKey="onlyLetters"
          >
            <InputWithIcon
              icon={
                <User className="h-4 w-4 text-gray-400" aria-hidden="true" />
              }
              placeholder={t("placeholders.firstName")}
              aria-invalid={Boolean(errors.firstName)}
              {...firstNameRegister}
              ref={el => {
                firstNameRegister.ref(el);
                firstNameRef.current = el;
              }}
            />
          </Field>

          <Field
            label={t("labels.lastName")}
            errorCode={getErrorCode(errors.lastName)}
            hintKey="onlyLetters"
          >
            <InputWithIcon
              icon={
                <User className="h-4 w-4 text-gray-400" aria-hidden="true" />
              }
              placeholder={t("placeholders.lastName")}
              aria-invalid={Boolean(errors.lastName)}
              {...register("lastName", {
                onChange: e => {
                  const v = String(e.target.value ?? "");
                  const code = getNameErrorCode(v, "lastName");
                  if (code)
                    setError("lastName", { type: "validate", message: code });
                  else clearErrors("lastName");
                },
              })}
            />
          </Field>
        </div>
      </Reveal>

      <Field
        label={t("labels.email")}
        required
        errorCode={getErrorCode(errors.email)}
        hintKey="emailHint"
      >
        <InputWithIcon
          icon={<Mail className="h-4 w-4 text-gray-400" aria-hidden="true" />}
          placeholder={t("placeholders.email")}
          inputMode="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email", {
            onChange: e => {
              const v = String(e.target.value ?? "");
              const code = getEmailErrorCode(v);
              if (code) setError("email", { type: "validate", message: code });
              else clearErrors("email");
            },
          })}
        />
      </Field>

      <Field
        label={t("labels.phone")}
        errorCode={getErrorCode(errors.phone)}
        hintKey="numbersOnly"
      >
        <InputWithIcon
          icon={<Phone className="h-4 w-4 text-gray-400" aria-hidden="true" />}
          placeholder={t("placeholders.phone")}
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register("phone", {
            onChange: e => {
              const v = String(e.target.value ?? "");
              const code = getPhoneErrorCode(v);
              if (code) setError("phone", { type: "validate", message: code });
              else clearErrors("phone");
            },
          })}
        />
      </Field>

      <Field
        label={t("labels.message")}
        errorCode={getErrorCode(errors.message)}
      >
        <Textarea
          placeholder={t("placeholders.message")}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
      </Field>

      {/* Privacy Checkbox - REQUIRED for submit */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="privacy"
            checked={privacy}
            onCheckedChange={checked => {
              setValue("privacy", checked === true, { shouldValidate: true });
              if (checked) clearErrors("privacy");
            }}
            aria-invalid={Boolean(errors.privacy)}
            className={cn(errors.privacy && "border-error-500")}
          />
          <div className="flex-1 text-sm leading-5 text-gray-600">
            <Label
              htmlFor="privacy"
              className="cursor-pointer font-normal text-gray-600"
            >
              {t("privacy.prefix")}{" "}
              <Link
                href="/privacy-policy"
                className="text-brandBlue-500 underline underline-offset-4 hover:text-brandBlue-600"
              >
                {t("privacy.link")}
              </Link>
              .<span className="text-terracotta-500"> *</span>
            </Label>
          </div>
        </div>

        {errors.privacy && (
          <p className="ml-8 text-sm text-error-700">{t("errors.required")}</p>
        )}
      </div>

      {/* Animate ONLY the button (safe: doesn’t fight RHF reactivity) */}
      <Reveal animation="fadeIn" delay="delay-200">
        <Button
          type="submit"
          size="xl"
          className={cn(
            "w-full transition-colors",
            !canSubmit
              ? "cursor-not-allowed bg-gray-300 text-gray-600 hover:bg-gray-300"
              : "bg-terracotta-500 text-white hover:bg-terracotta-600"
          )}
          disabled={!canSubmit}
        >
          {submitLabel}
          <span className="sr-only">{t("submit.default")}</span>
        </Button>
      </Reveal>

      {/* Status messages (no animation to avoid flicker) */}
      <div className="min-h-6 text-center text-sm">
        {status === "success" ? (
          <p role="status" className="font-medium text-success-700">
            {t("submit.success")}
          </p>
        ) : status === "error" ? (
          <p role="alert" className="font-medium text-error-700">
            {t("submit.error")}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function getErrorCode(err: unknown): FieldErrorCode | undefined {
  if (!err || typeof err !== "object") return undefined;
  const anyErr = err as { message?: unknown };
  return typeof anyErr.message === "string"
    ? (anyErr.message as FieldErrorCode)
    : undefined;
}

function Field({
  label,
  required,
  errorCode,
  hintKey,
  children,
}: {
  label: string;
  required?: boolean;
  errorCode?: FieldErrorCode;
  hintKey?: "onlyLetters" | "emailHint" | "numbersOnly";
  children: React.ReactNode;
}) {
  const t = useTranslations("forms.contact");

  const hasError = Boolean(errorCode);
  const helperText = hasError
    ? t(`errors.${errorCode}` as const)
    : hintKey
      ? t(`hints.${hintKey}` as const)
      : "";

  return (
    <div className="space-y-2">
      <Label className={cn(hasError ? "text-error-700" : "text-gray-900")}>
        {label}
        {required ? <span className="text-terracotta-500"> *</span> : null}
      </Label>

      {children}

      {helperText ? (
        <p
          className={cn(
            "text-sm",
            hasError ? "text-error-700" : "text-gray-600"
          )}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

const InputWithIcon = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { icon: React.ReactNode }
>(({ icon, className, ...props }, ref) => {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        {icon}
      </span>
      <Input ref={ref} className={cn("pl-10", className)} {...props} />
    </div>
  );
});
InputWithIcon.displayName = "InputWithIcon";
