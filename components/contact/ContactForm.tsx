"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const LETTERS_ONLY = /^[a-zA-ZÀ-ÿ\s'-]*$/;
const DIGITS_ONLY = /^[0-9+\s()-]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const t = useTranslations("forms.contact");

  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // -------------------------
  // Validation rules
  // -------------------------
  function validateField(
    name: keyof FormValues,
    value: string
  ): string | undefined {
    if (name === "firstName") {
      if (!value.trim()) return t("errors.required");
      if (!LETTERS_ONLY.test(value)) return t("errors.firstNameLettersOnly");
    }

    if (name === "email") {
      if (!value.trim()) return t("errors.required");
      if (!EMAIL_REGEX.test(value)) return t("errors.emailInvalid");
    }

    if (name === "phone") {
      if (value && !DIGITS_ONLY.test(value)) return t("errors.phoneDigitsOnly");
    }

    return undefined;
  }

  // -------------------------
  // Handlers
  // -------------------------
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target as {
      name: keyof FormValues;
      value: string;
    };

    setValues(prev => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = e.target.name as keyof FormValues;
    setTouched(prev => ({ ...prev, [name]: true }));
  }

  function isFormValid() {
    return (
      !validateField("firstName", values.firstName) &&
      !validateField("email", values.email)
    );
  }

  // -------------------------
  // Submit
  // -------------------------
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitAttempted(true);

    const newErrors: FormErrors = {};

    (Object.keys(values) as (keyof FormValues)[]).forEach(key => {
      const error = validateField(key, values[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // 👉 тут буде Resend (наступний крок)
  }

  return {
    values,
    errors,
    touched,
    submitAttempted,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormValid,
  };
}
