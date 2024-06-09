import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-archivo text-heading-300", {
  variants: {
    type: {
      h1: "sm:text-3xl md:text-5xl lg:text-7xl",
      h2: "text-3xl lg:text-5xl",
      h3: "text-2xl md:text-3xl",
      h4: "xs:text-md sm:text-lg md:text-2xl",
      h5: "xs:text-sm sm:text-md md:text-lg lg:text-xl",
    },
  },
  defaultVariants: {
    type: "h1",
  },
});

interface HeadingProps
  extends React.AllHTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  className?: string;
  type: "h1" | "h2" | "h3" | "h4" | "h5";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, type, children }, ref) => {
    return React.createElement(
      type,
      {
        className: `${cn(headingVariants({ type, className }))}`,
        ref: ref,
      },
      children
    );
  }
);
Heading.displayName = "Heading";

export default Heading;
