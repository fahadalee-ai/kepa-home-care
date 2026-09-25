import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/kit";
import { ONBOARDING } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Welcome — KEPA Home Care" }] }),
  component: OnboardingScreen,
});

function OnboardingScreen() {
  const navigate = useNavigate();
  const { user, markOnboarded } = useApp();
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const last = index === ONBOARDING.length - 1;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  function go(to: "/register" | "/login") {
    markOnboarded();
    if (user) navigate({ to: "/home" });
    else navigate({ to });
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black">
      <Carousel setApi={setApi} className="h-dvh" opts={{ align: "start", loop: false }}>
        <CarouselContent className="ml-0 h-dvh">
          {ONBOARDING.map((slide) => (
            <CarouselItem key={slide.title} className="h-dvh pl-0">
              <div className="relative h-dvh w-full overflow-hidden">
                <img src={slide.image} alt={slide.alt} className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-b from-black/25 via-black/20 to-black/90" />
                <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-[max(11rem,calc(env(safe-area-inset-bottom)+10rem))]">
                  <h1 className="font-display text-[30px] leading-[36px] font-bold text-white">{slide.title}</h1>
                  <p className="mt-3 max-w-[22rem] text-[15px] leading-[22px] text-white/85">{slide.body}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-x-0 top-0 z-20 flex justify-end px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button type="button" onClick={() => go("/login")} className="min-h-11 px-3 text-sm font-semibold text-white">
          Skip
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="mb-4 flex justify-center gap-2">
          {ONBOARDING.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={cn("h-2 rounded-full transition-all", i === index ? "w-6 bg-primary" : "w-2 bg-white/40")}
            />
          ))}
        </div>
        {last ? (
          <div>
            <Button full onClick={() => go("/register")}>
              Get Started
            </Button>
            <button
              type="button"
              onClick={() => go("/login")}
              className="mt-3 min-h-11 w-full text-center text-sm text-white"
            >
              Already have an account? <span className="font-semibold text-primary">Log in</span>
            </button>
          </div>
        ) : (
          <Button full onClick={() => api?.scrollNext()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
