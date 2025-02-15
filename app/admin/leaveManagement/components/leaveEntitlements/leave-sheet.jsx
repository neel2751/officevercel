import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EditIcon, EyeIcon, HistoryIcon, SaveIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitMutation } from "@/hooks/use-mutate";
import { editCommonLeave } from "@/server/leaveServer/getLeaveServer";
import Leavehistory from "./leave-history";

export default function LeaveSheet({ item, queryKey }) {
  const [initialValues, setInitialValues] = useState(null);
  const [value, setValue] = useState(null);

  function onEdit(item, allData) {
    setInitialValues({
      ...item,
      employeeId: allData?._id,
      leaveYear: allData?.leaveYear,
    });
    setValue(item?.total);
  }

  const { mutate: updateLeave, isPending } = useSubmitMutation({
    mutationFn: async (newValue) =>
      await editCommonLeave({ value: newValue, initialValues }),
    invalidateKey: queryKey,
    onSuccessMessage: (message) => message,
    onClose: () => {
      setValue(null);
      setInitialValues(null); // reset state
    },
  });

  async function onSubmit() {
    if (value % 1 !== 0) return toast.warning("No decimal values allowed");
    if (value < initialValues?.used)
      return toast.warning("New total cannot be less than used days");
    const newValue = parseInt(Number(value));
    if (newValue < 0) return toast.error(" Invalid nunber of days");
    // TODO: Update the leave balance
    if (newValue === initialValues?.total)
      return toast.error("No change in leave balance");
    updateLeave(newValue);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <EyeIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-w-6xl mx-auto rounded-md bottom-4 inset-x-4"
      >
        <SheetHeader className="pb-4 ms-2">
          <div className="flex items-center justify-between mt-6">
            <div>
              <SheetTitle>Leave Details</SheetTitle>
              <SheetDescription>
                Leave details of{" "}
                <span className="font-semibold text-indigo-700">
                  {item?.name}
                </span>
              </SheetDescription>
            </div>
            <div className="space-x-2 flex items-center">
              <Button disabled size="sm" className="bg-indigo-700">
                Export
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="sm" variant="outline">
                    <HistoryIcon />
                    History
                  </Button>
                </SheetTrigger>
                <SheetContent className="max-w-7xl w-full rounded-md  top-2 right-4">
                  <SheetHeader className="pb-4 ms-2">
                    <SheetTitle>Leave History</SheetTitle>
                    <SheetDescription>
                      Leave history of{" "}
                      <span className="font-semibold text-indigo-700">
                        {item?.name}
                      </span>
                    </SheetDescription>
                  </SheetHeader>
                  <Leavehistory leaveHistory={item?.leaveHistory} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </SheetHeader>
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Id",
                "Leave Type",
                "Total",
                "Used",
                "Remaining",
                "Eligible",
                "Usage",
                "Action",
              ].map((th, index) => (
                <TableHead key={index} className="uppercase text-xs">
                  {th}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {item?.leaveData && (
            <TableBody>
              {item?.leaveData?.map((entitlement, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{entitlement?.leaveType}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {initialValues?.leaveType === entitlement?.leaveType ? (
                        <Input
                          type="number"
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          className="w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      ) : (
                        <span>{entitlement?.total}</span>
                      )}
                      {/* entitlement?.total === 7
                          ? "days"
                          : entitlement?.type
                          ? entitlement?.type
                          : "days"
                      )
                    )} */}
                      {entitlement?.total === 7 ? "days" : entitlement?.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    {entitlement?.used || 0} {entitlement?.type || "days"}
                  </TableCell>
                  <TableCell>
                    {entitlement?.remaining || 0} {entitlement?.type || "days"}
                  </TableCell>
                  <TableCell>
                    {entitlement?.isEligible ? "Eligible" : "Not Eligible"}
                  </TableCell>
                  <TableCell className="w-[200px] flex items-center gap-4">
                    <Progress
                      value={
                        entitlement?.total > 0
                          ? (entitlement.used / entitlement.total) * 100
                          : 0
                      }
                      className="w-40"
                    />
                    {entitlement?.total > 0
                      ? Math.floor(
                          (entitlement?.used / entitlement?.total) * 100
                        )
                      : 0}
                    %
                  </TableCell>
                  <TableCell className="space-x-2">
                    {/* To be implemented */}
                    {initialValues?.leaveType === entitlement?.leaveType ? (
                      <Button size="icon" variant="outline" onClick={onSubmit}>
                        <SaveIcon />
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onEdit(entitlement, item)}
                        disabled={
                          entitlement?.leaveType === "Maternity Leave" ||
                          entitlement?.leaveType === "Paternity Leave"
                        }
                      >
                        <EditIcon />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        <SheetFooter className="pt-4 border-t">
          <span className="text-xs text-red-600">
            *This feature under development and may not be accurate.
          </span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
