import type { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { requireSession } from '@/lib/auth/session';
import { logoutAction } from '@/features/auth/actions';
import { Screen } from '@/components/ui/Screen';
import { PasscodeGate } from '@/features/auth/components/PasscodeGate';

/**
 * Authoritative auth gate for the whole protected area: `requireSession()` hits
 * NestJS `/auth/me`. If it fails, it redirects to /login before any child
 * renders. (The edge proxy only does silent refresh + headers.)
 */
export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const user = await requireSession();
    const t = await getTranslations('common');
    const tRoles = await getTranslations('roles');

    return (
        <Screen variant="bleed">
            {/* Re-prompt the passcode on every fresh load (in-memory unlock flag). */}
            <PasscodeGate />
            <header className="border-foreground/10 flex h-64 items-center justify-between border-b px-24">
                <span className="fz-18 font-semibold">{t('appName')}</span>
                <div className="flex items-center gap-16">
                    <span className="fz-14 opacity-70">{user.name}</span>
                    <form action={logoutAction}>
                        <button type="submit" className="fz-14 underline">
                            {t('logout')}
                        </button>
                    </form>
                </div>
            </header>
            <div className="px-24 py-24">{children}</div>
        </Screen>
    );
}
