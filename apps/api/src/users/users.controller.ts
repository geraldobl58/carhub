import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User created' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create({
      email: dto.email,
      name: dto.name,
      password: dto.password,
      phone: dto.phone,
      role: dto.role ?? 'user',
    });
  }

  @Get()
  @ApiOkResponse({ description: 'List users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get user by id' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Update user by id' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, {
      email: dto.email,
      name: dto.name,
      password: dto.password,
      phone: dto.phone,
      role: dto.role,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete user by id' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
