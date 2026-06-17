"use client";

import { AnimatedCard } from "@/components/motion/AnimatedCard";
import type { Agent } from "../schema";

const statusColor: Record<Agent["status"], string> = {
  active: "text-green-600",
  pending: "text-amber-600",
  suspended: "text-red-600",
};

export function AgentList({ agents }: { agents: Agent[] }) {
  if (agents.length === 0) {
    return <p className="fz-16 opacity-60">No agents yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AnimatedCard key={agent.id} layoutId={`agent-${agent.id}`}>
          <div className="flex flex-col gap-6">
            <span className="fz-16 font-medium">{agent.name}</span>
            <span className="fz-13 opacity-60">{agent.email}</span>
            <div className="flex items-center justify-between">
              <span className="fz-13 opacity-60">{agent.countryCode}</span>
              <span className={`fz-13 font-medium ${statusColor[agent.status]}`}>
                {agent.status}
              </span>
            </div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
}
