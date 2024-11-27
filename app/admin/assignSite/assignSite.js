"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommonContext } from "@/context/commonContext";
import { useFetchQuery, useFetchSelectQuery } from "@/hooks/use-query";
import { getEmployeeAttendanceData } from "@/server/assignSiteServer/assignSiteServer";
import {
  getSelectEmployee,
  getSelectProjects,
} from "@/server/selectServer/selectServer";
import React, { useMemo } from "react";
import AssignSiteTable from "./assignSiteTable";
import Pagination from "@/lib/pagination";
import SelectMonth from "../siteAssign/selectMonth";
import AssignSiteForm from "./assignSiteForm";
import { isSameDay } from "date-fns";
import SiteFilter from "./siteFilter";

const AssignSite = ({ searchParams }) => {
  const query = searchParams?.query;
  const currentPage = parseInt(searchParams?.page || "1");
  const pagePerData = parseInt(searchParams?.pageSize || "10");

  const [selectedEmployees, setSelectedEmployees] = React.useState([]);
  const [selectedProjects, setSelectedProjects] = React.useState("");
  const [filterForEdit, setFilterForEdit] = React.useState({
    siteId: "",
    id: "",
    employes: [],
    aDate: new Date(),
  });

  const [filter, setFilter] = React.useState({
    siteId: "",
    month: new Date().getMonth() + 1,
  });

  const { data: selectSiteProject = [] } = useFetchSelectQuery({
    queryKey: ["selectSiteProject"],
    fetchFn: getSelectProjects,
  });
  const { data: selectEmployee = [] } = useFetchSelectQuery({
    queryKey: ["selectEmployee"],
    fetchFn: getSelectEmployee,
  });

  const queryKey = [
    "assignSite",
    { currentPage, pagePerData, query, filter, filterForEdit },
  ];

  const { data, isLoading, isError, refetch } = useFetchQuery({
    params: {
      page: currentPage,
      pageSize: pagePerData,
      query: query,
      siteId: filter?.siteId,
      month: filter?.month,
    },
    queryKey,
    fetchFn: getEmployeeAttendanceData,
  });

  const { newData, totalCount } = data || {};

  const alreadyAssignEmployee = useMemo(() => {
    const filterDate = newData?.filter((item) => {
      if (isSameDay(new Date(item?.date), new Date(filterForEdit?.aDate))) {
        return item;
      }
    });
    const assignedEmployeeIds = filterDate?.flatMap((item) =>
      item?.employeeInfo?.map(({ value }) => value)
    );

    let newDatas = selectEmployee?.filter(
      (item) => !assignedEmployeeIds?.includes(item?.value)
    );
    if (filterForEdit?.id) {
      const existingEmployees = selectEmployee?.filter((item) =>
        filterForEdit?.employes?.includes(item?.value)
      );
      newDatas = [...newDatas, ...existingEmployees];
    }
    return newDatas;
  }, [newData, filterForEdit, selectEmployee, filter]);

  const alreadyAssignSite = useMemo(() => {
    const filterDate = newData?.filter(
      (item) => {
        if (isSameDay(new Date(item?.date), new Date(filterForEdit?.aDate))) {
          return item;
        }
      }
      // item?.date === filterForEdit?.aDate
    );
    const assignedSiteIds = filterDate?.map(({ siteInfo }) => siteInfo?.value);

    let newDatas = selectSiteProject?.filter(
      (item) => !assignedSiteIds?.includes(item?.value)
    );

    if (filterForEdit?.id) {
      const existingSite = selectSiteProject?.find(
        (item) => item?.value === filterForEdit.siteId
      );
      if (existingSite) newDatas?.push(existingSite);
    }

    return newDatas; // Ensure you're returning the computed `newDatas`.
  }, [newData, filterForEdit, selectSiteProject, filter]);
  const editInfo = (data) => {
    setFilterForEdit({
      id: data?.id,
      siteId: data?.siteInfo?.value,
      aDate: data?.date,
      employes: data?.employeeInfo?.map((item) => item?.value),
    });
    const siteVal = data?.siteInfo?.value;
    setSelectedProjects(siteVal);
    const val = data?.employeeInfo?.map(({ value }) => value);
    setSelectedEmployees(val);
  };

  const handleReset = () => {
    setSelectedEmployees([]);
    setSelectedProjects("");
    setFilterForEdit({
      id: "",
      siteId: "",
      aDate: new Date(),
      employes: [],
    }); // reset filter
    refetch();
  };

  return (
    <div className="p-4">
      <CommonContext.Provider
        value={{
          data: newData,
          currentPage,
          pagePerData,
          totalCount,
          filter,
          setFilter,
          selectedEmployees,
          setSelectedEmployees,
          selectedProjects,
          setSelectedProjects,
          alreadyAssignSite,
          alreadyAssignEmployee,
          selectSiteProject,
          filterForEdit,
          setFilterForEdit,
          editInfo,
          handleReset,
        }}
      >
        <div className="mb-4">
          <AssignSiteForm />
        </div>
        <div className="mb-4">
          <SelectMonth />
        </div>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>Assign Site</CardTitle>
                <CardDescription>
                  Manage Assign site for employee
                </CardDescription>
              </div>
              {totalCount > 0 && <SiteFilter />}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error</div>}
            {newData?.length <= 0 ? (
              <div className="text-center text-gray-500">No data available</div>
            ) : (
              <AssignSiteTable />
            )}
            {totalCount > 10 && (
              <div className="pt-4 mt-2 border-t">
                <Pagination />
              </div>
            )}
          </CardContent>
        </Card>
      </CommonContext.Provider>
    </div>
  );
};

export default AssignSite;
