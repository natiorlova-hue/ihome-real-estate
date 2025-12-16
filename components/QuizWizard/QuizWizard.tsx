"use client";

type QuizWizardProps = {
  locale: Locale;
};

type Answers = Partial<Record<Exclude<QuizStep["id"], "contact">, string>>;

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; messageKey: "unknown" };

function clampIndex(i: number, max: number) {
  if (i < 0) return 0;
  if (i > max) return max;
  return i;
}

function formatSummary(t: (key: string) => string, answers: Answers) {
  const lines: string[] = [];
  lines.push(t("email.summaryTitle"));

  const pushLine = (labelKey: string, valueKey?: string) => {
    const label = t(labelKey);
    const value = valueKey ? t(valueKey) : t("email.notAnswered");
    lines.push(`${label}: ${value}`);
  };

  const step = (id: keyof Answers) => {
    const s = QUIZ_STEPS.find(x => x.id === id);
    if (!s || s.type !== "single") return null;
    const valueId = answers[id];
    const optionKey = s.options.find(o => o.id === valueId)?.labelKey;
    return { labelKey: `steps.${s.id}.emailLabel`, optionKey };
  };

  (
    ["aboutYou", "propertyType", "bedrooms", "budget", "priorities"] as const
  ).forEach(id => {
    const meta = step(id);
    if (!meta) return;
    pushLine(meta.labelKey, meta.optionKey);
  });

  return lines.join("\n");
}

export default function QuizWizard({ locale }: QuizWizardProps) {
  const t = useTranslations("quiz");

  const lastIndex = QUIZ_STEPS.length - 1;
  const [index, setIndex] = React.useState(0);
  const step = QUIZ_STEPS[index];

  const [answers, setAnswers] = React.useState<Answers>({});
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [privacy, setPrivacy] = React.useState(false);

  const [submitState, setSubmitState] = React.useState<SubmitState>({
    status: "idle",
  });

  const progressPct = Math.round((index / lastIndex) * 100);

  const canGoNext =
    step.type === "single"
      ? Boolean(answers[step.id])
      : Boolean(firstName.trim()) && Boolean(email.trim()) && privacy;

  function onPick(optionId: string) {
    if (step.type !== "single") return;
    setAnswers(prev => ({ ...prev, [step.id]: optionId }));
  }

  function goNext() {
    setIndex(i => clampIndex(i + 1, lastIndex));
  }

  function goPrev() {
    setIndex(i => clampIndex(i - 1, lastIndex));
  }

  async function onSubmit() {
    setSubmitState({ status: "submitting" });

    const message = formatSummary(t, answers);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message,
          privacy: true,
          company: "",
        }),
      });

      if (!res.ok) {
        setSubmitState({ status: "error", messageKey: "unknown" });
        return;
      }

      setSubmitState({ status: "success" });
    } catch {
      setSubmitState({ status: "error", messageKey: "unknown" });
    }
  }

  if (submitState.status === "success") {
    return (
      <div className="rounded-2xl bg-white px-6 py-14 text-center shadow-sm md:px-10">
        <h2 className="font-serif text-serifmd text-gray-900 md:text-seriflg">
          {t("success.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-700">
          {t("success.subtitle")}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="border-b border-gray-100 px-5 py-4 md:px-8 md:py-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-gray-700">{t("ui.title")}</p>
          <p className="text-xs font-medium text-gray-500">{progressPct}%</p>
        </div>

        <div className="mt-3 h-1.5 w-full rounded-full bg-gray-100">
          <div
            className="h-1.5 rounded-full bg-brandBlue-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="px-5 py-6 md:px-8 md:py-8">
        <p className="text-xs font-semibold text-gray-500">
          {t("ui.questionCounter", {
            current: index + 1,
            total: QUIZ_STEPS.length,
          })}
        </p>

        <h2 className="mt-2 text-base font-semibold text-gray-900 md:text-lg">
          {t(step.titleKey)}
        </h2>

        {"subtitleKey" in step && step.subtitleKey ? (
          <p className="mt-2 text-sm text-gray-700">{t(step.subtitleKey)}</p>
        ) : null}

        {step.type === "single" ? (
          <div className="mt-5 space-y-2">
            {step.options.map(opt => {
              const selected = answers[step.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onPick(opt.id)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue-400 focus-visible:ring-offset-2",
                    selected
                      ? "border-brandBlue-500 bg-blue-light-50 text-gray-900"
                      : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                  )}
                  aria-pressed={selected}
                >
                  {t(opt.labelKey)}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-6">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t("form.firstName")}
                </label>
                <div className="mt-2">
                  <Input
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder={t("form.firstNamePlaceholder")}
                    autoComplete="given-name"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t("form.lastName")}
                </label>
                <div className="mt-2">
                  <Input
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder={t("form.lastNamePlaceholder")}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("form.email")}
                </label>
                <div className="mt-2">
                  <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t("form.emailPlaceholder")}
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  {t("form.phone")}
                </label>
                <div className="mt-2">
                  <Input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder={t("form.phonePlaceholder")}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3">
              <Checkbox
                checked={privacy}
                onCheckedChange={v => setPrivacy(Boolean(v))}
                id="quiz-privacy"
              />
              <label
                htmlFor="quiz-privacy"
                className="text-sm leading-6 text-gray-700"
              >
                {t("form.privacyText")}
              </label>
            </div>
          </div>
        )}

        {submitState.status === "error" ? (
          <p className="mt-4 text-sm text-error-600">{t("errors.unknown")}</p>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={goPrev}
            disabled={index === 0 || submitState.status === "submitting"}
          >
            {t("ui.prev")}
          </Button>

          {index < lastIndex ? (
            <Button
              type="button"
              variant="brandBlue"
              size="lg"
              onClick={goNext}
              disabled={!canGoNext}
            >
              {t("ui.next")}
            </Button>
          ) : (
            <Button
              type="button"
              variant="brandBlue"
              size="lg"
              onClick={onSubmit}
              disabled={!canGoNext || submitState.status === "submitting"}
            >
              {submitState.status === "submitting"
                ? t("ui.submitting")
                : t("ui.submit")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
