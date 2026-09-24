import { Outlet, createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Bell, CalendarPlus, ChevronRight, HeartHandshake, MapPinned, MessageCircle, Phone, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { Button, Header } from "@/components/kit";
import { IMAGES } from "@/lib/images";
import { BUSINESS, NOTIFICATIONS, SERVICES, TESTIMONIALS, WHY_CHOOSE, greeting } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

const WHY_ICONS = [HeartHandshake, ShieldCheck, Sparkles] as const;

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — KEPA Home Care" }] }),
  component: HomeRoute,
});

function HomeRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/home") return <Outlet />;
  return <HomeScreen />;
}

function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useApp();
  const first = user?.name.split(" ")[0];
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="min-h-dvh bg-[#F5F7FA] pb-8">
      <Header
        large
        back={false}
        title={first ? `${greeting()}, ${first}` : greeting()}
        subtitle="Worcester, MA"
        right={
          <span className="flex items-center">
            <Link to="/chat" aria-label="Chat" className="flex size-11 items-center justify-center text-primary">
              <MessageCircle size={22} />
            </Link>
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative flex size-11 items-center justify-center"
            >
              <Bell size={22} />
              {unread > 0 && <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-primary" />}
            </Link>
          </span>
        }
      />

      <section className="relative mx-4 mt-2 overflow-hidden rounded-[22px] shadow-[0_16px_40px_rgba(28,107,242,0.18)]">
        <img
          src={IMAGES.heroCare}
          alt="Caregiver visiting a patient at home"
          className="h-72 w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="font-display text-[11px] font-semibold tracking-[0.2em] text-white/75 uppercase">KEPA Home Care</p>
          <h2 className="mt-2 max-w-[18rem] font-display text-[26px] leading-8 font-bold">
            Quality home care services, you can trust
          </h2>
          <Button className="mt-4 bg-white text-black hover:bg-white/90" onClick={() => navigate({ to: "/book" })}>
            Book an Appointment
          </Button>
        </div>
      </section>

      <div className="mt-4 flex gap-3 overflow-x-auto px-4 pb-1 no-scrollbar">
        <Shortcut icon={<CalendarPlus size={18} />} label="Book Appointment" onClick={() => navigate({ to: "/book" })} />
        <Shortcut icon={<Stethoscope size={18} />} label="Our Services" onClick={() => navigate({ to: "/services" })} />
        <Shortcut icon={<MapPinned size={18} />} label="Coverage Area" onClick={() => navigate({ to: "/coverage" })} />
        <Shortcut icon={<Phone size={18} />} label="Call Us" href={BUSINESS.phoneHref} />
      </div>

      <section className="mx-4 mt-5 flex items-center gap-4 overflow-hidden rounded-[20px] bg-black text-white">
        <img src={IMAGES.nurseHome} alt="" className="h-24 w-28 shrink-0 object-cover" />
        <div className="pr-4">
          <p className="font-display text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">Since day one</p>
          <p className="font-display text-lg leading-6 font-bold">15 Years of Experience</p>
          <p className="text-xs text-white/65">Massachusetts in-home healthcare</p>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between px-4">
          <div>
            <p className="font-display text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">What We Do</p>
            <h2 className="font-display text-[22px] font-bold tracking-tight">Our Services</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-primary">
            View All
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              to="/services/$id"
              params={{ id: service.id }}
              className="relative h-64 w-[17.5rem] shrink-0 overflow-hidden rounded-[22px] shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
            >
              <img src={service.image} alt="" className="size-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                <div>
                  <p className="font-display text-[17px] leading-6 font-bold">{service.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-4 text-white/75">{service.short}</p>
                </div>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <ChevronRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="px-4">
          <p className="font-display text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Why KEPA</p>
          <h2 className="font-display text-[22px] font-bold tracking-tight">Why Choose Us</h2>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
          {WHY_CHOOSE.map((item, index) => {
            const Icon = WHY_ICONS[index] ?? Stethoscope;
            return (
              <article key={item.title} className="w-64 shrink-0 rounded-[20px] border border-black/5 bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
                <span className="flex size-11 items-center justify-center rounded-full bg-[#E8F0FE] text-primary">
                  <Icon size={18} />
                </span>
                <h3 className="mt-3 font-display text-base font-bold">{item.title}</h3>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <div className="px-4">
          <p className="font-display text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Client Feedback</p>
          <h2 className="font-display text-[22px] font-bold tracking-tight">Client Testimonials</h2>
        </div>
        <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-4 no-scrollbar">
          {TESTIMONIALS.map((item) => (
            <article key={item.name} className="flex w-72 shrink-0 flex-col rounded-[20px] border border-black/5 bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
              <p className="font-display text-3xl leading-none text-primary">&ldquo;</p>
              <p className="mt-2 line-clamp-5 flex-1 text-sm leading-6 text-foreground">{item.quote}</p>
              <div className="mt-4 border-t border-black/5 pt-3">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.city}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}

function Shortcut({
  icon,
  label,
  onClick,
  href,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const inner = (
    <>
      <span className="flex size-9 items-center justify-center rounded-xl bg-[#E8F0FE] text-primary">{icon}</span>
      <span className="pr-1 text-[13px] leading-4 font-semibold whitespace-nowrap">{label}</span>
    </>
  );
  const cls =
    "flex h-14 shrink-0 items-center gap-2 rounded-2xl border border-black/5 bg-white px-3 shadow-[0_8px_20px_rgba(0,0,0,0.04)]";
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
