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
    submit: t("contact.submit.default"),
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative overflow-hidden pt-24 pb-16"
    >
      {/* background image */}
      <Image
        src="/bg-form.png"
        alt=""
        fill
        priority
        className="
      pointer-events-none
      select-none
      object-contain
      object-bottom
    "
      />
      {/* content layer */}
      <div
        className="
      relative z-10
      mx-auto
      max-w-[1280px]
      px-6 md:px-10 lg:px-20
    "
      >
        <div className="mx-auto max-w-[560px] text-center">
          <p className="text-xs font-semibold tracking-wide text-terracotta-500">
            {content.kicker}
          </p>

          <h2
            id="contact-heading"
            className="mt-3 font-serif text-4xl tracking-tight text-gray-950 sm:text-5xl"
          >
            {content.title}
          </h2>

          <p className="mt-3 text-tertiary-600">{content.subtitle}</p>

          <div className="mt-10 text-left">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
