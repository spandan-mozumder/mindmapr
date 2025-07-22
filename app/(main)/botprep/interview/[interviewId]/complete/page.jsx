'use client';

import { getInterviewFeedbackByInterviewId } from '@/actions/botprep';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function CompletePage({ params: asyncParams }) {
  const params = React.use(asyncParams);
  const [interviewFeedback, setInterviewFeedback] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getInterviewFeedbackByInterviewId(params.interviewId);
        setInterviewFeedback(data);
        console.log('Interview Feedback:', data);
      } catch (error) {
        console.error('Failed to load interview data:', error);
      }
    };

    if (params.interviewId) {
      fetchData();
      console.log(interviewFeedback);
    }
  }, [params?.interviewId]);

  const {
    technicalSkills,
    communication,
    problemSolving,
    experience,
    summary,
    recommendation,
    reason,
    userName,
    userEmail,
  } = interviewFeedback || {};

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-sans min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full rounded-xl shadow-lg p-8 md:p-12">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">Interview Complete for {userName}</h1>
            <h2 className="mt-2 text-md text-gray-400">
              <strong>Email Address:</strong> {userEmail || 'N/A'}
            </h2>
          </div>

          {interviewFeedback ? (
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white">
                  Thank You for Participating in the Interview Process
                </h2>
                <p className="text-gray-400 mt-1">
                  Here is the feedback summary of your interview.
                </p>
              </div>

              <div className="border-t border-b border-gray-700 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  <div className="p-4">
                    <p className="text-sm text-gray-400 uppercase tracking-wider">
                      Technical Skills
                    </p>
                    <p className="text-3xl font-semibold text-white mt-2">{technicalSkills}/10</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Communication</p>
                    <p className="text-3xl font-semibold text-white mt-2">{communication}/10</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-400 uppercase tracking-wider">
                      Problem Solving
                    </p>
                    <p className="text-3xl font-semibold text-white mt-2">{problemSolving}/10</p>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-400 uppercase tracking-wider">Experience</p>
                    <p className="text-3xl font-semibold text-white mt-2">{experience}/10</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white">Summary</h2>
                <p className="mt-3 text-gray-300 leading-relaxed">{summary}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white">Recommendation</h2>
                <div className="mt-3 bg-gray-800 rounded-lg p-5">
                  <p className="font-semibold text-lg text-white">{recommendation}</p>
                  <p className="mt-2 text-gray-300">{reason}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 border-t border-gray-700">
              <p className="text-gray-500">No feedback available for this interview.</p>
            </div>
          )}
        </div>
      </div>
      <Link href="/botprep">
        <Button>To Dashboard</Button>
      </Link>
    </div>
  );
}
