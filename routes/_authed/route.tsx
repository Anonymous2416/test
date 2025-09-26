import { sessionQueryOptions } from "@/lib/queries/session";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  beforeLoad: async ({ context, location, preload }) => {
    if (preload) {
      return;
    }

    // let session = getCachedSession(context.queryClient);

    // if (session === undefined) {
    // session = await context.queryClient.fetchQuery(sessionQueryOptions());
    const session = await context.queryClient.ensureQueryData({
      ...sessionQueryOptions(),
      revalidateIfStale: true,
    });
    // }

    if (!session?.user || !session?.session) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    return { user: session.user, session: session };
  },
});

function RouteComponent() {
  return <div>Hello "/_authed"!</div>;
}
