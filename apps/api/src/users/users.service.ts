import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '@carhub/db';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(data: CreateUserDto) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const created = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role ?? 'user',
        password: passwordHash,
      },
    });
    return created;
  }

  async findAll() {
    return prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      return await prisma.user.update({ where: { id }, data });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id: string) {
    try {
      return await prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
