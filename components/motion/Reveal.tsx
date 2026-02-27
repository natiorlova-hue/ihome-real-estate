//components/motion/Reveal.tsx
"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export type RevealDelay =
  | "delay-0"
  | "delay-100"
  | "delay-200"
  | "delay-300"
  | "delay-400"
  | "delay-600"
  | "delay-700"
  | "delay-800"
  | "delay-900"
  | "delay-1000"
  | "delay-1100"
  | "delay-1200"
  | "delay-1300"
  | "delay-1400"
  | "delay-1500"
  | "delay-1600"
  | "delay-1700"
  | "delay-1800"
  | "delay-1900"
  | "delay-2000";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideDown";
  delay?: RevealDelay;
  threshold?: number;
  rootMargin?: string;
};

const delayToMs: Record<RevealDelay, number> = {
  "delay-0": 0,
  "delay-100": 100,
  "delay-200": 200,
  "delay-300": 300,
  "delay-400": 400,
  "delay-600": 600,
  "delay-700": 700,
  "delay-800": 800,
  "delay-900": 900,
  "delay-1000": 1000,
  "delay-1100": 1100,
  "delay-1200": 1200,
  "delay-1300": 1300,
  "delay-1400": 1400,
  "delay-1500": 1500,
  "delay-1600": 1600,
  "delay-1700": 1700,
  "delay-1800": 1800,
  "delay-1900": 1900,
  "delay-2000": 2000,
};

export default function Reveal({
  children,
  className,
  animation = "slideUp",
  delay = "delay-0",
  threshold = 0.2,
  rootMargin = "0px 0px -15% 0px",
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const delayMs = delayToMs[delay];

  return (
    <div
      ref={ref}
      className={cn(
        "will-change-transform motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:animate-none",
        // stable hidden baseline (prevents “pop”)
        !visible && "opacity-0 translate-y-3",
        // animation with REAL animation-delay
        visible &&
          cn(
            `[animation-fill-mode:both] [animation-delay:${delayMs}ms] animate-${animation}`
          ),
        className
      )}
    >
      {children}
    </div>
  );
}
