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

export async function storeInterviewFeedback(feedback) {
  console.log('Attempting to store feedback:', feedback);

  const {
    interviewId,
    rating: { technicalSkills, communication, problemSolving, experience },
    summary,
    recommendation,
    reason,
    userName,
    userEmail,
  } = feedback;

  if (!interviewId) {
    throw new Error('interviewId is missing. Cannot create feedback without it.');
  }

  try {
    const response = await db.interviewFeedback.upsert({
      where: { interviewId },
      update: {
        technicalSkills,
        communication,
        problemSolving,
        experience,
        summary,
        recommendation,
        reason,
        userName,
        userEmail,
      },
      create: {
        interview: {
          connect: { id: interviewId },
        },
        technicalSkills,
        communication,
        problemSolving,
        experience,
        summary,
        recommendation,
        reason,
        userName,
        userEmail,
      },
    });

    return response;
  } catch (error) {
    console.error('Detailed error saving interview feedback:', error);
    throw new Error(`Failed to store interview feedback: ${error.message}`);
  }
}

export async function getInterviewFeedbackByInterviewId(interviewId) {
  if (!interviewId) {
    throw new Error('Interview ID is required.');
  }

  try {
    const feedback = await db.interviewFeedback.findUnique({
      where: {
        interviewId,
      },
    });

    if (!feedback) {
      throw new Error('No feedback found for this interview.');
    }

    return feedback;
  } catch (error) {
    console.error('Error fetching interview feedback:', error);
    throw new Error('Failed to fetch interview feedback.');
  }
}

export async function getUserInterviews() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) throw new Error('User not found');

  try {
    const interviews = await db.interviewDetails.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    return interviews;
  } catch (error) {
    console.error('Error fetching user interviews:', error);
    throw new Error('Failed to fetch user interviews.');
  }
}
