/*
  Warnings:

  - You are about to drop the column `lockedBy` on the `EventSeat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventSeat" DROP COLUMN "lockedBy",
ADD COLUMN     "lockedById" INTEGER;

-- AddForeignKey
ALTER TABLE "EventSeat" ADD CONSTRAINT "EventSeat_lockedById_fkey" FOREIGN KEY ("lockedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
