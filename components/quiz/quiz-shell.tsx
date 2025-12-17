// components/quiz/quiz-shell.tsx
"use client";

import { submitQuizAction } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { QUIZ_STEPS } from "@/lib/quiz";
import { cn } from "@/lib/utils";
import {
  getEmailErrorCode,
  getNameErrorCode,
  getPhoneErrorCode,
  type ContactFieldErrorCode,
} from "@/lib/validation/contact";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Check } from "lucide-react";
import { useQuiz } from "./quiz-context";

type QuizContactValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  privacy: boolean;
};

function getErrorCode(err: unknown): ContactFieldErrorCode | undefined {
  if (!err || typeof err !== "object") return undefined;
  const anyErr = err as { message?: unknown };
  return typeof anyErr.message === "string"
    ? (anyErr.message as ContactFieldErrorCode)
    : undefined;
}

export default function QuizShell({ locale }: { locale: string }) {
  const t = useTranslations("quiz");
  const tf = useTranslations("forms.contact");

  const { state, dispatch, totalSteps, isLastStep } = useQuiz();
  const currentStepDef = QUIZ_STEPS[state.stepIndex];

  const [isPending, startTransition] = React.useTransition();
  const [serverState, formAction] = React.useActionState(submitQuizAction, {
    success: false,
  });

  const autoAdvanceTimer = React.useRef<NodeJS.Timeout>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<QuizContactValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      privacy: false,
    },
    mode: "onChange",
  });

  // Map server errors → RHF fields
  React.useEffect(() => {
    if (!serverState?.errors) return;

    for (const [field, codes] of Object.entries(serverState.errors)) {
      const code = Array.isArray(codes) ? codes[0] : undefined;
      if (!code) continue;

      setError(field as keyof QuizContactValues, {
        type: "server",
        message: code,
      });
    }
  }, [serverState?.errors, setError]);

  const handleOptionSelect = (optionId: string) => {
    dispatch({ type: "ANSWER", stepId: currentStepDef.id, value: optionId });

    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(() => {
      dispatch({ type: "NEXT" });
    }, 200);
  };

  const onSubmitContact = handleSubmit(values => {
    const fd = new FormData();

    fd.append("sourcePath", `/${locale}/lifestyle-quiz`);
    fd.append("answers", JSON.stringify(state.answers));
    fd.append("locale", locale);

    fd.append("firstName", values.firstName);
    fd.append("lastName", values.lastName);
    fd.append("email", values.email);
    fd.append("phone", values.phone);
    if (values.privacy) fd.append("privacy", "on");

    startTransition(() => {
      formAction(fd);
    });
  });

  // Success (keep as is; styling later)
  if (serverState.success) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center">
        <h2 className="font-serif text-3xl text-gray-900">
          {t("success.title")}
        </h2>
        <p className="mt-3 text-gray-600">{t("success.subtitle")}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="brandBlue" size="lg">
            <Link href={`/${locale}/properties`}>
              {t("success.ctaPrimary")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/${locale}/`}>{t("success.ctaSecondary")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const progressPct = Math.round(((state.stepIndex + 1) / totalSteps) * 100);

  // Contact submit availability (match “light” flow)
  const firstNameOk = !getNameErrorCode(watch("firstName") ?? "", "firstName");
  const emailOk = !getEmailErrorCode(watch("email") ?? "");
  const phoneVal = watch("phone") ?? "";
  const phoneOk = phoneVal.trim() ? !getPhoneErrorCode(phoneVal) : true;
  const privacyOk = watch("privacy") === true;

  const anyDirty =
    Boolean(dirtyFields.firstName) ||
    Boolean(dirtyFields.email) ||
    Boolean(dirtyFields.privacy) ||
    Boolean(dirtyFields.lastName) ||
    Boolean(dirtyFields.phone);

  const canSubmitContact =
    firstNameOk && emailOk && phoneOk && privacyOk && anyDirty && !isPending;

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg border border-gray-200 bg-white">
      {/* Header (light) */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-dsm font-sans font-semibold text-gray-900">
            {t("ui.title")}
          </h2>
          <span className="text-xs text-gray-500">{progressPct}%</span>
        </div>

        {/* Thin progress bar */}
        <div className="mt-2 h-0.5 w-full bg-gray-200">
          <div
            className="h-0.5 bg-brandBlue-500 transition-[width] duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Question line */}
        <p className="mt-3 text-xs text-gray-600">
          {t("ui.questionCounter", {
            current: state.stepIndex + 1,
            total: totalSteps,
          })}
          {": "}
          {t(currentStepDef.titleKey)}
        </p>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {currentStepDef.type === "single" ? (
          <div className="space-y-2">
            {currentStepDef.options.map(opt => {
              const isSelected = state.answers[currentStepDef.id] === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleOptionSelect(opt.id)}
                  className={cn(
                    "group flex text-xl w-full items-center justify-between rounded-xl p-4 text-left transition-all duration-200",
                    // default
                    "border-0 bg-mediterranean-50 text-gray-800 ring-0",
                    // hover / focus (3px border look)
                    "hover:text-mediterranean-600 hover:ring-[3px] hover:ring-mediterranean-600",
                    "focus-visible:outline-none focus-visible:text-mediterranean-600 focus-visible:ring-[3px] focus-visible:ring-mediterranean-600",
                    // selected (active)
                    isSelected &&
                      "text-mediterranean-600 ring-[3px] ring-mediterranean-600"
                  )}
                >
                  <span
                    className={cn(
                      "font-medium transition-colors",
                      isSelected
                        ? "font-medium text-mediterranean-600"
                        : "text-gray-800 group-hover:text-mediterranean-600 group-focus-visible:text-mediterranean-600"
                    )}
                  >
                    {t(opt.labelKey)}
                  </span>
                  {isSelected && (
                    <Check className="h-5 w-5 text-mediterranean-600" />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <form
            id="quiz-form"
            onSubmit={onSubmitContact}
            className="space-y-4"
            noValidate
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  {t("form.firstName")}
                  <span className="text-terracotta-500"> *</span>
                </label>
                <Input
                  aria-invalid={Boolean(errors.firstName)}
                  placeholder={t("form.firstNamePlaceholder")}
                  className="h-9 rounded-sm"
                  {...register("firstName", {
                    onChange: e => {
                      const v = String(e.target.value ?? "");
                      const code = getNameErrorCode(v, "firstName");
                      if (code)
                        setError("firstName", {
                          type: "validate",
                          message: code,
                        });
                      else clearErrors("firstName");
                    },
                    onBlur: e => {
                      const v = String(e.target.value ?? "");
                      const code = getNameErrorCode(v, "firstName");
                      if (code)
                        setError("firstName", {
                          type: "validate",
                          message: code,
                        });
                      else clearErrors("firstName");
                    },
                  })}
                />
                {touchedFields.firstName && errors.firstName ? (
                  <p className="text-xs text-error-700">
                    {tf(`errors.${getErrorCode(errors.firstName)}` as const)}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">
                  {t("form.lastName")}
                </label>
                <Input
                  aria-invalid={Boolean(errors.lastName)}
                  placeholder={t("form.lastNamePlaceholder")}
                  className="h-9 rounded-sm"
                  {...register("lastName", {
                    onChange: e => {
                      const v = String(e.target.value ?? "");
                      const code = v.trim()
                        ? getNameErrorCode(v, "lastName")
                        : undefined;
                      if (code)
                        setError("lastName", {
                          type: "validate",
                          message: code,
                        });
                      else clearErrors("lastName");
                    },
                    onBlur: e => {
                      const v = String(e.target.value ?? "");
                      const code = v.trim()
                        ? getNameErrorCode(v, "lastName")
                        : undefined;
                      if (code)
                        setError("lastName", {
                          type: "validate",
                          message: code,
                        });
                      else clearErrors("lastName");
                    },
                  })}
                />
                {touchedFields.lastName && errors.lastName ? (
                  <p className="text-xs text-error-700">
                    {tf(`errors.${getErrorCode(errors.lastName)}` as const)}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">
                {t("form.email")}
                <span className="text-terracotta-500"> *</span>
              </label>
              <Input
                inputMode="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                placeholder={t("form.emailPlaceholder")}
                className="h-9 rounded-sm"
                {...register("email", {
                  onChange: e => {
                    const v = String(e.target.value ?? "");
                    const code = getEmailErrorCode(v);
                    if (code)
                      setError("email", { type: "validate", message: code });
                    else clearErrors("email");
                  },
                  onBlur: e => {
                    const v = String(e.target.value ?? "");
                    const code = getEmailErrorCode(v);
                    if (code)
                      setError("email", { type: "validate", message: code });
                    else clearErrors("email");
                  },
                })}
              />
              {touchedFields.email && errors.email ? (
                <p className="text-xs text-error-700">
                  {tf(`errors.${getErrorCode(errors.email)}` as const)}
                </p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">
                {t("form.phone")}
              </label>
              <Input
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                placeholder={t("form.phonePlaceholder")}
                className="h-9 rounded-sm"
                {...register("phone", {
                  onChange: e => {
                    const v = String(e.target.value ?? "");
                    const code = v.trim() ? getPhoneErrorCode(v) : undefined;
                    if (code)
                      setError("phone", { type: "validate", message: code });
                    else clearErrors("phone");
                  },
                  onBlur: e => {
                    const v = String(e.target.value ?? "");
                    const code = v.trim() ? getPhoneErrorCode(v) : undefined;
                    if (code)
                      setError("phone", { type: "validate", message: code });
                    else clearErrors("phone");
                  },
                })}
              />
              {touchedFields.phone && errors.phone ? (
                <p className="text-xs text-error-700">
                  {tf(`errors.${getErrorCode(errors.phone)}` as const)}
                </p>
              ) : null}
            </div>

            {/* Privacy */}
            <div className="space-y-2 pt-1">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="quiz-privacy"
                  checked={Boolean(watch("privacy"))}
                  onCheckedChange={checked => {
                    setValue("privacy", checked === true, {
                      shouldValidate: true,
                    });
                    if (checked) clearErrors("privacy");
                  }}
                  aria-invalid={Boolean(errors.privacy)}
                  className={cn(errors.privacy && "border-error-500")}
                />
                <div className="flex-1 text-xs leading-5 text-gray-600">
                  <label
                    htmlFor="quiz-privacy"
                    className="cursor-pointer font-normal text-gray-600"
                  >
                    {tf("privacy.prefix")}{" "}
                    <Link
                      href={`/${locale}/privacy-policy`}
                      className="text-brandBlue-500 underline underline-offset-4 hover:text-brandBlue-600"
                    >
                      {tf("privacy.link")}
                    </Link>
                    .<span className="text-terracotta-500"> *</span>
                  </label>
                </div>
              </div>

              {errors.privacy ? (
                <p className="ml-8 text-xs text-error-700">
                  {tf("errors.required")}
                </p>
              ) : null}
            </div>

            {serverState?.message &&
            serverState.message !== "validationFailed" ? (
              <div className="rounded-sm bg-error-50 p-3 text-xs text-error-700">
                {t("errors.unknown")}
              </div>
            ) : null}
          </form>
        )}

        {/* Footer actions (right aligned like mock) */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => dispatch({ type: "PREV" })}
            disabled={state.stepIndex === 0 || isPending}
            className="h-9 rounded-sm bg-gray-100 px-4 text-xs text-gray-700 hover:bg-gray-200 disabled:opacity-100 disabled:bg-gray-100 disabled:text-gray-400"
          >
            {t("ui.prev")}
          </Button>

          {isLastStep ? (
            <Button
              type="submit"
              form="quiz-form"
              disabled={!canSubmitContact}
              className="h-9 rounded-sm bg-terracotta-500 px-5 text-xs text-white hover:bg-terracotta-600 disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-100"
            >
              {t("ui.submit")}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => dispatch({ type: "NEXT" })}
              disabled={!state.answers[currentStepDef.id]}
              className="h-9 rounded-sm bg-terracotta-500 px-5 text-xs text-white hover:bg-terracotta-600 disabled:bg-gray-200 disabled:text-gray-500 disabled:opacity-100"
            >
              {t("ui.next")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
