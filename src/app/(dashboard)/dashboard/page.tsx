import Link from "next/link";
import { requireSession } from "@/lib/auth/session";
import { hasRole } from "@/lib/auth/rbac";

export default async function DashboardPage() {
  const user = await requireSession();
  const canManageAgents = hasRole(user.role, ["super_admin", "country_manager"]);

  return (
    <div className="flex flex-col gap-20">
      <h1 className="fz-24 font-semibold">Welcome, {user.name}</h1>
      <p className="fz-16 opacity-70">
        You are signed in as {user.role}
        {user.countryCode ? ` (${user.countryCode})` : ""}.
      </p>

      {canManageAgents ? (
        <Link href="/agents" className="fz-16 underline">
          Manage agents →
        </Link>
      ) : null}
    </div>
  );
}
