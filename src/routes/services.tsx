import { Outlet, createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Header, Screen } from "@/components/kit";
import { SERVICES } from "@/lib/mock-data";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "Our Services — KEPA Home Care" }] }),
  component: ServicesRoute,
});

function ServicesRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/services") return <Outlet />;
  return <ServicesScreen />;
}

function ServicesScreen() {
  return (
    <Screen padded={false} className="pb-8">
      <Header large back={false} title="Our Services" subtitle="What We Do" />
      <p className="px-4 text-[15px] leading-[22px] text-muted-foreground">
        Skilled nursing, home health aide, physical therapy, and occupational therapy — brought to your home.
      </p>
      <div className="mt-4 space-y-5 px-4">
        {SERVICES.map((service) => (
          <Link
            key={service.id}
            to="/services/$id"
            params={{ id: service.id }}
            className="block overflow-hidden rounded-[22px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="relative h-56">
              <img src={service.image} alt="" className="size-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent" />
            </div>
            <div className="flex items-end justify-between gap-3 px-4 py-4">
              <div>
                <h2 className="font-display text-[20px] leading-6 font-bold">{service.name}</h2>
                <p className="mt-1 text-[15px] leading-[22px] text-muted-foreground">{service.short}</p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#E8F0FE] text-primary">
                <ChevronRight size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Screen>
  );
}
