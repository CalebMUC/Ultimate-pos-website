import { describe, expect, it } from "vitest";
import { formatKenyanPhone, normalizeKenyanPhone } from "./phone";

describe("normalizeKenyanPhone", () => {
  it.each([
    ["0720463710", "+254720463710"],
    ["0720 463 710", "+254720463710"],
    ["254720463710", "+254720463710"],
    ["+254 720 463 710", "+254720463710"],
    ["(0720) 463-710", "+254720463710"],
    ["0110 123 456", "+254110123456"],
    ["720463710", "+254720463710"],
  ])("normalises %s", (input, expected) => {
    expect(normalizeKenyanPhone(input)).toBe(expected);
  });

  it.each(["", "0799", "07204637101", "0220463710", "+255720463710", "07two463710", "+254 720 463 710 ext 2"])(
    "rejects %s",
    (input) => {
      expect(normalizeKenyanPhone(input)).toBeNull();
    },
  );
});

describe("formatKenyanPhone", () => {
  it("formats E.164 as a local number", () => {
    expect(formatKenyanPhone("+254720463710")).toBe("0720 463 710");
  });
});
