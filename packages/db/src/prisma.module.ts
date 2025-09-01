import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [
    {
      provide: PrismaService,
      useFactory: () => {
        try {
          // ensure .env is loaded when the provider is created
          // this guards against environments where dotenv wasn't loaded earlier
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require("dotenv").config();
        } catch (e) {
          // ignore if dotenv not available
        }
        return new PrismaService();
      },
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
