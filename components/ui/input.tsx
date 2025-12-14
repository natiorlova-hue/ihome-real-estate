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
          "flex h-11 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-950 shadow-sm transition-colors",
          // placeholder + file
          "placeholder:text-gray-400 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          // focus
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          // disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          // error via aria
          "aria-[invalid=true]:border-error-500 aria-[invalid=true]:focus-visible:ring-error-500",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
