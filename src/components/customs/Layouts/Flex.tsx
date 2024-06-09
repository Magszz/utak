import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const flexVariants = cva("w-full flex", {
  variants: {
    variant: {
      startCentered: "justify-start items-center",
      endCentered: "justify-end items-center",
      betweenCentered: "justify-between items-center",
      centered: "justify-center items-center",
      centeredStart: "justify-center items-start",
      start: "justify-start items-start",
      betweenEnd: "justify-between items-end",
    },
  },
  defaultVariants: {
    variant: "centered",
  },
});

interface FlexProps
  extends React.AllHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  variant?:
    | "centered"
    | "betweenCentered"
    | "startCentered"
    | "endCentered"
    | "centeredStart"
    | "start"
    | "betweenEnd";
  className?: string;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, variant = "centered", ...props }, ref) => {
    return (
      <div
        className={cn(flexVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Flex.displayName = "Flex";

export default Flex;
