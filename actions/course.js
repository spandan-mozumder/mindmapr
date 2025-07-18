"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function saveCourseLayoutInDB(courseData, displayVideo) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const response = await db.courseList.create({
      data: {
        name: courseData.CourseName,
        category: courseData.Category,
        level: courseData.Level,
        courseOutput: courseData,
        includeVideo: displayVideo,
        userId: user.id,
      },
    });

    console.log("✅ Course saved successfully:", response);
    return response;
  } catch (error) {
    console.error("❌ Error saving course:", error);
    return null;
  }
}

export async function getCourseById(courseId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const course = await db.courseList.findFirst({
      where: {
        id: courseId,
        userId: user.id,
      },
    });

    if (!course) {
      console.warn("⚠️ Course not found or does not belong to user");
      return null;
    }
    return course;
  } catch (error) {
    console.error("❌ Error fetching course by ID:", error);
    return null;
  }
}

export async function updateCourseBasicInfo(courseId, { name, courseOutput }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // Get the current courseOutput
  const existingCourse = await db.courseList.findFirst({
    where: {
      id: courseId,
      userId: user.id,
    },
  });

  if (!existingCourse) throw new Error("Course not found");

  const updatedCourse = await db.courseList.update({
    where: {
      id: courseId,
      userId: user.id,
    },
    data: {
      name,
      courseOutput: {
        ...existingCourse.courseOutput,
        ...courseOutput,
      },
    },
  });

  return updatedCourse;
}

export async function updateChapterByIndex(
  courseId,
  chapterIndex,
  updatedData
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const course = await db.courseList.findFirst({
    where: { id: courseId, userId: user.id },
  });

  if (!course)
    throw new Error("Course not found or does not belong to the user");

  const courseOutput = course.courseOutput;

  if (!courseOutput?.Chapters || !Array.isArray(courseOutput.Chapters)) {
    throw new Error("Invalid courseOutput format");
  }

  const updatedChapters = [...courseOutput.Chapters];

  if (chapterIndex < 0 || chapterIndex >= updatedChapters.length) {
    throw new Error("Invalid chapter index");
  }

  updatedChapters[chapterIndex] = {
    ...updatedChapters[chapterIndex],
    ...updatedData,
  };

  const newCourseOutput = {
    ...courseOutput,
    Chapters: updatedChapters,
  };

  await db.courseList.update({
    where: { id: courseId },
    data: {
      courseOutput: newCourseOutput,
    },
  });

  return true;
}

export async function updatePublishedCourse(courseId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const updatedCourse = await db.courseList.update({
    where: {
      id: courseId,
      userId: user.id,
    },
    data: {
      isPublished: "Yes",
    },
  });

  if (!updatedCourse) {
    throw new Error("Failed to update course");
  }
  return updatedCourse;
}

export async function getCoursesByUserId() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const courses = await db.courseList.findMany({
      where: {
        userId: user.id,
      },
      include: {
        chapters: true, // include related chapters if needed
      },
      orderBy: {
        createdAt: "desc", // optional: newest first
      },
    });
    return courses;
    
  } catch (error) {
    console.error("Error fetching courses for user:", error);
    throw new Error("Unable to fetch courses");
  }
}

export async function deleteCourseById(courseId) {
  try {
    await db.chapter.deleteMany({
      where: {
        courseId: courseId,
      },
    });

    await db.courseList.delete({
      where: {
        id: courseId,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to delete course and chapters:", error);
    return { success: false, error: "Delete failed. Check server logs." };
  }
}