import { User } from '@carhub/db';

import { ListingEntity } from 'src/listing/entities/listing.entity';

export class UserEntity implements User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string | null;
  role: string;
  listings: ListingEntity[];
  createdAt: Date;
  updatedAt: Date;
}
