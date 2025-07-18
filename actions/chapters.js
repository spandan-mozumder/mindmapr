"use server";

import { db } from "@/lib/prisma";

export async function saveChapterToDB({
  courseId,
  chapterId,
  content,
  videoId,
}) {
  try {
    const saved = await db.chapter.create({
      data: {
        courseId,
        chapterId,
        content,
        videoId,
      },
    });
    return { success: true, data: saved };
  } catch (error) {
    console.error("❌ Error saving chapter to DB:", error);
    return { success: false, error };
  }
}
