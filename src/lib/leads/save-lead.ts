import "server-only";
import { serverEnv } from "@/env";
import type { LeadData } from "./schemas";

export type StoredLead = LeadData & {
  id: string;
  submittedAt: string;
  page: string;
  verified: boolean;
};

/**
 * Keep a record of every lead so email is never the only copy.
 * Today: POST to LEAD_WEBHOOK_URL (a CRM, Zapier/Make, or a Google Sheets Apps Script) when set.
 * Swap in a database later behind the same function.
 */
export async function saveLead(lead: StoredLead): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const url = serverEnv().LEAD_WEBHOOK_URL;
  if (!url) return { ok: true, skipped: true };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    return response.ok ? { ok: true } : { ok: false, error: `Webhook responded ${response.status}` };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
