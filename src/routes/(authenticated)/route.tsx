import { getCachedSession, sessionQueryOptions } from "@/lib/queries/session";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)")({
  component: Outlet,
  beforeLoad: async ({ context, location }) => {
    let session = getCachedSession(context.queryClient);

    if (session === undefined) {
      session = await context.queryClient.fetchQuery(sessionQueryOptions());
    }

    if (!session?.user || !session?.session) {
      const currentPath = location.pathname + location.search;
      const safeRedirect = currentPath.startsWith("/") ? currentPath : "/";
      throw redirect({
        to: "/login",
        search: {
          redirect: safeRedirect,
        },
      });
    }

    return { user: session.user, session: session };
  },
});
