import { Injectable } from '@nestjs/common';

import { prisma } from '@carhub/db';

import { CreateListingDto } from '../dto/create-listing.dto';
import { QueryListingDto } from '../dto/query-listing.dto';

@Injectable()
export class ListingRepository {
  async create(data: CreateListingDto) {
    const createData = {
      title: data.title,
      description: data.description || '',
      make: data.make,
      model: data.model,
      year: data.year,
      km: data.km,
      price: data.price,
      fuel: data.fuel || '',
      gearbox: data.gearbox || '',
      color: data.color || '',
      city: data.city || '',
      state: data.state || '',
      images: data.images,
      status: data.status,
      userId: data.userId,
    };

    const listing = await prisma.listing.create({
      data: createData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return listing;
  }

  async findMany(query: QueryListingDto) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      make,
      city,
      state,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { make: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (make) {
      where.make = { contains: make, mode: 'insensitive' };
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (state) {
      where.state = { contains: state, mode: 'insensitive' };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              phone: true,
              role: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      }),
      prisma.listing.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      listings,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOne(id: string) {
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return listing;
  }

  async update(id: string, data: Partial<CreateListingDto>) {
    const listing = await prisma.listing.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return listing;
  }

  async remove(id: string) {
    const listing = await prisma.listing.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return listing;
  }

  async exists(id: string): Promise<boolean> {
    const count = await prisma.listing.count({
      where: { id },
    });

    return count > 0;
  }
}
