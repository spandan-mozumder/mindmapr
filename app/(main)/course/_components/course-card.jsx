import Image from 'next/image';
import React from 'react';
import coursebanner from '@/assets/coursebanner.png';
import { Card } from '@/components/ui/card';
import { Book, EllipsisVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DropdownDelete from './dropdown-delete';
import { deleteCourseById } from '@/actions/course';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CourseCard({ course, refereshData }) {
  const router = useRouter();
  const handleOnDelete = async () => {
    try {
      const result = await deleteCourseById(course?.id);

      if (result.success) {
        refereshData();
      }
    } catch (error) {
      console.error('Unexpected error while deleting:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <Card
      className={'p-2 shadow-sm shadow-secondary hover:shadow-lg transition-shadow duration-300'}
    >
      <Image
        src={coursebanner}
        alt="course banner"
        width={300}
        height={200}
        className="w-full h-[200px] object-cover rounded-lg"
      />

      <div className="p-2 flex flex-col gap-2">
        <h2 className="font-medium text-lg px-2 flex flex-row justify-between items-center">
          <Link href={`/course/${course?.id}`}>{course?.name}</Link>{' '}
          <DropdownDelete handleDelete={() => handleOnDelete()}>
            <Button variant="secondary">
              <EllipsisVertical />
            </Button>
          </DropdownDelete>
        </h2>
        <p className="text-sm text-gray-400 px-2">{course?.category}</p>
        <div className="flex flex-row items-center justify-between text-sm text-gray-500">
          <h2 className="flex flex-row justify-center items-center p-2 bg-secondary rounded-sm gap-2">
            <Book />
            {course?.courseOutput?.NoOfChapters} Chapters
          </h2>
          <h2 className="p-2 bg-secondary rounded-sm">Level: {course?.courseOutput?.Level}</h2>
        </div>
      </div>
    </Card>
  );
}
