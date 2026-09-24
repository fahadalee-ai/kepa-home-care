import { createFileRoute } from "@tanstack/react-router";
import { Header, Screen } from "@/components/kit";
import { BUSINESS } from "@/lib/mock-data";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — TXL Med PLLC" }] }),
  component: TermsScreen,
});

function TermsScreen() {
  return (
    <Screen padded={false}>
      <Header title="Terms of Service" fallbackTo="/login" />
      <article className="space-y-3 px-4 pb-8 text-[15px] leading-[22px] text-muted-foreground">
        <p>
          {BUSINESS.name} provides in-home care scheduling as a convenience. Booking in this app is a request
          for a visit — it is not medical advice and does not create a medical record.
        </p>
        <p>
          You are responsible for providing an accurate home address and being available at the preferred time.
        </p>
        <p>
          Clinical care is provided by KEPA clinicians during the visit. This app stores scheduling details only.
        </p>
        <p>
          Contact us at {BUSINESS.email} or {BUSINESS.phone} with questions about these terms.
        </p>
      </article>
    </Screen>
  );
}
