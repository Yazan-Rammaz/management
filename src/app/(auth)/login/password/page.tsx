import { AuthCodeField } from "@/features/auth/components/AuthCodeField";

// XD px -> scaling rem.
const rem = (px: number) => `${px * 0.0625}rem`;

// TODO: comes from the private-code step (NestJS) once auth is wired.
const USER_NAME = "Mohamad Katmawi";

/**
 * Login — step 2: enter password. Identical layout to the private-code step,
 * with the resolved user's name under the subtitle. Arrow → dashboard.
 */
export default function PasswordPage() {
  return (
    <main className="flex h-full flex-col items-center">
      <div
        className="flex flex-col items-center justify-end"
        style={{ flexGrow: 2 }}
      >
        <h1 className="fz-30 text-ink w-full px-20 leading-none font-bold">
          Login Management !
        </h1>
        <p
          className="fz-16 text-ink w-full px-20 leading-none font-normal"
          style={{ marginTop: rem(12) }}
        >
          Enter Your Password
        </p>
        <p
          className="fz-14 text-ink/55 w-full px-20 leading-none font-normal"
          style={{ marginTop: rem(8) }}
        >
          {USER_NAME}
        </p>

        <div style={{ marginTop: rem(88) }}>
          <AuthCodeField
            placeholder="Enter Your Password"
            ariaLabel="Enter Your Password"
            revealArrowAt={1}
            nextHref="/login/verify"
          />
        </div>
      </div>

      {/* Reserved (white) space for the on-screen keyboard on mobile/tablet. */}
      <div
        className="w-full"
        style={{ flexGrow: 3, marginTop: rem(20) }}
        aria-hidden
      />
    </main>
  );
}
