import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { ListingRepository } from './repositories/listing.repository';

@Module({
  controllers: [ListingController],
  providers: [ListingService, ListingRepository],
  exports: [ListingRepository],
})
export class ListingModule {}
