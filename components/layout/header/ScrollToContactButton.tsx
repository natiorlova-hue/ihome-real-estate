//components/layout/header/ScrollToContactButton.tsx

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

export default function ScrollToContactButton({
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
  // const lifestyleQuizPath = withLocale(locale, "lifestyle-quiz");
  const homePath = withLocale(locale, "");

  const handleClick = React.useCallback(() => {
    if (disabled) return;

    // coming-soon → redirect home and request opening contact form
    if (pathname === comingSoonPath) {
      router.push(`${homePath}?contact=open`);
      return;
    }

    // if we are NOT on home page — go home and open contact
    if (pathname !== homePath) {
      router.push(`${homePath}?contact=open`);
      return;
    }

    // same-page contact section (home)
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.dispatchEvent(new CustomEvent("contact:open"));
      return;
    }

    // ultra-safe fallback (still home)
    router.push(`${homePath}?contact=open`);
  }, [disabled, pathname, comingSoonPath, homePath, router]);

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
