"use client";
import {
  searchSiteProjectByKeywordNew,
  updateSiteProjectById,
} from "@/server/siteProjectServer/siteProjectServer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import SiteTable from "./siteTable";
import { PaginationWithLinks } from "@/components/pagination/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchDebounce from "@/components/search/searchDebounce";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmployeeForm from "../officeEmployee/employeeForm";
import { SITEFIELD } from "@/data/fields/fields";
import { toast } from "sonner";
import { CommonContext } from "@/context/commonContext";

const SiteProject = ({ searchParams }) => {
  const currentPage = parseInt(searchParams.page || "1");
  const pagePerData = parseInt(searchParams.pageSize || "10");
  const [initialValues, setInitialValues] = useState({});
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const queryClient = useQueryClient();

  const query = searchParams.query;
  const {
    data: queryResult,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["siteProject", { query, currentPage, pagePerData }],
    keepPreviousData: true,
    queryFn: async () => {
      const response = await searchSiteProjectByKeywordNew({
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

  const handleSubmit = useMutation({
    mutationFn: async (data) => {
      return await updateSiteProjectById(data);
      //   return await handleOfficeEmployee(data);
    },
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries([
          "siteProject",
          { query, currentPage, pagePerData },
          { exact: true },
        ]);
        toast.success(
          `Site ${initialValues._id ? "Updated" : "Create"} successfully`
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
    handleSubmit.mutate(data);
  };
  const handleEdit = (item) => {
    setInitialValues(item);
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
  const handleClose = () => {
    setInitialValues({});
    setOpen(false);
  };

  return (
    <div className="p-4">
      <CommonContext.Provider
        value={{
          officeEmployeeData,
          handleSubmit,
          onSubmit,
          field: SITEFIELD,
          initialValues,
          handleEdit,
          handleEditClose,
          isEdit,
          setIsEdit,
        }}
      >
        <div>
          <Card>
            <CardHeader>
              <div className="mb-4">
                <CardTitle> Site Project</CardTitle>
              </div>
              <div className="flex items-center justify-between">
                <SearchDebounce />
                <div className="flex gap-2">
                  <Button onClick={handleOpen}>
                    <Plus />
                    Add
                  </Button>
                  <Dialog open={open} onOpenChange={handleClose}>
                    <DialogContent className="sm:max-w-2xl max-h-max">
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
                <div className="text-center text-gray-500">
                  No data available
                </div>
              ) : (
                <SiteTable />
              )}
              {totalCount > 10 && (
                <PaginationWithLinks
                  page={currentPage}
                  pageSize={pagePerData}
                  totalCount={totalCount}
                  pageSizeSelectOptions={{
                    pageSizeOptions: [5, 10, 20, 50, 100],
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </CommonContext.Provider>
    </div>
  );
};

export default SiteProject;
