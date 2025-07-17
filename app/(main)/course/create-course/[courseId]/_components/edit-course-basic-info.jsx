"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Edit } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { updateCourseBasicInfo } from '@/actions/course'

export default function EditCourseBasicInfo({ course, setCourse }) {
    const [name, setName] = useState();
    const [description, setDescription] = useState()

    const onUpdateHandler = async() => {
        course.name = name
        course.courseOutput.Description = description

        try {
           const updatedCourse = await updateCourseBasicInfo(course.id, {
                name,
                description
           });
            
            if (updatedCourse) {
                setCourse(updatedCourse);
          }
            console.log("✅ Updated successfully");
        } catch (err) {
            console.error("❌ Update failed:", err);
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger><Edit /></DialogTrigger>
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
                                <Textarea className="h-40" defaultValue={course?.courseOutput?.Description} onChange={(e) => setDescription(e?.target.value)} />
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
    )
}
