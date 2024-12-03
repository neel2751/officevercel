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
import { isFuture } from "date-fns";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import EmployeeForm from "../officeEmployee/employeeForm";
import EmployeTabel from "./employeTable";
import {
  getAllEmployees,
  handleEmploye,
} from "@/server/employeServer/employeServer";
import { EMPLOYEFIELD } from "@/data/fields/fields";
import Pagination from "@/lib/pagination";
import { getSelectProjects } from "@/server/selectServer/selectServer";
import { useFetchSelectQuery } from "@/hooks/use-query";
import { CommonContext } from "@/context/commonContext";
import { GlobalForm } from "@/components/form/form";

const Emplyee = ({ searchParams }) => {
  const currentPage = parseInt(searchParams.page || "1");
  const pagePerData = parseInt(searchParams.pageSize || "10");
  const [initialValues, setInitialValues] = useState({});
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const queryClient = useQueryClient();
  const { data: selectSiteProject = [] } = useFetchSelectQuery({
    queryKey: ["selectSiteProject"],
    fetchFn: getSelectProjects,
  });

  const query = searchParams.query;
  const {
    data: queryResult,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee", { query, currentPage, pagePerData }],
    keepPreviousData: true,
    queryFn: async () => {
      const response = await getAllEmployees({
        page: currentPage,
        pageSize: pagePerData,
        query: query,
      });
      const parsedData = JSON.parse(response?.data);

      return {
        officeEmployeeData: parsedData || [],
        totalCount: response?.totalCount || 0,
      };
    },
    staleTime: 1000 * 60 * 10,
  });
  const { officeEmployeeData = [], totalCount = 0 } = queryResult || {};

  const field = EMPLOYEFIELD.map((item) => {
    if (item.name === "projectSite") {
      return {
        ...item,
        options: selectSiteProject,
      };
    }
    return item;
  });

  const handleClose = () => {
    setInitialValues({});
    setOpen(false);
  };
  const handleSubmit = useMutation({
    mutationFn: async (data) => {
      return await handleEmploye(data, isChecked);
      //   return await handleOfficeEmployee(data);
    },
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries([
          "employee",
          { query, currentPage, pagePerData },
          { exact: true },
        ]);
        toast.success(
          `Employee ${initialValues._id ? "Updated" : "Create"} successfully`
        );
        initialValues._id ? handleEditClose() : handleClose();
      } else {
        throw new Error(response.message);
      }
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error(`${error}`);
      console.log("Error fetching options", error);
    },
  });
  const onSubmit = (data) => {
    if (!isFuture(new Date(data.eVisaExp))) {
      return toast.error("Visa Expiry should be greater than start date");
    }
    if (isChecked) {
      if (data?.payRate === initialValues?.payRate) {
        return toast.error(
          " Pay Rate should be different than previous one,  if you want to update"
        );
      }
      const confir = confirm(" Are you sure you want to submit this form?");
      if (confir) {
        handleSubmit.mutate(data);
      } else {
        return;
      }
    } else {
      handleSubmit.mutate(data);
    }
    // handleSubmit.mutate(data);
  };
  const handleEdit = (item) => {
    const { eAddress, bankDetail } = item;
    const newItem = {
      ...item,
      address: eAddress?.address,
      city: eAddress?.city,
      zipCode: eAddress?.zipCode,
      country: eAddress?.country,
      accountName: bankDetail?.accountName,
      accountNumber: bankDetail?.accountNumber,
      sortCode: bankDetail?.sortCode,
    };
    setInitialValues(newItem);
    setIsEdit(true);
  };
  const handleEditClose = () => {
    setInitialValues({});
    setIsEdit(false);
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
          isChecked,
          setIsChecked,
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
                  <Button onClick={handleOpen}>
                    <Plus />
                    Add
                  </Button>
                  <Dialog open={open} onOpenChange={handleClose}>
                    <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white rounded-lg shadow-lg p-6 sm:max-w-md md:max-w-lg lg:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Role</DialogTitle>
                        <DialogDescription>
                          Please fill the form to add new role
                        </DialogDescription>
                      </DialogHeader>
                      <GlobalForm
                        fields={EMPLOYEFIELD}
                        initialValues={initialValues}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading && <div>Loading.....</div>}
              {isError && <div> Something went wrong</div>}
              {officeEmployeeData.length <= 0 ? (
                <div className="text-center text-gray-500">
                  No data available
                </div>
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

export default Emplyee;
