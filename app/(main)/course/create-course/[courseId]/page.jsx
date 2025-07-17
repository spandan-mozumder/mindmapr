import React from 'react'

import { getCourseById } from '@/actions/course';
import CourseBasicInfo from './_components/course-basic-info';
import CourseDetail from './_components/course-detail';
import ChapterList from './_components/chapter-list';

export default async function CourseLayout({ params }) {
    const {courseId} = await params;
    const course = await getCourseById(courseId);
  return (
      <div className="mt-10 px-7 md:px-20 lg:px-44">
          <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

          <CourseBasicInfo course={course} />
          <CourseDetail course={course} />
          <ChapterList course={course} />
    </div>
  )
}
