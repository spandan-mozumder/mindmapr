import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, Clock, Copy, List, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

export default function InterviewLink({ interviewId, formData }) {
  const GetInterviewUrl = () => {
    const url = process.env.NEXT_PUBLIC_HOST_NAME + '/botprep/interview/' + interviewId;
    return url;
  };

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/botprep/interview/${interviewId}`,
      );
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="font-bold text-lg mt-3">Your AI Interview is Ready</h2>
      <p className="mt-2">User this link to access the interview process</p>

      <div className="w-full p-7 mt-6 bg-secondary rounded-md flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Interview Link</h2>
          <h2 className="p-1 px-2">Valid for 30 Days</h2>
        </div>

        <div className="mt-3 flex gap-2">
          <Input defaultValue={GetInterviewUrl()} disabled={true} />
          <Button onClick={() => onCopyLink()}>
            <Copy /> Copy Link
          </Button>
        </div>

        <hr className="my-7" />

        <div className="flex gap-5">
          <h2 className="text-sm text-gray-500 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {formData?.duration}
          </h2>
          <h2 className="text-sm text-gray-500 flex items-center gap-2">
            <List className="h-4 w-4" />
            {formData?.duration}
          </h2>
          <h2 className="text-sm text-gray-500 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formData?.duration}
          </h2>
        </div>
      </div>

      <div className="flex w-full gap-5 justify-between mt-6">
        <Link href="/botprep">
          <Button variant="outline">
            <ArrowLeft /> Back to Dashboard
          </Button>
        </Link>
        <Link href="/create-interview">
          <Button>
            <Plus />
            Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}
