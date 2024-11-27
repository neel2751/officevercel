import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCommonContext } from "@/context/commonContext";
import React from "react";
import { Status, TableStatus } from "@/components/tableStatus/status";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import EmployeeForm from "../officeEmployee/employeeForm";

const SiteAssignTable = () => {
  const { data, totalCount, handleEdit, isEdit, setIsEdit, handleAlert } =
    useCommonContext();
  const tabelHead = [
    "id",
    "sitename",
    "assign to",
    "sitestatus",
    "sitetype",
    "status",
    "startDate",
    "endDate",
    "action",
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tabelHead.map((item, index) => (
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
            <TableCell>{item?.siteName}</TableCell>
            <TableCell>{item?.roleName}</TableCell>
            <TableCell>
              <Status title={item?.siteStatus} />
            </TableCell>
            <TableCell>{item?.siteType}</TableCell>
            <TableCell>
              <div
                onClick={() => handleAlert(item?._id, "Update", item?.isActive)}
              >
                <TableStatus isActive={item?.isActive} />
              </div>
            </TableCell>
            <TableCell>{item?.startDate || "-"}</TableCell>
            <TableCell>{item?.endDate || "-"}</TableCell>
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
                      <DialogTitle>Edit New Role</DialogTitle>
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
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SiteAssignTable;
