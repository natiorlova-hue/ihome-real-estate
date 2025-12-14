import { cn } from "@/lib/utils";
import * as React from "react";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        // base
        "w-full min-h-[120px] resize-y rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-950 shadow-sm transition-colors",
        // placeholder
        "placeholder:text-gray-400",
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
});

Textarea.displayName = "Textarea";

export { Textarea };
