/*
  Warnings:

  - You are about to drop the column `courseId` on the `CourseList` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `CourseList` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `CourseList` table. All the data in the column will be lost.
  - You are about to drop the column `userProfileImage` on the `CourseList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseList" DROP CONSTRAINT "CourseList_createdBy_fkey";

-- AlterTable
ALTER TABLE "CourseList" DROP COLUMN "courseId",
DROP COLUMN "createdBy",
DROP COLUMN "userName",
DROP COLUMN "userProfileImage",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "CourseList" ADD CONSTRAINT "CourseList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
