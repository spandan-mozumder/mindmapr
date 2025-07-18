"use client";

import React, { useEffect, useState, use } from "react";

import { getCourseById } from "@/actions/course";
import CourseBasicInfo from "./_components/course-basic-info";
import CourseDetail from "./_components/course-detail";
import ChapterList from "./_components/chapter-list";
import { Button } from "@/components/ui/button";

export default function CourseLayout({ params }) {
  const unwrappedParams = use(params); 
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await getCourseById(unwrappedParams.courseId);
      setCourse(courseData);
    };
    fetchData();
  }, [unwrappedParams.courseId]);

  const generateChapterContent = () => {
    const chapters = course?.courseOutput?.Chapters;

    chapters.forEach((chapters, index) => {
      const PROMPT =
        "Explain the concept in Detail on Topic: " +
        course?.name +
        " Chapter:" +
        chapters?.chapter +
        " in JSON Format with list of array with field as title, explanation on give chapter in detail, Code filed in <precode> Code format) if applicable";

      console.log(PROMPT);
    });
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-40">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      <CourseBasicInfo course={course} />
      <CourseDetail course={course} />
      <ChapterList course={course} />

      <Button className="mt-10" onClick={() => generateChapterContent()}>
        Generate Course Content
      </Button>
    </div>
  );
}
