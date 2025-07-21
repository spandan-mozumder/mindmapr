import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CircleAlert, Plus } from 'lucide-react';
import CourseList from './_components/course-list';

export default async function CoursePage() {
  return (
    <div className="m-5 space-y-4">
      <div className="flex gap-10">
        <Link href="/course/create-course">
          <Button variant="secondary">
            <Plus className="h-4 w-4 mr-2" />
            Create your own curated course with AI
          </Button>
        </Link>

        <Link href="/course/unpublished">
          <Button variant="secondary" className={'text-yellow-500'}>
            <CircleAlert className="h-4 w-4 mr-2" />
            See your unpublished courses
          </Button>
        </Link>
      </div>

      <CourseList />
    </div>
  );
}
