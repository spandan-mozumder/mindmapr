'use client';

import { getCoursesByUserIsPublished } from '@/actions/course';
import React, { useState, useEffect } from 'react';
import CourseCard from './course-card';

export default function CourseList() {
  const [courseList, setCourseList] = React.useState([]);

  async function fetchCourses() {
    const courses = await getCoursesByUserIsPublished();
    setCourseList(courses);
    console.log('Courses fetched:', courses);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="font-bold text-lg">My AI courses</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {courseList?.map((course, index) => (
          <CourseCard key={index} course={course} refereshData={() => fetchCourses()} />
        ))}
      </div>
    </div>
  );
}
