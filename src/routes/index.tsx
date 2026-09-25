import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TextLogo } from "@/components/TextLogo";
import { IMAGES } from "@/lib/images";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KEPA Home Care" },
      {
        name: "description",
        content: "Quality home care services, you can trust.",
      },
    ],
  }),
  component: SplashScreen,
});

function SplashScreen() {
  const navigate = useNavigate();
  const { ready } = useApp();
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (!ready) return;
    const leave = window.setTimeout(() => setPhase("out"), 2200);
    const go = window.setTimeout(() => {
      navigate({ to: "/onboarding" });
    }, 2500);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(go);
    };
  }, [navigate, ready]);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-black">
      <img
        src={IMAGES.nurseHome}
        alt=""
        className="absolute inset-0 size-full object-cover object-[center_30%] motion-safe:animate-[splash-kenburns_4.5s_ease-out_forwards]"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/85" />

      <div
        className={cn(
          "relative z-10 flex flex-col items-center px-8",
          phase === "out" && "motion-safe:animate-[splash-out_280ms_ease-in_forwards]",
        )}
      >
        <div className="relative motion-safe:animate-[splash-in_800ms_cubic-bezier(0.22,1,0.36,1)_forwards]">
          <span className="absolute -inset-8 rounded-full bg-primary/40 blur-3xl motion-safe:animate-[splash-pulse_1.8s_ease-in-out_infinite]" />
          <TextLogo variant="white" size="lg" className="relative drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)]" />
        </div>
        <span className="mt-5 h-px w-16 origin-center bg-primary motion-safe:animate-[splash-underline_700ms_ease-out_400ms_both]" />
        <p className="mt-4 max-w-[16rem] text-center font-sans text-[15px] leading-6 text-white/90 motion-safe:animate-[splash-in_700ms_ease-out_500ms_both]">
          Quality home care services, you can trust
        </p>
      </div>

      <div className="absolute inset-x-10 bottom-[max(2.5rem,env(safe-area-inset-bottom))] z-10 h-1 overflow-hidden rounded-full bg-white/20">
        <div className="h-full w-1/3 rounded-full bg-primary motion-safe:animate-[splash-bar_1.4s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
