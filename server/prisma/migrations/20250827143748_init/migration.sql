/*
  Warnings:

  - You are about to drop the column `adminID` on the `Category` table. All the data in the column will be lost.
  - Made the column `image` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Blog" DROP CONSTRAINT "Blog_authorID_fkey";

-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_adminID_fkey";

-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "categoryID" INTEGER,
ALTER COLUMN "authorID" DROP NOT NULL,
ALTER COLUMN "authorID" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "adminID",
ADD COLUMN     "authorID" INTEGER,
ALTER COLUMN "image" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "public"."Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
