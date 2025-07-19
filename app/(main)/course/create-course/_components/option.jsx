'use client';

import React, { useContext } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { UserInputContext } from '@/app/(main)/_context/userinputcontext';

export default function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleChange = (field, value) => {
    setUserCourseInput((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-[20rem] md:w-[30rem]">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Difficulty Level</label>
        <Select
          defaultValue={userCourseInput?.level}
          onValueChange={(value) => handleChange('level', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Course Duration</label>
        <Select
          defaultValue={userCourseInput?.duration}
          onValueChange={(value) => handleChange('duration', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1 Hours">1 Hour</SelectItem>
            <SelectItem value="2 Hours">2 Hours</SelectItem>
            <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Add Video?</label>
        <Select
          defaultValue={userCourseInput?.displayVideo}
          onValueChange={(value) => handleChange('displayVideo', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium">Number of Chapters</label>
        <Input
          type="number"
          defaultValue={userCourseInput?.noOfChapters}
          onChange={(e) => handleChange('noOfChapters', e.target.value)}
        />
      </div>
    </div>
  );
}
