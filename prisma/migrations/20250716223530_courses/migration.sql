-- CreateTable
CREATE TABLE "CourseList" (
    "id" SERIAL NOT NULL,
    "courseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "courseOutput" JSONB NOT NULL,
    "createdBy" TEXT NOT NULL,
    "userName" TEXT,
    "userProfileImage" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CourseList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseList_userId_idx" ON "CourseList"("userId");

-- AddForeignKey
ALTER TABLE "CourseList" ADD CONSTRAINT "CourseList_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
