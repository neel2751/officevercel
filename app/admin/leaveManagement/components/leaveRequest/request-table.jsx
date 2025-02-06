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
import {
  getLeaveRequestData,
  getLeaveRequestDataAdmin,
} from "@/server/leaveServer/getLeaveServer";
import { differenceInDays, format, isPast } from "date-fns";
import { ChevronDown, ChevronRight, EditIcon, Trash2Icon } from "lucide-react";
import LeaveRequestStatus from "./request-status";
import LeaveForm from "./leave-form";
import React from "react";
import Shimmer from "@/components/tableStatus/tableLoader";
import { formatDates } from "@/lib/formatDate";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";

export function LeaveRequestTable({
  showDialog,
  setShowDialog,
  initialValues,
  handleEdit,
  handleSubmit,
  fields,
}) {
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
            newData[0]?.employee?.name && "Name",
            // newData[0]?.employee?.name && "Role Type",
            "Leave Type",
            "Submit Date",
            "Notice",
            "Status",
            "Admin",
            "Approve Date",
            "Note",
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
            {/* <TableCell>{index + 1}</TableCell> */}
            <TableCell>{item?.employee?.name}</TableCell>
            {/* <TableCell>{item?.employee?.role}</TableCell> */}
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
                  leaveDate={item?.leaveStartDate}
                />
              ) : (
                <Status title={item?.leaveStatus} />
              )}
            </TableCell>
            <TableCell>{item?.approvedBy?.name || "-"}</TableCell>
            <TableCell>
              {item?.approvedDate
                ? format(item?.approvedDate || new Date(), "PPP")
                : "-"}
            </TableCell>
            <TableCell>{item?.adminComment || "-"}</TableCell>
            <TableCell>
              {format(item?.leaveStartDate || new Date(), "PPP")}
            </TableCell>
            <TableCell>
              {format(item?.leaveEndDate || new Date(), "PPP")}
            </TableCell>
            <TableCell>{item?.leaveDays} days</TableCell>
            <TableCell>
              {isPast(new Date(item?.leaveStartDate)) ||
                (item?.leaveStatus === "Pending" && (
                  <div className="flex gap-2 items-center">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      <EditIcon className="text-indigo-600" />
                    </Button>
                    <LeaveForm
                      fields={fields}
                      showDialog={showDialog}
                      setShowDialog={setShowDialog}
                      initialValues={initialValues}
                      handleSubmit={handleSubmit}
                    />
                    <Button size="icon" variant="outline">
                      <Trash2Icon className="text-rose-600" />
                    </Button>
                  </div>
                ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function LeaveRequestTableNew({
  showDialog,
  setShowDialog,
  initialValues,
  handleEdit,
  handleSubmit,
  fields,
}) {
  const queryKey = ["leave-superadmin"];
  const { data, isPending } = useFetchQuery({
    params: {
      leaveYear: new Date().getFullYear(),
    },
    queryKey,
    fetchFn: getLeaveRequestDataAdmin,
  });
  const { newData } = data || {};
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {[
              newData && newData[0]?.employee?.name && "Overlap",
              newData && newData[0]?.employee?.name && "Name",
              // newData[0]?.employee?.name && "Role Type",
              "Leave Type",
              "Submit Date",
              "Notice",
              "Status",
              "Admin",
              "Approve Date",
              "Note",
              "date requested",
              "LeaveDays",
              "Action",
            ].map((item, index) => (
              <TableHead className="text-xs uppercase" key={index}>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {isPending ? (
          <Shimmer length={7} />
        ) : (
          <TableBody>
            {newData &&
              newData.map((item, index) => (
                <DetailsRow
                  key={index}
                  item={item}
                  queryKey={queryKey}
                  fields={fields}
                  showDialog={showDialog}
                  setShowDialog={setShowDialog}
                  handleSubmit={handleSubmit}
                  handleEdit={handleEdit}
                  initialValues={initialValues}
                />
              ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
}

const DetailsRow = ({
  item,
  queryKey,
  fields,
  showDialog,
  setShowDialog,
  initialValues,
  handleSubmit,
  handleEdit,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <TableRow>
        {item?.employee?.name && (
          <>
            <TableCell>
              {item?.overlappingRequests.length > 0 ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {item?.overlappingRequests.length}
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              ) : (
                <Button variant="ghost" size="icon">
                  -
                </Button>
              )}
            </TableCell>
            <TableCell>{item?.employee?.name}</TableCell>
          </>
        )}
        {/* <TableCell>{item?.employee?.role}</TableCell> */}
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
              leaveDate={item?.leaveStartDate}
            />
          ) : (
            <Status title={item?.leaveStatus} />
          )}
        </TableCell>
        <TableCell>{item?.approvedBy?.name || "-"}</TableCell>
        <TableCell>
          {item?.approvedDate
            ? format(item?.approvedDate || new Date(), "PPP")
            : "-"}
        </TableCell>
        <TableCell>{item?.adminComment || "-"}</TableCell>
        <TableCell>
          {formatDates(item?.leaveStartDate, item?.leaveEndDate)}
        </TableCell>
        <TableCell>{item?.leaveDays} days</TableCell>
        <TableCell>
          {isPast(new Date(item?.leaveStartDate)) ||
            (item?.leaveStatus === "Pending" && (
              <div className="flex gap-2 items-center">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEdit(item)}
                >
                  <EditIcon className="text-indigo-600" />
                </Button>
                <LeaveForm
                  fields={fields}
                  showDialog={showDialog}
                  setShowDialog={setShowDialog}
                  initialValues={initialValues}
                  handleSubmit={handleSubmit}
                />
                <Button size="icon" variant="outline">
                  <Trash2Icon className="text-rose-600" />
                </Button>
              </div>
            ))}
        </TableCell>
      </TableRow>
      <TableRow className="border-none">
        <TableCell colSpan={12} className="py-0">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleContent className="py-2">
              <Card>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {[
                          "Name",
                          "Leave type",
                          "submit date",
                          "leave status",
                          "total days",
                          "dates",
                          "overlap days",
                        ].map((th, index) => (
                          <TableHead className="text-xs uppercase" key={index}>
                            {th}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {item?.overlappingRequests
                        ? item?.overlappingRequests.map((lh, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{lh?.employeeName}</TableCell>
                              <TableCell>{lh?.leaveType}</TableCell>
                              <TableCell>
                                {format(lh?.leaveSubmitDate, "PPP")}
                              </TableCell>
                              <TableCell>
                                {/* Task check with admin status */}
                                {lh?.leaveStatus === "Pending" &&
                                item?.employee?.name &&
                                isPast(lh?.leaveSubmitDate) ? (
                                  <LeaveRequestStatus
                                    leaveId={lh?._id}
                                    invalidateKey={queryKey}
                                    leaveDate={lh?.leaveStartDate}
                                  />
                                ) : isPast(lh?.leaveStartDate) ? (
                                  <Status title={"Rejected"} />
                                ) : (
                                  <Status title={lh?.leaveStatus} />
                                )}
                              </TableCell>

                              <TableCell>
                                {differenceInDays(
                                  lh?.leaveEndDate,
                                  lh?.leaveStartDate
                                )}{" "}
                                days
                              </TableCell>
                              <TableCell>
                                {formatDates(
                                  lh.leaveStartDate,
                                  lh.leaveEndDate
                                )}
                              </TableCell>
                              <TableCell>{lh?.overLappingDays} days</TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </TableCell>
      </TableRow>
    </>
  );
};
