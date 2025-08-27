/*
  Warnings:

  - Added the required column `adminID` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "adminID" INTEGER NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
