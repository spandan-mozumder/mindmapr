import React from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InterviewCard({ interview }) {
  return (
    <div className="p-5 bg-secondary rounded-md">
      <h2 className="text-sm">{moment(interview?.created_at).format('DD MMM yyy')}</h2>
      <h2 className="mt-3 font-bold text-lg">{interview?.jobPosition}</h2>
      <h2 className="mt-2 text-sm">{interview?.duration}</h2>

      <Link href={`/botprep/interview/${interview?.id}/complete`}>
        <Button className={'mt-3 cursor-pointer w-full'}>See Feedback</Button>
      </Link>
    </div>
  );
}
