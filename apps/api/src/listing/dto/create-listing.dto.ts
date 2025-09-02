import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  Min,
} from 'class-validator';

export enum ListingStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export class CreateListingDto {
  @ApiProperty({
    description: 'The title of the listing',
    example: 'Toyota Corolla 2020',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the listing',
    example: 'A reliable and fuel-efficient sedan in excellent condition',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The make of the car',
    example: 'Toyota',
  })
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty({
    description: 'The model of the car',
    example: 'Corolla',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'The year of the car',
    example: '2020',
  })
  @IsString()
  @IsNotEmpty()
  year: string;

  @ApiProperty({
    description: 'The mileage of the car in kilometers',
    example: 50000,
  })
  @IsNumber()
  @Min(0)
  km: number;

  @ApiProperty({
    description: 'The price of the car',
    example: 20000,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'The type of fuel used by the car',
    example: 'Gasoline',
    required: false,
  })
  @IsOptional()
  @IsString()
  fuel?: string;

  @ApiProperty({
    description: 'The type of gearbox in the car',
    example: 'Automatic',
    required: false,
  })
  @IsOptional()
  @IsString()
  gearbox?: string;

  @ApiProperty({
    description: 'The color of the car',
    example: 'Red',
    required: false,
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    description: 'The city where the car is located',
    example: 'Los Angeles',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'The state where the car is located',
    example: 'California',
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'The images of the car',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({
    description: 'The status of the listing',
    enum: ListingStatus,
    example: ListingStatus.DRAFT,
  })
  @IsEnum(ListingStatus)
  status: ListingStatus;

  @ApiProperty({
    description: 'The user ID of the listing creator',
    example: 'user123',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
