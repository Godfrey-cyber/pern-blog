-- /*
--   Warnings:

--   - You are about to drop the column `adminID` on the `Category` table. All the data in the column will be lost.
--   - Made the column `image` on table `Category` required. This step will fail if there are existing NULL values in that column.

-- */
-- -- DropForeignKey
-- ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_adminID_fkey";

-- -- -- AlterTable
-- -- ALTER TABLE "public"."Blog" ADD COLUMN "categoryID" INTEGER NOT NULL  
-- -- ALTER COLUMN "authorID";

-- -- AlterTable
-- ALTER TABLE "public"."Category"
--  DROP COLUMN "adminID",
--  ADD COLUMN  "authorID" INTEGER NOT NULL, 
--  ALTER COLUMN "image" SET NOT NULL;

-- -- AddForeignKey
-- ALTER TABLE "public"."Blog" ADD CONSTRAINT "Blog_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- AddForeignKey
-- ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;