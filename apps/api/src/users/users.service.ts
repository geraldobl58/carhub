import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@carhub/db';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  async create(data: CreateUserDto) {
    try {
      // Check if email already exists
      const emailExists = await this.repository.emailExists(data.email);
      if (emailExists) {
        throw new ConflictException({
          success: false,
          message: 'Email already exists',
          statusCode: 409,
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const userData = { ...data, password: hashedPassword };

      const user = await this.repository.create(userData);

      return {
        success: true,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException({
            success: false,
            message: 'Email already exists',
            statusCode: 409,
          });
        }
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to create user',
        statusCode: 500,
      });
    }
  }

  async findAll(query: QueryUserDto) {
    try {
      const result = await this.repository.findMany(query);

      return {
        success: true,
        message: 'Users retrieved successfully',
        data: result.users,
        meta: result.pagination,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to retrieve users',
        statusCode: 500,
      });
    }
  }

  async findOne(id: string) {
    if (!id || !id.trim()) {
      throw new BadRequestException({
        success: false,
        message: 'Valid user ID is required',
        statusCode: 400,
      });
    }

    try {
      const user = await this.repository.findOne(id);

      if (!user) {
        throw new NotFoundException({
          success: false,
          message: 'User not found',
          statusCode: 404,
        });
      }

      return {
        success: true,
        message: 'User retrieved successfully',
        data: user,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to retrieve user',
        statusCode: 500,
      });
    }
  }

  async update(id: string, data: UpdateUserDto) {
    if (!id || !id.trim()) {
      throw new BadRequestException({
        success: false,
        message: 'Valid user ID is required',
        statusCode: 400,
      });
    }

    try {
      // Check if user exists
      const exists = await this.repository.exists(id);
      if (!exists) {
        throw new NotFoundException({
          success: false,
          message: 'User not found',
          statusCode: 404,
        });
      }

      // Check if email is being updated and already exists
      if (data.email) {
        const emailExists = await this.repository.emailExists(data.email);
        if (emailExists) {
          // Check if it's not the same user
          const currentUser = await this.repository.findOne(id);
          if (currentUser && currentUser.email !== data.email) {
            throw new ConflictException({
              success: false,
              message: 'Email already exists',
              statusCode: 409,
            });
          }
        }
      }

      // Hash password if provided
      const updateData = { ...data };
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
      }

      const user = await this.repository.update(id, updateData);

      return {
        success: true,
        message: 'User updated successfully',
        data: user,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException({
            success: false,
            message: 'User not found',
            statusCode: 404,
          });
        }
        if (error.code === 'P2002') {
          throw new ConflictException({
            success: false,
            message: 'Email already exists',
            statusCode: 409,
          });
        }
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to update user',
        statusCode: 500,
      });
    }
  }

  async remove(id: string) {
    if (!id || !id.trim()) {
      throw new BadRequestException({
        success: false,
        message: 'Valid user ID is required',
        statusCode: 400,
      });
    }

    try {
      // Check if user exists
      const exists = await this.repository.exists(id);
      if (!exists) {
        throw new NotFoundException({
          success: false,
          message: 'User not found',
          statusCode: 404,
        });
      }

      const user = await this.repository.remove(id);

      return {
        success: true,
        message: 'User deleted successfully',
        data: user,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException({
            success: false,
            message: 'User not found',
            statusCode: 404,
          });
        }
        if (error.code === 'P2003') {
          throw new ConflictException({
            success: false,
            message: 'Cannot delete user with existing listings',
            statusCode: 409,
          });
        }
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to delete user',
        statusCode: 500,
      });
    }
  }
}
