import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { addDays, format } from "date-fns";
import Shimmer from "../tableStatus/tableLoader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useSubmitMutation } from "@/hooks/use-mutate";
import { useFetchSelectQuery } from "@/hooks/use-query";
import {
  getSelectAttendanceCategory,
  getSelectProjects,
} from "@/server/selectServer/selectServer";
import { handleWeeklyRotaWithStatus } from "@/server/weeklyRotaServer/weeklyRotaServer";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { Input } from "../ui/input";

const WeekRotaTable = ({
  currentWeek,
  schedules,
  setSchedules,
  memoizedSchedules,
  isLoading,
  queryKey,
  handleOnClose = () => {},
}) => {
  const { data: categories = [] } = useFetchSelectQuery({
    fetchFn: getSelectAttendanceCategory,
    queryKey: ["selectCategories"],
  });

  const { data: siteProjects = [] } = useFetchSelectQuery({
    fetchFn: getSelectProjects,
    queryKey: ["selectProjects"],
  });

  const findMostCommonCategory = (schedule) => {
    const values = Object.values(schedule || {});
    const frequency = values.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(frequency).reduce(
      (a, b) => (frequency[a] > frequency[b] ? a : b),
      "OFFICE"
    );
  };

  const handleScheduleChange = (employeeId, day, field, value) => {
    // we have to return on sunday because we using the OFF on the day of the week
    if (day === "Sunday") return;
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) => {
        if (schedule.employeeId === employeeId) {
          const updatedDaySchedule = {
            ...schedule?.schedule[day],
            [field]: value,
          };
          return {
            ...schedule,
            schedule: {
              ...schedule.schedule,
              [day]: updatedDaySchedule,
            },
          };
        }
        return schedule;
      })
    );
  };

  const autoFillSchedule = (employeeId) => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) => {
        if (schedule.employeeId === employeeId) {
          const currentSchedule = { ...schedule.schedule };
          const days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ];
          const mostCommonCategory = findMostCommonCategory(schedule.schedule);

          days.forEach((day) => {
            if (!currentSchedule[day]) {
              day === "Sunday"
                ? (currentSchedule[day] = {
                    category: "OFF",
                    startTime: "00:00",
                    endTime: "00:00",
                  })
                : (currentSchedule[day] = {
                    category: mostCommonCategory,
                    startTime: "09:00",
                    endTime: "17:00",
                  });
            }
          });
          return { ...schedule, schedule: currentSchedule };
        }
        return schedule;
      })
    );
  };

  const { mutate: handleSubmit, isPending } = useSubmitMutation({
    mutationFn: async (data) =>
      await handleWeeklyRotaWithStatus(
        data,
        format(currentWeek, "yyyy-MM-dd"),
        memoizedSchedules?.weekId
      ),
    invalidateKey: queryKey,
    onSuccessMessage: () =>
      memoizedSchedules?.weekId
        ? "Weekly Rota Updated"
        : "Weekly Rota Submited",
    onClose: () => handleOnClose(),
  });

  const submitSchedules = () => {
    // console.log("Before Submiting...", schedules);
    // Validation: Ensure all schedules are complete
    let hasErrors = false;
    const updatedSchedules = schedules.map((schedule) => {
      const missingDays = [];

      // Check each day's schedule
      [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].forEach((day) => {
        const daySchedule = schedule.schedule[day];

        // Skip validation for Sunday
        if (day === "Sunday") {
          return;
        }

        // Check if category exists
        if (!daySchedule || !daySchedule.category) {
          missingDays.push(`${day} (missing category)`);
          return;
        }

        if (daySchedule.category === "OFFICE/SITE" && !daySchedule.site) {
          missingDays.push(`${day} (SITE requires a location)`);
          return;
        }

        // Validate time fields
        const { startTime, endTime } = daySchedule;
        if (!startTime || !endTime) {
          missingDays.push(`${day} (missing time)`);
          return;
        }

        // Ensure startTime < endTime
        if (startTime >= endTime) {
          missingDays.push(`${day} (invalid time range)`);
        }
      });

      // Update schedule with validation result
      if (missingDays.length > 0) {
        hasErrors = true;
      }

      return { ...schedule, hasError: missingDays.length > 0, missingDays };
    });

    setSchedules(updatedSchedules);

    if (hasErrors) {
      //   // Create a detailed error message
      const errorMessage = updatedSchedules
        .filter((schedule) => schedule.hasError)
        .map(
          (schedule) =>
            `Employee: ${
              schedule.employeeName
            }, Missing Days: ${schedule.missingDays.join(", ")}`
        )
        .join("\n");
      toast.error("Some employees have missing schedule days.");
      return; // Stop submission if validation fails
    }
    // we can also check if the schedule is valid (e.g., no two consecutive days are
    // assigned to the same category)

    // In a real application, this would send the data to a server
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) => ({ ...schedule, status: "Submitted" }))
    );
    handleSubmit(schedules);
  };

  return (
    <>
      <div className="space-x-2 my-2 ms-2">
        <span className="text-neutral-500 text-xs font-medium">
          Categories:
        </span>
        {categories.map((item, index) => (
          <Badge
            variant={"outline"}
            className={"border-none p-0 text-neutral-600 font-medium"}
            key={index}
          >
            {item.label}-({item.value})
          </Badge>
        ))}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            {[...Array(7)].map((_, i) => (
              <TableHead key={i}>
                {format(addDays(currentWeek, i), "EEE dd/MM")}
              </TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <Shimmer length={9} />
        ) : (
          <TableBody>
            {schedules?.map((schedule) => {
              // const employee = mockEmployees.find(
              //   (emp) => emp.id === schedule.employeeId
              // );
              return (
                <TableRow
                  key={schedule?.employeeId}
                  style={{
                    border: schedule.hasError ? "1px solid red" : "none",
                  }}
                >
                  <TableCell>{schedule?.employeeName}</TableCell>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <TableCell key={day}>
                      <div className="space-y-2">
                        <Select
                          disabled={day === "Sunday"}
                          value={
                            // every sunday  is a day off
                            day === "Sunday"
                              ? "OFF"
                              : schedule?.schedule[day]?.category || ""
                          }
                          onValueChange={(value) =>
                            handleScheduleChange(
                              schedule.employeeId,
                              day,
                              "category",
                              value
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category?.value}
                                value={category?.value}
                              >
                                {category?.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="time"
                          disabled={
                            day === "Sunday" ||
                            (schedule?.schedule[day]?.category &&
                              schedule?.schedule[day]?.category === "OFF")
                          }
                          value={
                            schedule?.schedule[day]?.category === "OFF"
                              ? "00:00"
                              : day === "Sunday"
                              ? "00:00"
                              : schedule.schedule[day]?.startTime || ""
                          }
                          onChange={(e) =>
                            handleScheduleChange(
                              schedule.employeeId,
                              day,
                              "startTime",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                        <Input
                          type="time"
                          disabled={
                            day === "Sunday" ||
                            (schedule?.schedule[day]?.category &&
                              schedule?.schedule[day]?.category === "OFF")
                          }
                          value={
                            schedule?.schedule[day]?.category === "OFF"
                              ? "00:00"
                              : day === "Sunday"
                              ? "00:00"
                              : schedule?.schedule[day]?.endTime || ""
                          }
                          onChange={(e) =>
                            handleScheduleChange(
                              schedule?.employeeId,
                              day,
                              "endTime",
                              e.target.value
                            )
                          }
                          className="w-full"
                        />
                        {schedule?.schedule[day]?.category ===
                          "OFFICE/SITE" && (
                          <Select
                            value={schedule?.schedule[day]?.site || ""}
                            onValueChange={(value) =>
                              handleScheduleChange(
                                schedule?.employeeId,
                                day,
                                "site",
                                value
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Site" />
                            </SelectTrigger>
                            <SelectContent>
                              {siteProjects?.map((site) => (
                                <SelectItem
                                  key={site?.value}
                                  value={site?.label}
                                >
                                  {site?.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      disabled={isPending || categories?.length === 0}
                      type="button"
                      onClick={() => autoFillSchedule(schedule?.employeeId)}
                    >
                      {categories.length > 0 ? "Auto Fill" : "No Categories"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
      <div className="mt-4 flex gap-4">
        <Button
          disabled={isLoading || isPending || categories.length === 0}
          onClick={submitSchedules}
        >
          {memoizedSchedules?.weekId ? "Update Schedules" : "Submit Schedules"}
        </Button>
        {/* {memoizedSchedules.role ||
          (memoizedSchedules?.approvedStatus === "Pending" && (
            <Button onClick={handleEmailReminder} size="icon">
              <Bell />
            </Button>
          ))} */}
      </div>
    </>
  );
};

export default WeekRotaTable;
