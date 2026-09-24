import { BrandLogo } from "@/components/Logo";
import { cn } from "@/lib/utils";

export function TextLogo({
  variant = "color",
  size = "md",
  className,
}: {
  variant?: "color" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const height = { sm: "h-10", md: "h-14", lg: "h-20" }[size];
  return (
    <BrandLogo
      variant={variant}
      className={cn("mx-auto w-auto", height, className)}
    />
  );
}
