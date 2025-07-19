'use server';

import { db } from '@/lib/prisma';

export async function saveChapterToDB({ courseId, chapterId, content, videoId }) {
  try {
    const chapter = await db.chapter.create({
      data: {
        courseId,
        chapterId,
        content,
        videoId,
      },
    });
    return { success: true, data: chapter };
  } catch (error) {
    console.error('Error saving chapter:', error);
    return { success: false, error };
  }
}

export async function getChapter({ courseId, chapterId }) {
  try {
    const chapter = await db.chapter.findFirst({
      where: {
        courseId,
        chapterId,
      },
    });

    if (!chapter) throw new Error('Chapter not found');

    return chapter;
  } catch (error) {
    console.error('Error fetching chapter:', error);
    throw new Error('Failed to fetch chapter');
  }
}
