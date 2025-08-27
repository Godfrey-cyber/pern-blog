-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
