/**
 * App-unlock flag — whether the passcode has been entered for THIS page load.
 *
 * Deliberately in-memory (module scope), so it is `false` on every full reload
 * (re-prompting the passcode) but persists across client-side navigation. It is
 * only ever set to `true` on the client; on the server it stays `false`.
 */
let unlocked = false;

export function isUnlocked() {
  return unlocked;
}

export function markUnlocked() {
  unlocked = true;
}
