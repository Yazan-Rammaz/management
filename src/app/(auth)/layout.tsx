import type { ReactNode } from "react";
import { Screen } from "@/components/ui/Screen";

/** Auth pages sit in a narrow (430px design) centered column. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Screen variant="centered" maxW={430} gutter={24}>
      <div className="flex min-h-screen flex-col justify-center gap-32 py-64">
        {children}
      </div>
    </Screen>
  );
}
