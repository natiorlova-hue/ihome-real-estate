"use client";

import { Mail, Phone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Locale } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

type ContactContent = {
  labels: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  };
  placeholders: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
  };
  privacy: {
    prefix: string;
    link: string;
    href: string;
  };
  submit: string; // submit.idle from ContactSection
};

type ContactFormProps = {
  locale: Locale;
  content: ContactContent;
};

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  privacy: boolean;
  company: string; // honeypot
};

type FieldName = keyof Omit<FormValues, "privacy" | "company">;

type FieldErrors = Partial<Record<FieldName | "privacy", string>>;

const LETTERS_ONLY = /^[a-zA-ZÀ-ÿ\s'-]*$/;
const PHONE_ALLOWED = /^[0-9+\s()-]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ content }: ContactFormProps) {
  const t = useTranslations("forms.contact");

  const [values, setValues] = React.useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    privacy: false,
    company: "",
  });

  const [touched, setTouched] = React.useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});

  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const requiredValid =
    isFirstNameValid(values.firstName) && isEmailValid(values.email);

  function setField(name: keyof FormValues, value: string | boolean) {
    setValues(prev => ({ ...prev, [name]: value }));
  }

  function markTouched(name: keyof FormValues) {
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  function validateField(name: FieldName): string | undefined {
    const v = values[name];

    if (name === "firstName") {
      if (!v.trim()) return t("errors.required");
      if (!LETTERS_ONLY.test(v)) return t("errors.firstNameLettersOnly");
      return undefined;
    }

    if (name === "email") {
      if (!v.trim()) return t("errors.required");
      if (!EMAIL_REGEX.test(v)) return t("errors.emailInvalid");
      return undefined;
    }

    if (name === "phone") {
      if (v.trim() && !PHONE_ALLOWED.test(v))
        return t("errors.phoneDigitsOnly");
      return undefined;
    }

    // lastName/message are optional per your spec
    return undefined;
  }

  function setLiveError(name: FieldName) {
    const err = validateField(name);
    setErrors(prev => ({ ...prev, [name]: err }));
  }

  function isFirstNameValid(v: string) {
    return v.trim().length > 0 && LETTERS_ONLY.test(v);
  }

  function isEmailValid(v: string) {
    return v.trim().length > 0 && EMAIL_REGEX.test(v);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // bot trap
    if (values.company.trim().length > 0) {
      setStatus("error");
      return;
    }

    // mark required as touched
    markTouched("firstName");
    markTouched("email");

    // validate required fields + phone rule
    const nextErrors: FieldErrors = {
      firstName: validateField("firstName"),
      email: validateField("email"),
      phone: validateField("phone"),
    };

    // remove undefined
    Object.keys(nextErrors).forEach(k => {
      const key = k as keyof FieldErrors;
      if (!nextErrors[key]) delete nextErrors[key];
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setStatus("sending");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
          privacy: values.privacy,
          company: values.company,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        privacy: false,
        company: "",
      });
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  function shouldShowError(name: keyof FormValues) {
    return Boolean(touched[name]) && Boolean(errors[name as keyof FieldErrors]);
  }

  const submitLabel =
    status === "sending"
      ? t("submit.sending")
      : status === "success"
        ? t("submit.success")
        : status === "error"
          ? t("submit.idle")
          : content.submit;

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot */}
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        name="company"
        value={values.company}
        onChange={e => setField("company", e.target.value)}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label={content.labels.firstName} required>
          <InputWithIcon
            icon={<User className="h-4 w-4 text-gray-400" aria-hidden="true" />}
          >
            <Input
              name="firstName"
              placeholder={content.placeholders.firstName}
              value={values.firstName}
              onChange={e => {
                setField("firstName", e.target.value);
                setLiveError("firstName");
              }}
              onBlur={() => {
                markTouched("firstName");
                setLiveError("firstName");
              }}
              aria-invalid={shouldShowError("firstName")}
              autoComplete="given-name"
            />
          </InputWithIcon>

          <HintOrError
            showError={shouldShowError("firstName")}
            errorText={errors.firstName}
            hintText={t("hints.firstNameLettersOnly")}
          />
        </Field>

        <Field label={content.labels.lastName}>
          <InputWithIcon
            icon={<User className="h-4 w-4 text-gray-400" aria-hidden="true" />}
          >
            <Input
              name="lastName"
              placeholder={content.placeholders.lastName}
              value={values.lastName}
              onChange={e => setField("lastName", e.target.value)}
              onBlur={() => markTouched("lastName")}
              autoComplete="family-name"
            />
          </InputWithIcon>
        </Field>
      </div>

      <Field label={content.labels.email} required>
        <InputWithIcon
          icon={<Mail className="h-4 w-4 text-gray-400" aria-hidden="true" />}
        >
          <Input
            name="email"
            placeholder={content.placeholders.email}
            value={values.email}
            onChange={e => {
              setField("email", e.target.value);
              setLiveError("email");
            }}
            onBlur={() => {
              markTouched("email");
              setLiveError("email");
            }}
            aria-invalid={shouldShowError("email")}
            inputMode="email"
            autoComplete="email"
          />
        </InputWithIcon>

        <HintOrError
          showError={shouldShowError("email")}
          errorText={errors.email}
          hintText={t("hints.email")}
        />
      </Field>

      <Field label={content.labels.phone}>
        <InputWithIcon
          icon={<Phone className="h-4 w-4 text-gray-400" aria-hidden="true" />}
        >
          <Input
            name="phone"
            placeholder={content.placeholders.phone}
            value={values.phone}
            onChange={e => {
              setField("phone", e.target.value);
              setLiveError("phone");
            }}
            onBlur={() => {
              markTouched("phone");
              setLiveError("phone");
            }}
            aria-invalid={shouldShowError("phone")}
            inputMode="tel"
            autoComplete="tel"
          />
        </InputWithIcon>

        <HintOrError
          showError={shouldShowError("phone")}
          errorText={errors.phone}
          hintText={t("hints.phoneDigitsOnly")}
        />
      </Field>

      <Field label={content.labels.message}>
        <Textarea
          name="message"
          placeholder={content.placeholders.message}
          value={values.message}
          onChange={e => setField("message", e.target.value)}
          onBlur={() => markTouched("message")}
        />
      </Field>

      <div className="flex items-start gap-3">
        <Checkbox
          id="privacy"
          checked={values.privacy}
          onChange={e => setField("privacy", e.target.checked)}
        />
        <div className="text-sm leading-5 text-gray-600">
          <Label htmlFor="privacy" className="font-normal text-gray-600">
            {content.privacy.prefix}{" "}
            <Link
              href={content.privacy.href}
              className="text-mediterranean-600 underline underline-offset-4 hover:text-mediterranean-700"
            >
              {content.privacy.link}
            </Link>
            .
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        size="xl"
        className={cn(
          "w-full",
          requiredValid
            ? "bg-terracotta-500 hover:bg-terracotta-600 text-white"
            : "bg-gray-300 text-gray-700 hover:bg-gray-300"
        )}
        disabled={!requiredValid || status === "sending"}
      >
        {submitLabel}
      </Button>

      <div className="min-h-6 text-center text-sm">
        {status === "success" ? (
          <p role="status" className="text-success-700">
            {t("submit.success")}
          </p>
        ) : status === "error" ? (
          <p role="alert" className="text-error-700">
            {t("submit.error")}
          </p>
        ) : (
          <span aria-hidden="true" />
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required ? <span className="text-terracotta-500"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}

function HintOrError({
  showError,
  errorText,
  hintText,
}: {
  showError: boolean;
  errorText?: string;
  hintText: string;
}) {
  return showError ? (
    <p className="text-sm text-error-600">{errorText}</p>
  ) : (
    <p className="text-sm text-tertiary-600">{hintText}</p>
  );
}

function InputWithIcon({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        {icon}
      </span>
      <div className="[&>input]:pl-10">{children}</div>
    </div>
  );
}
