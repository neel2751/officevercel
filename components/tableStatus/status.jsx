import React from "react";
import { Badge } from "../ui/badge";

const Status = ({ title }) => {
  let statusColor = "";
  const status = [
    "Completed",
    "In Progress",
    "Not Started",
    "On Hold",
    "Delayed",
    "Cancelled",
    "Scheduled",
    "In Review",
    "Approved",
    "Rejected",
    "Active",
    "Inactive",
    "No Status",
  ];
  const statusColorMap = [
    "bg-blue-100 text-blue-800 hover:bg-blue-200",
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    "bg-stone-100 text-stone-800 hover:bg-stone-200",
    "bg-orange-100 text-orange-800 hover:bg-orange-200",
    "bg-red-100 text-red-800 hover:bg-red-200",
    "bg-red-100 text-red-800 hover:bg-red-200",
    "bg-blue-100 text-blue-800 hover:bg-blue-200",
    "bg-blue-100 text-blue-800 hover:bg-blue-200",
    "bg-green-100 text-green-800 hover:bg-green-200",
    "bg-red-100 text-red-800 hover:bg-red-200",
    "bg-green-100 text-green-800 hover:bg-green-200",
    "bg-gray-100 text-gray-800 hover:bg-gray-200",
    "bg-gray-200 text-gray-800 hover:bg-gray-300",
  ];
  const statusIndex = status.indexOf(title);
  if (statusIndex >= 0) {
    statusColor = statusColorMap[statusIndex];
  }
  return (
    <div className="flex items-center">
      <Badge className={statusColor + " cursor-pointer shadow-none"}>
        {title || "Unassigned"}
      </Badge>
    </div>
  );
};

const TableStatus = ({ isActive, handleClick }) => {
  const isActiveClass = isActive
    ? "bg-teal-100 text-teal-800 hover:bg-teal-200 hover:shadow-none"
    : "bg-red-100  text-red-800 hover:bg-red-200 hover:shadow-none";
  return (
    <Badge
      className={isActiveClass + " cursor-pointer rounded-full"}
      onClick={handleClick}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
};

export { TableStatus, Status };
