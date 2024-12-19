"use client";
import React, { act, useState } from "react";
import KanbanHeader from "./kanban-header";
import { CircleAlert, CircleCheck, CircleSlash, Timer } from "lucide-react";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import TaskCard from "./task-card";
import { arrayMove } from "@dnd-kit/sortable";
import { addDays, toDate } from "date-fns";

const status = [
  { id: 1, title: "Not Started", count: 2, icon: CircleSlash, color: "gray" },
  { id: 2, title: "In Progress", count: 3, icon: Timer, color: "blue" },
  { id: 3, title: "In Review", count: 1, icon: CircleAlert, color: "amber" },
  { id: 4, title: "Completed", count: 1, icon: CircleCheck, color: "green" },
];

export const taskData = [
  {
    id: 1,
    title: "Task 1 check for the size of the title",
    description:
      "This is task 1 chcek for the size of the little title and the size of the description with the new line chcek for the set of the test ",
    status: "In Progress",
    leaderId: 1,
    members: [1, 2, 3, 4],
    workspaceId: 1,
    projectId: 2,
    start: toDate(new Date()),
    end: toDate(addDays(new Date(), 2)),
    startTime: "2:00 PM",
    endTime: " 4:00 PM",
    priority: "low",
    type: "meeting",
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
    status: "In Review",
    leaderId: 2,
    members: [],
    workspaceId: "",
    projectId: "",
    start: toDate(new Date()),
    end: toDate(addDays(new Date(), 1)),
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
  {
    id: 3,
    title: "Task 3",
    description: "This is task 3",
    status: "Completed",
    leaderId: 2,
    members: [],
    workspaceId: "",
    projectId: "",
    start: new Date(),
    end: new Date(),
    startTime: "2024-12-12",
    endTime: "2024-12-12",
    priority: "high",
    type: "todo",
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
  {
    id: 4,
    title: "Task 4 check for the size of the title",
    description:
      "This is task 1 chcek for the size of the little title and the size of the description with the new line chcek for the set of the test ",
    status: "In Progress",
    leaderId: 1,
    members: [1, 2, 3, 4],
    workspaceId: 1,
    projectId: 2,
    start: toDate(new Date()),
    end: toDate(addDays(new Date(), 2)),
    startTime: "2024-12-12",
    endTime: "2024-12-12",
    priority: "low",
    type: "todo",
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
    id: 5,
    title: "Task 2",
    description: "This is task 2",
    status: "In Review",
    leaderId: 2,
    members: [],
    workspaceId: "",
    projectId: "",
    start: toDate(new Date()),
    end: toDate(addDays(new Date(), 1)),
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
  {
    id: 6,
    title: "Task 3",
    description: "This is task 3",
    status: "Completed",
    leaderId: 2,
    members: [],
    workspaceId: "",
    projectId: "",
    start: new Date(),
    end: new Date(),
    startTime: "2024-12-12",
    endTime: "2024-12-12",
    priority: "high",
    type: "todo",
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

const Kanban = ({ data }) => {
  const [tasks, setTasks] = useState(taskData);
  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = (e) => {
    const { active } = e;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active?.id;
    const overId = over?.id;
    if (activeId === overId) return;
    setTasks((items) => {
      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === overId);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks?.find((t) => t.id === active?.id);
    const overTask = tasks?.find((t) => t.id === over?.id);
    if (activeTask && overTask) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    } else {
      const overStatus = over?.id;
      if (activeTask && activeTask.status !== overStatus) {
        setTasks(
          tasks.map((task) =>
            task.id === activeTask.id ? { ...task, status: overStatus } : task
          )
        );
        // setTasks(() =>
        //   tasks.map(
        //     (task) =>
        //       task.id === activeTask.id ? { ...task, status: overStatus } : task
        //     // ? {
        //     //     ...task,
        //     //     status: target,
        //     //   }
        //     // : task
        //   )
        // );
      }
    }

    // const source = active.id;
    // const target = over.id;

    setActiveTask(null);

    // const sourceList = data[source];
    // const targetList = data[target];
    // const sourceItem = sourceList[source];
    // const targetItem = targetList[target];
    // const sourceIndex = sourceList.findIndex((item) => item.id === sourceItem.id);
    // const targetIndex = targetList.findIndex((item) => item.id === targetItem.id);
    // if (sourceList.length > 1 && targetList.length > 1) {
    //   sourceList.splice(sourceIndex, 1);
    //   targetList.splice(targetIndex, 0, sourceItem);
    //   }
  };

  return (
    <div className="flex overflow-x-auto mt-12">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={closestCorners}
      >
        {status?.map((board) => {
          return (
            <div
              key={board?.id}
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
            >
              <KanbanHeader
                board={board?.title}
                Icon={board?.icon}
                color={board?.color}
                taskCount={
                  tasks.filter((task) => task.status === board?.title).length
                }
                tasks={tasks.filter((task) => task.status === board?.title)}
              />
            </div>
          );
        })}
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Kanban;
