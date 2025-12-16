//app/layout.tsx

import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  // Root layout MUST include <html> and <body>.
  // Locale-specific <html lang> should live in app/[locale]/layout.tsx.
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
