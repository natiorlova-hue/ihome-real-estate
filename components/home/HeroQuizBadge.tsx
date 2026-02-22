import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type HeroQuizBadgeProps = {
  locale: Locale; // Залишаємо пропс, щоб не зламати HeroVisualSection, який його передає
  label: string;
  text: string;
  className?: string;
};

export default function HeroQuizBadge({
  label,
  text,
  className,
}: HeroQuizBadgeProps) {
  // Більше ніяких withLocale, використовуємо чистий статичний шлях
  const href = "/lifestyle-quiz";

  return (
    <div
      className={cn(
        // container
        "inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200 bg-blue-50 p-1 text-blue-900",
        // responsive layout: wrap on small screens
        "flex-wrap sm:flex-nowrap",
        // nicer hover only on devices that can hover
        "transition-colors duration-300 hover:bg-blue-100",
        className
      )}
    >
      {/* Left pill button */}
      <Button
        asChild
        variant="secondary"
        size="sm"
        className={cn(
          "h-8 rounded-full bg-white px-3 text-xs font-semibold text-blue-900 shadow-none",
          "hover:bg-white",
          // make it tappable on mobile
          "min-h-[32px]"
        )}
      >
        <Link href={href} aria-label={label}>
          {label}
        </Link>
      </Button>

      {/* Right text link */}
      <Link
        href={href}
        className={cn(
          "inline-flex min-w-0 items-center gap-2 px-2 py-1 text-sm font-medium text-blue-900",
          "hover:text-blue-950",
          // wrap nicely on mobile
          "flex-1 sm:flex-none"
        )}
        aria-label={label}
      >
        <span className="min-w-0 break-words leading-snug sm:whitespace-nowrap">
          {text}
        </span>
        <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
      </Link>
    </div>
  );
}
