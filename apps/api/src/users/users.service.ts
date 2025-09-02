import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma, Prisma } from '@carhub/db';

@Injectable()
export class UsersService {
  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async findAll() {
    return prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    try {
      return await prisma.user.update({ where: { id }, data });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id: number) {
    try {
      return await prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
