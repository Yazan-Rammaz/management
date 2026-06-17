import "server-only";
import { api } from "@/lib/api/server";
import { agentSchema, type Agent } from "./schema";

/**
 * Feature data access — the single place agent endpoints are called. Server
 * Components import these; client code never fetches agents directly.
 *
 * Responses are validated against the schema so a backend drift fails loudly
 * here instead of corrupting the UI.
 */
export async function listAgents(): Promise<Agent[]> {
  const data = await api.get<unknown>("/agents");
  return agentSchema.array().parse(data);
}

export async function getAgent(id: string): Promise<Agent> {
  const data = await api.get<unknown>(`/agents/${id}`);
  return agentSchema.parse(data);
}
