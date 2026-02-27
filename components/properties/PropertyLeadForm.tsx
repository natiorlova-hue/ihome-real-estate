"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

type PropertyLeadFormProps = {
  propertyName: string;
};

export default function PropertyLeadForm({
  propertyName,
}: PropertyLeadFormProps) {
  const t = useTranslations("properties.details.form");
  const tf = useTranslations("forms.contact");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: `I would like to request more details about ${propertyName}.`,
      privacy: false,
    },
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const onSubmit = handleSubmit(async () => {
    setStatus("submitting");
    // Тут у майбутньому буде запит до /api/contact, як у ContactForm
    setTimeout(() => {
      setStatus("success");
    }, 1000);
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
      <h3 className="mb-6 text-center font-serif text-2xl text-gray-900">
        {t("title")}
      </h3>

      {/* Quick Action Buttons */}
      <div className="mb-6 flex gap-3">
        <Button className="flex-1 bg-[#25D366] text-white hover:bg-[#20b858] shadow-sm">
          {t("whatsapp")}
        </Button>
        <Button variant="brandBlue" className="flex-1 shadow-sm">
          {t("bookCall")}
        </Button>
      </div>

      <div className="relative mb-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="relative bg-white px-3 text-sm text-gray-400 font-medium">
          {t("or")}
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>
              {t("firstName")} <span className="text-terracotta-500">*</span>
            </Label>
            <Input
              {...register("firstName", { required: true })}
              aria-invalid={!!errors.firstName}
            />
          </div>
          <div className="space-y-1.5">
            <Label>{t("lastName")}</Label>
            <Input {...register("lastName")} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>
            {t("email")} <span className="text-terracotta-500">*</span>
          </Label>
          <Input
            type="email"
            {...register("email", { required: true })}
            aria-invalid={!!errors.email}
          />
        </div>

        <div className="space-y-1.5">
          <Label>{t("phone")}</Label>
          <Input type="tel" {...register("phone")} />
        </div>

        <div className="space-y-1.5">
          <Label>{t("message")}</Label>
          <Textarea
            {...register("message")}
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className="flex items-start gap-3 pt-2">
          <Checkbox
            id="property-privacy"
            checked={watch("privacy")}
            onCheckedChange={c =>
              setValue("privacy", c as boolean, { shouldValidate: true })
            }
            className={cn(errors.privacy && "border-error-500")}
          />
          <Label
            htmlFor="property-privacy"
            className="text-xs font-normal leading-tight text-gray-600 cursor-pointer"
          >
            {tf("privacy.prefix")}{" "}
            <Link
              href="/privacy-policy"
              className="text-brandBlue-500 underline underline-offset-4"
            >
              {tf("privacy.link")}
            </Link>
            .<span className="text-terracotta-500">*</span>
          </Label>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || !watch("privacy")}
          className="mt-4 w-full"
        >
          {isSubmitting ? "Sending..." : t("submit")}
        </Button>

        {status === "success" && (
          <p className="text-center text-sm font-medium text-success-700">
            {t("success")}
          </p>
        )}
      </form>
    </div>
  );
}
