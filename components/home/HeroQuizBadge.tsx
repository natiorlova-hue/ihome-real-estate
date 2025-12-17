// components/home/HeroQuizBadge.tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { withLocale, type Locale } from "@/lib/locale-path";

type HeroQuizBadgeProps = {
  locale: Locale;
  label: string;
  text: string;
};

export default function HeroQuizBadge({
  locale,
  label,
  text,
}: HeroQuizBadgeProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-sm text-blue-900">
      <Button
        asChild
        variant="secondary"
        size="sm"
        className="h-7 rounded-full bg-white px-3 text-xs font-semibold text-blue-900 shadow-none hover:bg-white"
      >
        <Link href={withLocale(locale, "/lifestyle-quiz")} aria-label={label}>
          {label}
        </Link>
      </Button>

      <Link
        href={withLocale(locale, "/lifestyle-quiz")}
        className="ml-2 inline-flex items-center gap-2 pr-2 font-medium text-blue-900 transition-colors hover:text-blue-950"
      >
        <span className="whitespace-nowrap">{text}</span>
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
