"use client";

import { getCourseById, updatePublishedCourse } from "@/actions/course";
import { useRouter } from "next/navigation";
import React, { use, useState, useEffect } from "react";
import CourseBasicInfo from "../_components/course-basic-info";
import { ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

export default function FinishPage({ params }) {
  const unwrappedParams = use(params);
  const [course, setCourse] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const updatedCourse = await updatePublishedCourse(unwrappedParams.courseId);

      const courseData = await getCourseById(unwrappedParams.courseId);
      setCourse(courseData);
    };
    fetchData();
  }, [unwrappedParams.courseId]);

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
            ? `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course.id}`
            : "Loading link..."}
        </span>
        <Button variant="secondary">
          <ClipboardCopy
            className="h-5 w-5 cursor-pointer"
            onClick={async () =>
              await navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course.id}`
              )
            }
          />{" "}
          Copy Link
        </Button>
      </h2>
    </div>
  );
}
