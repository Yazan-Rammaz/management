import type { Transition, Variants } from "motion/react";

/**
 * The single iOS-flavored motion vocabulary. Every animation in the app pulls
 * from here so timing/feel stay uniform. Don't inline ad-hoc springs.
 */

/** UIKit-like spring — for cards, sheets, shared-element transitions. */
export const iosSpring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 32,
  mass: 0.9,
};

/** iOS navigation easing curve (the classic push/pop cubic). */
export const iosEase: Transition = {
  duration: 0.35,
  ease: [0.32, 0.72, 0, 1],
};

/** Page push — content slides in like a navigation controller. */
export const pagePush: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

/** Card/sheet open — scale + lift, iOS modal feel. */
export const cardOpen: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 8 },
};
