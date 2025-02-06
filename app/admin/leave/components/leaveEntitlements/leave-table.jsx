import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { format } from "date-fns";
import EmployeeUpdate from "./employee-update";
import LeaveSheet from "./leave-sheet";
import ScanLeave from "./scan-leave";
import Shimmer from "@/components/tableStatus/tableLoader";

export default function LeaveEntitlementTable({
  newData,
  isPending,
  queryKey,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {[
            "Id",
            "name",
            "Department",
            "JoinDate",
            "EmployeeType",
            "Days",
            "Action",
          ].map((item, index) => (
            <TableHead key={index} className="uppercase text-xs">
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
            newData?.map((item, index) => (
              <TableRow key={item?._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.roleType}</TableCell>
                <TableCell>
                  {item?.joinDate
                    ? format(new Date(item?.joinDate || new Date()), "PPP")
                    : "Not Available"}
                </TableCell>
                <TableCell>{item?.employeType || "Not Available"}</TableCell>
                <TableCell>{item?.partTimeDays || "6"} days</TableCell>
                <TableCell>
                  <div className="space-x-3">
                    {!item?.employeType && (
                      <EmployeeUpdate item={item} queryKey={queryKey} />
                    )}
                    {item?.employeType && item?.leaveData && (
                      <LeaveSheet item={item} />
                    )}
                    {!item?.leaveData && item?.employeType && (
                      <ScanLeave item={item} queryKey={queryKey} />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      )}
    </Table>
  );
}
