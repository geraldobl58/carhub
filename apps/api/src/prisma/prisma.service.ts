import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService as DbPrismaService } from '@carhub/db';

@Injectable()
export class PrismaService
  extends DbPrismaService
  implements OnModuleInit, OnModuleDestroy
{
  // Reuse parent lifecycle if present
  async onModuleInit() {
    if (typeof (this as any).$connect === 'function') {
      await (this as any).$connect();
    }
  }

  async onModuleDestroy() {
    if (typeof (this as any).$disconnect === 'function') {
      await (this as any).$disconnect();
    }
  }
}
