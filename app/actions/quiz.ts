// app/actions/quiz.ts

"use server";

import { QUIZ_STEPS } from "@/lib/quiz";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

// 1. Strict Schema Definition
const schema = z.object({
  // Zod 4+: Key schema first, Value schema second
  answers: z.record(z.string(), z.string()),
  contact: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(5),
    privacy: z.boolean().refine(val => val === true),
  }),
  locale: z.enum(["en", "es", "ru"]),
});

export type QuizState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function submitQuizAction(
  prevState: QuizState,
  formData: FormData
): Promise<QuizState> {
  // 2. Parse Data
  const rawAnswers = formData.get("answers") as string;
  const rawData = {
    answers: rawAnswers ? JSON.parse(rawAnswers) : {},
    contact: {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      privacy: formData.get("privacy") === "on",
    },
    locale: formData.get("locale"),
  };

  const validated = schema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const { answers, contact, locale } = validated.data;

  // 3. Get Translations
  const t = await getTranslations({ locale, namespace: "quiz" });

  // 4. Format Email Body
  const summaryLines: string[] = [t("email.summaryTitle")];

  const formatStep = (stepId: string, answerId: string) => {
    const stepDef = QUIZ_STEPS.find(s => s.id === stepId);

    if (!stepDef || stepDef.type !== "single") return;

    const option = stepDef.options.find(o => o.id === answerId);

    const label = t(`steps.${stepId}.emailLabel`);
    const value = option ? t(option.labelKey) : t("email.notAnswered");

    summaryLines.push(`- **${label}**: ${value}`);
  };

  Object.entries(answers).forEach(([key, val]) =>
    formatStep(key, val as string)
  );

  summaryLines.push("\n**Contact Details:**");
  summaryLines.push(`Name: ${contact.firstName} ${contact.lastName}`);
  summaryLines.push(`Email: ${contact.email}`);
  summaryLines.push(`Phone: ${contact.phone}`);

  const emailBody = summaryLines.join("\n");

  // 5. Send Email
  try {
    console.log("📨 [SERVER ACTION] Sending Email:", emailBody);
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: "Failed to send email" };
  }
}
