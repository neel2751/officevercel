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
import { EyeIcon } from "lucide-react";

export default function LeaveSheet({ item }) {
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
            <Button disabled size="sm" className="bg-indigo-700">
              Export
            </Button>
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
                    {entitlement.total}{" "}
                    {entitlement?.total === 7
                      ? "days"
                      : entitlement?.type
                      ? entitlement?.type
                      : "days"}
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
                  <TableCell className="w-[200px]">
                    <Progress
                      value={
                        entitlement?.total > 0
                          ? (entitlement.used / entitlement.total) * 100
                          : 0
                      }
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    {/* To be implemented */}
                    <Button size="sm" variant="outline">
                      D.P
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        <SheetFooter className="pt-4 border-t">
          <span className="text-xs text-indigo-600">
            *This feature under development and may not be accurate.
          </span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
