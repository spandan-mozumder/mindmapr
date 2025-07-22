/*
  Warnings:

  - A unique constraint covering the columns `[interviewId]` on the table `InterviewFeedback` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InterviewFeedback_interviewId_key" ON "InterviewFeedback"("interviewId");
