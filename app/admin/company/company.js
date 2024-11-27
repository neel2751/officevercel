"use client";

import SearchDebounce from "@/components/search/searchDebounce";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommonContext } from "@/context/commonContext";
import { COMPANYFIELD } from "@/data/fields/fields";
import { useSubmitMutation } from "@/hooks/use-mutate";
import { useFetchQuery } from "@/hooks/use-query";
import Pagination from "@/lib/pagination";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import EmployeeForm from "../officeEmployee/employeeForm";
import {
  getCompanies,
  handleCompany,
} from "@/server/companyServer/companyServer";
import CompanyTable from "./companyTable";

const Company = ({ searchParams }) => {
  const currentPage = parseInt(searchParams?.page || "1");
  const pagePerData = parseInt(searchParams?.pageSize || "10");
  const query = searchParams?.query;
  const [initialValues, setInitialValues] = useState({});
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const queryKey = ["companies", { query, currentPage, pagePerData }];
  const [oldData, setOldData] = useState([]);

  const oldTypeData = async () => {
    try {
      const res = await getCompanies();
      setOldData(JSON.parse(res?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    oldTypeData();
  }, [query]);

  const {
    data: queryResult,
    isLoading,
    isError,
  } = useFetchQuery({
    params: {
      page: currentPage,
      pageSize: pagePerData,
      query: query,
    },
    queryKey,
    fetchFn: getCompanies,
  });
  const { newData: officeEmployeeData = [], totalCount = 0 } =
    queryResult || {};

  const handleClose = () => {
    setInitialValues({});
    setOpen(false);
  };
  const handleEditClose = () => {
    setInitialValues({});
    setIsEdit(false);
  };

  const { mutate: handleSubmit } = useSubmitMutation({
    mutationFn: async (data) => await handleCompany(data),
    invalidateKey: queryKey,
    onSuccessMessage: (response) =>
      `Role Type ${initialValues._id ? "Updated" : "Created"} successfully`,
    onClose: initialValues?._id ? handleEditClose : handleClose,
  });
  const onSubmit = (data) => {
    handleSubmit(data);
  };

  const handleEdit = (item) => {
    setInitialValues(item);
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
          officeEmployeeData: oldData,
          handleSubmit,
          onSubmit,
          field: COMPANYFIELD,
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
                <CardTitle>Role Types</CardTitle>
              </div>
              <div className="flex items-center justify-between">
                <SearchDebounce />
                <div className="flex gap-2">
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
                <CompanyTable />
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

export default Company;
