'use client';

import React, { use, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getCourseById } from '@/actions/course';
import { getChapter } from '@/actions/chapters';
import ChapterListCard from './_components/chapter-list-card';
import ChapterContent from './_components/chapter-content';

export default function StartPage({ params }) {
  const unwrappedParams = use(params);
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCourseById(unwrappedParams.courseId);
        setCourse(courseData);
      } catch (error) {
        console.error('Failed to load course data');
      }
    };
    fetchData();
  }, [unwrappedParams.courseId]);

  const handleChapterSelect = async (index) => {
    try {
      const chapter = await getChapter({ courseId: course.id, chapterId: index + 1 });
      setChapterContent(chapter);
    } catch (error) {
      console.error('Failed to load chapter content');
    }
  };

  return (
    <div className="flex h-screen mt-10">
      <div className="w-40 md:w-72 bg-secondary overflow-y-auto rounded-md">
        <h2 className="text-xl font-bold mb-4 bg-primary text-secondary p-4 rounded-t-md">
          {course?.courseOutput?.CourseName}
        </h2>

        <div className="space-y-2 p-2">
          {course?.courseOutput?.Chapters.map((chapter, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedChapter?.ChapterName === chapter?.ChapterName
                  ? 'bg-background'
                  : 'hover:bg-background'
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                handleChapterSelect(index);
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto ">
        {selectedChapter ? (
          <ChapterContent chapter={selectedChapter} content={chapterContent} />
        ) : (
          <div className="text-gray-500 text-lg">Select a chapter to see the content →</div>
        )}
      </div>
    </div>
  );
}
