"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format, formatDistanceStrict, isPast } from "date-fns";
import { Edit, Eye, Trash2 } from "lucide-react";
import React from "react";
import EmployeeForm from "./employeeForm";
import { useCommonContext } from "@/context/commonContext";
import { TableStatus } from "@/components/tableStatus/status";
import EmployeeSheet from "./employeeSheet";
import Link from "next/link";
import { encryptId } from "@/lib/algo";

const EmployeTabel = () => {
  const {
    officeEmployeeData: data,
    handleEdit,
    isEdit,
    setIsEdit,
    handleAlert,
  } = useCommonContext();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "name",
              "email",
              "contactNo",
              "status",
              "joindate",
              "Enddate",
              "VisaStart",
              "VisaEnd",
              "visa",
              "Actions",
            ].map((item, index) => (
              <TableHead className="uppercase text-xs" key={index}>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="cursor-pointer">
                <EmployeeSheet item={item} />
              </TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.phoneNumber}</TableCell>
              <TableCell>
                {!item?.isSuperAdmin ? (
                  <div
                    onClick={() =>
                      handleAlert(item?._id, "Update", item?.isActive)
                    }
                  >
                    <TableStatus isActive={item?.isActive} />
                  </div>
                ) : (
                  <TableStatus isActive={item?.isActive} />
                )}
              </TableCell>
              <TableCell>
                {item?.joinDate && format(new Date(item?.joinDate), "PPP")}
              </TableCell>
              <TableCell>
                {(item?.endDate && format(new Date(item?.endDate), "PPP")) ||
                  "-"}
              </TableCell>
              <TableCell>
                {item?.immigrationType === "British"
                  ? "-"
                  : item?.visaStartDate &&
                    format(new Date(item?.visaStartDate), "PPP")}
              </TableCell>

              <TableCell
                className={`${
                  isPast(new Date(item?.visaEndDate) || new Date(), new Date())
                    ? "text-rose-600"
                    : "text-neutral-700"
                }`}
              >
                {item?.immigrationType === "British"
                  ? "-"
                  : item?.visaEndDate &&
                    format(new Date(item.visaEndDate), "PPP")}
              </TableCell>
              <TableCell>
                {item?.immigrationType === "British"
                  ? "-"
                  : item?.visaEndDate && item?.visaEndDate
                  ? isPast(new Date(item?.visaEndDate))
                    ? "Visa expired"
                    : `${formatDistanceStrict(
                        new Date(),
                        new Date(item.visaEndDate)
                      )}`
                  : "-"}
              </TableCell>
              <TableCell>
                {!item?.isSuperAdmin && (
                  <div className="flex gap-2">
                    <Dialog open={isEdit} onOpenChange={setIsEdit}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleEdit(item)}
                          variant="outline"
                          size="icon"
                        >
                          <Edit className="text-indigo-600" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg p-6 sm:max-w-md md:max-w-lg lg:max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Employee Details</DialogTitle>
                          <DialogDescription>
                            Make changes to here. Click update when you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <EmployeeForm />
                      </DialogContent>
                    </Dialog>
                    <Button
                      onClick={() =>
                        handleAlert(item?._id, "Delete", item?.isActive)
                      }
                      variant="outline"
                      size="icon"
                    >
                      <Trash2 className="text-rose-600" />
                    </Button>
                    <Button asChild size="icon" variant="outline">
                      <Link
                        href={`/admin/officeEmployee/${encryptId(
                          item?._id
                        )}/overview`}
                      >
                        <Eye />
                      </Link>
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default EmployeTabel;
