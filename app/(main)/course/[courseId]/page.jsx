"use client"

import { getCourseById } from '@/actions/course';
import React, { use, useEffect, useState } from 'react'
import CourseBasicInfo from '../create-course/[courseId]/_components/course-basic-info';
import CourseDetail from '../create-course/[courseId]/_components/course-detail';
import ChapterList from '../create-course/[courseId]/_components/chapter-list';

export default function ViewCourse({params}) {
      const unwrappedParams = use(params);
      const [course, setCourse] = useState(null);
      const [loading, setLoading] = React.useState(false);
    
      useEffect(() => {
        const fetchData = async () => {
          const courseData = await getCourseById(unwrappedParams.courseId);
          setCourse(courseData);
          console.log(courseData);
        };
        fetchData();
      }, [unwrappedParams.courseId]);

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-40">
        <CourseBasicInfo course={course} edit={false}/>
              <CourseDetail course={course} />
              <ChapterList course={course} edit={false}/>
    </div>
  )
}
