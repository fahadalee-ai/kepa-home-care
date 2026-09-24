import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarPlus, House, MapPinned, Stethoscope, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/home", label: "Home", icon: House, match: (p: string) => p === "/home" || p.startsWith("/home/") },
  { to: "/services", label: "Services", icon: Stethoscope, match: (p: string) => p.startsWith("/services") },
  { to: "/book", label: "Book", icon: CalendarPlus, match: (p: string) => p.startsWith("/book"), center: true },
  { to: "/coverage", label: "Coverage", icon: MapPinned, match: (p: string) => p.startsWith("/coverage") },
  { to: "/profile", label: "Profile", icon: UserRound, match: (p: string) => p.startsWith("/profile") },
] as const;

export function isTabRoute(pathname: string) {
  if (pathname.startsWith("/book")) return false;
  return TABS.some((tab) => tab.match(pathname));
}

export function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Main"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-black/5 bg-white shadow-[0_-6px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="grid grid-cols-5 items-end px-1 pt-2 pb-[max(0.45rem,env(safe-area-inset-bottom))]">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          if ("center" in tab && tab.center) {
            return (
              <Link
                key={tab.to}
                to={tab.to}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center gap-1"
              >
                <span className="-mt-6 flex size-14 items-center justify-center rounded-full border-4 border-white bg-primary text-white shadow-[0_8px_18px_rgba(28,107,242,0.35)] active:bg-primary-dark">
                  <Icon size={22} strokeWidth={2.25} />
                </span>
                <span className="text-[11px] leading-4 font-semibold text-black">Book</span>
              </Link>
            );
          }
          return (
            <Link
              key={tab.to}
              to={tab.to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-12 flex-col items-center justify-end gap-1 pb-0.5 text-[11px] leading-4 font-medium",
                active ? "text-primary" : "text-[#6B7280]",
              )}
            >
              <Icon size={22} strokeWidth={active ? 2.25 : 1.75} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
