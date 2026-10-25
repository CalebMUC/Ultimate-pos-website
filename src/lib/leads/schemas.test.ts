import { describe, expect, it } from "vitest";
import { contactSchema, demoSchema, formDataToInput, quoteSchema } from "./schemas";

const validDemo = {
  fullName: "  Wanjiku Kamau ",
  businessName: "Kamau Mini Mart",
  phone: "0712 345 678",
  email: " Wanjiku@Example.com ",
  businessType: "supermarket-minimart-pos",
  branches: "2-3",
  preferredDate: "",
  preferredTime: "",
  mode: "online",
  message: "Two shops.\nWant M-Pesa.",
  consent: true,
};

describe("demoSchema", () => {
  it("accepts a valid request and normalises it", () => {
    const result = demoSchema.parse(validDemo);
    expect(result.fullName).toBe("Wanjiku Kamau");
    expect(result.phone).toBe("+254712345678");
    expect(result.email).toBe("wanjiku@example.com");
    expect(result.preferredDate).toBeUndefined();
    expect(result.preferredTime).toBeUndefined();
    expect(result.message).toBe("Two shops.\nWant M-Pesa.");
  });

  it("strips CR/LF from single-line fields (no email header injection)", () => {
    const result = demoSchema.parse({ ...validDemo, businessName: "Shop\r\nBcc: victim@example.com" });
    expect(result.businessName).not.toMatch(/[\r\n]/);
  });

  it("reports a clear error for each invalid field", () => {
    const result = demoSchema.safeParse({ ...validDemo, phone: "0799", email: "nope", consent: false, mode: "" });
    expect(result.success).toBe(false);
    const fields = result.error!.issues.map((i) => i.path[0]);
    expect(fields).toEqual(expect.arrayContaining(["phone", "email", "consent", "mode"]));
  });

  it("rejects values that are not in the option lists", () => {
    expect(demoSchema.safeParse({ ...validDemo, businessType: "casino" }).success).toBe(false);
    expect(demoSchema.safeParse({ ...validDemo, branches: "999" }).success).toBe(false);
  });
});

describe("quoteSchema", () => {
  const validQuote = {
    ...validDemo,
    tills: "2-5",
    modules: ["mpesa", "deliveries"],
    hardwareNeeded: "yes",
    hardwareList: "2 printers",
    timeline: "asap",
    notes: "",
  };

  it("accepts modules from the real feature list", () => {
    expect(quoteSchema.parse(validQuote).modules).toEqual(["mpesa", "deliveries"]);
  });

  it("rejects invented modules", () => {
    expect(quoteSchema.safeParse({ ...validQuote, modules: ["teleportation"] }).success).toBe(false);
  });
});

describe("contactSchema", () => {
  it("requires a message", () => {
    const result = contactSchema.safeParse({
      fullName: "A",
      phone: "0712345678",
      email: "a@b.co",
      subject: "Hi",
      message: "   ",
      consent: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("formDataToInput", () => {
  it("reads checkboxes, multi-value fields and missing fields", () => {
    const fd = new FormData();
    fd.append("fullName", "Test");
    fd.append("modules", "mpesa");
    fd.append("modules", "bundles");
    fd.append("consent", "on");
    const input = formDataToInput("quote", fd);
    expect(input.modules).toEqual(["mpesa", "bundles"]);
    expect(input.consent).toBe(true);
    expect(input.businessName).toBe("");
    expect(Object.keys(input)).not.toContain("$ACTION_ID");
  });
});
