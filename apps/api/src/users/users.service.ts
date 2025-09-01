import { Injectable } from '@nestjs/common';
import { PrismaService } from '@carhub/db';

export type User = {
  id: number;
  email: string;
  name?: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => ({
      id: u.id,
      email: u.email ?? '',
      name: u.name ?? undefined,
    }));
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email ?? '',
      name: user.name ?? undefined,
    };
  }
}
