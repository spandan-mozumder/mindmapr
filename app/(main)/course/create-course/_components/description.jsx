"use-client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";
import { UserInputContext } from "@/app/(main)/_context/userinputcontext";

export default function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="mx-20 lg:mx-44">
      <div>
        <label>
          Write the topic for which you want to generatea course (e.g, - Video
          Editing, Python, Microsoft Excel)
        </label>
        <Input
          placeholder={"Topic"}
          defaultValue={userCourseInput?.topic}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
      </div>

      <div>
        <label>
          Tell us more about your course, what you want to include in the course
          (Optional, but preferred for curated outcome)
        </label>
        <Textarea
          placeholder="Describe your course, preferrably extensively"
          defaultValue={userCourseInput?.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}
