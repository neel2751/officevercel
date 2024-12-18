"use client";
import { GlobalForm } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import DialogTask from "./dialogTask";

const members = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Ryan", age: 35 },
];
const taskData = [
  {
    id: 1,
    title: "Task 1",
    description: "This is task 1",
    status: "pending",
    leaderId: 1,
    members: [1, 2, 3, 4],
    workspaceId: 1,
    projectId: 2,
    startTime: "2024-12-12",
    endTime: "2024-12-12",
    priority: "low",
    type: "task",
    color: "blue",
    icon: "icon1",
    isCompleted: false,
    isDeleted: false,
    tags: ["tag1", "tag2"],
    attachments: [],
    comments: [],
    createdDate: "2024-12-12",
    updatedDate: "2024-12-12",
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is task 2",
    status: "completed",
    leaderId: 2,
    members: [],
    workspaceId: "",
    projectId: "",
    startTime: "2024-12-12",
    endTime: "2024-12-12",
    priority: "high",
    type: "task",
    color: "green",
    icon: "icon2",
    isCompleted: false,
    isDeleted: false,
    tags: ["tag1", "tag2"],
    attachments: [],
    comments: [],
    createdDate: "2024-12-12",
    updatedDate: "2024-12-12",
  },
];

export default function AddTask() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus />
        Add
      </Button>
      <DialogTask isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
