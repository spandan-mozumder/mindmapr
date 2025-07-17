/*
  Warnings:

  - The primary key for the `CourseList` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CourseList" DROP CONSTRAINT "CourseList_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CourseList_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CourseList_id_seq";
