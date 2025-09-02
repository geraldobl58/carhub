import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer',
  USER = 'user',
}

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The phone of the user',
    example: '+55 12 34567-890',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'The role of the user',
    example: UserRole.USER,
    enum: UserRole,
    required: false,
  })
  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.SELLER, UserRole.BUYER, UserRole.USER])
  role?: UserRole = UserRole.USER;
}
