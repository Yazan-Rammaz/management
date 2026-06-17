import Link from "next/link";
import { Screen } from "@/components/ui/Screen";

export default function ForbiddenPage() {
  return (
    <Screen variant="centered" maxW={560} gutter={24}>
      <div className="flex min-h-screen flex-col items-center justify-center gap-16 text-center">
        <h1 className="fz-32 font-semibold">403 — Not allowed</h1>
        <p className="fz-16 opacity-70">
          Your role doesn’t have access to this page.
        </p>
        <Link href="/dashboard" className="fz-16 underline">
          Back to dashboard
        </Link>
      </div>
    </Screen>
  );
}
