import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import * as z from "zod/mini";

/**
 * Minimal React Hook Form resolver for Zod (Mini) schemas.
 * (Avoids @hookform/resolvers, whose optional peer dependencies conflict with this project.)
 */
export function zodResolver<Input extends FieldValues, Output>(
  schema: z.ZodMiniType<Output, Input>,
): Resolver<Input, unknown, Output> {
  return async (values) => {
    const result = await z.safeParseAsync(schema, values);
    if (result.success) return { values: result.data, errors: {} };

    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (path && !errors[path]) errors[path] = { type: issue.code, message: issue.message };
    }
    return { values: {}, errors: errors as FieldErrors<Input> };
  };
}
