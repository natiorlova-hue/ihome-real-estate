import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // base
          "flex h-11 w-full rounded-md border border-input bg-white px-3 text-base text-gray-950 shadow-xs",
          "placeholder:text-gray-400",
          // focus (matches design + visible on light backgrounds)
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          // disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          // error via aria-invalid
          "aria-[invalid=true]:border-error-500 aria-[invalid=true]:ring-error-500",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
