"use client";

import { useActionState } from "react";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { loginAction, type ActionState } from "../actions";

const initial: ActionState = { ok: false };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initial);
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex w-full flex-col gap-16">
      {state.error ? <p className="fz-14 text-red-500">{state.error}</p> : null}

      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        error={fe.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        error={fe.password}
      />

      <Button type="submit" fullWidth disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
