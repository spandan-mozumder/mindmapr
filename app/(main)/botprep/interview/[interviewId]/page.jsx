'use client';

import { getInterviewDetailsById } from '@/actions/botprep';
import { InterviewDataContext } from '@/app/(main)/_context/interviewdatacontext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Info, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { use, useState, useEffect, useContext } from 'react';

export default function Interview({ params }) {
  const unwrappedParams = use(params);
  const [interview, setInterview] = useState('');
  const [userName, setUserName] = useState('');
  const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const interviewData = await getInterviewDetailsById(unwrappedParams.interviewId);
        setInterview(interviewData);
      } catch (error) {
        console.error('Failed to load interview data');
      }
    };
    fetchData();
  }, [unwrappedParams.interviewId]);

    const onJoinInterview = () => {
      setInterviewInfo({
        userName: userName,
        interviewData: interview,
      })
    router.push('/botprep/interview/' + unwrappedParams.interviewId + '/start');
  }

  return (
    <div className="flex flex-col items-center justify-center bg-secondary rounded-md p-7 mt-10">
      <h2 className="mt-5 text-2xl">AI-Powered Interview Platform</h2>

      {interview ? (
        <div className="mt-10 space-y-1 text-center">
          <p className="text-md font-semibold">
            <strong>Job Position:</strong> {interview?.jobPosition}
          </p>
          <p className="text-gray-400 text-sm">
            <strong>Duration:</strong> {interview?.duration}
          </p>

          <div className="w-full flex flex-col gap-3 mt-10 text-left">
            <h2>Enter your Full Name:</h2>
            <Input placeholder="e.g. John Smith" onChange={(e) => setUserName(e.target.value)} />
          </div>

          <div className="p-3 bg-primary gap-4 rounded-md mt-10">
            <Info className="text-background absolute" />

            <div>
              <h2 className="font-bold text-xl text-background">Before you begin</h2>
              <ul className="">
                <li className="text-sm text-background">
                  Ensure you have a stable internet connection.
                </li>
                <li className="text-sm text-background">
                  Find a quiet place to take the interview.
                </li>
                <li className="text-sm text-background">
                  Be prepared to answer questions about your skills and experience.
                </li>
              </ul>
            </div>
          </div>
          <Button
            className="mt-5 w-full font-bold"
            disabled={!interview || !userName}
            onClick={() => onJoinInterview()}
          >
            <Video /> Join Interview
          </Button>
        </div>
      ) : (
        <Card className="text-gray-400 mt-4 px-10">Loading interview details...</Card>
      )}
    </div>
  );
}
