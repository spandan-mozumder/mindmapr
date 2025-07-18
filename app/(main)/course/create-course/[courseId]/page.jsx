"use client";

import React, { useEffect, useState, use } from "react";

import { getCourseById } from "@/actions/course";
import CourseBasicInfo from "./_components/course-basic-info";
import CourseDetail from "./_components/course-detail";
import ChapterList from "./_components/chapter-list";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent } from "@/configs/AIModel";
import LoadingDialog from "../_components/loading";
import { getVideos } from "@/configs/Service";
import { saveChapterToDB } from "@/actions/chapters";
import { useRouter } from "next/navigation";

export default function CourseLayout({ params }) {
  const unwrappedParams = use(params);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await getCourseById(unwrappedParams.courseId);
      setCourse(courseData);
    };
    fetchData();
  }, [unwrappedParams.courseId]);

  const generateChapterContent = async () => {
    const chapters = course?.courseOutput?.Chapters;

    let counter=1;

    for (const chapter of chapters) {
      const PROMPT =
        "Explain the concept in Detail on Topic: " +
        course?.name +
        " Chapter: " +
        chapter?.ChapterName +
        ", in JSON Format with list of array with field as title, explanation on give chapter in detail, Code filed in <precode> Code format) if applicable";

      console.log(PROMPT);

      try {
        setLoading(true);

        const rawResponse = await GenerateChapterContent(PROMPT);

        const jsonString = rawResponse.replace(/```json\n|```/g, "");
        const contentJson = JSON.parse(jsonString);

        const videoResults = await getVideos(
          course?.name + ":" + chapter?.ChapterName
        );
        const videoId = videoResults?.[0]?.id?.videoId || null;

        const result = await saveChapterToDB({
          courseId: course.id,
          chapterId: counter,
          content: contentJson,
          videoId: videoId,
        });

        counter++;

        if (!result.success) {
          console.error("Server action failed:", result.error);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error generating chapter content:", error);
        setLoading(false);
      }
    }
    // router.replace(`/course/create-course/${unwrappedParams.courseId}/finish`);
    router.replace("/course");
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

      <LoadingDialog loading={loading} />
    </div>
  );
}
