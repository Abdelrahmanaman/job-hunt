"use client";
import { approveJobPost, deleteJobPost } from "@/app/admin/job-approval/[...slug]/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Check, Trash2 } from "lucide-react";

//* Server action to handle approval
interface ApprovalModalProps {
  title: string;
  description: string;
  slug: string;
  type: string;
  jobTitle: string;
}

export function ApprovalModal({
  title,
  description,
  slug,
  type,
  jobTitle,
}: ApprovalModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${type === "Delete" ? " bg-red-600 hover:bg-red-600/80" : "bg-green-800 hover:bg-green-900"} items-center gap-1.5 text-white hover:text-white`}
          variant="outline"
        >
          {type === "Delete" ? (
            <Trash2 className="size-6 text-white" />
          ) : (
            <Check className="size-6 text-white" />
          )}
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form action={type === "Delete" ? deleteJobPost : approveJobPost}>
          <div className="grid gap-4 py-4">
            <p className="">
              Are you sure you want to{" "}
              <span
                className={`font-bold underline underline-offset-2 ${type === "Delete" ? "text-destructive" : "text-green-800"}`}
              >
                {type}
              </span>{" "}
              <span className="font-bold">{jobTitle}</span>?
            </p>
            <Input name="slug" defaultValue={slug} className="hidden" />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className={`${type === "Delete" ? "flex items-center gap-1.5 bg-red-600 hover:bg-red-600/80" : "bg-green-800 hover:bg-green-900"}`}
            >
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
