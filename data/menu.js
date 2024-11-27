import {
  Briefcase,
  Building2,
  Captions,
  ClipboardIcon,
  Filter,
  LayoutDashboard,
  Network,
  NewspaperIcon,
  RadioIcon,
} from "lucide-react";

export const MENU = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    role: ["superAdmin"], // admin, manager, user
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "Dashboard",
    path: "/",
    role: ["admin", "user"], // admin, manager, user
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    name: "Office Management",
    path: "/admin/officeEmployee",
    role: ["superAdmin"], // admin, manager, user
    icon: <Briefcase className="w-5 h-5" />,
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
    name: "SiteAssign",
    path: "/admin/siteAssign",
    role: ["superAdmin"],
    icon: <Network className="w-5 h-5" />,
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
    icon: <RadioIcon className="w-5 h-5" />,
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
    name: "All Role",
    path: "/admin/roleType",
    role: ["superAdmin"],
    icon: <Captions className="h-5 w-5" />,
  },
  {
    name: "Company",
    path: "/admin/company",
    role: ["superAdmin"],
    icon: <Building2 className="h-5 w-5" />,
  },
];

export function getMenu(path) {
  return MENU.find((item) => item?.path === path);
}
