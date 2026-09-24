import type { ReactNode } from "react";
import { BOOKING_STEPS } from "@/lib/mock-data";
import { Header, Screen } from "@/components/kit";
import { useApp } from "@/lib/store";

export function BookFrame({
  step,
  children,
  title = "Book an Appointment",
}: {
  step: number;
  children: ReactNode;
  title?: string;
}) {
  const { draft } = useApp();
  const steps = draft.servicePreset ? (["Area", "Schedule", "Review"] as const) : BOOKING_STEPS;
  const total = steps.length;
  return (
    <Screen padded={false} className="pb-8">
      <Header title={title} fallbackTo="/home" />
      <div className="px-4">
        <p className="font-display text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
          Step {step + 1} of {total}
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">{steps[step]}</p>
        <div className="mt-2 mb-5 h-1.5 overflow-hidden rounded-full bg-[#E6EEF8]">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
        {children}
      </div>
    </Screen>
  );
}
