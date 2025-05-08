import { Status } from "@/components/tableStatus/status";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  ListTodoIcon,
  LogsIcon,
  MessageSquareMore,
  Paperclip,
  ProjectorIcon,
  Share2,
} from "lucide-react";

const eventTypeIcons = {
  task: LogsIcon,
  meeting: ProjectorIcon,
  todo: ListTodoIcon,
};

const CustomeShowMore = ({ showMore }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Badge
          variant="ghost"
          className="text-indigo-600 border-none cursor-pointer"
        >
          +{showMore?.count} more
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="z-80 space-y-4 min-h-min">
        {/* <ScrollArea className="h-72 space-y-4"> */}
        {showMore.remainingEvents.map((item) => {
          const Icon = item?.type ? eventTypeIcons[item.type] : LogsIcon;
          return (
            <MoreDetails key={item?.id} item={item}>
              <div className="flex gap-4">
                <Icon className="w-4 h-4 mt-1" />
                <div className="space-y-1">
                  {/* task to show more deatils on this title hover */}

                  <CardTitle className="text-sm">{item?.title}</CardTitle>
                  <p className="text-xs">
                    {item?.description}
                    {/* {item?.start} - {item?.end} */}
                  </p>
                  <div className="flex items-center pt-1">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      {new Date(item?.start).toDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </MoreDetails>
          );
        })}
        {/* </ScrollArea> */}
      </HoverCardContent>
    </HoverCard>
  );
};

export default CustomeShowMore;

export function MoreDetails({ item, children }) {
  const priorityColors = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  return (
    <HoverCard
      className={`w-full max-w-lg transition-all duration-300 ease-in-out `}
    >
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent side="left" className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className={"uppercase"}
            >{` ${item?.type}`}</Badge>
            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share task</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <CardTitle className="font-bold">{item?.title}</CardTitle>
          <CardDescription className="truncate">
            {item?.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className={`${
                priorityColors[item?.priority]
              } text-white uppercase`}
            >
              {item?.priority}
            </Badge>
            <Status title={item?.status} />
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>
              {format(item?.start, "PPP")} - {format(item?.end, "PPP")}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {item?.startTime} - {item?.endTime}
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Team Members</div>
            <div className="flex -space-x-2">
              {item?.members.map((member, i) => (
                <TooltipProvider key={i}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="border-2 border-background">
                        <AvatarFallback>{`M${member}`}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>Member {member}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="text-sm font-medium">Additional Information</div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>Workspace ID: {item?.workspaceId}</div>
              <div>Project ID: {item?.projectId}</div>
              <div>Leader ID: {item?.leaderId}</div>
              <div>Completed: {item?.isCompleted ? "Yes" : "No"}</div>
              <div>Created: {item?.createdDate}</div>
              <div>Updated: {item?.updatedDate}</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2 border border-neutral-300 rounded-lg p-1.5">
              <Paperclip className="h-4 w-4" />
              <span>{item?.attachments?.length}</span>
            </div>

            <div className="flex items-center space-x-2 border border-neutral-300 rounded-lg p-1.5">
              <MessageSquareMore className="h-4 w-4" />
              <span>{item?.comments?.length}</span>
            </div>
          </div>
        </CardContent>
      </HoverCardContent>
    </HoverCard>
  );
}
