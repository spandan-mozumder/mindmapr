import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default async function BotprepPage() {
  return (
    <div className="m-5 space-y-4">
      <div className="flex gap-10">
        <Link href="/botprep/create-interview">
          <Button variant="secondary">
            <Plus className="h-4 w-4 mr-2" />
            Create New Interview
          </Button>
        </Link>

        <Link href="/course/unpublished">
          <Button variant="secondary">
            <Plus className="h-4 w-4 mr-2" />
            Create Phone Screening Call
          </Button>
        </Link>
      </div>

    </div>
  );
}
