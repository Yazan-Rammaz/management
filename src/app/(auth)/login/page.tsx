import Link from "next/link";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-24">
      <h1 className="fz-28 font-semibold">Sign in</h1>
      <LoginForm />
      <p className="fz-14 opacity-70">
        No account?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
    </div>
  );
}
