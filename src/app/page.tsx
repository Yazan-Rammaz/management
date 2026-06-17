import { Screen } from "@/components/ui/Screen";

/**
 * Scaling demo / smoke page. The 300x60 button below is written exactly as XD
 * specifies it — `w-300 h-60` — and keeps that shape at every screen size.
 */
export default function Home() {
  return (
    <Screen variant="centered" maxW={1100} gutter={24}>
      <div className="flex flex-col items-center gap-32 py-80 text-center">
        <h1 className="fz-40 font-semibold">RDB Management</h1>
        <p className="fz-18 max-w-560 opacity-70">
          Design system online. This 300×60 button keeps its exact proportions
          from laptop (1366) to tablet (834) to mobile (430), then locks at
          400px.
        </p>

        {/* XD: 300 x 60, radius 12, font 18 — written 1:1, auto-scaling. */}
        <button className="bg-foreground text-background flex h-60 w-300 items-center justify-center rad-12 fz-18 font-medium">
          Get started
        </button>
      </div>
    </Screen>
  );
}
