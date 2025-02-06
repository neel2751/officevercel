"use client";
import {
  BadgeHelp,
  GalleryVerticalEnd,
  HomeIcon,
  LayoutListIcon,
  ScrollText,
  Settings,
  SirenIcon,
  SquareChartGantt,
  TentTreeIcon,
  TimerIcon,
} from "lucide-react";
import SiteNavBar from "../components/header";
import Overview from "../components/overview/overview";
import { CommonContext } from "@/context/commonContext";
import LeaveCategory from "./leaveCategory/leave-category";
import Gretting from "@/components/gretting/gretting";
import { LeaveRequestForm } from "./leaveRequest/request";
import EmployeeLeaveEntitlement from "./leaveEntitlements/leaveEntitlement";
import LeaveHistory from "./leaveHistory/leaveHistory";
// import { LeavePolicy } from "./leavePolicy/page";
import { BankHoliday } from "./bankHoliday";
import RequestOff from "./reuqestOff/requestOff";

export default function Navbar({ slug, searchParams }) {
  const adminMenu = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      link: "overview",
    },
    {
      name: "Entitlements",
      link: "entitlement",
      //   content: <EmployeeLeaveEntitlement />,
      icon: SirenIcon,
    },
    // {
    //   name: "Request Off",
    //   link: "requestoff",
    //   //   content: <LeaveRequestForm />,
    //   icon: TimerIcon,
    // },
    {
      name: "Category",
      link: "category",
      icon: LayoutListIcon,
    },
    {
      name: "Request",
      link: "request",
      //   content: <LeaveRequestForm />,
      icon: TentTreeIcon,
    },

    // {
    //   name: "History",
    //   link: "history",
    //   //   content: <EmployeeLeaveDetails />,
    //   icon: GalleryVerticalEnd,
    // },
    {
      name: "Bank Holiday",
      link: "bankholiday",
      icon: ScrollText,
    },
    {
      name: "Report",
      link: "report",
      //   content: <LeaveEntitlementCalculator />,
      icon: SquareChartGantt,
    },
    {
      name: "Settings",
      link: "settings",
      //   content: <ParentalLeaveCalculator />,
      icon: Settings,
    },

    {
      name: "Help",
      link: "help",
      icon: BadgeHelp,
    },
  ];

  const slugComponentmap = {
    overview: Overview,
    category: LeaveCategory,
    request: LeaveRequestForm,
    entitlement: EmployeeLeaveEntitlement,
    requestoff: RequestOff,
    history: LeaveHistory,
    bankholiday: BankHoliday,
  };

  return (
    <CommonContext.Provider value={{ slug, searchParams }}>
      <SiteNavBar
        slug={slug}
        menu={adminMenu}
        basePath={"/admin/leaveManagement"}
        slugComponentMap={slugComponentmap}
      >
        <Gretting />
      </SiteNavBar>
    </CommonContext.Provider>
  );
}
