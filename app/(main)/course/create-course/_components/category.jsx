import { Card } from "@/components/ui/card";
import { CodeXml, HeartPulse, PencilRuler } from "lucide-react";
import React, { useContext } from "react";
import { UserInputContext } from "@/app/(main)/_context/userinputcontext";

export default function CategoryList() {
  const CategoryList = [
    {
      id: 1,
      name: "Programming",
      icon: <CodeXml className="w-15 h-15" />,
    },
    {
      id: 2,
      name: "Health",
      icon: <HeartPulse className="w-15 h-15" />,
    },
    {
      id: 3,
      name: "Creative",
      icon: <PencilRuler className="w-15 h-15" />,
    },
  ];

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div>
      <h2 className="m-5">Select the Course Category</h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-20">
        {CategoryList.map((item, index) => (
          <Card
            className={`flex flex-col w-50 justify-center items-center hover:scale-[102%] ${userCourseInput?.category == item.name && "scale-[102%] bg-primary text-secondary"}`}
            onClick={() => handleCategoryChange(item.name)}
            defaultValue={userCourseInput?.category}
          >
            {item.icon}
            <h2>{item.name}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
}
