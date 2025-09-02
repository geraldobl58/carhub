import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@carhub/db';

import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { QueryListingDto } from './dto/query-listing.dto';
import { ListingRepository } from './repositories/listing.repository';
import { STATUS_CODES } from 'http';

@Injectable()
export class ListingService {
  constructor(private readonly repository: ListingRepository) {}

  async create(data: CreateListingDto) {
    try {
      const listing = await this.repository.create(data);

      return {
        success: true,
        message: 'Listing created successfully',
        data: listing,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({
            success: false,
            message: 'A listing with this information already exists',
            statusCode: STATUS_CODES.BAD_REQUEST,
          });
        }
        if (error.code === 'P2003') {
          throw new BadRequestException({
            success: false,
            message: 'Invalid user ID provided',
            statusCode: STATUS_CODES.BAD_REQUEST,
          });
        }
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to create listing',
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(query: QueryListingDto) {
    try {
      const result = await this.repository.findMany(query);

      return {
        success: true,
        message: 'Listings retrieved successfully',
        data: result.listings,
        meta: result.pagination,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to retrieve listings',
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findOne(id: string) {
    if (!id || !id.trim()) {
      throw new BadRequestException({
        success: false,
        message: 'Valid listing ID is required',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    }

    try {
      const listing = await this.repository.findOne(id);

      if (!listing) {
        throw new NotFoundException({
          success: false,
          message: 'Listing not found',
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      return {
        success: true,
        message: 'Listing retrieved successfully',
        data: listing,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to retrieve listing',
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async update(id: string, updateListingDto: UpdateListingDto) {
    if (!id || !id.trim()) {
      throw new BadRequestException({
        success: false,
        message: 'Valid listing ID is required',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    }

    try {
      // Check if listing exists
      const exists = await this.repository.exists(id);
      if (!exists) {
        throw new NotFoundException({
          success: false,
          message: 'Listing not found',
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      const listing = await this.repository.update(id, updateListingDto);

      return {
        success: true,
        message: 'Listing updated successfully',
        data: listing,
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
            message: 'Listing not found',
            statusCode: STATUS_CODES.NOT_FOUND,
          });
        }
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to update listing',
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async remove(id: string) {
    if (!id || !id.trim()) {
      throw new BadRequestException({
        success: false,
        message: 'Valid listing ID is required',
        statusCode: STATUS_CODES.BAD_REQUEST,
      });
    }

    try {
      // Check if listing exists
      const exists = await this.repository.exists(id);
      if (!exists) {
        throw new NotFoundException({
          success: false,
          message: 'Listing not found',
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      const listing = await this.repository.remove(id);

      return {
        success: true,
        message: 'Listing deleted successfully',
        data: listing,
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
            message: 'Listing not found',
            statusCode: STATUS_CODES.NOT_FOUND,
          });
        }
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to delete listing',
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
