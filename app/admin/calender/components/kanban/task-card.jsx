import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreVertical } from "lucide-react";
import React from "react";

const members = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Ryan", age: 35 },
  { id: 4, name: "Test", age: 28 },
];

const TaskCard = ({ task }) => {
  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: task?.id,
  // });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task?.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // const style = transform
  //   ? {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //     }
  //   : undefined;

  return (
    <Card ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <CardHeader className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex gap-2">
            {task?.tags?.slice(0, 2)?.map((item) => (
              <Badge
                key={item}
                className={
                  "uppercase text-xs bg-orange-100 text-amber-600 rounded-full shadow-none hover:bg-none"
                }
              >
                #{item}
              </Badge>
            ))}
          </div>
          <MoreVertical className="size-4 text-neutral-500" />
        </div>
        <div className="flex flex-col gap-2">
          <CardTitle className="truncate">{task?.title}</CardTitle>
          <CardDescription className=" line-clamp-1">
            {task?.description}
          </CardDescription>
        </div>
        <hr />
        {task?.members.length > 0}
        {
          <div className="flex -space-x-4">
            {task?.members?.map((item) => (
              <div key={item}>
                <Avatar>
                  <AvatarImage src={item?.image} />
                  <AvatarFallback className="border size-10">
                    {members[item]?.name.charAt(0)}
                    {/* <AvatarInitials initials={item?.name?.charAt(0)} /> */}
                  </AvatarFallback>
                </Avatar>
              </div>
            ))}
          </div>
        }
      </CardHeader>
    </Card>
  );
};

export default TaskCard;
