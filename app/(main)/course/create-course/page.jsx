"use client";

import React, { useContext, useEffect } from "react";
import { ClipboardPen, Grid2x2Check, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/category";
import TopicDescription from "./_components/description";
import SelectOption from "./_components/option";
import { UserInputContext } from "../../_context/userinputcontext";
import GenerateCourseLayout from "@/configs/AIModel";
import LoadingDialog from "./_components/loading";
import { saveCourseLayoutInDB } from "@/actions/course";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <Grid2x2Check />,
    },
    {
      id: 2,
      name: "Topic and Description",
      icon: <Lightbulb />,
    },
    {
      id: 1,
      name: "Options",
      icon: <ClipboardPen />,
    },
  ];

  const checkStatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeIndex == 0 &&
      (userCourseInput?.category?.length == 0 ||
        userCourseInput?.category == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeIndex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.duration == undefined ||
        userCourseInput?.noOfChapters == undefined ||
        userCourseInput?.displayVideo == undefined)
    ) {
      return true;
    }
    return false;
  };

  const generateCourseLayout = async () => {
    const BASIC_PROMPT =
      "Generate a course tutorial on following detail with field as Course Name, Description, Along with Chapter Name, About, Duration";
    const USER_INPUT_PROMPT =
      "Category: " +
      userCourseInput?.category +
      ", Topic: " +
      userCourseInput?.topic +
      " Level: " +
      userCourseInput?.level +
      " Duration: " +
      userCourseInput?.duration +
      " NoOfChapters: " +
      userCourseInput?.noOfChapters +
      " in JSON format";

    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

    try {
      setLoading(true);
      const rawResponse = await GenerateCourseLayout(FINAL_PROMPT);
      const jsonString = rawResponse.replace(/```json\n|```/g, "");
      const courseData = JSON.parse(jsonString);
      setLoading(false);
      const response = await saveCourseLayoutInDB(
        courseData,
        userCourseInput.displayVideo,
      );
      router.push(`/course/create-course/${response.id}`);
    } catch (error) {
      console.error("Failed to generate course layout:", error);
      return null;
    }
  };

  return (
    <div className="w-full flex flex-col h-[35rem] items-center justify-between gap-10 p-10">
      <div className="flex justify-center items-center mt-10">
        {StepperOptions.map((item, index) => (
          <div key={index} className="flex flex-row items-center">
            <div className="flex flex-col items-center gap-1 w-[50px] md:w-[150px]">
              <div
                className={`p-3 rounded-full bg-secondary text-foreground ${activeIndex >= index && "bg-white text-secondary"}`}
              >
                {item.icon}
              </div>
              <h2 className="hidden md:block md:text-sm text-primary">
                {item.name}
              </h2>
            </div>
            {index != StepperOptions?.length - 1 && (
              <div
                className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-secondary ${activeIndex - 1 >= index && "bg-white"}`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="">
        {activeIndex == 0 ? <SelectCategory /> : null}
        {activeIndex == 1 ? <TopicDescription /> : null}
        {activeIndex == 2 ? <SelectOption /> : null}
      </div>

      <div className="w-full flex justify-between md:px-30 ">
        <Button
          variant="secondary"
          onClick={() => setActiveIndex(activeIndex - 1)}
          disabled={activeIndex == 0}
        >
          Previous
        </Button>
        {activeIndex < 2 && (
          <Button
            disabled={checkStatus()}
            variant="secondary"
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            Next
          </Button>
        )}
        {activeIndex == 2 && (
          <Button
            disabled={checkStatus()}
            variant="outline"
            onClick={() => generateCourseLayout()}
          >
            Generate Course Layout
          </Button>
        )}
      </div>

      <LoadingDialog loading={loading} />
    </div>
  );
}
