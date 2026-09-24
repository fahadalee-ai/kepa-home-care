import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BookFrame } from "@/components/BookFrame";
import { RequireAuth } from "@/components/RequireAuth";
import { Button, Textarea } from "@/components/kit";
import { Calendar } from "@/components/ui/calendar";
import { RECURRENCE, TIME_OF_DAY, todayIso, type Recurrence, type TimeOfDay } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toIso(date: Date) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

const SLOT_TIME: Record<TimeOfDay, string> = {
  morning: "09:00",
  afternoon: "13:00",
  evening: "17:00",
};

export const Route = createFileRoute("/book/datetime")({
  head: () => ({ meta: [{ title: "Date and time — KEPA Home Care" }] }),
  component: () => (
    <RequireAuth>
      <DateTimeScreen />
    </RequireAuth>
  ),
});

function DateTimeScreen() {
  const navigate = useNavigate();
  const { draft, updateDraft } = useApp();
  const [date, setDate] = useState(draft.date);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | "">(draft.timeOfDay);
  const [recurrence, setRecurrence] = useState<Recurrence>(draft.recurrence);
  const [notes, setNotes] = useState(draft.notes);

  return (
    <BookFrame step={draft.servicePreset ? 1 : 2}>
      <Calendar
        mode="single"
        selected={date ? parseIso(date) : undefined}
        onSelect={(day) => day && setDate(toIso(day))}
        disabled={{ before: parseIso(todayIso()) }}
        className="mx-auto w-full rounded-2xl border border-border bg-white p-2"
      />
      <p className="mt-4 mb-2 text-sm font-medium">Time of day</p>
      <div className="flex gap-2">
        {TIME_OF_DAY.map((slot) => (
          <button
            key={slot.id}
            type="button"
            onClick={() => setTimeOfDay(slot.id)}
            className={cn(
              "min-h-11 flex-1 rounded-2xl border text-sm font-semibold",
              timeOfDay === slot.id ? "border-primary bg-primary text-white" : "border-border bg-white",
            )}
          >
            {slot.label}
          </button>
        ))}
      </div>
      <p className="mt-4 mb-2 text-sm font-medium">Recurring visit</p>
      <div className="flex flex-col gap-2">
        {RECURRENCE.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setRecurrence(item.id)}
            className={cn(
              "min-h-11 rounded-2xl border px-3 text-left text-sm font-semibold",
              recurrence === item.id ? "border-primary bg-[#E8F0FE] text-primary" : "border-border bg-white",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <label className="mt-4 mb-4 block">
        <span className="mb-1 block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Special instructions
        </span>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>
      <Button
        full
        disabled={!date || !timeOfDay}
        onClick={() => {
          if (!timeOfDay) return;
          updateDraft({ date, timeOfDay, time: SLOT_TIME[timeOfDay], recurrence, notes });
          navigate({ to: "/book/review" });
        }}
      >
        Continue
      </Button>
    </BookFrame>
  );
}
