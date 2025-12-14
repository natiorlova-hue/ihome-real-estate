// components/GridContainer.tsx
import { cn } from "@/lib/utils";

interface GridContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function GridContainer({
  children,
  className,
}: GridContainerProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}
