'use server';

import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function saveInterviewToDB(formData, questions) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error('User not found');

  try {
    const response = await db.interviewDetails.create({
      data: {
        userId: user.id,
        jobPosition: formData.jobPosition,
        jobDescription: formData.jobDescription,
        duration: formData.duration,
        type: formData.type,
        questionList: questions,
      },
    });

    return { response, success: true };
  } catch (error) {
    console.error('Error saving interview:', error);
    return { success: false, message: error.message };
  }
}

export async function getInterviewDetailsById(interviewId) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  try {
    const interview = await db.interviewDetails.findUnique({
      where: {
        id: interviewId,
        userId: user.id,
      },
    });

    if (!interview) {
      return { success: false, message: 'Interview not found' };
    }

    return interview;
  } catch (error) {
    console.error('Error fetching interview:', error);
    return { success: false, message: error.message };
  }
}
