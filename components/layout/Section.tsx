// components/layout/Section.tsx

import type { ReactNode, ElementType } from "react";

type SectionProps<T extends ElementType = "section"> = {
  children: ReactNode;
  className?: string;
  as?: T;
};

export default function Section<T extends ElementType = "section">({
  children,
  className = "",
  as,
}: SectionProps<T>) {
  const Tag = as || "section";
  return (
    <Tag className={`py-8 md:py-16 ${className}`}>
      <div className="container">{children}</div>
    </Tag>
  );
}
