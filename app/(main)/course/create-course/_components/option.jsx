"use-client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useContext } from "react";
import { UserInputContext } from "@/app/(main)/_context/userinputcontext";

export default function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="px-10 md:px-110 lg:px-44">
      <div className="grid grid-cols-2 gap-15">
        <div className="w-50 flex flex-col gap-2">
          <label className="text-sm">Difficulty Level</label>
          <Select
            defaultValue={userCourseInput?.level}
            onValueChange={(value) => handleInputChange("level", value)}
          >
            <SelectTrigger className="w-50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-50 flex flex-col gap-2">
          <label className="text-sm">Course Duration</label>
          <Select
            defaultValue={userCourseInput?.duration}
            onValueChange={(value) => handleInputChange("duration", value)}
          >
            <SelectTrigger className="w-50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1 Hours">1 Hours</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">
                More than 3 Hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-50 flex flex-col gap-2">
          <label className="text-sm">Add Video</label>
          <Select
            defaultValue={userCourseInput?.displayVideo}
            onValueChange={(value) => handleInputChange("displayVideo", value)}
          >
            <SelectTrigger className="w-50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-50 flex flex-col gap-2">
          <label className="text-sm">Number of Chapters</label>
          <Input
            type="number"
            defaultValue={userCourseInput?.noOfChapters}
            onChange={(e) => handleInputChange("noOfChapters", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
