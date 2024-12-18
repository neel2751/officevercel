import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListTodoIcon, LogsIcon, ProjectorIcon } from "lucide-react";
import React from "react";
import { MoreDetails } from "./custome/customeShowMore";

const eventTypeColors = {
  task: "bg-pink-100 text-pink-800 hover:bg-pink-200 border-s-4 border-pink-600",
  meeting:
    "bg-orange-100 text-orange-800 hover:bg-orange-200 border-s-4 border-orange-600",
  todo: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 border-s-4 border-cyan-600",
};
const eventTypeIcons = {
  task: LogsIcon,
  meeting: ProjectorIcon,
  todo: ListTodoIcon,
};

const EventCard = ({ events }) => {
  // we have to show only the first 2 event and after to show how many more

  //   const showOnlyFirstTwoEvents = event?.(0, 2);
  //   const showMoreEvents = event.length - 2;
  //   const showMoreEventsText =
  //     showMoreEvents > 0 ? `+${showMoreEvents} more` : "";

  const className = events?.type ? eventTypeColors[events.type] : "bg-gray-500";
  const Icon = events?.type ? eventTypeIcons[events.type] : LogsIcon;

  return (
    <MoreDetails item={events}>
      <Badge className={`${className} w-full`}>
        <CardHeader className="p-2 flex flex-row gap-2 items-center">
          <Icon className="w-4 h-4" />
          <CardTitle>{events?.title}</CardTitle>
        </CardHeader>
      </Badge>
    </MoreDetails>
    // <Card className={className}>
    //   <CardHeader className="px-2 py-1.5">
    //     <div className="flex items-center gap-2">
    //       <Icon className="h-5 w-5" />
    //       <CardTitle className="truncate text-sm">{event?.title}</CardTitle>
    //     </div>
    //     <CardDescription className="text-white truncate">
    //       {event?.description}
    //     </CardDescription>
    //   </CardHeader>
    // </Card>
  );
};

export default EventCard;
