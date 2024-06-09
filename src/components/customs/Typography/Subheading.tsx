import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const subHeadingVariants = cva("font-montserrat text-heading-300", {
  variants: {
    fontSize: {
      lg: "text-lg lg:text-xl",
      md: "text-md lg:text-lg",
      sm: "text-sm lg:text-md",
    },
  },
  defaultVariants: {
    fontSize: "lg",
  },
});

interface SubHeadingProps
  extends React.AllHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof subHeadingVariants> {
  className?: string;
  fontSize: "lg" | "md" | "sm";
}

const SubHeading = React.forwardRef<HTMLParagraphElement, SubHeadingProps>(
  ({ className, fontSize, ...props }, ref) => {
    return (
      <p
        className={cn(subHeadingVariants({ fontSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
SubHeading.displayName = "SubHeading";

export default SubHeading;
