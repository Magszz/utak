import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const gridVariants = cva(
  "w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
);

interface GridProps
  extends React.AllHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  className?: string;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn(gridVariants({ className }))} ref={ref} {...props} />
    );
  }
);
Grid.displayName = "Grid";

export default Grid;
