//components/quiz/quiz-shell.tsx

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
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";

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

  // Map server errors → RHF fields (single source: server)
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
    }, 300);
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

  if (serverState.success) {
    return (
      <div className="animate-in fade-in zoom-in-95 duration-500 mx-auto max-w-xl text-center py-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="font-serif text-3xl text-gray-900">
          {t("success.title")}
        </h2>
        <p className="mt-4 text-gray-600 text-lg">{t("success.subtitle")}</p>
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

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/50 ring-1 ring-gray-100">
      {/* Progress Bar (no inline styles) */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
          <span>{t("ui.title")}</span>
          <span>
            {state.stepIndex + 1} / {totalSteps}
          </span>
        </div>

        <progress
          value={state.stepIndex + 1}
          max={totalSteps}
          className={cn(
            "h-1.5 w-full overflow-hidden rounded-full",
            "[&::-webkit-progress-bar]:bg-gray-200",
            "[&::-webkit-progress-value]:bg-brandBlue-500",
            "[&::-webkit-progress-value]:transition-all",
            "[&::-webkit-progress-value]:duration-500",
            "[&::-webkit-progress-value]:ease-out",
            "[&::-moz-progress-bar]:bg-brandBlue-500"
          )}
          aria-label="Quiz progress"
        />
      </div>

      <div className="px-6 py-8 md:px-10 min-h-[400px] flex flex-col">
        <div
          key={currentStepDef.id}
          className="animate-in slide-in-from-right-8 fade-in duration-300 flex-1"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 leading-tight">
            {t(currentStepDef.titleKey)}
          </h2>

          {currentStepDef.subtitleKey ? (
            <p className="mt-2 text-gray-600">
              {t(currentStepDef.subtitleKey)}
            </p>
          ) : null}

          <div className="mt-8">
            {currentStepDef.type === "single" ? (
              <div className="grid gap-3">
                {currentStepDef.options.map(opt => {
                  const isSelected =
                    state.answers[currentStepDef.id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleOptionSelect(opt.id)}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all duration-200",
                        "hover:border-brandBlue-300 hover:bg-blue-light-25",
                        isSelected
                          ? "border-brandBlue-500 bg-blue-light-50 ring-1 ring-brandBlue-500 shadow-sm"
                          : "border-gray-200 bg-white"
                      )}
                    >
                      <span
                        className={cn(
                          "text-base",
                          isSelected
                            ? "font-medium text-brandBlue-900"
                            : "text-gray-700"
                        )}
                      >
                        {t(opt.labelKey)}
                      </span>
                      {isSelected ? (
                        <Check className="h-5 w-5 text-brandBlue-500" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ) : (
              <form
                id="quiz-form"
                onSubmit={onSubmitContact}
                className="space-y-5 animate-in fade-in duration-500"
                noValidate
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      {t("form.firstName")}
                      <span className="text-terracotta-500"> *</span>
                    </label>
                    <Input
                      aria-invalid={Boolean(errors.firstName)}
                      placeholder={t("form.firstNamePlaceholder")}
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
                      <p className="text-sm text-error-700">
                        {tf(
                          `errors.${getErrorCode(errors.firstName)}` as const
                        )}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      {t("form.lastName")}
                    </label>
                    <Input
                      aria-invalid={Boolean(errors.lastName)}
                      placeholder={t("form.lastNamePlaceholder")}
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
                      <p className="text-sm text-error-700">
                        {tf(`errors.${getErrorCode(errors.lastName)}` as const)}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    {t("form.email")}
                    <span className="text-terracotta-500"> *</span>
                  </label>
                  <Input
                    inputMode="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    placeholder={t("form.emailPlaceholder")}
                    {...register("email", {
                      onChange: e => {
                        const v = String(e.target.value ?? "");
                        const code = getEmailErrorCode(v);
                        if (code)
                          setError("email", {
                            type: "validate",
                            message: code,
                          });
                        else clearErrors("email");
                      },
                      onBlur: e => {
                        const v = String(e.target.value ?? "");
                        const code = getEmailErrorCode(v);
                        if (code)
                          setError("email", {
                            type: "validate",
                            message: code,
                          });
                        else clearErrors("email");
                      },
                    })}
                  />
                  {touchedFields.email && errors.email ? (
                    <p className="text-sm text-error-700">
                      {tf(`errors.${getErrorCode(errors.email)}` as const)}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    {t("form.phone")}
                  </label>
                  <Input
                    inputMode="tel"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    placeholder={t("form.phonePlaceholder")}
                    {...register("phone", {
                      onChange: e => {
                        const v = String(e.target.value ?? "");
                        const code = v.trim()
                          ? getPhoneErrorCode(v)
                          : undefined;
                        if (code)
                          setError("phone", {
                            type: "validate",
                            message: code,
                          });
                        else clearErrors("phone");
                      },
                      onBlur: e => {
                        const v = String(e.target.value ?? "");
                        const code = v.trim()
                          ? getPhoneErrorCode(v)
                          : undefined;
                        if (code)
                          setError("phone", {
                            type: "validate",
                            message: code,
                          });
                        else clearErrors("phone");
                      },
                    })}
                  />
                  {touchedFields.phone && errors.phone ? (
                    <p className="text-sm text-error-700">
                      {tf(`errors.${getErrorCode(errors.phone)}` as const)}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2 pt-2">
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
                    <div className="flex-1 text-sm leading-5 text-gray-600">
                      <label
                        htmlFor="quiz-privacy"
                        className="font-normal text-gray-600 cursor-pointer"
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
                    <p className="text-sm text-error-700 ml-8">
                      {tf("errors.required")}
                    </p>
                  ) : null}
                </div>

                {serverState?.message &&
                serverState.message !== "validationFailed" ? (
                  <div className="rounded-md bg-error-50 p-3 text-sm text-error-700">
                    {t("errors.unknown")}
                  </div>
                ) : null}
              </form>
            )}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
          <Button
            variant="ghost"
            onClick={() => dispatch({ type: "PREV" })}
            disabled={state.stepIndex === 0 || isPending}
            className="text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("ui.prev")}
          </Button>

          {isLastStep ? (
            <Button
              type="submit"
              form="quiz-form"
              variant="brandBlue"
              size="lg"
              disabled={
                isPending ||
                Boolean(
                  getNameErrorCode(watch("firstName") ?? "", "firstName")
                ) ||
                Boolean(getEmailErrorCode(watch("email") ?? "")) ||
                watch("privacy") !== true ||
                // avoid submit when empty/untouched (optional but feels right)
                (!dirtyFields.firstName &&
                  !dirtyFields.email &&
                  !dirtyFields.privacy)
              }
              className="min-w-[160px]"
            >
              {isPending ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                t("ui.submit")
              )}
            </Button>
          ) : (
            <Button
              variant="brandBlue"
              className="min-w-[120px]"
              onClick={() => dispatch({ type: "NEXT" })}
              disabled={!state.answers[currentStepDef.id]}
            >
              {t("ui.next")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
