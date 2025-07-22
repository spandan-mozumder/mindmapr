"use client"

import { getUserInterviews } from '@/actions/botprep';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import InterviewCard from './_components/interview-card';

export default function BotprepPage() {
const [interviews, setInterviews] = React.useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getUserInterviews();
        setInterviews(data);
        console.log('Fetched interviews:', data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div className="m-5 space-y-4">
      <div className="flex gap-10">
        <Link href="/botprep/create-interview">
          <Button variant="secondary">
            <Plus className="h-4 w-4 mr-2" />
            Create New Interview
          </Button>
        </Link>
      </div>

{interviews && 
<div className='grid grid-cols-2 xl:grid-cols-4 gap-5'>
  {interviews.map((interview, index) => (
    <InterviewCard interview={interview} key={index}/>
  ))}
  
  </div>}
    </div>
  );
}
