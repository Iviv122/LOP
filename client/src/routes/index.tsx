import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  }, component: App
});

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14 flex flex-col items-center">
      <p>Index</p>
    </main>
  );
}