import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Disc3 } from "lucide-react"

export default function LoadingDialog({loading}) {
    return (
        <AlertDialog open={loading}>

            <AlertDialogContent>
                    <AlertDialogDescription className="flex flex-col justify-center items-center gap-5 w-auto py-10">
                        <Disc3 className="animate-spin w-15 h-15" />
                        <h1 className="text-xl">Please wait... AI is working on your course</h1>
                    </AlertDialogDescription>
            </AlertDialogContent>
        </AlertDialog>
    )
}
  