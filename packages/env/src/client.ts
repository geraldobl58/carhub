import { z } from 'zod';

// Declare client-exposed environment variables here (e.g., NEXT_PUBLIC_* or VITE_*).
const clientSchema = z.object({});

export type ClientEnv = z.infer<typeof clientSchema>;
export const clientEnv: ClientEnv = clientSchema.parse({});