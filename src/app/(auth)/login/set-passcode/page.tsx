import { SetPasscodeFlow } from '@/features/auth/components/SetPasscodeFlow';

// XD px -> scaling rem.
const rem = (px: number) => `${px * 0.0625}rem`;

// TODO: from the prior step (NestJS) once auth is wired.
const USER_NAME = 'Mohamad Katmawi';
const USER_ROLE = 'General Manager';

/** Login — set a passcode on first login (6 digits). */
export default function SetPasscodePage() {
    return (
        <main className="flex h-full flex-col items-center">
            <div className="flex flex-col items-center justify-end" style={{ flexGrow: 2 }}>
                <h1 className="fz-30 text-ink h-38 flex items-center-safe w-full px-20 leading-none font-bold">
                    Set Passcode !
                </h1>
                <p
                    className="fz-16 text-ink w-full px-20 leading-none font-normal"
                    style={{ marginTop: rem(12) }}
                >
                    Your First Login To Management
                </p>
                <p
                    className="fz-12 text-ink w-full px-20 leading-none font-normal"
                    style={{ marginTop: rem(12) }}
                >
                    {USER_NAME} {USER_ROLE}
                </p>

                <SetPasscodeFlow nextHref="/dashboard" />
            </div>

            {/* Reserved (white) space for the on-screen keyboard on mobile/tablet. */}
            <div className="w-full" style={{ flexGrow: 3, marginTop: rem(20) }} aria-hidden />
        </main>
    );
}
