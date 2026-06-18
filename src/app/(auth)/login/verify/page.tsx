import { Icon } from '@/components/ui/Icon';
import { PasscodeBoxes } from '@/features/auth/components/PasscodeBoxes';
import { ResendTimer } from '@/features/auth/components/ResendTimer';

// XD px -> scaling rem.
const rem = (px: number) => `${px * 0.0625}rem`;

// TODO: from the prior step (NestJS) once auth is wired.
const USER_NAME = 'Mohamad Katmawi';

/** Login — WhatsApp verification code (6 digits). Resend timer static for now. */
export default function VerifyPage() {
    return (
        <main className="flex h-full flex-col items-center">
            <div className="flex flex-col items-center justify-end" style={{ flexGrow: 2 }}>
                <h1 className="fz-30 text-ink h-38 w-full px-20 leading-none flex items-center-safe font-bold">
                    Login Management !
                </h1>
                <p
                    className="fz-16 text-ink w-full px-20 leading-none font-medium"
                    style={{ marginTop: rem(12) }}
                >
                    Enter Verification Code Sent To Your Whatsapp
                </p>

                <p
                    className="fz-12 text-ink flex w-full items-center gap-6 px-20 leading-none font-normal"
                    style={{ marginTop: rem(8) }}
                >
                    We Have Sent A Verification Code To Your Number
                    <Icon
                        name="auth/phonenumber_send_otp"
                        width={15}
                        height={15}
                        mask
                        className="text-ink"
                    />
                </p>

                <p
                    className="fz-12 flex w-full items-center gap-6 px-20 leading-none"
                    style={{ marginTop: rem(8) }}
                >
                    <span className="text-ink font-normal">{USER_NAME}</span>
                    <ResendTimer startSeconds={120} />
                </p>

                <div style={{ marginTop: rem(42) }}>
                    <PasscodeBoxes length={6} nextHref="/login/set-passcode" />
                </div>
            </div>

            {/* Reserved (white) space for the on-screen keyboard on mobile/tablet. */}
            <div className="w-full" style={{ flexGrow: 3, marginTop: rem(20) }} aria-hidden />
        </main>
    );
}
