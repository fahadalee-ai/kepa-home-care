import { useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button, Header, Screen } from "@/components/kit";
import { serviceById } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export function ServiceDetailView({ id }: { id: string }) {
  const navigate = useNavigate();
  const { updateDraft } = useApp();
  const service = serviceById(id);

  if (!service) {
    return (
      <Screen padded={false}>
        <Header title="Service" fallbackTo="/services" />
        <p className="px-4 text-sm text-muted-foreground">That service is not available.</p>
      </Screen>
    );
  }

  return (
    <Screen padded={false} className="pb-40">
      <Header title="Service" fallbackTo="/services" />
      <div className="relative h-56">
        <img src={service.image} alt="" className="size-full object-cover" />
      </div>
      <div className="px-4 pt-5">
        <p className="font-display text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">Our Services</p>
        <h1 className="mt-2 font-display text-[28px] leading-8 font-bold">{service.name}</h1>
        <p className="mt-3 text-[15px] leading-6 text-muted-foreground">{service.description}</p>

        <h2 className="mt-6 font-display text-lg font-bold">What&apos;s Included</h2>
        <ul className="mt-3 space-y-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#E8F0FE] text-primary">
                <Check size={16} />
              </span>
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-6 font-display text-lg font-bold">Who It&apos;s For</h2>
        <p className="mt-2 text-[15px] leading-6 text-muted-foreground">{service.who}</p>
      </div>

      <div className="fixed bottom-[calc(5.6rem+env(safe-area-inset-bottom))] left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 border-t border-black/5 bg-[#F5F7FA] px-4 pt-3 pb-3">
        <Button
          full
          onClick={() => {
            updateDraft({ serviceId: service.id, servicePreset: true });
            navigate({ to: "/book/area" });
          }}
        >
          Book This Service
        </Button>
      </div>
    </Screen>
  );
}
