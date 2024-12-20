import {
  AlertTriangle,
  Briefcase,
  Building2,
  CalendarDays,
  Captions,
  ClipboardIcon,
  Filter,
  LayoutDashboard,
  Network,
  NewspaperIcon,
  RadioIcon,
  Stamp,
} from "lucide-react";

export const MENU = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    role: ["superAdmin"], // admin, manager, user
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "Office Management",
    path: "/admin/officeEmployee",
    role: ["superAdmin", "admin"], // admin, manager, user
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    name: "Leave Management",
    path: "/admin/leave",
    role: ["superAdmin", "admin"], // admin, manager, user
    icon: <Stamp className="w-5 h-5" />,
  },
  {
    name: "Weekly Rota",
    path: "/admin/weeklyRota",
    role: ["superAdmin", "admin"], // admin, manager, user
    icon: <CalendarDays className="w-5 h-5" />,
  },
  {
    name: "Employees",
    path: "/admin/employee",
    role: ["superAdmin"],
    icon: <ClipboardIcon className="h-5 w-5" />,
  },
  {
    name: "Site Project",
    path: "/admin/siteProject",
    role: ["superAdmin"],
    icon: <NewspaperIcon className="h-5 w-5" />,
  },
  // {
  //   name: "Attendance",
  //   path: "/Admin/Attendance",
  //   role: ["superAdmin"],
  //   icon: <CalendarDaysIcon className="w-5 h-5" />,
  // },
  {
    name: "Filter Attendance",
    path: "/admin/filterAttendance",
    role: ["superAdmin"],
    icon: <Filter className="w-5 h-5" />,
  },
  {
    name: "Assign Site Manager ",
    path: "/admin/siteAssign",
    role: ["superAdmin"],
    icon: <RadioIcon className="w-5 h-5" />,
  },

  // {
  //   name: "RoleTypes",
  //   path: "/admin/roleType",
  //   role: ["superAdmin"],
  //   icon: <ChartPieIcon className="w-5 h-5" />,
  // },
  {
    name: "Assign Site",
    path: "/admin/assignSite",
    role: ["superAdmin"],
    submenu: [
      { name: "View Shifts", path: "/shiftview/viewshifts" },
      { name: "Add Employee to Shift", path: "/addEmpToShift" },
    ],
    icon: <Network className="w-5 h-5" />,
  },

  // {
  //   name: "Marketing",
  //   path: "/admin/marketing",
  //   role: ["superAdmin"],
  //   icon: <MegaphoneIcon className="w-5 h-5" />,
  // },
  // {
  //   name: "File Manager",
  //   path: "/admin/fileShare",
  //   role: ["superAdmin"],
  //   icon: <FolderOpen className="h-5 w-5" />,
  // },
  {
    name: "Department",
    path: "/admin/roleType",
    role: ["superAdmin"],
    icon: <Captions className="h-5 w-5" />,
  },
  {
    name: "Company",
    path: "/admin/company",
    role: ["superAdmin", "admin"],
    icon: <Building2 className="h-5 w-5" />,
  },
];

export const REPORT = [
  {
    name: "Report Issue",
    path: "/admin/reportIssue",
    icon: <AlertTriangle className="w-5 h-5" />,
    role: ["superAdmin"],
  },
];

export function getReportMenu(path) {
  return REPORT.find((item) => item?.path === path);
}

export function getMenu(path) {
  return MENU.find((item) => item?.path === path);
}
