import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-24">
      <h1 className="fz-28 font-semibold">Create account</h1>
      <RegisterForm />
      <p className="fz-14 opacity-70">
        Already registered?{" "}
        <Link href="/login" className="underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
