import { createFileRoute } from "@tanstack/react-router";
import { Presentation } from "@/presentation/ui/Presentation";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Presentation />;
}
