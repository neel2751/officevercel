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
import { useState, useEffect } from "react";
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

    console.log(data);
    return;

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
      <TimeTrackingDashboard />
    </div>
  );
}

import { Clock, Coffee, LogOut, UserPlus, Save, X, Edit2 } from "lucide-react";

import { Input } from "@/components/ui/input";

const TimeTrackingDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const [employees, setEmployees] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);

  const [newEmployeeName, setNewEmployeeName] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("timeTrackerData");

    if (savedData) {
      setEmployees(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("timeTrackerData", JSON.stringify(employees));
  }, [employees]);

  const formatTimeForInput = (timeString) => {
    if (!timeString) return "";

    try {
      const date = new Date(`2024/01/01 ${timeString}`);

      return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",

        minute: "2-digit",

        hour12: false,
      });
    } catch {
      return "";
    }
  };

  const formatTimeForDisplay = (timeString) => {
    if (!timeString) return "";

    try {
      const [hours, minutes] = timeString.split(":");

      const date = new Date();

      date.setHours(parseInt(hours), parseInt(minutes));

      return date.toLocaleTimeString("en-US", {
        hour: "numeric",

        minute: "2-digit",

        hour12: true,
      });
    } catch {
      return "";
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",

      minute: "2-digit",

      hour12: true,
    });
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return "00:00";

    const startTime = new Date(`2024/01/01 ${start}`);

    const endTime = new Date(`2024/01/01 ${end}`);

    const diff = (endTime.getTime() - startTime.getTime()) / (1000 * 60);

    const hours = Math.floor(diff / 60);

    const minutes = Math.floor(diff % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAddEmployee = () => {
    if (!newEmployeeName.trim()) {
      alert("Please enter an employee name");

      return;
    }

    const newEmployee = {
      id: Date.now().toString(),

      name: newEmployeeName.trim(),

      clockIn: null,

      clockOut: null,

      breakIn: null,

      breakOut: null,

      totalHours: "00:00",

      breakDuration: "00:00",

      date: currentTime.toISOString().split("T")[0],
    };

    setEmployees((prev) => [...prev, newEmployee]);

    setNewEmployeeName("");

    setShowAddForm(false);
  };

  const handleTimeAction = (id, action) => {
    const currentTimeStr = formatTime(currentTime);

    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id) {
          const newEmp = { ...emp };

          newEmp[action] = currentTimeStr;

          if (action === "breakOut" && emp.breakIn) {
            newEmp.breakDuration = calculateDuration(
              emp.breakIn,
              currentTimeStr
            );
          }

          if (action === "clockOut" && emp.clockIn) {
            let totalMinutes = 0;

            const workDuration = calculateDuration(emp.clockIn, currentTimeStr);

            const [workHours, workMinutes] = workDuration
              .split(":")
              .map(Number);

            totalMinutes = workHours * 60 + workMinutes;

            if (emp.breakIn && emp.breakOut) {
              const breakDuration = calculateDuration(
                emp.breakIn,
                emp.breakOut
              );

              const [breakHours, breakMinutes] = breakDuration
                .split(":")
                .map(Number);

              totalMinutes -= breakHours * 60 + breakMinutes;
            }

            const finalHours = Math.floor(totalMinutes / 60);

            const finalMinutes = totalMinutes % 60;

            newEmp.totalHours = `${finalHours
              .toString()
              .padStart(2, "0")}:${finalMinutes.toString().padStart(2, "0")}`;
          }

          return newEmp;
        }

        return emp;
      })
    );
  };

  const handleEdit = (employee) => {
    const editableEmployee = {
      ...employee,

      clockIn: formatTimeForInput(employee.clockIn),

      clockOut: formatTimeForInput(employee.clockOut),

      breakIn: formatTimeForInput(employee.breakIn),

      breakOut: formatTimeForInput(employee.breakOut),
    };

    setEditingId(employee.id);

    setEditForm(editableEmployee);
  };

  const handleSave = () => {
    if (!editForm) return;

    const updatedEmployee = {
      ...editForm,

      clockIn: formatTimeForDisplay(editForm.clockIn),

      clockOut: formatTimeForDisplay(editForm.clockOut),

      breakIn: formatTimeForDisplay(editForm.breakIn),

      breakOut: formatTimeForDisplay(editForm.breakOut),
    };

    updatedEmployee.breakDuration = calculateDuration(
      updatedEmployee.breakIn,
      updatedEmployee.breakOut
    );

    updatedEmployee.totalHours = calculateDuration(
      updatedEmployee.clockIn,
      updatedEmployee.clockOut
    );

    setEmployees((prev) =>
      prev.map((emp) => (emp.id === editingId ? updatedEmployee : emp))
    );

    setEditingId(null);

    setEditForm(null);
  };

  const handleCancel = () => {
    setEditingId(null);

    setEditForm(null);
  };

  const handleInputChange = (field, value) => {
    if (!editForm) return;

    setEditForm((prev) => {
      if (!prev) return null;

      return {
        ...prev,

        [field]: value,
      };
    });
  };

  const handleRemoveEmployee = (id) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Time Tracking</h1>

        <div className="flex items-center gap-4">
          <div className="text-lg font-medium text-gray-600">
            {currentTime.toLocaleTimeString()}
          </div>

          <Button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Employee</h2>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <Input
              type="text"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              placeholder="Enter employee name"
              className="mb-4"
              autoFocus
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>

              <Button onClick={handleAddEmployee}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Employee Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Clock In
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Clock Out
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Break In
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Break Out
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Break Duration
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Total Hours
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                Actions
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-gray-600"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                {editingId === employee.id ? (
                  <>
                    <td className="px-6 py-4">
                      <Input
                        value={editForm?.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="w-40"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <Input
                        type="time"
                        value={editForm?.clockIn || ""}
                        onChange={(e) =>
                          handleInputChange("clockIn", e.target.value)
                        }
                        className="w-32"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <Input
                        type="time"
                        value={editForm?.clockOut || ""}
                        onChange={(e) =>
                          handleInputChange("clockOut", e.target.value)
                        }
                        className="w-32"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <Input
                        type="time"
                        value={editForm?.breakIn || ""}
                        onChange={(e) =>
                          handleInputChange("breakIn", e.target.value)
                        }
                        className="w-32"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <Input
                        type="time"
                        value={editForm?.breakOut || ""}
                        onChange={(e) =>
                          handleInputChange("breakOut", e.target.value)
                        }
                        className="w-32"
                      />
                    </td>

                    <td className="px-6 py-4">
                      {editForm?.breakDuration || "00:00"}
                    </td>

                    <td className="px-6 py-4">
                      {editForm?.totalHours || "00:00"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={handleCancel}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>

                    <td></td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>

                        <span className="font-medium">{employee.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {employee.clockIn || "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {employee.clockOut || "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {employee.breakIn || "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {employee.breakOut || "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {employee.breakDuration}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {employee.totalHours}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {!employee.clockIn && (
                          <Button
                            onClick={() =>
                              handleTimeAction(employee.id, "clockIn")
                            }
                            variant="outline"
                            className="bg-green-100 text-green-700 hover:bg-green-200"
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Clock In
                          </Button>
                        )}

                        {employee.clockIn && !employee.clockOut && (
                          <>
                            {!employee.breakIn && (
                              <Button
                                onClick={() =>
                                  handleTimeAction(employee.id, "breakIn")
                                }
                                variant="outline"
                                className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              >
                                <Coffee className="w-4 h-4 mr-2" />
                                Break In
                              </Button>
                            )}

                            {employee.breakIn && !employee.breakOut && (
                              <Button
                                onClick={() =>
                                  handleTimeAction(employee.id, "breakOut")
                                }
                                variant="outline"
                                className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                              >
                                <Coffee className="w-4 h-4 mr-2" />
                                Break Out
                              </Button>
                            )}

                            {(!employee.breakIn || employee.breakOut) && (
                              <Button
                                onClick={() =>
                                  handleTimeAction(employee.id, "clockOut")
                                }
                                variant="outline"
                                className="bg-red-100 text-red-700 hover:bg-red-200"
                              >
                                <LogOut className="w-4 h-4 mr-2" />
                                Clock Out
                              </Button>
                            )}
                          </>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(employee)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveEmployee(employee.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                  No employees added yet. Click "Add Employee" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTrackingDashboard;
