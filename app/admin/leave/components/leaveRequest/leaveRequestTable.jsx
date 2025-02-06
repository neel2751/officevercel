"use client";
import { Status } from "@/components/tableStatus/status";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchQuery } from "@/hooks/use-query";
import { getLeaveRequestData } from "@/server/leaveServer/getLeaveServer";
import { differenceInDays, format } from "date-fns";
import { EditIcon, Trash2Icon } from "lucide-react";
import LeaveRequestStatus from "./leaveRequestStatus";

export default function LeaveRequestTable() {
  const queryKey = ["employee-leave-request"];
  const { data } = useFetchQuery({
    queryKey,
    fetchFn: getLeaveRequestData,
  });
  const { newData = [] } = data || {};
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[
            "Id",
            newData[0]?.employee?.name && "Name",
            newData[0]?.employee?.name && "Role Type",
            "Leave Type",
            "Submit Date",
            "Notice",
            "Status",
            "From",
            "to",
            "LeaveDays",
            "Action",
          ].map((item, index) => (
            <TableHead className="text-xs uppercase" key={index}>
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {newData?.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item?.employee?.name}</TableCell>
            <TableCell>{item?.employee?.role}</TableCell>
            <TableCell>{item?.leaveType}</TableCell>
            <TableCell>
              {format(item?.leaveSubmitDate || new Date(), "PPP")}
            </TableCell>
            <TableCell>
              {differenceInDays(
                item?.leaveStartDate || new Date(),
                item?.leaveSubmitDate || new Date()
              ) + 1}{" "}
              days
            </TableCell>
            <TableCell>
              {item?.leaveStatus === "Pending" && item?.employee?.name ? (
                <LeaveRequestStatus
                  leaveId={item?._id}
                  invalidateKey={queryKey}
                />
              ) : (
                <Status title={item?.leaveStatus} />
              )}
            </TableCell>
            <TableCell>
              {format(item?.leaveStartDate || new Date(), "PPP")}
            </TableCell>
            <TableCell>
              {format(item?.leaveEndDate || new Date(), "PPP")}
            </TableCell>
            <TableCell>
              {differenceInDays(
                new Date(item?.leaveEndDate),
                new Date(item?.leaveStartDate)
              )}{" "}
              days
            </TableCell>
            <TableCell>
              {item?.leaveStatus === "Pending" && (
                <div className="flex gap-2 items-center">
                  <Button size="icon" variant="outline">
                    <EditIcon className="text-indigo-600" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Trash2Icon className="text-rose-600" />
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
