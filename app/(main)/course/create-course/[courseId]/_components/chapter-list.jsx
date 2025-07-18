"use client";

import { CircleCheck, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditChapter from "./edit-chapter";
import { Button } from "@/components/ui/button";

export default function ChapterList({ course, edit = false }) {
  const [courseData, setCourseData] = useState(course);

  useEffect(() => {
    setCourseData(course);
  }, [course]);

  const chapters = courseData?.courseOutput?.Chapters;

  if (!chapters || chapters.length === 0) {
    return (
      <div className="p-5 text-center text-muted">
        <p>No chapters found for this course.</p>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h2 className="p-5 text-xl">Chapters</h2>
      <div className="mt-2 flex flex-col gap-5">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="border p-7 rounded-lg mb-2 flex items-center justify-between gap-5"
          >
            <div className="flex gap-5 items-start">
              <div className="flex flex-col gap-3">
                <h2 className="font-medium text-lg flex items-center gap-2">
                  {chapter.ChapterName}
                  {edit && (
                    <EditChapter
                      courseId={course.id}
                      chapter={chapter}
                      index={index}
                      setCourse={setCourseData}
                    />
                  )}
                </h2>
                <p className="text-sm text-gray-500">{chapter.About}</p>
                <p className="flex gap-2 items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" /> {chapter.Duration}
                </p>
              </div>
            </div>
            <Button variant="outline">
              <CircleCheck className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
