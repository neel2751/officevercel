import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddTask from "./add-task";
import Kanban from "./kanban/kanban";
import { CalenderPage } from "./calenderCom/calender";

export function CalendarHeader({ view, onViewChange }) {
  return (
    <Tabs defaultValue="calender" className="w-full border rounded-lg">
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="tasks">
              Task
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calender">
              Calender
            </TabsTrigger>
          </TabsList>
          <AddTask />
        </div>
        <TabsContent value="tasks">
          <div className="p-4">Task content</div>
        </TabsContent>
        <TabsContent value="kanban">
          <Kanban />
        </TabsContent>
        <TabsContent value="calender">
          <div className="min-h-screen mt-10">
            <CalenderPage />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
