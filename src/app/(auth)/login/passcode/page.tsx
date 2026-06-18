import { PasscodeUnlock } from '@/features/auth/components/PasscodeUnlock';

// XD px -> scaling rem.
const rem = (px: number) => `${px * 0.0625}rem`;

// TODO: from session/NestJS once auth is wired (avatar, role abbr, name).
const USER_NAME = 'Mohamad Katmawi';
const USER_ROLE_ABBR = 'GM';

/**
 * Returning login — enter passcode. The avatar sits at 314/1024 of the viewport
 * height (relative, not fixed), then role, name, label, and the 6-box passcode
 * (first box carries the lock glyph).
 *
 * NOTE: avatar is a placeholder (no image asset yet) carrying the XD background
 * blur (amount 12, opacity 60%); it shows once a real photo is dropped in.
 */
export default function EnterPasscodePage() {
    return (
        <main className="flex h-full flex-col justify-center items-center">
            {/* Avatar 200×200, radius 15, with the XD background blur. */}

            <div className="h-45/100 flex items-end justify-center">
                <div className="bg-muted/40 relative h-200 w-200 overflow-hidden rad-15">
                    <div
                        aria-hidden
                        className="absolute inset-0 opacity-60"
                        style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                    />
                </div>
            </div>
            <div className="h-55/100 flex flex-col items-center">
                <span
                    className="fz-18 text-ink leading-none font-bold"
                    style={{ marginTop: rem(12) }}
                >
                    {USER_ROLE_ABBR}
                </span>
                <span
                    className="fz-18 text-ink leading-none font-normal"
                    style={{ marginTop: rem(6) }}
                >
                    {USER_NAME}
                </span>
                <span
                    className="fz-12 text-ink leading-none font-bold"
                    style={{ marginTop: rem(20) }}
                >
                    Enter Your Passcode
                </span>

                <div style={{ marginTop: rem(16) }}>
                    <PasscodeUnlock nextHref="/dashboard" />
                </div>
            </div>
        </main>
    );
}
