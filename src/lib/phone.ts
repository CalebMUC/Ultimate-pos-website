/**
 * Kenyan mobile numbers (Safaricom, Airtel, Telkom: 07xx and 01xx).
 * Accepts local format, 254… and +254…, with spaces, dashes or brackets,
 * and returns E.164 (+2547XXXXXXXX), or null if the number is not a valid Kenyan number.
 */
export function normalizeKenyanPhone(input: string): string | null {
  const digits = input.replace(/[\s\-().]/g, "");
  if (!/^\+?\d+$/.test(digits)) return null;

  let national: string;
  if (digits.startsWith("+254")) national = digits.slice(4);
  else if (digits.startsWith("254")) national = digits.slice(3);
  else if (digits.startsWith("0")) national = digits.slice(1);
  else national = digits;

  // Mobile numbers: 7XXXXXXXX or 1XXXXXXXX (9 digits after the country code).
  if (!/^[17]\d{8}$/.test(national)) return null;
  return `+254${national}`;
}

/** +254720463710 -> 0720 463 710 */
export function formatKenyanPhone(e164: string): string {
  const national = e164.replace(/^\+254/, "0");
  return national.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");
}
