import { describe, expect, it } from "vitest";
import { hasRole, isRole, ROLES } from "./rbac";

describe("rbac", () => {
  it("recognizes valid roles", () => {
    for (const role of ROLES) expect(isRole(role)).toBe(true);
    expect(isRole("hacker")).toBe(false);
    expect(isRole(undefined)).toBe(false);
  });

  it("gates by allowed roles", () => {
    expect(hasRole("super_admin", ["super_admin"])).toBe(true);
    expect(hasRole("agent", ["super_admin", "country_manager"])).toBe(false);
    expect(hasRole(null, ["agent"])).toBe(false);
  });
});
