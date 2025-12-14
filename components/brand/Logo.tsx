// components/brand/Logo.tsx
import { withLocale, type Locale } from "@/lib/locale-path";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  locale: Locale;
  href?: string;

  /** Localized aria-label (e.g. navigation.header.a11y.homeAria) */
  ariaLabel: string;

  /** Localized wordmark text (e.g. navigation.header.brand) */
  wordmark: string;

  className?: string;
  showWordmark?: boolean;
};

export default function Logo({
  locale,
  href = "",
  ariaLabel,
  wordmark,
  className = "",
  showWordmark = true,
}: LogoProps) {
  return (
    <Link
      href={withLocale(locale, href)}
      aria-label={ariaLabel}
      className={`flex items-center gap-3 ${className}`}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={32}
        height={32}
        sizes="32px"
        priority
        className="h-8 w-8 shrink-0"
      />

      {showWordmark && (
        <span className="font-serif text-xl font-bold text-terracotta-500">
          {wordmark}
        </span>
      )}
    </Link>
  );
}
