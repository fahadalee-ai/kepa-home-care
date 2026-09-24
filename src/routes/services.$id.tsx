import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailView } from "@/components/ServiceDetailView";

export const Route = createFileRoute("/services/$id")({
  head: () => ({ meta: [{ title: "Service — KEPA Home Care" }] }),
  component: ServiceRoute,
});

function ServiceRoute() {
  const { id } = Route.useParams();
  return <ServiceDetailView id={id} />;
}
