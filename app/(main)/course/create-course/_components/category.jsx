'use client';

import React, { useContext } from 'react';
import { Card } from '@/components/ui/card';
import { CodeXml, HeartPulse, PencilRuler } from 'lucide-react';
import { UserInputContext } from '@/app/(main)/_context/userinputcontext';

export default function CategoryList() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const categories = [
    { id: 1, name: 'Programming', icon: <CodeXml className="w-12 h-12" /> },
    { id: 2, name: 'Health', icon: <HeartPulse className="w-12 h-12" /> },
    { id: 3, name: 'Creative', icon: <PencilRuler className="w-12 h-12" /> },
  ];

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({ ...prev, category }));
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-lg font-semibold">Select the Course Category</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10">
        {categories.map((item) => (
          <Card
            key={item.id}
            onClick={() => handleCategoryChange(item.name)}
            className={`flex flex-col w-55 items-center p-6 cursor-pointer transition-all ${
              userCourseInput?.category === item.name && 'bg-primary text-secondary scale-105'
            }`}
          >
            {item.icon}
            <h2 className="mt-2 text-sm font-medium">{item.name}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
}
