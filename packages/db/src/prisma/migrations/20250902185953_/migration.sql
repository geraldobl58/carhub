/*
  Warnings:

  - You are about to alter the column `price` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `Integer`.
  - Made the column `fuel` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gearbox` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Listing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Listing" ALTER COLUMN "fuel" SET NOT NULL,
ALTER COLUMN "gearbox" SET NOT NULL,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
