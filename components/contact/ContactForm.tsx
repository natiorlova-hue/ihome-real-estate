"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Mail, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/locale-path";

type ContactContent = {
  kicker: string;
  title: string;
  subtitle: string;
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
  submit: string;
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
  company?: string; // honeypot
};

function buildSchema() {
  return z.object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.string().trim().email(),
    phone: z.string().trim().min(6),
    message: z.string().trim().min(10),
    privacy: z.boolean().refine(v => v === true),
    company: z.string().optional(),
  });
}

export default function ContactForm({ content }: ContactFormProps) {
  const schema = React.useMemo(() => buildSchema(), []);
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
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
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit(async values => {
    setStatus("idle");

    // bot trap
    if (values.company && values.company.trim().length > 0) {
      setStatus("error");
      return;
    }

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      // map zod issues to RHF errors (no extra deps)
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string") {
          setError(field as keyof FormValues, { type: "validate" });
        }
      }
      return;
    }

    try {
      setStatus("submitting");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot (hidden) */}
      <input
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("company")}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field
          label={content.labels.firstName}
          required
          error={Boolean(errors.firstName)}
        >
          <InputWithIcon
            icon={<User className="h-4 w-4 text-gray-400" aria-hidden="true" />}
            placeholder={content.placeholders.firstName}
            aria-invalid={Boolean(errors.firstName)}
            {...register("firstName")}
          />
        </Field>

        <Field
          label={content.labels.lastName}
          required
          error={Boolean(errors.lastName)}
        >
          <InputWithIcon
            icon={<User className="h-4 w-4 text-gray-400" aria-hidden="true" />}
            placeholder={content.placeholders.lastName}
            aria-invalid={Boolean(errors.lastName)}
            {...register("lastName")}
          />
        </Field>
      </div>

      <Field
        label={content.labels.email}
        required
        error={Boolean(errors.email)}
      >
        <InputWithIcon
          icon={<Mail className="h-4 w-4 text-gray-400" aria-hidden="true" />}
          placeholder={content.placeholders.email}
          inputMode="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>

      <Field
        label={content.labels.phone}
        required
        error={Boolean(errors.phone)}
      >
        <InputWithIcon
          icon={<Phone className="h-4 w-4 text-gray-400" aria-hidden="true" />}
          placeholder={content.placeholders.phone}
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register("phone")}
        />
      </Field>

      <Field
        label={content.labels.message}
        required
        error={Boolean(errors.message)}
      >
        <Textarea
          placeholder={content.placeholders.message}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
      </Field>

      <div className="flex items-start gap-3">
        <Checkbox
          id="privacy"
          invalid={Boolean(errors.privacy)}
          aria-invalid={Boolean(errors.privacy)}
          {...register("privacy")}
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
        className="w-full"
        disabled={status === "submitting"}
      >
        {content.submit}
      </Button>

      <div aria-live="polite" className="min-h-6 text-center text-sm">
        {status === "success" ? (
          <p className="text-success-700">✓</p>
        ) : status === "error" ? (
          <p className="text-error-700">×</p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className={cn(error ? "text-error-700" : "")}>
        {label}
        {required ? <span className="text-terracotta-500"> *</span> : null}
      </Label>
      {children}
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
