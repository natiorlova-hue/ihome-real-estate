import { type ComponentProps } from "react";
import { Link } from "@/i18n/routing";

export type AppHref = ComponentProps<typeof Link>["href"];

export const COMING_SOON_PATH: AppHref = "/coming-soon";

export function resolveNavHref(
  href: AppHref,
  status?: "active" | "comingSoon" | string
): AppHref {
  if (status === "comingSoon") {
    return COMING_SOON_PATH;
  }
  return href;
}
