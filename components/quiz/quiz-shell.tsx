// components/quiz/quiz-shell.tsx

"use client";

import { submitQuizAction } from "@/app/actions/quiz";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"; // Assuming existing UI component
import { QUIZ_STEPS } from "@/lib/quiz";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";
import { useQuiz } from "./quiz-context";

export default function QuizShell({ locale }: { locale: string }) {
  const t = useTranslations("quiz");
  const { state, dispatch, totalSteps, isLastStep } = useQuiz();
  const currentStepDef = QUIZ_STEPS[state.stepIndex];

  // React 19 Action State
  const [isPending, startTransition] = React.useTransition();
  const [serverState, formAction] = React.useActionState(submitQuizAction, {
    success: false,
  });

  const autoAdvanceTimer = React.useRef<NodeJS.Timeout>(null);

  const handleOptionSelect = (optionId: string) => {
    dispatch({ type: "ANSWER", stepId: currentStepDef.id, value: optionId });

    // Smooth UX: Auto-advance after small delay
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = setTimeout(() => {
      dispatch({ type: "NEXT" });
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("answers", JSON.stringify(state.answers));
    formData.append("locale", locale);

    startTransition(() => {
      formAction(formData);
    });
  };

  // --- Success State ---
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

  // --- Quiz Flow ---
  const progressPct = Math.round(((state.stepIndex + 1) / totalSteps) * 100);

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/50 ring-1 ring-gray-100">
      {/* Progress Bar */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
          <span>{t("ui.title")}</span>
          <span>
            {state.stepIndex + 1} / {totalSteps}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-brandBlue-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="px-6 py-8 md:px-10 min-h-[400px] flex flex-col">
        {/* Question Header */}
        <div
          key={currentStepDef.id}
          className="animate-in slide-in-from-right-8 fade-in duration-300 flex-1"
        >
          <h2 className="font-serif text-2xl md:text-3xl text-gray-900 leading-tight">
            {t(currentStepDef.titleKey)}
          </h2>
          {currentStepDef.subtitleKey && (
            <p className="mt-2 text-gray-600">
              {t(currentStepDef.subtitleKey)}
            </p>
          )}

          <div className="mt-8">
            {currentStepDef.type === "single" ? (
              <div className="grid gap-3">
                {currentStepDef.options.map(opt => {
                  const isSelected =
                    state.answers[currentStepDef.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
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
                      {isSelected && (
                        <Check className="h-5 w-5 text-brandBlue-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <form
                id="quiz-form"
                onSubmit={handleSubmit}
                className="space-y-5 animate-in fade-in duration-500"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      {t("form.firstName")}
                    </label>
                    <Input
                      name="firstName"
                      required
                      placeholder={t("form.firstNamePlaceholder")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      {t("form.lastName")}
                    </label>
                    <Input
                      name="lastName"
                      required
                      placeholder={t("form.lastNamePlaceholder")}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    {t("form.email")}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder={t("form.emailPlaceholder")}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    {t("form.phone")}
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    required
                    placeholder={t("form.phonePlaceholder")}
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Checkbox id="privacy" name="privacy" required />
                  <label
                    htmlFor="privacy"
                    className="text-sm text-gray-600 leading-tight cursor-pointer select-none"
                  >
                    {t("form.privacyText")}
                  </label>
                </div>

                {serverState.errors && (
                  <div className="rounded-md bg-error-50 p-3 text-sm text-error-700">
                    {t("errors.unknown")}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Footer Actions */}
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
              disabled={isPending}
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
