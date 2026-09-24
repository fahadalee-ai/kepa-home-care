import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { Header, Screen } from "@/components/kit";
import { BUSINESS, COVERAGE_AREAS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/coverage")({
  head: () => ({ meta: [{ title: "Coverage Service Area — KEPA Home Care" }] }),
  component: CoverageScreen,
});

function CoverageScreen() {
  const navigate = useNavigate();
  const { updateDraft } = useApp();

  return (
    <Screen padded={false} className="pb-8">
      <Header
        large
        back={false}
        title="Coverage"
        subtitle="Service Area"
        right={
          <Link to="/chat" aria-label="Chat with KEPA" className="flex size-11 items-center justify-center text-primary">
            <MessageCircle size={22} />
          </Link>
        }
      />
      <div className="px-4">
        <p className="text-[15px] leading-[22px] text-muted-foreground">
          In-home care across four Massachusetts regions. Tap an area to request a visit.
        </p>
        <MaMap />
        <div className="mt-4 space-y-4">
          {COVERAGE_AREAS.map((area) => (
            <article key={area.id} className="overflow-hidden rounded-[22px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
              <div className="relative h-44">
                <img src={area.image} alt="" className="size-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-display text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">{area.city}</p>
                  <h2 className="font-display text-[20px] leading-6 font-bold">{area.name}</h2>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[15px] leading-[22px] text-muted-foreground">{area.note}</p>
                <button
                  type="button"
                  onClick={() => {
                    updateDraft({ areaId: area.id });
                    navigate({ to: "/book/area", search: { area: area.id } });
                  }}
                  className="mt-4 inline-flex min-h-[50px] w-full items-center justify-center rounded-2xl bg-primary text-[17px] font-semibold text-white active:bg-primary-dark"
                >
                  Book in this area
                </button>
              </div>
            </article>
          ))}
        </div>
        <a href={BUSINESS.phoneHref} className="mt-5 flex items-center justify-between rounded-[20px] bg-black px-4 py-4 text-white">
          <span>
            <span className="block text-[13px] text-white/60">Outside these areas?</span>
            <span className="block text-[17px] font-semibold">Call {BUSINESS.phone}</span>
          </span>
          <Phone size={18} className="text-primary" />
        </a>
      </div>
    </Screen>
  );
}

function MaMap() {
  const pins = [
    { id: "springfield", label: "Springfield", x: 29.4, y: 46.7, above: false },
    { id: "worcester", label: "Worcester", x: 48, y: 39, above: true },
    { id: "lowell", label: "Lowell", x: 59.5, y: 21.1, above: false },
    { id: "boston", label: "Boston", x: 65.6, y: 34.3, above: true },
  ];

  return (
    <div className="relative mt-4 overflow-hidden rounded-[22px] shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[3/2] w-full" role="img" aria-label="Massachusetts coverage map">
        <img src="/massachusetts-light.jpg" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white/85 to-transparent" />
        <p className="absolute top-3 left-4 font-display text-[13px] font-semibold tracking-[0.14em] text-primary uppercase">
          Massachusetts
        </p>
        {pins.map((pin) => (
          <span key={pin.id} className="absolute" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
            <span className="absolute -translate-x-1/2 -translate-y-1/2 size-3.5 rounded-full border-2 border-white bg-primary shadow-[0_2px_6px_rgba(28,107,242,0.45)]" />
            <span
              className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap text-black shadow-[0_4px_12px_rgba(0,0,0,0.12)] ${pin.above ? "bottom-3" : "top-3"}`}
            >
              {pin.label}
            </span>
          </span>
        ))}
        <p className="absolute right-3 bottom-2 text-[9px] tracking-wide text-black/40">Esri, USGS, NOAA</p>
      </div>
    </div>
  );
}
