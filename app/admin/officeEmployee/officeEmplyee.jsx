"use client";
import SearchDebounce from "@/components/search/searchDebounce";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getOfficeEmployee,
  handleOfficeEmployee,
} from "@/server/officeServer/officeServer";
import { isFuture } from "date-fns";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import EmployeTabel from "./employeTabel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectFilter } from "@/components/selectFilter/selectFilter";
import { toast } from "sonner";
import EmployeeForm from "./employeeForm";
import Pagination from "@/lib/pagination";
import { useFetchQuery, useFetchSelectQuery } from "@/hooks/use-query";
import { getSelectRoleType } from "@/server/selectServer/selectServer";
import { useSubmitMutation } from "@/hooks/use-mutate";
import { CommonContext } from "@/context/commonContext";
import { OFFICEFIELD } from "@/data/fields/fields";

const OfficeEmplyee = ({ searchParams }) => {
  const currentPage = parseInt(searchParams.page || "1");
  const pagePerData = parseInt(searchParams.pageSize || "10");
  const query = searchParams.query;
  const [initialValues, setInitialValues] = useState({});
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const queryKey = [
    "officeEmployee",
    { query, currentPage, pagePerData, filter },
  ];

  const {
    data: queryResult,
    isLoading,
    isError,
  } = useFetchQuery({
    params: {
      page: currentPage,
      pageSize: pagePerData,
      query: query,
      filter: filter,
    },
    queryKey,
    fetchFn: getOfficeEmployee,
  });
  const { newData: officeEmployeeData = [], totalCount = 0 } =
    queryResult || {};

  const { data: selectRoleType = [] } = useFetchSelectQuery({
    queryKey: ["selectRoleType"],
    fetchFn: getSelectRoleType,
  });

  const field = OFFICEFIELD.map((item) => {
    if (item.name === "roleType") {
      return {
        ...item,
        options: selectRoleType,
      };
    }
    return item;
  });
  const handleClose = () => {
    setInitialValues({});
    setOpen(false);
  };
  const handleEditClose = () => {
    setInitialValues({});
    setIsEdit(false);
  };

  const { mutate: handleSubmit } = useSubmitMutation({
    mutationFn: async (data) => await handleOfficeEmployee(data),
    invalidateKey: queryKey,
    onSuccessMessage: (response) =>
      `Employee ${initialValues._id ? "Updated" : "Created"} successfully`,
    onClose: initialValues?._id ? handleEditClose : handleClose,
  });
  const onSubmit = (data) => {
    if (!isFuture(new Date(data.endDate))) {
      return toast.error("End date should be greater than start date");
    }
    handleSubmit(data);
  };

  const handleEdit = (item) => {
    setInitialValues({ ...item, roleType: item.roleType._id });
    setIsEdit(true);
  };

  const handleOpen = () => {
    setInitialValues({});
    setOpen(true);
  };

  return (
    <div className="p-4">
      <CommonContext.Provider
        value={{
          officeEmployeeData,
          handleSubmit,
          onSubmit,
          field,
          setInitialValues,
          initialValues,
          handleEdit,
          handleEditClose,
          isEdit,
          setIsEdit,
          currentPage,
          pagePerData,
          totalCount,
        }}
      >
        <div>
          <Card>
            <CardHeader>
              <div className="mb-4">
                <CardTitle>Office Employee</CardTitle>
              </div>
              <div className="flex items-center justify-between">
                <SearchDebounce />
                <div className="flex gap-2">
                  <SelectFilter
                    value={filter}
                    frameworks={[
                      { label: "All", value: "" },
                      ...selectRoleType,
                    ]}
                    placeholder={filter === "" ? "All" : "Select Role"}
                    onChange={(e) => setFilter(e)}
                    noData="No Data found"
                  />
                  <Button onClick={handleOpen}>
                    <Plus />
                    Add
                  </Button>
                  <Dialog open={open} onOpenChange={handleClose}>
                    <DialogContent className="sm:max-w-xl max-h-max">
                      <DialogHeader>
                        <DialogTitle>Add New Role</DialogTitle>
                        <DialogDescription>
                          Please fill the form to add new role
                        </DialogDescription>
                      </DialogHeader>
                      <EmployeeForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading && <div>Loading.....</div>}
              {isError && <div> Something went wrong</div>}

              {officeEmployeeData.length <= 0 ? (
                <div className="text-center text-gray-500">No Data found</div>
              ) : (
                <EmployeTabel />
              )}

              {totalCount > 10 && (
                <div className="pt-4 mt-2 border-t">
                  <Pagination />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </CommonContext.Provider>
    </div>
  );
};

export default OfficeEmplyee;
