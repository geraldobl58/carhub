import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    if (typeof this.$connect === 'function') {
      await (this.$connect as () => Promise<void>)();
    }
  }

  async onModuleDestroy() {
    if (typeof this.$disconnect === 'function') {
      await (this.$disconnect as () => Promise<void>)();
    }
  }
}
