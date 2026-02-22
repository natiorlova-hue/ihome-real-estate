// components/layout/footer/FooterLink.tsx

"use client";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname === `${href}/`;

  return (
    <Link
      href={href as any}
      className={cn(
        "transition-colors duration-200",
        isActive ? "text-white font-medium" : "hover:text-gray-200"
      )}
    >
      {label}
    </Link>
  );
}
