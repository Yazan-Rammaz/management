import { z } from "zod";

export const agentStatus = z.enum(["active", "pending", "suspended"]);
export type AgentStatus = z.infer<typeof agentStatus>;

export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  countryCode: z.string(),
  status: agentStatus,
});
export type Agent = z.infer<typeof agentSchema>;
