'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/prisma';

export async function saveCourseLayoutInDB(courseData, displayVideo) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error('User not found');

  try {
    const course = await db.courseList.create({
      data: {
        name: courseData.CourseName,
        category: courseData.Category,
        level: courseData.Level,
        courseOutput: courseData,
        includeVideo: displayVideo,
        userId: user.id,
      },
    });
    return course;
  } catch (error) {
    console.error('Error saving course:', error);
    throw new Error('Failed to save course');
  }
}

export async function getCourseById(courseId) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error('User not found');

  try {
    const course = await db.courseList.findFirst({
      where: {
        id: courseId,
        userId: user.id,
      },
    });
    return course || null;
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw new Error('Failed to fetch course');
  }
}

export async function updateCourseBasicInfo(courseId, { name, courseOutput }) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error('User not found');

  const existing = await db.courseList.findFirst({
    where: {
      id: courseId,
      userId: user.id,
    },
  });
  if (!existing) throw new Error('Course not found');

  const updated = await db.courseList.update({
    where: {
      id: courseId,
      userId: user.id,
    },
    data: {
      name,
      courseOutput: {
        ...existing.courseOutput,
        ...courseOutput,
      },
    },
  });

  return updated;
}

export async function updateChapterByIndex(courseId, chapterIndex, updatedData) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error('User not found');

  const course = await db.courseList.findFirst({
    where: { id: courseId, userId: user.id },
  });
  if (!course) throw new Error('Course not found or access denied');

  const courseOutput = course.courseOutput;
  if (!Array.isArray(courseOutput?.Chapters)) {
    throw new Error('Invalid chapter structure');
  }

  if (chapterIndex < 0 || chapterIndex >= courseOutput.Chapters.length) {
    throw new Error('Invalid chapter index');
  }

  const updatedChapters = [...courseOutput.Chapters];
  updatedChapters[chapterIndex] = {
    ...updatedChapters[chapterIndex],
    ...updatedData,
  };

  await db.courseList.update({
    where: { id: courseId },
    data: {
      courseOutput: {
        ...courseOutput,
        Chapters: updatedChapters,
      },
    },
  });

  return true;
}

export async function updatePublishedCourse(courseId) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error('User not found');

  const updated = await db.courseList.update({
    where: {
      id: courseId,
      userId: user.id,
    },
    data: {
      isPublished: 'Yes',
    },
  });

  if (!updated) throw new Error('Failed to publish course');

  return updated;
}

export async function getCoursesByUserIsPublished() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error('User not found');

  try {
    const courses = await db.courseList.findMany({
      where: {
        userId: user.id,
        isPublished: 'Yes',
      },
      include: {
        chapters: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Unable to fetch courses');
  }
}

export async function getCoursesByUserIsNotPublished() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error('User not found');

  console.log('Fetching unpublished courses for user:', user.id);

  try {
    const courses = await db.courseList.findMany({
      where: {
        userId: user.id,
        isPublished: 'No',
      },
      include: {
        chapters: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log('Fetched courses unpublished:', courses);
    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('Unable to fetch courses');
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
    console.error('Failed to delete course and chapters:', error);
    return { success: false, error: 'Delete failed. Check server logs.' };
  }
}
