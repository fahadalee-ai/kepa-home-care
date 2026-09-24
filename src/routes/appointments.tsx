import { Outlet, createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Chip, Header, LinkButton, Screen, statusTone } from "@/components/kit";
import { serviceById, statusLabel, timeOfDayLabel, type Appointment } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/appointments")({
  head: () => ({ meta: [{ title: "Appointments — KEPA Home Care" }] }),
  component: AppointmentsRoute,
});

function AppointmentsRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/appointments") return <Outlet />;
  return <AppointmentsScreen />;
}

function AppointmentsScreen() {
  const { user, appointments } = useApp();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const mine = user ? appointments.filter((a) => a.userId === user.id) : [];
  const upcoming = mine.filter((a) => a.status === "upcoming");
  const past = mine.filter((a) => a.status !== "upcoming");
  const list = tab === "upcoming" ? upcoming : past;

  return (
    <Screen padded={false} className="pb-8">
      <Header title="Appointments" fallbackTo="/profile" />
      {!user ? (
        <EmptyVisits
          title="Log in to see visits"
          body="Create an account or log in to request and track in-home visits."
          action={<LinkButton to="/login">Log In</LinkButton>}
        />
      ) : (
        <>
          <div className="mx-4 mt-3 grid grid-cols-2 rounded-2xl bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
            {(
              [
                ["upcoming", "Upcoming"],
                ["past", "Past"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "min-h-11 rounded-xl text-[15px] font-semibold",
                  tab === id ? "bg-primary text-white" : "text-muted-foreground",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          {list.length ? (
            <div className="px-4 pt-4">
              {list.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          ) : (
            <EmptyVisits
              title={tab === "past" ? "No Past Visit Yet" : "No Upcoming Visit Yet"}
              body={
                tab === "past"
                  ? "Completed visits will show up here."
                  : "Book an in-home appointment and it will show up here."
              }
              action={tab === "upcoming" ? <LinkButton to="/book">Book an Appointment</LinkButton> : undefined}
            />
          )}
        </>
      )}
    </Screen>
  );
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const navigate = useNavigate();
  const service = serviceById(appointment.serviceId);
  const when = appointment.date
    ? new Date(`${appointment.date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";
  return (
    <button
      type="button"
      onClick={() => navigate({ to: "/appointments/$id", params: { id: appointment.id } })}
      className="mb-3 w-full rounded-2xl bg-white p-4 text-left shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{service?.name}</p>
          <p className="mt-1 text-[15px] text-muted-foreground">
            {when} · {timeOfDayLabel(appointment.timeOfDay)}
          </p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {appointment.city}, {appointment.state}
          </p>
        </div>
        <Chip tone={statusTone(statusLabel(appointment.status))}>{statusLabel(appointment.status)}</Chip>
      </div>
    </button>
  );
}

function EmptyVisits({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 pt-16 text-center">
      <EmptyVisitsArt />
      <h2 className="mt-5 font-display text-[22px] leading-7 font-bold">{title}</h2>
      <p className="mt-2 max-w-[16rem] text-[15px] leading-[22px] text-muted-foreground">{body}</p>
      {action && <div className="mt-5 w-full max-w-xs">{action}</div>}
    </div>
  );
}

function EmptyVisitsArt() {
  return (
    <svg width="148" height="148" viewBox="0 0 148 148" fill="none" aria-hidden="true">
      <circle cx="74" cy="74" r="74" fill="#E8F0FE" />
      <rect x="40" y="36" width="68" height="78" rx="14" fill="white" />
      <rect x="40" y="36" width="68" height="22" rx="14" fill="#1C6BF2" />
      <rect x="40" y="48" width="68" height="10" fill="#1C6BF2" />
      <circle cx="56" cy="47" r="3" fill="white" />
      <circle cx="92" cy="47" r="3" fill="white" />
      <rect x="52" y="70" width="44" height="6" rx="3" fill="#E8F0FE" />
      <rect x="52" y="82" width="32" height="6" rx="3" fill="#E8F0FE" />
      <rect x="52" y="94" width="24" height="6" rx="3" fill="#E8F0FE" />
      <circle cx="98" cy="102" r="16" fill="#1C6BF2" />
      <path d="M91 102.5 L96 107.5 L106 96.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
