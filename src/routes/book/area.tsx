import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Phone } from "lucide-react";
import { useEffect } from "react";
import { BookFrame } from "@/components/BookFrame";
import { RequireAuth } from "@/components/RequireAuth";
import { Button, Card } from "@/components/kit";
import { accountBookingPatch, BUSINESS, COVERAGE_AREAS, OUTSIDE_AREA_NOTE } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

type Search = { area?: string };

export const Route = createFileRoute("/book/area")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    area: typeof s.area === "string" ? s.area : undefined,
  }),
  head: () => ({ meta: [{ title: "Coverage area — KEPA Home Care" }] }),
  component: () => (
    <RequireAuth>
      <AreaScreen />
    </RequireAuth>
  ),
});

function AreaScreen() {
  const navigate = useNavigate();
  const { area } = Route.useSearch();
  const { user, draft, updateDraft } = useApp();

  useEffect(() => {
    if (area && draft.areaId !== area) updateDraft({ areaId: area });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area]);

  return (
    <BookFrame step={draft.servicePreset ? 0 : 1}>
      <h2 className="font-display text-xl font-bold">Where do you need care?</h2>
      <p className="mt-1 mb-3 text-sm text-muted-foreground">Select a Massachusetts coverage area.</p>
      <div className="space-y-3">
        {COVERAGE_AREAS.map((item) => {
          const selected = draft.areaId === item.id;
          return (
            <button key={item.id} type="button" onClick={() => updateDraft({ areaId: item.id })} className="w-full text-left">
              <Card className={cn("rounded-2xl", selected && "border-primary bg-[#E8F0FE]")}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{item.name}</p>
                  {selected && <Check className="shrink-0 text-primary" size={20} />}
                </div>
              </Card>
            </button>
          );
        })}
      </div>
      <Card className="mt-4 rounded-2xl bg-[#F5F7FA]">
        <p className="text-sm leading-5 text-muted-foreground">{OUTSIDE_AREA_NOTE}</p>
        <div className="mt-3 flex gap-2">
          <a href={BUSINESS.phoneHref} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white">
            <Phone size={16} /> Call
          </a>
          <Link to="/contact" className="inline-flex min-h-11 items-center rounded-xl border border-border bg-white px-4 text-sm font-semibold">
            Contact
          </Link>
        </div>
      </Card>
      <Button
        full
        className="mt-5"
        disabled={!draft.areaId}
        onClick={() => {
          if (user) updateDraft(accountBookingPatch(user));
          navigate({ to: "/book/datetime" });
        }}
      >
        Continue
      </Button>
    </BookFrame>
  );
}
