import { sessionQueryOptions } from "@/lib/queries/session";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth-pages)/login")({
  component: RouteComponent,
  beforeLoad: async ({ context, preload }) => {
    if (preload) {
      return;
    }
    // const session = await context.queryClient.fetchQuery(sessionQueryOptions());
    const session = await context.queryClient.ensureQueryData({
      ...sessionQueryOptions(),
      revalidateIfStale: true,
    });

    if (session?.user && session?.session) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  return <div>Hello "/(auth)/login"!</div>;
}
