import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Clock, MapPin, Phone } from "lucide-react";
import { Button, Header, Screen } from "@/components/kit";
import {
  BUSINESS,
  areaById,
  formatDateLong,
  recurrenceLabel,
  serviceById,
  timeOfDayLabel,
} from "@/lib/mock-data";
import { useApp } from "@/lib/store";

type Search = { id?: string };

export const Route = createFileRoute("/book/confirmation")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
  }),
  head: () => ({ meta: [{ title: "Request received — KEPA Home Care" }] }),
  component: ConfirmationScreen,
});

function ConfirmationScreen() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const { appointments } = useApp();
  const appointment = appointments.find((item) => item.id === id) ?? appointments[0];
  const service = appointment ? serviceById(appointment.serviceId) : undefined;
  const area = appointment ? areaById(appointment.areaId) : undefined;

  return (
    <Screen padded={false} className="min-h-dvh bg-[#F5F7FA] pb-8">
      <Header title="Request received" back={false} />

      <div className="px-4 pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#E8F0FE] text-primary motion-safe:animate-[check-pop_500ms_ease-out]">
            <Check size={32} strokeWidth={2.5} />
          </div>
          <h1 className="mt-4 max-w-[18rem] font-display text-[28px] leading-8 font-bold tracking-tight">
            Your appointment request has been received
          </h1>
          <p className="mt-2 max-w-[20rem] text-[15px] leading-[22px] text-muted-foreground">
            Our care team will contact you within 24 hours to confirm your visit.
          </p>
        </div>

        {appointment && (
          <article className="mt-6 overflow-hidden rounded-[22px] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.05)]">
            <div className="bg-black px-5 py-4 text-white">
              <p className="font-display text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">Visit request</p>
              <p className="mt-1 font-display text-xl leading-6 font-bold">{service?.name ?? "In-home care"}</p>
            </div>
            <div className="space-y-3 px-5 py-4 text-[15px]">
              <p className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  {formatDateLong(appointment.date)} · {timeOfDayLabel(appointment.timeOfDay)}
                  <span className="block text-[13px] text-muted-foreground">{recurrenceLabel(appointment.recurrence)}</span>
                </span>
              </p>
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  {area?.name ?? "Massachusetts"}
                  {appointment.city && (
                    <span className="block text-[13px] text-muted-foreground">
                      {appointment.city}, {appointment.state} {appointment.zip}
                    </span>
                  )}
                </span>
              </p>
            </div>
          </article>
        )}

        <div className="mt-6 space-y-3">
          <Button full onClick={() => navigate({ to: "/appointments" })}>
            View My Appointments
          </Button>
          <Button full variant="outline" onClick={() => navigate({ to: "/home" })}>
            Back to Home
          </Button>
        </div>

        <section className="mt-6 rounded-[22px] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <p className="font-display text-[17px] font-bold">Need us sooner?</p>
          <p className="mt-1 text-[13px] leading-[18px] text-muted-foreground">Office hours {BUSINESS.hours}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href={BUSINESS.phoneHref}
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#E8F0FE] text-[13px] font-semibold text-primary"
            >
              <Phone size={16} /> {BUSINESS.phone}
            </a>
            <a
              href={BUSINESS.altPhoneHref}
              className="flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#E8F0FE] text-[13px] font-semibold text-primary"
            >
              <Phone size={16} /> {BUSINESS.altPhone}
            </a>
          </div>
        </section>
      </div>
    </Screen>
  );
}
