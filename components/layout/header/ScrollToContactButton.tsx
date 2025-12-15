"use client";

import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { withLocale, type Locale } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

type ButtonLikeProps = Pick<
  React.ComponentProps<typeof Button>,
  "variant" | "size" | "className" | "disabled"
>;

export type ScrollToContactButtonProps = {
  locale: Locale;
  label: string;
} & ButtonLikeProps;

export function ScrollToContactButton({
  locale,
  label,
  variant,
  size,
  className,
  disabled,
}: ScrollToContactButtonProps) {
  const pathname = usePathname();
  const router = useRouter();

  const comingSoonPath = withLocale(locale, "coming-soon");
  const homePath = withLocale(locale, "");

  const handleClick = React.useCallback(() => {
    if (disabled) return;

    // coming-soon -> go home and request opening contact form
    if (pathname === comingSoonPath) {
      router.push(`${homePath}?contact=open`);
      return;
    }

    // normal pages -> scroll + ask form to focus
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.dispatchEvent(new CustomEvent("contact:open"));
      return;
    }

    // fallback
    router.push(withLocale(locale, "contact"));
  }, [disabled, pathname, comingSoonPath, homePath, router, locale]);

  return (
    <Button
      type="button"
      onClick={handleClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={cn(className)}
    >
      {label}
    </Button>
  );
}

export default ScrollToContactButton;
