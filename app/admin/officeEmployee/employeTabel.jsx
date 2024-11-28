import { Badge } from "@/components/ui/badge";
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
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import EmployeeForm from "./employeeForm";
import { useCommonContext } from "@/context/commonContext";

const EmployeTabel = () => {
  const {
    officeEmployeeData: data,
    handleEdit,
    isEdit,
    setIsEdit,
  } = useCommonContext();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "id",
              "name",
              "email",
              "contactNo",
              "Department",
              // "roletype",
              "status",
              "joindate",
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
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.phoneNumber}</TableCell>
              <TableCell>{item?.department?.roleTitle}</TableCell>
              {/* <TableCell>{item?.roleType}</TableCell> */}
              <TableCell>
                {item?.isActive ? (
                  <Badge
                    className="bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white cursor-pointer"
                    size="sm"
                  >
                    Active
                  </Badge>
                ) : (
                  <Badge
                    className="bg-rose-50 text-rose-600 rounded-full hover:bg-rose-600 hover:text-white cursor-pointer"
                    size="sm"
                  >
                    Inactive
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {item?.joinDate && format(new Date(item?.joinDate), "PPP")}
              </TableCell>
              <TableCell>
                {item?.visaStartDate &&
                  format(new Date(item?.visaStartDate), "PPP")}
              </TableCell>

              <TableCell
                className={`${
                  isPast(new Date(item?.endDate), new Date())
                    ? "text-rose-600"
                    : "text-neutral-600"
                }`}
              >
                {item?.visaEndDate && format(new Date(item.visaEndDate), "PPP")}
              </TableCell>
              <TableCell>
                {item?.visaEndDate && item?.visaEndDate
                  ? isPast(new Date(item?.visaEndDate))
                    ? "Visa expired"
                    : `${formatDistanceStrict(
                        new Date(),
                        new Date(item.visaEndDate)
                      )}`
                  : "-"}
              </TableCell>
              <TableCell>
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
                        <DialogTitle>Edit New Role</DialogTitle>
                        <DialogDescription>
                          Make changes to here. Click update when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <EmployeeForm />
                    </DialogContent>
                  </Dialog>
                  {!item?.isSuperAdmin && (
                    <Button variant="outline" size="icon">
                      <Trash2 className="text-rose-600" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default EmployeTabel;
