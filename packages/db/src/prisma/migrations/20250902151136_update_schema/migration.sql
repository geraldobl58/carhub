/*
  Warnings:

  - You are about to drop the column `fipeCode` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `lat` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `sellerUserId` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `tenantId` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CheckoutSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PriceHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tenant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTenant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebhookEvent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CheckoutSession" DROP CONSTRAINT "CheckoutSession_listingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CheckoutSession" DROP CONSTRAINT "CheckoutSession_planId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CheckoutSession" DROP CONSTRAINT "CheckoutSession_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CheckoutSession" DROP CONSTRAINT "CheckoutSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Invoice" DROP CONSTRAINT "Invoice_subscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Invoice" DROP CONSTRAINT "Invoice_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Invoice" DROP CONSTRAINT "Invoice_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Lead" DROP CONSTRAINT "Lead_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Lead" DROP CONSTRAINT "Lead_listingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Listing" DROP CONSTRAINT "Listing_sellerUserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Listing" DROP CONSTRAINT "Listing_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Media" DROP CONSTRAINT "Media_listingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PriceHistory" DROP CONSTRAINT "PriceHistory_listingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Subscription" DROP CONSTRAINT "Subscription_planId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Subscription" DROP CONSTRAINT "Subscription_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserTenant" DROP CONSTRAINT "UserTenant_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserTenant" DROP CONSTRAINT "UserTenant_userId_fkey";

-- DropIndex
DROP INDEX "public"."User_stripeCustomerId_key";

-- AlterTable
ALTER TABLE "public"."Listing" DROP COLUMN "fipeCode",
DROP COLUMN "lat",
DROP COLUMN "lng",
DROP COLUMN "sellerUserId",
DROP COLUMN "tenantId",
DROP COLUMN "version",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "fuel" DROP NOT NULL,
ALTER COLUMN "gearbox" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'draft';

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "stripeCustomerId",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."CheckoutSession";

-- DropTable
DROP TABLE "public"."Favorite";

-- DropTable
DROP TABLE "public"."Invoice";

-- DropTable
DROP TABLE "public"."Lead";

-- DropTable
DROP TABLE "public"."Media";

-- DropTable
DROP TABLE "public"."Message";

-- DropTable
DROP TABLE "public"."Payment";

-- DropTable
DROP TABLE "public"."Plan";

-- DropTable
DROP TABLE "public"."PriceHistory";

-- DropTable
DROP TABLE "public"."Subscription";

-- DropTable
DROP TABLE "public"."Tenant";

-- DropTable
DROP TABLE "public"."UserTenant";

-- DropTable
DROP TABLE "public"."WebhookEvent";

-- DropEnum
DROP TYPE "public"."CheckoutMode";

-- DropEnum
DROP TYPE "public"."PaymentProvider";

-- DropEnum
DROP TYPE "public"."PaymentStatus";

-- DropEnum
DROP TYPE "public"."SubscriptionStatus";

-- AddForeignKey
ALTER TABLE "public"."Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
