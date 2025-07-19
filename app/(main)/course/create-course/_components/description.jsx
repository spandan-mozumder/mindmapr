'use client';

import React, { useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserInputContext } from '@/app/(main)/_context/userinputcontext';

export default function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleChange = (field, value) => {
    setUserCourseInput((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col gap-6 w-full md:px-20 lg:px-40">
      <div className="flex flex-col gap-3 md:w-[30rem]">
        <label className="text-sm font-medium">What topic should the course cover?</label>
        <Input
          placeholder="e.g., Video Editing, Python, Excel"
          defaultValue={userCourseInput?.topic}
          onChange={(e) => handleChange('topic', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 md:w-[30rem]">
        <label className="text-sm font-medium">
          Describe what you'd like to include in the course
        </label>
        <Textarea
          placeholder="Optional, but helps us curate better content"
          defaultValue={userCourseInput?.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>
    </div>
  );
}
