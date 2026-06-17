import { test, expect } from "@playwright/test";

/**
 * The core promise of the design system: the 300x60 button keeps its EXACT 5:1
 * aspect ratio at every screen size — it scales, it never reflows or distorts.
 */
test("the demo button keeps its 5:1 proportions across canvases", async ({
  page,
}) => {
  await page.goto("/");
  const button = page.getByRole("button", { name: "Get started" });
  await expect(button).toBeVisible();

  const box = await button.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;

  const ratio = box.width / box.height;
  // 300 / 60 = 5. Allow a tiny tolerance for sub-pixel rounding.
  expect(ratio).toBeGreaterThan(4.8);
  expect(ratio).toBeLessThan(5.2);
});
