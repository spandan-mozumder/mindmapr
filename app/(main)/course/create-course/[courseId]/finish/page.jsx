'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClipboardCopy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getCourseById, updatePublishedCourse } from '@/actions/course';
import CourseBasicInfo from '../_components/course-basic-info';

export default function FinishPage({ params }) {
  const unwrappedParams = use(params);
  const [course, setCourse] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await updatePublishedCourse(unwrappedParams.courseId);
        const courseData = await getCourseById(unwrappedParams.courseId);
        setCourse(courseData);
      } catch (error) {
        console.error('Failed to load course data');
      }
    };
    fetchData();
  }, [unwrappedParams.courseId]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course.id}`,
      );
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="px-10 md:px-20 lg:px-40 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
        <strong>Congrats!</strong> Your Course is Ready
      </h2>
      <CourseBasicInfo course={course} />

      <h2 className="m-3">Course URL:</h2>
      <h2 className="text-center text-gray-400 border p-2 rounded-md flex gap-10 items-center justify-center break-words flex-wrap">
        <span className="hidden md:block">
          {course?.id
            ? `${process.env.NEXT_PUBLIC_HOST_NAME}/${course.id}/start`
            : 'Loading link...'}
        </span>
        <Button variant="secondary" onClick={handleCopyLink}>
          <ClipboardCopy className="h-5 w-5 cursor-pointer" />
          Copy Link
        </Button>
      </h2>
    </div>
  );
}
