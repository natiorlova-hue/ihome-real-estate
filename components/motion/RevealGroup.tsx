// components/motion/RevealGroup.tsx
"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
};

export default function RevealGroup({
  children,
  className,
  threshold = 0.2,
}: RevealGroupProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [on, setOn] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} data-reveal={on ? "on" : "off"} className={cn(className)}>
      {children}
    </div>
  );
}
