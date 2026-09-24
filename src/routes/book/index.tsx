import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { BookFrame } from "@/components/BookFrame";
import { RequireAuth } from "@/components/RequireAuth";
import { Button, Card } from "@/components/kit";
import { SERVICES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

type Search = { service?: string };

export const Route = createFileRoute("/book/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    service: typeof s.service === "string" ? s.service : undefined,
  }),
  head: () => ({ meta: [{ title: "Select service — KEPA Home Care" }] }),
  component: () => (
    <RequireAuth>
      <SelectServiceScreen />
    </RequireAuth>
  ),
});

function SelectServiceScreen() {
  const navigate = useNavigate();
  const { service } = Route.useSearch();
  const { draft, updateDraft } = useApp();

  useEffect(() => {
    if (service) {
      updateDraft({ serviceId: service, servicePreset: true });
      navigate({ to: "/book/area", replace: true });
      return;
    }
    if (draft.servicePreset) updateDraft({ servicePreset: false });
    // Bottom-tab entry asks for a service. A service-page link skips this step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  return (
    <BookFrame step={0}>
      <p className="mb-3 text-sm text-muted-foreground">Choose the in-home service you need.</p>
      <div className="space-y-3">
        {SERVICES.map((item) => {
          const selected = draft.serviceId === item.id;
          return (
            <button key={item.id} type="button" onClick={() => updateDraft({ serviceId: item.id })} className="w-full text-left">
              <Card className={cn("rounded-2xl", selected && "border-primary bg-[#E8F0FE]")}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-[17px] leading-6 font-bold">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.short}</p>
                  </div>
                  {selected && <Check className="shrink-0 text-primary" size={20} />}
                </div>
              </Card>
            </button>
          );
        })}
      </div>
      <Link to="/services" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary">
        Not sure? Compare services
      </Link>
      <Button full className="mt-4" disabled={!draft.serviceId} onClick={() => navigate({ to: "/book/area" })}>
        Continue
      </Button>
    </BookFrame>
  );
}
