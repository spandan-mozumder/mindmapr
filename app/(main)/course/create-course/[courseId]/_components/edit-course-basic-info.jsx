'use client';

import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { updateCourseBasicInfo } from '@/actions/course';

export default function EditCourseBasicInfo({ course, setCourse }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const onUpdateHandler = async () => {
    course.name = name;
    course.courseOutput.Description = description;

    try {
      const updatedCourse = await updateCourseBasicInfo(course.id, {
        name,
        description,
      });

      if (updatedCourse) {
        setCourse(updatedCourse);
      }
      toast.success('Updated successfully');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button size="sm" variant="outline" className="ml-2">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Title and Description</DialogTitle>
            <DialogDescription>
              <div className="mt-3">
                <label>Course Title</label>
                <Input defaultValue={course?.name} onChange={(e) => setName(e?.target.value)} />
              </div>

              <div>
                <label>Description</label>
                <Textarea
                  className="h-40"
                  defaultValue={course?.courseOutput?.Description}
                  onChange={(e) => setDescription(e?.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button onClick={onUpdateHandler}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
