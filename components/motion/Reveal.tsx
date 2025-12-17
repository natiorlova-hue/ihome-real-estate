// components/motion/Reveal.tsx
"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

type RevealDelay =
  | "delay-0"
  | "delay-100"
  | "delay-200"
  | "delay-300"
  | "delay-400";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideDown";
  delay?: RevealDelay;
};

export default function Reveal({
  children,
  className,
  animation = "slideUp",
  delay = "delay-0",
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "will-change-transform",
        !visible && "opacity-0",
        visible && cn(`animate-${animation}`, delay),
        className
      )}
    >
      {children}
    </div>
  );
}
