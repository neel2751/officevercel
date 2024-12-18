"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import DialogTask from "../dialogTask";
import { useState } from "react";
import TaskCard from "./task-card";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function KanbanHeader({ board, Icon, color, taskCount, tasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: board,
  });

  const style = isOver ? `bg-neutral-300 rounded-md` : "";

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="px-2 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Icon className={`h-4 w-4 text-${color}-600`} />
          <h2 className={`text-neutral-700 text-sm font-medium`}>{board}</h2>
          <p
            className={`text-xs text-black h-5 w-5 flex items-center justify-center border border-white rounded-full bg-white font-medium`}
          >
            {taskCount}
          </p>
        </div>
        <Button onClick={() => setIsOpen(true)} variant="ghost" size="icon">
          <PlusIcon className="size-4 text-neutral-500" />
        </Button>
        <DialogTask isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          className={`flex flex-1 flex-col gap-4 w-full ${style} min-h-[200px]`}
        >
          {tasks?.map((task) => {
            return <TaskCard key={task?.id} task={task} />;
          })}
        </div>
      </SortableContext>
    </div>
  );
}
