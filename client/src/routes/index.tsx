import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App
});

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14 flex flex-col items-center">
      <p>Index bro ^-^</p>
    </main>
  );
}