"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { getCourseById, updateChapterByIndex } from "@/actions/course";

export default function EditChapter({ courseId, chapter, index, setCourse }) {
  const [chapterName, setChapterName] = useState(chapter.ChapterName);
  const [about, setAbout] = useState(chapter.About);
  const [duration, setDuration] = useState(chapter.Duration);

  const onUpdateChapter = async () => {
    try {
      await updateChapterByIndex(courseId, index, {
        ChapterName: chapterName,
        About: about,
        Duration: duration,
      });

      const updated = await getCourseById(courseId);
      if (updated) setCourse(updated);
    } catch (err) {
      console.error("Failed to update chapter:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" variant="outline" className="ml-2">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter {index + 1}</DialogTitle>
          <DialogDescription>
            Make changes to the chapter content.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <label className="text-sm">Chapter Name</label>
            <Input
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm">About</label>
            <Textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm">Duration</label>
            <Input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onUpdateChapter}>Update Chapter</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
