import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { ListingService } from './listing.service';

import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { QueryListingDto } from './dto/query-listing.dto';
import {
  ListingResponse,
  ListingsResponse,
  ErrorResponse,
} from './dto/response-listing.dto';

@ApiTags('Listings')
@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new listing' })
  @ApiCreatedResponse({
    description: 'Listing created successfully',
    type: ListingResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ErrorResponse,
  })
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    dto: CreateListingDto,
  ) {
    return await this.listingService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all listings with pagination and filters' })
  @ApiOkResponse({
    description: 'Listings retrieved successfully',
    type: ListingsResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ErrorResponse,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: QueryListingDto,
  ): Promise<any> {
    return await this.listingService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a listing by ID' })
  @ApiOkResponse({
    description: 'Listing retrieved successfully',
    type: ListingResponse,
  })
  @ApiNotFoundResponse({
    description: 'Listing not found',
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid listing ID',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ErrorResponse,
  })
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return await this.listingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a listing by ID' })
  @ApiOkResponse({
    description: 'Listing updated successfully',
    type: ListingResponse,
  })
  @ApiNotFoundResponse({
    description: 'Listing not found',
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or listing ID',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ErrorResponse,
  })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    dto: UpdateListingDto,
  ) {
    return await this.listingService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a listing by ID' })
  @ApiOkResponse({
    description: 'Listing deleted successfully',
    type: ListingResponse,
  })
  @ApiNotFoundResponse({
    description: 'Listing not found',
    type: ErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid listing ID',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    type: ErrorResponse,
  })
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
  ) {
    return await this.listingService.remove(id);
  }
}
