"use client";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Views,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { format, parse, startOfWeek, getDay, addDays, isToday } from "date-fns";
import { enGB } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useCallback, useState } from "react";
import DialogTask from "../dialogTask";
import { taskData } from "../kanban/kanban";
import EventCard from "./event-card";
import CustomeShowMore from "./custome/customeShowMore";
import CustomeToolbar from "./custome/customeToolbar";
import CustomeHeader from "./custome/cutomeHeader";

// import { Calendar as FullCalendar } from '@fullcalendar/react'

const locales = {
  "en-GB": enGB,
};

const localizar = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DragAndDropCalender = withDragAndDrop(BigCalendar);

const eventTypeColors = {
  task: "bg-blue-500",
  meeting: "bg-green-500",
  todo: "bg-yellow-500",
};

export function CalenderPage() {
  //   const eventdata = taskData?.map((task) => ({
  //     start: new Date(task?.createdDate),
  //     end: new Date(task?.updatedDate),
  //     title: task?.title,
  //     description: task?.description,
  //     project: task?.projectId,
  //     assignee: task?.members,
  //     status: task?.status,
  //     id: task?.id,
  //   }));

  const [eventsData, setEvents] = useState(taskData);
  const [view, setView] = useState(Views.MONTH);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // All Function Start here

  // handleSelectSlot
  const handleSelectSlot = (slotInfo) => {
    console.log(slotInfo);
  };
  // handleSelectEvent
  const handleSelectEvent = (event) => {
    console.log(event);
  };
  // handleEventDrop
  const handleEventDrop = (event, dropEvent) => {
    console.log(event, dropEvent);
  };
  // handleEventResize
  const handleEventResize = (event, delta, newStart, newEnd) => {
    console.log(event, delta, newStart, newEnd);
  };
  // handleViewChange
  const handleViewChange = (view) => {
    setView(view);
  };
  //eventPropGetter
  const eventPropGetter = useCallback(
    (event) => ({
      className: event.type ? eventTypeColors[event.type] : "bg-gray-500",
    }),
    []
  );

  return (
    <>
      <DragAndDropCalender
        localizer={localizar}
        events={eventsData}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
        views={["day", "week", "month", "agenda"]}
        formats={{
          yearHeaderFormat: (date, culture, localizer) =>
            localizer.format(date, "YYYY", culture),
        }}
        components={{
          week: {
            // header: (header) => <CustomeHeader header={header} />,
            // event: ({ event }) => <EventCard events={event} />,
          },
          event: ({ event }) => <EventCard events={event} />,
          header: (header) => <CustomeHeader header={header} />,
          showMore: (showMore) => <CustomeShowMore showMore={showMore} />,
          toolbar: (toolbar) => <CustomeToolbar toolbar={toolbar} />,
          //   timeGutterHeader: (timeGutterHeader) => <div>test</div>,
          month: {
            header: ({ date, label }) => (
              <div className="h-10 flex items-center justify-center">
                <span
                  className={`text-sm font-semibold ${
                    format(new Date(), "ccc") === label
                      ? "text-indigo-700"
                      : "text-neutral-700"
                  } `}
                >
                  {label}
                </span>
              </div>
            ),
            dateHeader: ({ date, label }) => (
              <div>
                <span
                  className={`text-sm font-semibold text-neutral-700 ${
                    isToday(date)
                      ? "bg-indigo-600 px-1.5 py-1 text-white rounded-full"
                      : ""
                  }`}
                >
                  {/* {isToday(date) ? "Today" : label} */}
                  {label}
                  {/* {format(date, "PP")} */}
                </span>
              </div>
            ), // date header customization
            // event: ({ event }) => <EventCard events={event} />,
          },
        }}
        selectable
        resizable
        view={view}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        onView={handleViewChange}
        eventPropGetter={eventPropGetter}
      />
      <DialogTask isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </>
  );
}
