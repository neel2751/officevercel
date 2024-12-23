"use client";
import SearchDebounce from "@/components/search/searchDebounce";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CommonContext } from "@/context/commonContext";
import { useSubmitMutation } from "@/hooks/use-mutate";
import { useFetchQuery, useFetchSelectQuery } from "@/hooks/use-query";
import { ShieldCheckIcon } from "lucide-react";
import { useState } from "react";
import EmployeeForm from "../officeEmployee/employeeForm";
import PermissionTable from "./permissionTable";
import { MENU } from "@/data/menu";
import { getSelectOfficeEmployee } from "@/server/selectServer/selectServer";
import {
  assignPermission,
  getAllPermission,
} from "@/server/permissionServer/permissionServer";

const Permission = ({ searchParams }) => {
  const currentPage = parseInt(searchParams?.page || "1");
  const pagePerData = parseInt(searchParams?.pageSize || "10");
  const query = searchParams?.query;
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const queryKey = ["permission", { query, currentPage, pagePerData }];

  const { data: selectOfficeEmployee = [] } = useFetchSelectQuery({
    queryKey: ["selectOfficeEmployee"],
    fetchFn: getSelectOfficeEmployee,
  });

  const PERMISSIONFIELD = [
    {
      name: "name",
      labelText: "Permission Name",
      type: "text",
      placeholder: "Enter name",
      size: true,
      validationOptions: {
        required: "Name is required",
      },
    },
    {
      name: "permissions",
      labelText: "Permissions",
      type: "multipleSelect",
      size: true,
      options: Array.from(new Set(MENU.map((item) => item))).map((it) => ({
        label: it.name,
        value: it.path,
      })),
      validationOptions: {
        required: "Select at least one", // Required validation
      },
    },
    {
      name: "employeeId",
      labelText: "Employee",
      type: "select",
      placeholder: "Select Employee",
      size: true,
      options: selectOfficeEmployee,
      validationOptions: {
        required: "Employee is required",
      },
    },
    {
      name: "description",
      labelText: "Description",
      size: true,
      type: "textarea",
      placeholder: "Describe the issue you are facing",
    },
  ];

  const handleEdit = (item) => {
    setIsEdit(true);
    setInitialValues(item);
  };

  const { data, isLoading, isError } = useFetchQuery({
    params: {
      query,
      page: currentPage,
      pageSize: pagePerData,
    },
    queryKey,
    fetchFn: getAllPermission,
  });

  const { newData: result = [], totalCount = 0 } = data || {};

  const { mutate: onSubmit, isPending } = useSubmitMutation({
    mutationFn: async (data) => assignPermission(data, initialValues._id),
    invalidateKey: queryKey,
    onSuccessMessage: (response) => response,
    onClose: () => {
      setIsEdit(false);
      setInitialValues({});
      setOpen(false);
    },
    // onClose: () => {
    //   if (initialValues) {
    //     setIsEdit(false);
    //     setInitialValues(null);
    //   } else {
    //     setOpen(false);
    //   }
    // },
  });

  return (
    <div className="p-4">
      <CommonContext.Provider
        value={{
          result,
          totalCount,
          field: PERMISSIONFIELD,
          initialValues,
          isPending,
          isEdit,
          setIsEdit,
          onSubmit,
          handleEdit,
        }}
      >
        <Card>
          <CardHeader>
            <div className="space-y-1 mb-4">
              <CardTitle> Give Permission</CardTitle>
              <CardDescription>
                Give permission to the employee to access the system
              </CardDescription>
            </div>
            <div className=" flex items-center justify-between">
              <SearchDebounce />
              <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogTrigger asChild>
                  <Button>
                    <ShieldCheckIcon />
                    Assign
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg p-6 sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle> Assign Permission</DialogTitle>
                    <DialogDescription>
                      Assign permission to the employee to access the system
                    </DialogDescription>
                  </DialogHeader>
                  <EmployeeForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <PermissionTable />
          </CardContent>
        </Card>
      </CommonContext.Provider>
    </div>
  );
};

export default Permission;
