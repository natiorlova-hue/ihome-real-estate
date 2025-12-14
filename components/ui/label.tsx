import { cn } from "@/lib/utils";
import * as React from "react";

const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("block text-sm font-medium text-gray-950", className)}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
