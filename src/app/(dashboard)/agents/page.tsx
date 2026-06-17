import { requireRole } from "@/lib/auth/session";
import { listAgents } from "@/features/agents/api";
import { AgentList } from "@/features/agents/components/AgentList";

export default async function AgentsPage() {
  // UI gate; NestJS re-enforces this on every /agents call.
  await requireRole(["super_admin", "country_manager"]);
  const agents = await listAgents();

  return (
    <div className="flex flex-col gap-20">
      <h1 className="fz-24 font-semibold">Agents</h1>
      <AgentList agents={agents} />
    </div>
  );
}
