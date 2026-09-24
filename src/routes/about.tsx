import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button, Header, Screen } from "@/components/kit";
import { ABOUT, STATS, TEAM } from "@/lib/mock-data";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us — KEPA Home Care" }] }),
  component: AboutScreen,
});

function AboutScreen() {
  const navigate = useNavigate();
  return (
    <Screen padded={false} className="pb-10">
      <Header title="About Us" fallbackTo="/profile" />
      <div className="px-4 pt-4">
        <h2 className="font-display text-[22px] leading-7 font-bold">Welcome to KEPA Home Care, LLC</h2>
        <p className="mt-3 text-[17px] leading-[22px] text-muted-foreground">{ABOUT}</p>
        <p className="mt-6 font-display text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
          Meet Our Care Team
        </p>
        <div className="mt-3 space-y-3">
          {TEAM.map((member) => (
            <article key={member.role} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <img src={member.image} alt="" className="h-44 w-full object-cover object-top" />
              <div className="p-4">
                <h2 className="font-display text-lg font-bold">{member.role}</h2>
                <p className="text-xs font-semibold text-primary">{member.focus}</p>
                <p className="mt-2 text-sm leading-5 text-muted-foreground">{member.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {STATS.map((stat) => (
            <Stat key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} />
          ))}
        </div>
        <Button full className="mt-6" onClick={() => navigate({ to: "/contact" })}>
          Share Your Cares, Inspire Others
        </Button>
      </div>
    </Screen>
  );
}

function Stat({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 900);
      setN(Math.round(value * p));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return (
    <div className="rounded-2xl bg-white p-4 text-center shadow-sm">
      <p className="font-display text-2xl font-bold text-primary">
        {n}
        {suffix}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
