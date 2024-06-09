import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const paragraphVariants = cva("font-montserrat", {
  variants: {
    fontSize: {
      xl: "xs:text-sm sm:text-md md:text-lg lg:text-xl",
      lg: "xs:text-xs sm:text-sm md:text-md lg:text-lg",
      md: "text-sm lg:text-md",
      sm: "text-sm",
      xs: "text-xs",
    },
  },
  defaultVariants: {
    fontSize: "lg",
  },
});

interface ParagraphProps
  extends React.AllHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  className?: string;
  fontSize: "lg" | "md" | "sm" | "xs" | "xl";
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, fontSize, ...props }, ref) => {
    return (
      <p
        className={cn(paragraphVariants({ fontSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Paragraph.displayName = "Paragraph";

export default Paragraph;
