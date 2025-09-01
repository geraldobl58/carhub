import { z } from "zod";

const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:3333"),
});

// Função para validar e retornar variáveis do cliente
export function getClientEnv() {
  const env = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  };

  const parsed = clientSchema.safeParse(env);

  if (!parsed.success) {
    console.error("❌ Invalid client environment variables:");
    console.error(parsed.error.format());
    throw new Error("Invalid client environment variables");
  }

  return parsed.data;
}

// Exportar o schema para casos de uso customizado
export { clientSchema };

// Tipos TypeScript
export type ClientEnv = z.infer<typeof clientSchema>;
