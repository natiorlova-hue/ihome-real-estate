//components/ui/checkbox.tsx

import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Base layout & visual
      "peer h-5 w-5 shrink-0 rounded-sm border border-gray-300 shadow-sm",
      // Transitions (UX improvement)
      "transition-all duration-200 ease-in-out",
      // Focus State (Accessibility)
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue-400 focus-visible:ring-offset-2",
      // Checked State
      // Примітка: переконайтеся, що 'terracotta-500' визначено у вашому tailwind.config.ts.
      // Якщо ні, використовуйте стандартний 'bg-orange-600 border-orange-600'
      "data-[state=checked]:bg-terracotta-500 data-[state=checked]:border-terracotta-500 data-[state=checked]:text-white",
      // Unchecked State (explicit background for dark mode compatibility)
      "bg-white",
      // Disabled State
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-3.5 w-3.5" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
