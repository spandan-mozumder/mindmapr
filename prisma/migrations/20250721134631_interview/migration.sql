-- CreateTable
CREATE TABLE "InterviewDetails" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobPosition" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "type" TEXT[],
    "questionList" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InterviewDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InterviewDetails_userId_idx" ON "InterviewDetails"("userId");

-- AddForeignKey
ALTER TABLE "InterviewDetails" ADD CONSTRAINT "InterviewDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
