"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCommonContext } from "@/context/commonContext";
import {
  calculateTotalHoursGemini,
  calculateTotalPayForRows,
} from "@/lib/attendance";
import {
  addAttendance,
  attendanceData,
  deleteAttendance,
} from "@/server/attendanceServer/attendanceServer";
import { format } from "date-fns";
import { Pencil, Save, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";

const AssignAttendance = ({ selectedEmployee, selectedProjects, date }) => {
  const [data, setData] = useState([]);
  const [loading, setIsloading] = useState(false);
  const attendanceEmployeData = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await attendanceData(date);
      if (response.status) {
        const newdata = JSON.parse(response?.data);
        setData(newdata);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log("error handling", error);
      toast.error(" Error fetching attendance data");
    } finally {
      setIsloading(false);
    }
  }, [date]);

  const successAttendance = () => {
    attendanceEmployeData();
  };

  const filterData = data?.filter((employe) =>
    selectedEmployee?.includes(employe._id)
  );
  useEffect(() => {
    attendanceEmployeData();
  }, [date]);

  return (
    <div>
      {filterData.length > 0 && (
        <AttendanceTableHeader
          data={filterData}
          mainDate={date}
          onSuccess={successAttendance}
          siteId={selectedProjects}
        />
      )}
    </div>
  );
};

export default AssignAttendance;

const AttendanceTableHeader = ({
  data,
  mainDate,
  onSuccess,
  siteId,
  isLoading,
}) => {
  const [editableRows, setEditableRows] = useState({});
  const [hours, setHours] = useState("");
  const [breakHours, setBreakHours] = useState("");
  const [extraHours, setExtraHours] = useState("");

  const [note, setNote] = useState("");
  const tableRef = useRef(null);

  const { handleReset } = useCommonContext();

  useEffect(() => {
    // Attach click event listener to document body
    const handleClickOutsideTable = (e) => {
      if (tableRef.current && !tableRef.current.contains(e.target)) {
        // Click occurred outside the table, so reset editable rows
        setEditableRows({});
      }
    };
    document.body.addEventListener("click", handleClickOutsideTable);
    // Calculate and update total hours for each editable row
    const updatedEditableRows = { ...editableRows };
    Object.keys(editableRows).forEach((id) => {
      updatedEditableRows[id].totalHours = calculateTotalHoursGemini(
        hours,
        breakHours,
        extraHours
      );
      updatedEditableRows[id].totalPay = calculateTotalPayForRows(
        editableRows,
        setHours,
        setBreakHours,
        setExtraHours
      );
    });
    setEditableRows(updatedEditableRows);
    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.body.removeEventListener("click", handleClickOutsideTable);
    };
  }, [hours, breakHours, extraHours]);

  const handleEdit = (index, payRate, hours, breakHours, extraHours, note) => {
    const updatedEditableRows = {};
    // Set the clicked row as editable with its payRate
    updatedEditableRows[index] = {
      payRate: payRate,
      hours,
      breakHours,
      extraHours,
      note,
      totalHours: calculateTotalHoursGemini(hours, breakHours, extraHours),
      totalPay: calculateTotalPayForRows(
        editableRows,
        setHours,
        setBreakHours,
        setExtraHours
      ),
    };
    // Set all other rows as non-editable
    Object.keys(editableRows).forEach((key) => {
      if (key !== index) {
        delete updatedEditableRows[key];
      }
    });
    setHours(hours); // Update break hours state
    setBreakHours(breakHours); // Update break hours state
    setExtraHours(extraHours); // Update break hours state
    setNote(note);
    setEditableRows(updatedEditableRows);
  };

  const isValidValue = (value) => {
    if (!value || value < 0) {
      console.log(value);
      return true;
    } else {
      !isNaN(value);
    }
  };

  const handleSave = async () => {
    // breakhour and extrahour allow  decimal values like 0.22 but not the minus sign or anything before if  it's a decimal
    const vali = /^([0-9][\d]{0,7})(\.\d{0,2})?$/;
    try {
      // Validation
      if (hours <= 0 || isNaN(hours))
        return toast.warning("Hours Cannot be Zero!");
      if (breakHours >= hours)
        return toast.warning(
          "Break time should not exceed working hours or same."
        );
      if (extraHours > hours)
        return toast.warning(
          `Extra hours (${extraHours}) cannot exceed remaining hours.`
        );
      const validation = /^([1-9][\d]{0,7})(\.\d{0,2})?$/;
      if (!validation.test(hours))
        return toast.warning("Only numbers are allowed for hours");
      if (!vali.test(breakHours))
        return toast.warning("Only numbers are allowed for break hours");
      if (!vali.test(extraHours))
        return toast.warning("Only numbers are allowed for extra hours");
      const response = await addAttendance(
        {
          aDate: mainDate,
          hours: hours,
          breakHours: breakHours,
          extraHours: extraHours,
          note,
        },
        editableRows,
        siteId
      );
      if (response.status) {
        toast.success(response.message);
        setEditableRows({});
        setHours("");
        setBreakHours("");
        setExtraHours("");
        onSuccess(); //  Callback to parent component
      } else {
        toast.error("Failed to save attendance. please refresh  the page");
      }
    } catch (error) {
      toast.error("Server Error");
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteAttendance(id, siteId, mainDate);
      if (response?.success) {
        toast.success(response?.message);
        handleReset();
        // onSuccess(); //  Callback to parent component
      } else {
        toast.error("Failed to delete attendance. please refresh  the page");
      }
    } catch (error) {
      toast.error("Server Error");
      console.error("Error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle> Attendance</CardTitle>
        <CardDescription>
          <span className="text-xs font-medium text-neutral-500 mt-10 ms-1 mb-2">
            {/* Add Note : Hours Dones't Allowed Decimal Number like 0.9 after 1
            it's okay */}
            {/* Add Note : BreakHours & ExtraHours like 0.3 as same as 0.30 it' called 30 min */}
            <span className="text-rose-600">*Note</span> : Hours start with 1,
            Break & Extra Hours start with 0.1 same as 0.10 it's called 10 min
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table
          ref={tableRef}
          className="table-fixed min-w-full divide-y divide-gray-200"
        >
          <TableHeader>
            <TableRow>
              {[
                "name",
                "payrate",
                "hours",
                "break hours",
                "extra hours",
                "note",
                "total hour",
                "total pay",
                "date",
                "Actions",
              ].map((item) => (
                <TableHead className="uppercase text-xs" key={item}>
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((th) => (
              <TableRow key={th._id}>
                <TableCell>
                  <CardTitle className="text-neutral-700">
                    {th?.firstName} {th?.lastName}
                  </CardTitle>
                </TableCell>
                <TableCell>
                  <CardDescription className="text-neutral-900 font-medium">
                    £{th?.payRate.toFixed(2)}
                  </CardDescription>
                </TableCell>
                {editableRows[th._id] ? (
                  <>
                    <TableCell>
                      <input
                        className="text-black p-2 rounded-lg w-20 border border-gray-300 focus:border-none focus:ring-2 focus:ring-cyan-600 outline-none"
                        type="number"
                        inputMode="decimal"
                        value={editableRows[th._id].hours}
                        placeholder={th.hours}
                        pattern="[0-2]*"
                        min={0}
                        max={8}
                        onChange={(e) => {
                          setHours(e.target.value);
                          setEditableRows({
                            ...editableRows,
                            [th._id]: {
                              ...editableRows[th._id],
                              hours: e.target.value,
                            },
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className="text-black p-2 rounded-lg w-20 border border-gray-300 focus:border-none focus:ring-2 focus:ring-cyan-600 outline-none"
                        type="number"
                        inputMode="decimal"
                        placeholder={th.breakHours}
                        value={editableRows[th._id].breakHours}
                        min={0}
                        max={8}
                        onChange={(e) => {
                          setBreakHours(e.target.value);
                          setEditableRows({
                            ...editableRows,
                            [th._id]: {
                              ...editableRows[th._id],
                              breakHours: e.target.value,
                            },
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className="text-black p-2 rounded-lg w-20 border border-gray-300 focus:border-none focus:ring-2 focus:ring-cyan-600 outline-none"
                        type="number"
                        inputMode="decimal"
                        placeholder={th.extraHours}
                        value={editableRows[th._id].extraHours}
                        min={0}
                        max={8}
                        onChange={(e) => {
                          setExtraHours(e.target.value);
                          setEditableRows({
                            ...editableRows,
                            [th._id]: {
                              ...editableRows[th._id],
                              extraHours: e.target.value,
                            },
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className="text-black p-2 rounded-lg w-24 border text-sm border-gray-300 focus:border-none focus:ring-2 focus:ring-cyan-600 outline-none"
                        type="text"
                        placeholder={th?.note || "Add Note"}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{th?.hours || 0}</TableCell>
                    <TableCell>{th?.breakHours || 0}</TableCell>
                    <TableCell>{th?.extraHours || 0}</TableCell>
                    <TableCell>{th?.note || "Add Note"}</TableCell>
                  </>
                )}
                <TableCell>
                  {(editableRows[th?._id]?.totalHours > 0 &&
                    editableRows[th?._id]?.totalHours) ||
                    th?.totalHours ||
                    0}
                </TableCell>
                <TableCell className="font-semibold">
                  £
                  {editableRows[th?._id]?.totalPay < 0
                    ? 0
                    : editableRows[th?._id]?.totalPay ||
                      th?.totalPay.toFixed(2) ||
                      0}
                </TableCell>
                <TableCell className="whitespace-nowrap w-full">
                  {format(new Date(mainDate), "dd-MM-yyyy") || "-"}
                </TableCell>
                <TableCell className="flex gap-2 items-center">
                  {editableRows[th?._id] ? (
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={handleSave}
                    >
                      <Save />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      variant="outline"
                      type="button"
                      className="group"
                      onClick={() =>
                        handleEdit(
                          th._id,
                          th.payRate,
                          th.hours,
                          th.breakHours,
                          th.extraHours,
                          th.note
                        )
                      }
                    >
                      <Pencil className="group-hover:text-indigo-500" />
                    </Button>
                  )}
                  {th?.hours > 0 && (
                    <Button
                      onClick={() => handleDelete(th._id)}
                      variant="outline"
                      size="icon"
                      className="group"
                    >
                      <Trash2 className="group-hover:text-rose-600" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
