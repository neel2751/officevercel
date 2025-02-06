"use client";
import { GlobalForm } from "@/components/form/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSubmitMutation } from "@/hooks/use-mutate";
import { useFetchQuery, useFetchSelectQuery } from "@/hooks/use-query";
import {
  getEmployeeLeaveData,
  storeEmployeeLeave,
} from "@/server/leaveServer/leaveServer";
import { getSelectLeaveRequest } from "@/server/selectServer/selectServer";
import { differenceInDays, isBefore, isPast } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import LeaveRequestTable from "../components/leaveRequest/leaveRequestTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LeaveRequestForm() {
  const [showDialog, setShowDialog] = useState(false);

  const { mutate: submitLeaveRequest } = useSubmitMutation({
    mutationFn: async (data) => storeEmployeeLeave(data),
    invalidateKey: ["leave-requests"],
    onSuccessMessage: () => "Leave request submitted successfully",
    onClose: () => setShowDialog(false),
  });

  const { data: leaveTypes = [] } = useFetchSelectQuery({
    queryKey: ["leave-types"],
    fetchFn: getSelectLeaveRequest,
  });

  const { data } = useFetchQuery({
    queryKey: ["employee-leave-types"],
    fetchFn: getEmployeeLeaveData,
  });

  const { newData } = data || {};

  const handleSubmit = (data) => {
    // ✅ Task1 : Implement the logic to submit the leave request
    // ✅ Task2 : Check the validation like Start Date, End Date
    // ✅ Task3 : Check if End date is before Start date
    // ✅ Task4 : Check if the leave type is selected
    // ✅ Task5 : Count the number of days between the start and end dates
    // ✅ Task6 : Check if the employee has enough leave balance
    // ✅ Task7 : Submit the leave request
    const { leaveStartDate, leaveEndDate, leaveType } = data;
    const isBeforeEndDate = isBefore(
      new Date(leaveEndDate),
      new Date(leaveStartDate)
    );
    if (isBeforeEndDate) {
      toast.warning("End date should be after start date");
      return;
    }
    const totalCount = differenceInDays(leaveEndDate, leaveStartDate);
    const result = newData?.leaveData.find(
      (item) => item?.leaveType === leaveType
    );
    // if (isPast(new Date(result?.eligibleDate)))
    //   return toast.warning("You are not eligible for this leave type");
    if (result?.total < totalCount)
      return toast.warning(
        `${leaveType} is only available for ${result?.total} days`
      );
    if (totalCount > result?.remaining)
      return toast.warning(
        `You have only ${result?.remaining} days left for ${leaveType}`
      );
    submitLeaveRequest({ ...data, totalCount });
  };

  const fields = [
    {
      name: "leaveType",
      labelText: "Leave Type",
      type: "select",
      options: leaveTypes,
      size: true,
      validationOptions: {
        required: "Please select a leave type",
      },
    },
    {
      name: "leaveStartDate",
      labelText: "Start Date",
      type: "date",
      placeholder: "Select Start Date",
      validationOptions: {
        required: "Start Date is required",
        // don't select dates before today
        validate: (value) => {
          if (value) {
            return isBefore(value, new Date())
              ? "Start Date cannot be before today"
              : true;
          }
          return true;
        },
      },
      disabled: (date) => isBefore(date, new Date()),
    },
    {
      name: "leaveEndDate",
      labelText: "End Date",
      type: "date",
      placeholder: "Select End Date",
      validationOptions: {
        required: "End Date is required",
        // don't select dates before today
        validate: (value) => {
          if (value) {
            return isBefore(value, new Date())
              ? "End Date cannot be before today"
              : true;
          }
          return true;
        },
      },
      disabled: (date) => isBefore(date, new Date()),
    },
    // {
    //   name: "startDate",
    //   labelText: "Start Date",
    //   type: "date",
    //   placeholder: "Select Start Date",
    //   validationOptions: {
    //     required: "Start Date is required",
    //     // don't select dates before today
    //     validate: (value) => {
    //       if (value) {
    //         return isBefore(value, new Date())
    //           ? "Start Date cannot be before today"
    //           : true;
    //       }
    //       return true;
    //     },
    //   },
    //   disabled: (date) =>
    //     [0, 6].includes(getDay(date)) || isBefore(date, new Date()),
    // },
    // {
    //   name: "endDate",
    //   labelText: "End Date",
    //   type: "date",
    //   placeholder: "Select End Date",
    //   validationOptions: {
    //     required: "End Date is required",
    //     validate: (value) => {
    //       if (value) {
    //         return isBefore(value, new Date())
    //           ? "End Date cannot be before today"
    //           : true;
    //       }
    //       return true;
    //     },
    //   },
    //   disabled: (date) =>
    //     [0, 6].includes(getDay(date)) || isBefore(date, new Date()),
    // },
    {
      name: "leaveReason",
      labelText: "Reason (optional)",
      type: "textarea",
      placeholder: "Enter Reason",
      size: true,
    },
  ];

  return (
    <div className="">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>List of leave requests</CardDescription>
            </div>
            <Button onClick={() => setShowDialog(true)}>Leave Request</Button>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Leave Request</DialogTitle>
                  <DialogDescription>
                    Please fill in the form below to submit a leave request.
                  </DialogDescription>
                </DialogHeader>
                <GlobalForm fields={fields} onSubmit={handleSubmit} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <LeaveRequestTable />
        </CardContent>
      </Card>
    </div>
  );
}
