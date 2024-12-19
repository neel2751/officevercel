import { CalendarHeader } from "./components/calender-header";

export default function CalendarPage() {
  return (
    <div className="flex h-screen p-4">
      <div className="flex-1 flex flex-col">
        <CalendarHeader />
        <main className="flex-1 overflow-auto p-4">
          {/* <CalendarView /> */}
        </main>
      </div>
      {/* <CreateScheduleDialog  /> */}
    </div>
  );
}
