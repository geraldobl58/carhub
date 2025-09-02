import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ListingModule } from './listing/listing.module';

@Module({
  imports: [UsersModule, ListingModule],
})
export class AppModule {}
