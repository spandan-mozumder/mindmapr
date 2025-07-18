"use client";

import { Button } from "@/components/ui/button";
import { Puzzle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import EditCourseBasicInfo from "./edit-course-basic-info";
import coursebanner from "@/assets/coursebanner.png";

export default function CourseBasicInfo({ course, edit = true }) {
  const [courseData, setCourseData] = useState(course);

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid gird-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-2xl">{course?.name}</h2>
          {edit && (
            <EditCourseBasicInfo
              course={courseData}
              setCourse={setCourseData}
            />
          )}
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.Description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <Puzzle /> {course?.category}
          </h2>
          <Button className="w-full mt-5">Start</Button>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={coursebanner}
            width={300}
            height={300}
            alt="coursebanner"
            className="w-full rounded-xl h-[250px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
