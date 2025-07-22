'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2Icon,
  GraduationCap,
  PuzzleIcon,
  User2Icon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FormContainer({ onHandleInputChange, goToNext }) {
  const InterviewType = [
    {
      title: 'Technical',
      icon: Code2Icon,
    },
    {
      title: 'Behavioral',
      icon: User2Icon,
    },
    {
      title: 'Experience',
      icon: BriefcaseBusiness,
    },
    {
      title: 'Problem Solving',
      icon: PuzzleIcon,
    },
    {
      title: 'Leadership',
      icon: GraduationCap,
    },
  ];

  const [interviewType, setInterviewType] = React.useState([]);

  useEffect(() => {
    if (interviewType) {
      onHandleInputChange('type', interviewType);
    }
  }, [interviewType]);

  return (
    <div className="p-5 bg-secondary rounded-md shadow-sm shadow-primary/80">
      <div className="mb-5">
        <h2 className="text-sm font-semibold">Job Position</h2>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="mt-2"
          onChange={(event) => onHandleInputChange('jobPosition', event.target.value)}
        />
      </div>

      <div className="mb-5">
        <h2 className="text-sm font-semibold">Job Description</h2>
        <Textarea
          placeholder="e.g. Enter detailed job description"
          className="mt-2 h-[200px]"
          onChange={(event) => onHandleInputChange('jobDescription', event.target.value)}
        />
      </div>

      <div className="mb-5">
        <h2 className="text-sm font-semibold">Interview Duration</h2>
        <Select onValueChange={(value) => onHandleInputChange('duration', value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 minutes">5 minutes</SelectItem>
            <SelectItem value="10 minutes">15 minutes</SelectItem>
            <SelectItem value="30 minutes">30 minutes</SelectItem>
            <SelectItem value="45 minutes">45 minutes</SelectItem>
            <SelectItem value="60 minutes">60 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-5">
        <h2 className="text-sm font-semibold">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex justify-center items-center cursor-pointer gap-2 p-2 px-4 rounded-md border-2 border-background hover:bg-background transition-all ${interviewType.includes(type.title) ? 'bg-background' : ''}`}
              onClick={() => {
                setInterviewType((prev) =>
                  prev.includes(type.title)
                    ? prev.filter((t) => t !== type.title)
                    : [...prev, type.title],
                );
              }}
            >
              <type.icon className="w-5 h-5" />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>
      <Button className="mt-7 flex justify-end" onClick={() => goToNext()}>
        Generate Question <ArrowRight />
      </Button>
    </div>
  );
}
