import { getTranslations } from "next-intl/server";

import EmailLeadForm from "@/components/contact/EmailLeadForm";
import ScrollToContactButton from "@/components/layout/header/ScrollToContactButton";
import Reveal from "@/components/motion/Reveal";
import { type Locale } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

type CtaKeysBase = {
  title: string;
  button: string;
  desc?: string;
};

type CtaKeysEmail = {
  title: string;
  desc?: string;
  emailPlaceholder: string;
  button: string;
  privacyPrefix: string;
  privacyLink: string;
};

export type CtaProps =
  | {
      locale: Locale;
      namespace: string;
      layout?: "simple";
      variant?: "default" | "soft";
      keys: CtaKeysBase;
      className?: string;
    }
  | {
      locale: Locale;
      namespace: string;
      layout: "emailCapture";
      variant?: "brand";
      keys: CtaKeysEmail;
      className?: string;
    };

const variantClassName: Record<"default" | "soft" | "brand", string> = {
  default: "",
  soft: "bg-gray-50",
  brand: "bg-terracotta-500",
};

export default async function Cta(props: CtaProps) {
  const t = await getTranslations({
    locale: props.locale,
    namespace: props.namespace,
  });

  const variant =
    props.variant ?? (props.layout === "emailCapture" ? "brand" : "default");

  const isBrand = variant === "brand";

  const titleClass = cn(
    "text-2xl font-sans md:text-3xl",
    isBrand ? "text-white" : "text-gray-900"
  );

  const descClass = cn(
    "text-sm md:text-base",
    isBrand ? "text-white/90" : "text-tertiary-600"
  );

  if (props.layout === "emailCapture") {
    const k = props.keys;

    return (
      <section className={cn(variantClassName[variant], props.className)}>
        <div className="container">
          <div className="flex flex-col gap-6 pt-8 pb-2 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              {/* Title = slideUp */}
              <Reveal animation="slideUp">
                <h2 className={titleClass}>{t(k.title)}</h2>
              </Reveal>

              {/* Desc = fadeIn */}
              {k.desc ? (
                <Reveal animation="fadeIn" delay="delay-200">
                  <p className={descClass}>{t(k.desc)}</p>
                </Reveal>
              ) : null}
            </div>

            {/* Form = fadeIn */}
            <Reveal
              animation="fadeIn"
              delay="delay-300"
              className="md:shrink-0"
            >
              <EmailLeadForm
                locale={props.locale}
                emailPlaceholder={t(k.emailPlaceholder)}
                buttonLabel={t(k.button)}
                privacyPrefix={t(k.privacyPrefix)}
                privacyLink={t(k.privacyLink)}
                privacyHref={`/${props.locale}/privacy-policy`}
                variant="brand"
              />
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  // simple CTA
  return (
    <section className={cn(variantClassName[variant], props.className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 py-12 text-center md:flex-row md:text-left">
          <div className="space-y-2">
            {/* Title = slideUp */}
            <Reveal animation="slideUp">
              <h2 className={titleClass}>{t(props.keys.title)}</h2>
            </Reveal>

            {/* Desc = fadeIn */}
            {props.keys.desc ? (
              <Reveal animation="fadeIn" delay="delay-200">
                <p className={descClass}>{t(props.keys.desc)}</p>
              </Reveal>
            ) : null}
          </div>

          {/* Button = fadeIn */}
          <Reveal animation="fadeIn" delay="delay-300" className="md:shrink-0">
            <ScrollToContactButton
              locale={props.locale}
              label={t(props.keys.button)}
              size="xl"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
