import { EntryRedirect } from "@/features/splash/components/EntryRedirect";

/**
 * Entry point ("/"). No content — it auth-checks and redirects to /dashboard or
 * /login. The global <SplashGate> overlay (root layout) covers the hop; it also
 * shows on every other full page load / refresh.
 */
export default function RootPage() {
  return <EntryRedirect />;
}
