import { Listing } from '@carhub/db';

export class ListingEntity implements Listing {
  id: string;
  title: string;
  description: string;
  make: string;
  model: string;
  year: string;
  km: number;
  price: number;
  fuel: string;
  gearbox: string;
  color: string;
  city: string;
  state: string;
  images: string[];
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
