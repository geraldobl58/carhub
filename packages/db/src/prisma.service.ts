import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  // Keep lifecycle simple — consumers can extend if needed
  async enableShutdownHooks(app: any) {
    process.on("SIGTERM", async () => {
      await this.$disconnect();
      if (app && typeof app.close === "function") await app.close();
    });
  }
}
