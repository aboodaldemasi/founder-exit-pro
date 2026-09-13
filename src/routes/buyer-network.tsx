import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/buyer-network")({
  head: () => ({
    meta: [{ title: "Buy a SaaS — Founder Exit" }, { name: "robots", content: "noindex" }],
  }),
  component: () => <Navigate to="/buy" />,
});
