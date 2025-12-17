"use client";

import { Button } from "@/components/ui/button";
import { withLocale, type Locale } from "@/lib/locale-path";
import { cn } from "@/lib/utils";
import { Flag, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";

type CookieConsentValue = "allow" | "decline";
type CookieConsentState = CookieConsentValue | null;

const STORAGE_KEY = "ihome_cookie_consent_v1";
const SHOW_AFTER_MS = 30_000;

function readStoredConsent(): CookieConsentState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "allow" || raw === "decline") return raw;
    return null;
  } catch {
    return null;
  }
}

function storeConsent(value: CookieConsentValue) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // ignore
  }
}

export default function CookieConsentBanner(): React.ReactNode {
  const t = useTranslations("common.cookies");
  const locale = useLocale() as Locale;

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const existing = readStoredConsent();
    if (existing) return;

    const timer = window.setTimeout(() => {
      const latest = readStoredConsent();
      if (!latest) setIsVisible(true);
    }, SHOW_AFTER_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const accept = React.useCallback(() => {
    storeConsent("allow");
    setIsVisible(false);
  }, []);

  const decline = React.useCallback(() => {
    storeConsent("decline");
    setIsVisible(false);
  }, []);

  const close = React.useCallback(() => {
    // Close without saving: user can still decide later (or we can show again next visit).
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <section
      aria-label={t("aria")}
      className={cn(
        "fixed inset-x-0 bottom-4 z-[1030] px-3",
        "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2"
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1180px]",
          "rounded-2xl border border-terracotta-500 bg-white shadow-2xl",
          "px-4 py-3 sm:px-5 sm:py-4"
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-start gap-3 sm:items-center">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl",
                "bg-terracotta-500 text-white"
              )}
              aria-hidden="true"
            >
              <Flag className="h-4 w-4" />
            </div>

            <p className="text-sm leading-5 text-gray-900 sm:text-[15px]">
              <span className="font-medium">{t("text")}</span>{" "}
              <Link
                href={withLocale(locale, "common.cookies")}
                className={cn(
                  "text-gray-600 underline underline-offset-4",
                  "hover:text-gray-900",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
                )}
              >
                {t("policyLink")}
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 sm:ml-auto">
            <Button variant="outline" size="sm" onClick={decline}>
              {t("decline")}
            </Button>
            <Button size="sm" onClick={accept}>
              {t("allow")}
            </Button>

            <button
              type="button"
              onClick={close}
              className={cn(
                "ml-1 inline-flex h-9 w-9 items-center justify-center rounded-xl",
                "text-gray-500 hover:text-gray-900",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-500 focus-visible:ring-offset-2"
              )}
              aria-label={t("close")}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
