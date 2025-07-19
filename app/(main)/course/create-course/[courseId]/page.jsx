'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import LoadingDialog from '../_components/loading';

import { getCourseById } from '@/actions/course';
import { saveChapterToDB } from '@/actions/chapters';
import { GenerateChapterContent } from '@/configs/AIModel';
import { getVideos } from '@/configs/Service';

import CourseBasicInfo from './_components/course-basic-info';
import CourseDetail from './_components/course-detail';
import ChapterList from './_components/chapter-list';

export default function CourseLayout({ params }) {
  const unwrappedParams = use(params);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await getCourseById(unwrappedParams.courseId);
      setCourse(data);
    };
    fetchCourse();
  }, [unwrappedParams.courseId]);

  const sanitizeGeminiResponse = (text) => {
    return text
      .replace(/^```json\s*/i, '') // Remove leading ```json
      .replace(/^json\s*/i, '') // Remove 'json' alone
      .replace(/```$/g, '') // Remove trailing ```
      .trim();
  };

  const generateChapterContent = async () => {
    if (!course || !Array.isArray(course.courseOutput?.Chapters)) return;

    setLoading(true);

    for (let i = 0; i < course.courseOutput.Chapters.length; i++) {
      const chapter = course.courseOutput.Chapters[i];
      const chapterId = i + 1;

      const prompt = `Explain the concept in detail on Topic: ${course.name}, Chapter: ${chapter.ChapterName}, in JSON Format with array of items having 'title', 'explanation', and 'code' (code should be wrapped in <precode> if applicable).`;

      try {
        const rawResponse = await GenerateChapterContent(prompt);
        const jsonString = sanitizeGeminiResponse(rawResponse);
        const contentJson = JSON.parse(jsonString);

        const videos = await getVideos(`${course.name}: ${chapter.ChapterName}`);
        const videoId = videos?.[0]?.id?.videoId || null;

        const result = await saveChapterToDB({
          courseId: course.id,
          chapterId,
          content: contentJson,
          videoId,
        });

        if (!result.success) {
          console.error('Failed to save chapter:', result.error);
        }
      } catch (err) {
        console.error(`Error processing Chapter ${chapterId}:`, err);
      }
    }

    setLoading(false);
    router.replace(`/course/create-course/${unwrappedParams.courseId}/finish`);
    // router.replace("/course");
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-40">
      <h2 className="text-2xl font-bold text-center">Course Layout</h2>

      <CourseBasicInfo course={course} />
      <CourseDetail course={course} />
      <ChapterList course={course} />

      <Button className="mt-10" onClick={generateChapterContent}>
        Generate Course Content
      </Button>

      <LoadingDialog loading={loading} />
    </div>
  );
}
