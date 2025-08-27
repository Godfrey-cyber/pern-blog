/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_adminID_fkey";

-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "adminID" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "public"."Category"("slug");

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
