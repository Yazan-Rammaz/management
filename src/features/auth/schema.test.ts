import { describe, expect, it } from "vitest";
import { registerSchema } from "./schema";

const valid = {
  name: "Sara",
  email: "sara@example.com",
  phone: "0500000000",
  countryCode: "sa",
  password: "Password1",
  confirmPassword: "Password1",
};

describe("registerSchema", () => {
  it("accepts a valid payload and uppercases the country code", () => {
    const result = registerSchema.parse(valid);
    expect(result.countryCode).toBe("SA");
  });

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({
      ...valid,
      confirmPassword: "Different1",
    });
    expect(result.success).toBe(false);
  });

  it("requires a strong password", () => {
    const result = registerSchema.safeParse({ ...valid, password: "weak", confirmPassword: "weak" });
    expect(result.success).toBe(false);
  });
});
