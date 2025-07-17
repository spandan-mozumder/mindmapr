import { Book, ChartBar, Clock, PlayCircle } from 'lucide-react'
import React from 'react'

export default function CourseDetail({ course }) {
    console.log(course)
    return (
        <div className="border p-6 rounded-xl shadow-sm mt-3">
            <div className='grid grid-cols-2 md:grid-cols-4'>
                <div className='flex gap-2'>
                    <ChartBar className='text-4' />
                    <div>
                        <h2 className="text-xs text-gray-500">Skill Level</h2>
                        <h2 className='font-medium text-lg'>{course?.level}</h2>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <Clock className='text-4' />
                    <div>
                        <h2 className="text-xs text-gray-500">Duration</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.Duration}</h2>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <Book className='text-4' />
                    <div>
                        <h2 className="text-xs text-gray-500">No Of Chapters</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.NoOfChapters}</h2>
                    </div>
                </div>

                <div className='flex gap-2'>
                    <PlayCircle className='text-4' />
                    <div>
                        <h2 className="text-xs text-gray-500">Video Included</h2>
                        <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
