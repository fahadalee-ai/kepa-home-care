import logoColor from "@/img/logo.png";
import logoWhite from "@/img/logo-white.png";
import { cn } from "@/lib/utils";

export function BrandLogo({
  variant = "color",
  className,
}: {
  variant?: "color" | "white";
  className?: string;
}) {
  return (
    <img
      src={variant === "white" ? logoWhite : logoColor}
      alt="KEPA Home Care"
      className={cn("select-none object-contain", className)}
    />
  );
}
