import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // base (stable across breakpoints)
          "flex h-11 w-full rounded-md border bg-white px-3 text-base text-gray-950",
          "border-gray-300 shadow-xs placeholder:text-gray-400",
          // focus — brand blue (keyboard only)
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue-400",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          // error — live & on submit via aria-invalid
          "aria-[invalid=true]:border-error-500 aria-[invalid=true]:focus-visible:ring-error-500",
          // disabled — neutral gray
          "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
