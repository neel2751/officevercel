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
  officeEmployeeDelete,
  OfficeEmployeeStatus,
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
import {
  getSelectCompanies,
  getSelectRoleType,
} from "@/server/selectServer/selectServer";
import { useSubmitMutation } from "@/hooks/use-mutate";
import { CommonContext } from "@/context/commonContext";
import { OFFICEFIELD } from "@/data/fields/fields";
import Alert from "@/components/alert/alert";

const OfficeEmplyee = ({ searchParams }) => {
  const currentPage = parseInt(searchParams.page || "1");
  const pagePerData = parseInt(searchParams.pageSize || "10");
  const query = searchParams.query;
  const [initialValues, setInitialValues] = useState({});
  const [alert, setAlert] = useState({});
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({
    company: "",
    role: "",
    type: "",
  });
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

  const { data: selectCompany = [] } = useFetchSelectQuery({
    queryKey: ["selectCompany"],
    fetchFn: getSelectCompanies,
  });

  const field = OFFICEFIELD.map((item) => {
    if (item.name === "department") {
      return {
        ...item,
        options: selectRoleType,
      };
    }
    if (item.name === "company") {
      return {
        ...item,
        options: selectCompany,
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

  const { mutate: handleSubmit, isPending } = useSubmitMutation({
    mutationFn: async (data) =>
      await handleOfficeEmployee(data, initialValues._id),
    invalidateKey: queryKey,
    onSuccessMessage: (response) =>
      `Employee ${initialValues._id ? "Updated" : "Created"} successfully`,
    onClose: initialValues?._id ? handleEditClose : handleClose,
  });
  const onSubmit = (data) => {
    if (data?.visaEndDate && !isFuture(new Date(data.visaEndDate))) {
      return toast.error("Visa End date should be greater than today");
    }
    handleSubmit(data);
  };

  const handleEdit = (item) => {
    setInitialValues({
      ...item,
      department: item.department._id,
      company: item.company._id,
    });
    setIsEdit(true);
  };

  const handleOpen = () => {
    setInitialValues({});
    setOpen(true);
  };

  const alertClose = () => {
    setAlert({});
  };

  const { mutate: handleStatus } = useSubmitMutation({
    mutationFn: async () =>
      alert?.type === "Delete"
        ? await officeEmployeeDelete(alert)
        : await OfficeEmployeeStatus(alert),
    invalidateKey: queryKey,
    onSuccessMessage: (response) =>
      `${
        alert.type === "Delete" ? "Employee Delete" : "Status Update"
      } successfully`,
    onClose: alertClose,
  });

  const handleAlert = (id, type, status) => {
    setAlert({ id, type, status });
  };

  const [{ options }] = field.filter((it) => {
    if (it.name === "immigrationType") {
      return it.options;
    }
  });

  return (
    <div className="p-4">
      <CommonContext.Provider
        value={{
          officeEmployeeData,
          isPending,
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
          handleAlert,
        }}
      >
        <div>
          <Card>
            <CardHeader>
              <div className="mb-4">
                <CardTitle>Office Management</CardTitle>
              </div>
              <div className="flex items-center justify-between">
                <SearchDebounce />
                <div className="flex gap-2">
                  <SelectFilter
                    value={filter?.role}
                    frameworks={[
                      { label: "All", value: "" },
                      ...selectRoleType,
                    ]}
                    placeholder={filter?.role === "" ? "All" : "Select Role"}
                    onChange={(e) => setFilter({ ...filter, role: e })}
                    noData="No Data found"
                  />
                  <SelectFilter
                    value={filter.company}
                    frameworks={[{ label: "All", value: "" }, ...selectCompany]}
                    placeholder={
                      filter.company === "" ? "All" : "Select Company"
                    }
                    onChange={(e) => setFilter({ ...filter, company: e })}
                    noData="No Data found"
                  />
                  <SelectFilter
                    value={filter.type}
                    frameworks={[{ label: "All", value: "" }, ...options]}
                    placeholder={filter.type === "" ? "All" : "Select Type"}
                    onChange={(e) => setFilter({ ...filter, type: e })}
                    noData="No Data found"
                  />
                  <Button onClick={handleOpen}>
                    <Plus />
                    Add
                  </Button>
                  <Dialog
                    open={open}
                    onOpenChange={handleClose}
                    className="fixed inset-0 flex items-center justify-center p-4"
                  >
                    <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg p-6 sm:max-w-md md:max-w-lg lg:max-w-2xl">
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
          <Alert
            open={alert?.type ? true : false}
            label={alert}
            setOpen={setAlert}
            onClose={alertClose}
            onConfirm={handleStatus}
          />
        </div>
      </CommonContext.Provider>
    </div>
  );
};

export default OfficeEmplyee;
