//components/layout/Section.tsx

import type { ElementType, ReactNode } from "react";

type SectionProps<T extends ElementType = "section"> = {
  children: ReactNode;
  className?: string;
  as?: T;
  ariaLabelledby?: string;
};

export default function Section<T extends ElementType = "section">({
  children,
  className = "",
  as,
  ariaLabelledby,
}: SectionProps<T>) {
  const Tag = as || "section";

  return (
    <Tag
      className={`py-8 md:py-16 ${className}`}
      aria-labelledby={ariaLabelledby}
    >
      <div className="container">{children}</div>
    </Tag>
  );
}
