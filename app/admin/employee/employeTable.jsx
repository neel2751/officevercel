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
import EmployeeForm from "../officeEmployee/employeeForm";
import { CheckBoxNormal } from "@/components/form/formFields";
import { useCommonContext } from "@/context/commonContext";
// import EmployeeForm from "./employeeForm";

const EmployeTabel = () => {
  const {
    officeEmployeeData: data,
    handleEdit,
    isEdit,
    setIsEdit,
    isChecked,
    setIsChecked,
  } = useCommonContext();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {[
              "id",
              "name",
              "contact",
              // "country",
              "Payrate",
              "E.type",
              "P.type",
              "status",
              "joindate",
              "Visastart",
              "visaend",
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
              <TableCell>{item?.firstName + " " + item?.lastName}</TableCell>
              <TableCell>{item?.phone}</TableCell>
              {/* <TableCell>{item?.eAddress?.country}</TableCell> */}
              <TableCell>£{item?.payRate.toFixed(2)}</TableCell>
              <TableCell>{item?.employeType}</TableCell>
              <TableCell>{item?.paymentType}</TableCell>
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
                {item?.startDate && format(new Date(item?.startDate), "PPP")}
              </TableCell>
              <TableCell>
                {(item?.visaStartDate &&
                  format(new Date(item?.startDate), "PPP")) ||
                  "-"}
              </TableCell>

              <TableCell
                className={`${
                  isPast(new Date(item?.eVisaExp), new Date())
                    ? "text-rose-600"
                    : "text-neutral-600"
                }`}
              >
                {format(new Date(item?.eVisaExp), "PPP")}
              </TableCell>
              <TableCell>
                {item.eVisaExp && item?.eVisaExp
                  ? isPast(new Date(item?.eVisaExp))
                    ? "Visa expired"
                    : `${formatDistanceStrict(
                        new Date(),
                        new Date(item?.eVisaExp)
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
                      <CheckBoxNormal
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="icon">
                    <Trash2 className="text-rose-600" />
                  </Button>
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
