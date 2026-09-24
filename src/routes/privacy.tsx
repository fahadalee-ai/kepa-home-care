import { createFileRoute } from "@tanstack/react-router";
import { Header, Screen } from "@/components/kit";
import { BUSINESS } from "@/lib/mock-data";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — KEPA Home Care" }] }),
  component: PrivacyScreen,
});

function PrivacyScreen() {
  return (
    <Screen padded={false}>
      <Header title="Privacy Policy" fallbackTo="/login" />
      <article className="space-y-3 px-4 pb-8 text-[15px] leading-[22px] text-muted-foreground">
        <p>
          {BUSINESS.name} uses the information you enter — name, contact details, and visit address — only to
          schedule in-home care and to contact you about your appointment.
        </p>
        <p>
          This app stores scheduling details you enter. Clinical records stay with the care team.
        </p>
        <p>
          Account credentials are stored on this device for demo/session purposes. In production, they would be
          handled by a secured scheduling backend.
        </p>
        <p>
          Questions: {BUSINESS.email}
        </p>
      </article>
    </Screen>
  );
}
