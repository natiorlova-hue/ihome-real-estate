import { type Locale } from "@/lib/locale-path";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ContactForm from "./ContactForm";

type ContactSectionProps = {
  locale: Locale;
};

export default async function ContactSection({ locale }: ContactSectionProps) {
  const t = await getTranslations({ locale, namespace: "forms" });

  const content = {
    kicker: t("contact.kicker"),
    title: t("contact.title"),
    subtitle: t("contact.subtitle"),
    labels: {
      firstName: t("contact.labels.firstName"),
      lastName: t("contact.labels.lastName"),
      email: t("contact.labels.email"),
      phone: t("contact.labels.phone"),
      message: t("contact.labels.message"),
    },
    placeholders: {
      firstName: t("contact.placeholders.firstName"),
      lastName: t("contact.placeholders.lastName"),
      email: t("contact.placeholders.email"),
      phone: t("contact.placeholders.phone"),
      message: t("contact.placeholders.message"),
    },
    privacy: {
      prefix: t("contact.privacy.prefix"),
      link: t("contact.privacy.link"),
      href: `/${locale}/privacy-policy`,
    },
    submit: t("contact.submit"),
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative overflow-hidden"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10"
      >
        <Image
          src="/bg-form.svg"
          alt=""
          width={1280}
          height={980}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <div className="container">
        <div className="mx-auto max-w-[560px] py-16 md:py-24 text-center">
          <p className="text-xs font-semibold tracking-wide text-terracotta-500">
            {content.kicker}
          </p>

          <h2 id="contact-heading" className="mt-3 text-gray-950">
            {content.title}
          </h2>

          <p className="mt-3 text-tertiary-600">{content.subtitle}</p>

          <div className="mt-10 text-left">
            <ContactForm locale={locale} content={content} />
          </div>
        </div>
      </div>
    </section>
  );
}
