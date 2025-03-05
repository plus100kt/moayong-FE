import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "src/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-label-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-green-50 text-gray-0 hover:bg-green-40 active:bg-green-60 disabled:bg-gray-10 disabled:text-gray-60",
        secondary: "bg-gray-0 text-green-70 border border-green-60 hover:bg-green-5 active:bg-green-10 disabled-bg-gray-0 disabled:text-gray-40 disabled:border-gray-40",
      },
      size: {
        xlarge: "min-h-[54px] min-w-[360px] rounded-[0px] label-lg",
        large: "min-h-[54px] min-w-[320px] rounded-[16px] label-lg",
        medium: "min-h-[54px] min-w-[280px] rounded-[16px] label-lg",
        small: "min-h-[54px] min-w-[156px] rounded-[16px] label-lg",
        xsmall: "min-h-[42px] min-w-[75px] rounded-[12px] label-md",
        icon: "rounded-[16px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }