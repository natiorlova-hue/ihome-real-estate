// app/admin/layout.tsx
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
}
