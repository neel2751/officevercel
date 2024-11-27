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

import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { useCommonContext } from "@/context/commonContext";
import EmployeeForm from "../officeEmployee/employeeForm";

const RoleTypeTable = () => {
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
            {["id", "Role name", "description", "status", "Actions"].map(
              (item, index) => (
                <TableHead className="uppercase text-xs" key={index}>
                  {item}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item?.roleTitle}</TableCell>
              <TableCell>{item?.roleDescription}</TableCell>
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
              <TableCell>{format(new Date(item?.createdAt), "PPP")}</TableCell>

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
                    <DialogContent className="sm:max-w-xl max-h-max">
                      <DialogHeader>
                        <DialogTitle>Edit Role Type</DialogTitle>
                        <DialogDescription>
                          Make changes to here. Click update when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <EmployeeForm />
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

export default RoleTypeTable;
