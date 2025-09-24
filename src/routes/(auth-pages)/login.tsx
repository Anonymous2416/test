import { sessionQueryOptions } from "@/lib/queries/session";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth-pages)/login")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const session = await context.queryClient.fetchQuery(sessionQueryOptions());

    if (session?.user && session?.session) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/(auth)/login"!</div>;
}
