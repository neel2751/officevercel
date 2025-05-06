"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  MoreHorizontal,
  PhoneIcon,
  MailIcon,
  MapPinnedIcon,
  EarthIcon,
  RadarIcon,
  Building2Icon,
  CalendarPlus2Icon,
  IdCardIcon,
  BriefcaseBusinessIcon,
} from "lucide-react";
import EmployeeOverview from "@/components/tabs/employee-overview";
import EmployeeCompensation from "@/components/tabs/employee-compensation";
import EmployeeEmergency from "@/components/tabs/employee-emergency";
import EmployeeTimeOff from "@/components/tabs/employee-time-off";
import EmployeePerformance from "@/components/tabs/employee-performance";
import EmployeeFiles from "@/components/tabs/employee-files";
import EmployeeOnboarding from "@/components/tabs/employee-onboarding";
import PasswordChange from "@/components/tabs/password-change";
import SessionManagement from "@/components/tabs/session-management";
import LeaveRequests from "@/components/tabs/leave-requests";
import WeeklyRota from "@/components/tabs/weekly-rota";
import { CardTitle } from "./ui/card";
// import HolidayPlanner from "@/components/tabs/holiday-planner"

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className="border-b w-full justify-start rounded-none gap-2 h-auto mb-6 bg-transparent pb-px overflow-x-auto flex whitespace-nowrap py-1"
          style={{ scrollbarWidth: "none" }}
        >
          <TabsTrigger
            value="overview"
            className={`rounded-none pb-2 px-4 -mb-px font-medium text-sm ${
              activeTab === "overview"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="timeoff"
            className={`rounded-none pb-2 px-4 -mb-px font-medium text-sm ${
              activeTab === "timeoff"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Time Off
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className={`rounded-none pb-2 px-4 -mb-px font-medium text-sm ${
              activeTab === "performance"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="files"
            className={`rounded-none pb-2 px-4 -mb-px font-medium text-sm ${
              activeTab === "files"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Files
          </TabsTrigger>
          <TabsTrigger
            value="onboarding"
            className={`rounded-none pb-2 px-4 -mb-px font-medium text-sm ${
              activeTab === "onboarding"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Onboarding
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className={`rounded-none pb-2 px-4 -mb-px font-medium text-sm ${
              activeTab === "password"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="sessions"
            className={`rounded-none pb-2 px-4 -mb-px font-medium text-sm ${
              activeTab === "sessions"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Sessions
          </TabsTrigger>
          <TabsTrigger
            value="leave"
            className={`rounded-none pb-2 px-4 -mb-px font-medium text-sm ${
              activeTab === "leave"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Leave Requests
          </TabsTrigger>
          <TabsTrigger
            value="rota"
            className={`rounded-none pb-2 px-4 -mb-px font-medium text-sm ${
              activeTab === "rota"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Weekly Rota
          </TabsTrigger>
          {/* <TabsTrigger
            value="holiday"
            className={`rounded-none pb-2 px-4 -mb-px font-medium text-sm ${
              activeTab === "holiday"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Holiday Planner
          </TabsTrigger> */}
        </TabsList>

        <div className="flex gap-6 max-w-7xl overflow-hidden">
          <div className="w-1/3">
            <EmployeeSidebar />
          </div>

          <div className="w-2/3 border p-4 border-dashed rounded-xl border-gray-300 max-h-max">
            <TabsContent value="overview">
              <EmployeeOverview />
            </TabsContent>
            <TabsContent value="emergency">
              <EmployeeEmergency />
            </TabsContent>
            <TabsContent value="timeoff">
              <EmployeeTimeOff />
            </TabsContent>
            <TabsContent value="performance">
              <EmployeePerformance />
            </TabsContent>
            <TabsContent value="files">
              <EmployeeFiles />
            </TabsContent>
            <TabsContent value="onboarding">
              <EmployeeOnboarding />
            </TabsContent>
            <TabsContent value="password">
              <PasswordChange />
            </TabsContent>
            <TabsContent value="sessions">
              <SessionManagement />
            </TabsContent>
            <TabsContent value="leave">
              <LeaveRequests />
            </TabsContent>
            <TabsContent value="rota">
              <WeeklyRota />
            </TabsContent>
            {/* <TabsContent value="holiday">
              <HolidayPlanner />
            </TabsContent> */}
          </div>
        </div>
      </Tabs>
    </div>
  );
}

function EmployeeSidebar() {
  return (
    <div className="space-y-6 divide-y divide-dashed divide-gray-300 border border-gray-300 p-4 rounded-xl border-dashed">
      <div className="space-y-4 ">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-orange-200">
            <img
              src="https://cdn.dribbble.com/userupload/13416371/file/original-2193add8a0870a83e5796045451d5245.png?resize=1600x1200&vertical=center"
              alt="Employee profile picture"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <CardTitle className="font-semibold text-indigo-600">
              Snehal Mhokar
            </CardTitle>
            {/* <h2 className="text-xl font-semibold text-indigo-600">
              Snehal Mhokar
            </h2> */}
            <p className="text-muted-foreground text-sm">#CDC246534</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-3">
        <h3 className="text-base font-medium text-pretty">About</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <PhoneIcon className="size-3.5 -mr-1 rotate-[10deg]" />
            <span className="text-sm">Phone:</span>
            <span className="text-primary">(629) 555-0123</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MailIcon className="size-3.5 -mr-1 " />
            <span className="text-sm">Email:</span>
            <span className="text-primary">nicholasswatz@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-3">
        <h3 className="text-base font-medium text-pretty">Address</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2Icon className="size-3.5 -mr-1" />
            <span className="text-sm">Address:</span>
            <span className="text-primary">390 Market Street, Suite 200</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPinnedIcon className="size-3.5 -mr-1" />
            <span className="text-sm">City state:</span>
            <span className="text-primary">London, UK</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <RadarIcon className="size-3.5 -mr-1" />
            <span className="text-sm">Postcode:</span>
            <span className="text-primary">IG2 7UW</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <EarthIcon className="size-3.5 -mr-1" />
            <span className="text-sm">Country:</span>
            <span className="text-primary">India</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-3">
        <h3 className="text-base font-medium text-pretty">Employee Details</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BriefcaseBusinessIcon className="size-3.5 -mr-1" />
            <span className="text-sm">Department:</span>
            <span className="text-primary">Marketing</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <IdCardIcon className="size-3.5 -mr-1" />
            <span className="text-sm">Role Type:</span>
            <span className="text-primary">Project Manager</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarPlus2Icon className="size-3.5 -mr-1" />
            <span className="text-sm">Join date:</span>
            <span className="text-primary text-pretty">Jan 05, 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}
