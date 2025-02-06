"use client";
import React from "react";
import { LeaveCategory } from "./leave-category";
import { LeaveRequestForm } from "../@employe/leaveRequest";
import CardName from "../../_components/name";
import { TabDemo } from "../../_components/tab-underline";
import {
  BadgeHelpIcon,
  GalleryVerticalEndIcon,
  HomeIcon,
  LayoutListIcon,
  ScrollTextIcon,
  SettingsIcon,
  SirenIcon,
  SquareChartGanttIcon,
  TentTreeIcon,
} from "lucide-react";
import { EmployeeLeaveOverview } from "../components/employe-leave";
import { EmployeeLeaveDetails } from "../components/employe-wise-leave";
import { LeaveCalculator } from "../components/leave-calculator";
import { ParentalLeaveCalculator } from "../components/parent-leave";
import { LeaveEntitlementCalculator } from "../components/leave-entitlement";
import EmployeeLeaveEntitlement from "../components/leaveEntitlements/leave-entitlement";

const page = () => {
  const tabData = [
    {
      label: "Dashboard",
      value: "leave-dashboard",
      content: <EmployeeLeaveOverview />,
      icon: HomeIcon,
    },
    {
      label: "Category",
      value: "leave-category",
      content: <LeaveCategory />,
      icon: LayoutListIcon,
    },
    {
      label: "Request",
      value: "leave-request",
      content: <LeaveRequestForm />,
      icon: TentTreeIcon,
    },
    {
      label: "Entitlements",
      value: "leave-balance",
      content: <EmployeeLeaveEntitlement />,
      // content: <LeaveCalculator />,
      icon: SirenIcon,
    },
    {
      label: "History",
      value: "leave-history",
      content: <EmployeeLeaveDetails />,
      icon: GalleryVerticalEndIcon,
    },
    {
      label: "Policy",
      value: "leave-policy",
      content: <div>Leave Policy</div>,
      icon: ScrollTextIcon,
    },
    {
      label: "Settings",
      value: "leave-settings",
      content: <ParentalLeaveCalculator />,
      icon: SettingsIcon,
    },
    {
      label: "Leave Report",
      value: "leave-report",
      content: <LeaveEntitlementCalculator />,
      icon: SquareChartGanttIcon,
    },
    {
      label: "Help",
      value: "help",
      content: <div>Help</div>,
      icon: BadgeHelpIcon,
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <CardName />
      </div>
      <div className="w-full overflow-hidden">
        <TabDemo tabData={tabData} />
      </div>
    </div>
  );
};

export default page;
