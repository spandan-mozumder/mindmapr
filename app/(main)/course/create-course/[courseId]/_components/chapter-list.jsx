"use client"

import { CircleCheckBig, Clock } from 'lucide-react'
import React, { useState } from 'react'
import EditChapter from './edit-chapter';

export default function ChapterList({ course, setCourse }) {
    const [courseData, setCourseData] = useState(course);

    return (
        <div className='mt-3'>
            <h2>Chapters</h2>
            <div className='mt-2'>
                {courseData?.courseOutput?.Chapters?.map((chapter, index) => (
                    <div className='border p-5 rounded-lg mb-2 flex item-center justify-center'>
                        <div key={index} className="flex gap-5 items-center">
                            <h2 className="bg-secondary h-10 w-10 flex-nowrap text-white rounded-full text-center p-2">{index + 1}</h2>
                            <div>
                                <h2 className="font-medium text-lg">{chapter.ChapterName} <EditChapter
                                    courseId={course.id}
                                    chapter={chapter}
                                    index={index}
                                    setCourse={setCourseData}
                                /></h2>
                                <p className="text-sm text-gray-500"> {chapter.About}</p>
                                <p className="flex gap-2 items-center"><Clock />{chapter.Duration}</p>
                            </div>
                        </div>
                        <div>
                            <CircleCheckBig className='text-2xl text-gray-600 h-20 w-20 flex-none' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
