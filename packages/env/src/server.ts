import { z } from "zod";

const serverSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // Server
  PORT: z.coerce.number().default(3000),

  // Authentication
  JWT_SECRET: z.string().optional(),

  // Environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Optional server-specific variables
  CORS_ORIGIN: z.string().optional(),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
});

// Função para validar e retornar variáveis do servere
export function getServerEnv() {
  const env = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    LOG_LEVEL: process.env.LOG_LEVEL,
  };

  const parsed = serverSchema.safeParse(env);

  if (!parsed.success) {
    console.error("❌ Invalid server environment variables:");
    console.error(parsed.error.format());
    throw new Error("Invalid server environment variables");
  }

  return parsed.data;
}

// Exportar o schema para casos de uso customizado
export { serverSchema };

// Tipos TypeScript
export type serverEnv = z.infer<typeof serverSchema>;
