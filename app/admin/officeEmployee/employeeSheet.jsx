import { TableStatus } from "@/components/tableStatus/status";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import React from "react";

const EmployeeSheet = ({ item }) => {
  console.log(item);
  const employeData = [
    {
      label: "Employee ID",
      value: item._id.slice(-4).padStart(item._id.length, "*"),
    },
    {
      label: "Email",
      value: item.email,
    },
    {
      label: "Phone",
      value: item.phoneNumber,
    },
    {
      label: "Role Type",
      value: item.roleType,
    },
    {
      label: "Department",
      value: item?.department?.roleTitle,
    },
    {
      label: "Immigration Type",
      value: item.immigrationType,
    },
    {
      label: "Immigration Category",
      value: item.immigrationCategory || "-",
    },
    {
      label: "Join Date",
      value: format(item.joinDate || new Date(), "PPP"),
    },
    {
      label: "End Date",
      value: item.endDate ? format(item.endDate || new Date(), "PPP") : "N/A",
    },
    {
      label: "Visa Start  Date",
      value:
        item?.immigrationType === "British"
          ? "-"
          : item.visaStartDate
          ? format(item.visaStartDate || new Date(), "PPP")
          : "N/A",
    },
    {
      label: "Visa End Date",
      value:
        item?.immigrationType === "British"
          ? "-"
          : item.visaEndDate
          ? format(item.visaEndDate || new Date(), "PPP")
          : "N/A",
    },
    {
      label: "Employee Status",
      value: item.isActive,
      status: true,
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div>{item?.name}</div>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto h-auto">
        <SheetHeader>
          <div className="mb-6">
            <SheetTitle>Employee Details</SheetTitle>
            <SheetDescription>
              Detailed view of the employee's information.
            </SheetDescription>
          </div>
          <div className="overflow-y-auto h-auto">
            {/* <!-- Header --> */}
            <div className="flex items-center justify-center flex-col text-center">
              <Avatar className="border border-neutral-200 p-0.5 shadow">
                <AvatarImage src="/images/cdc.svg" />
                <AvatarFallback>CDC</AvatarFallback>
              </Avatar>
              <div className="mt-2">
                <h3 className="text-lg text-gray-800 font-semibold">
                  {item?.name ?? "CDC"}
                </h3>
                <p className="text-xs text-gray-500">
                  {item?.company?.name || "N/A"}
                </p>
              </div>
            </div>
            {/* <!-- End Header --> */}
            <ul className="mt-5">
              {employeData.map((emp) => (
                <li
                  key={emp.label}
                  className="flex items-center gap-x-4  border-t border-gray-200 p-4"
                >
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {emp.label}
                  </span>
                  <span className="text-sm text-gray-800 whitespace-nowrap">
                    {emp?.status ? (
                      <TableStatus isActive={emp.value} />
                    ) : (
                      emp.value
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeSheet;
