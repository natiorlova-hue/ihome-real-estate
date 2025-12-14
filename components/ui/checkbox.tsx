import { cn } from "@/lib/utils";
import * as React from "react";

type CheckboxProps = Omit<React.ComponentProps<"input">, "type">;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          // base
          "h-4 w-4 rounded-[4px] border border-input bg-white text-terracotta-500",
          // focus
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          // disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          // error via aria
          "aria-[invalid=true]:border-error-500 aria-[invalid=true]:ring-error-500",
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
