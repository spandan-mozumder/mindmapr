import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import CourseList from "./_components/course-list";

export default async function CoursePage() {
  return (
    <>
      <div className="m-5">
        <Link href="/course/create-course">
          <Button variant="secondary">
            <Plus /> Create your own curated course with AI
          </Button>
        </Link>

        <CourseList />
      </div>
      CoursePage
    </>
  );
}
