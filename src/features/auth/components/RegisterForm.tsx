"use client";

import { useActionState } from "react";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { registerAction, type ActionState } from "../actions";

const initial: ActionState = { ok: false };

/**
 * Registration form — identical for every role. The role is decided by the
 * backend, never chosen here.
 */
export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initial);
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex w-full flex-col gap-16">
      {state.error ? <p className="fz-14 text-red-500">{state.error}</p> : null}

      <TextField label="Full name" name="name" autoComplete="name" error={fe.name} />
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        error={fe.email}
      />
      <TextField label="Phone" name="phone" autoComplete="tel" error={fe.phone} />
      <TextField
        label="Country code"
        name="countryCode"
        placeholder="SA"
        maxLength={2}
        error={fe.countryCode}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        error={fe.password}
      />
      <TextField
        label="Confirm password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        error={fe.confirmPassword}
      />

      <Button type="submit" fullWidth disabled={pending}>
        {pending ? "Creating…" : "Create account"}
      </Button>
    </form>
  );
}
