import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { BookFrame } from "@/components/BookFrame";
import { RequireAuth } from "@/components/RequireAuth";
import { Button, Card } from "@/components/kit";
import {
  accountBookingPatch,
  areaById,
  formatDateLong,
  recurrenceLabel,
  serviceById,
  timeOfDayLabel,
} from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/book/review")({
  head: () => ({ meta: [{ title: "Review — KEPA Home Care" }] }),
  component: () => (
    <RequireAuth>
      <ReviewScreen />
    </RequireAuth>
  ),
});

function ReviewScreen() {
  const navigate = useNavigate();
  const { user, draft, updateDraft, bookAppointment } = useApp();
  const service = serviceById(draft.serviceId);
  const area = areaById(draft.areaId);

  useEffect(() => {
    if (user && !draft.patientName) updateDraft(accountBookingPatch(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <BookFrame step={draft.servicePreset ? 2 : 3}>
      <Card className="rounded-2xl space-y-4">
        <Row label="Service" value={service?.name ?? "Not selected"} edit="/book" />
        <Row label="Area" value={area?.name ?? "Not selected"} edit="/book/area" />
        <Row
          label="Date & time"
          value={`${formatDateLong(draft.date)} · ${timeOfDayLabel(draft.timeOfDay)} · ${recurrenceLabel(draft.recurrence)}`}
          edit="/book/datetime"
        />
        <Row
          label="Your details"
          value={[draft.patientName || draft.name, draft.phone, draft.email, [draft.city, draft.state].filter(Boolean).join(", ")]
            .filter(Boolean)
            .join(" · ")}
        />
      </Card>
      <Button
        full
        className="mt-5"
        disabled={!draft.serviceId || !draft.areaId || !draft.date}
        onClick={() => {
          const created = bookAppointment(draft);
          navigate({ to: "/book/confirmation", search: { id: created.id } });
        }}
      >
        Confirm Appointment Request
      </Button>
    </BookFrame>
  );
}

function Row({ label, value, edit }: { label: string; value: string; edit?: string }) {
  return (
    <div className="border-b border-border pb-3 last:border-0 last:pb-0">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
        {edit && (
          <Link to={edit as "/book"} className="text-sm font-semibold text-primary">
            Edit
          </Link>
        )}
      </div>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
