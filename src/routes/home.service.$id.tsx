import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/home/service/$id")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/services/$id", params });
  },
});
