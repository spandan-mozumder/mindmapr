/*
  Warnings:

  - Added the required column `userEmail` to the `InterviewFeedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `InterviewFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewFeedback" ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
