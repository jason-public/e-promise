import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger" | "ghost";
  className?: string;
  children?: React.ReactNode;
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary text-white",
    secondary: "border-transparent bg-secondary text-white",
    success: "border-transparent bg-success bg-opacity-10 text-success font-semibold px-2 py-0.5",
    warning: "border-transparent bg-warning bg-opacity-10 text-warning font-semibold px-2 py-0.5",
    danger: "border-transparent bg-danger bg-opacity-10 text-danger font-semibold px-2 py-0.5",
    outline: "text-gray-950 border-gray-200",
    ghost: "border-transparent bg-gray-100 text-gray-700 font-medium",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
