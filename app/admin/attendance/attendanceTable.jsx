"use client";
import TableHeaderCom from "@/components/tableStatus/tableHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAttendanceSocket } from "@/hooks/useAttendanceSocket";
import { calculateDuration } from "@/lib/utils";
import { Edit, Save, X } from "lucide-react";
import { useState } from "react";

export default function AttendanceTable() {
  const { attendanceList } = useAttendanceSocket();
  const [showEditForm, setShowEditForm] = useState({});

  const head = [
    "Employee",
    "Department",
    "ClockIn",
    "ClockOut",
    "BreakIn",
    "BreakOut",
    "Total Hour",
    "Break Hour",
    "Action",
  ];

  const handleEditClick = (employee) => {
    setShowEditForm(employee);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShowEditForm((preForm) => ({
      ...preForm,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log(showEditForm);
  };

  return (
    <div>
      <Table>
        <TableHeaderCom tableHead={head} />

        <TableBody>
          {attendanceList &&
            attendanceList.map((items) => (
              <TableRow key={items._id}>
                <TableCell>{items.employeeId}</TableCell>
                <TableCell>To Do</TableCell>
                <TableCell>
                  {items.employeeId === showEditForm.employeeId ? (
                    <Input
                      type="time"
                      name="clockIn"
                      value={showEditForm.clockIn || items.clockIn}
                      className={"max-w-max"}
                      onChange={handleChange}
                    />
                  ) : (
                    items?.clockIn || "-"
                  )}
                </TableCell>
                <TableCell>
                  {items.employeeId === showEditForm.employeeId ? (
                    <Input
                      type="time"
                      name="clockOut"
                      value={showEditForm.clockOut || items?.clockOut}
                      className={"max-w-max"}
                      onChange={handleChange}
                    />
                  ) : (
                    items?.clockOut || "-"
                  )}
                </TableCell>
                <TableCell>
                  {items.employeeId === showEditForm.employeeId ? (
                    <Input
                      type="time"
                      name="breakIn"
                      value={showEditForm.breakIn || items.breakIn}
                      className={"max-w-max"}
                      onChange={handleChange}
                    />
                  ) : (
                    items?.breakIn || "-"
                  )}
                </TableCell>
                <TableCell>
                  {items.employeeId === showEditForm.employeeId ? (
                    <Input
                      type="time"
                      name="breakOut"
                      value={showEditForm.breakOut || items.breakOut}
                      className={"max-w-max"}
                      onChange={handleChange}
                    />
                  ) : (
                    items?.breakOut || "-"
                  )}
                </TableCell>
                <TableCell>
                  {calculateDuration(items.clockIn, items.clockOut) || "-"}
                </TableCell>
                <TableCell>
                  {calculateDuration(items.breakIn, items.breakOut) || "-"}
                </TableCell>
                <TableCell>
                  {items.employeeId === showEditForm.employeeId ? (
                    <div className="flex gap-2 items-center">
                      <Button
                        onClick={handleSave}
                        size={"icon"}
                        variant={"outline"}
                      >
                        <Save />
                      </Button>
                      <Button
                        onClick={() => setShowEditForm({})}
                        size={"icon"}
                        variant={"outline"}
                      >
                        <X />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleEditClick(items)}
                      size={"icon"}
                      variant={"outline"}
                    >
                      <Edit />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
