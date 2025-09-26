import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/"!
      <Link to="/login" className="rounded-md bg-blue-500 p-2 text-white">
        Login
      </Link>
      <Link to="/dashboard" className="rounded-md bg-blue-500 p-2 text-white">
        Dashboard
      </Link>
    </div>
  );
}
